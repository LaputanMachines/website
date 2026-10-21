document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  // Rocket Loader replays DOMContentLoaded once it has run the scripts it
  // deferred, so this handler fires twice on the live site. A second run would
  // attach every listener again, and two toggles on the hamburger cancel out,
  // leaving the menu impossible to open.
  if (window.commonInitialized) return;
  window.commonInitialized = true;

  const globalWrap = document.querySelector('.global-wrap'),
    body = document.querySelector('body'),
    menuToggle = document.querySelector(".hamburger"),
    menuList = document.querySelector(".main-nav"),
    searchOpenButton = document.querySelector(".search-button"),
    searchCloseIcon = document.querySelector(".icon__search__close"),
    searchOverlay = document.querySelector(".search__overlay"),
    searchInput = document.querySelector(".search__text"),
    search = document.querySelector(".search"),
    btnScrollToTop = document.querySelector(".top");


  /* =======================================================
  // Menu + Search
  ======================================================= */
  menuToggle.addEventListener("click", () => {
    menu();
  });

  searchOpenButton.addEventListener("click", () => {
    searchOpen();
  });

  searchCloseIcon.addEventListener("click", () => {
    searchClose();
  });

  searchOverlay.addEventListener("click", () => {
    searchClose();
  });


  // Menu
  function menu() {
    menuToggle.classList.toggle("is-open");
    menuList.classList.toggle("is-visible");
  }


  // Search
  function searchOpen() {
    search.classList.add("is-visible");
    body.classList.add("search-is-visible");
    globalWrap.classList.add("is-active");
    menuToggle.classList.remove("is-open");
    menuList.classList.remove("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 250);
  }

  function searchClose() {
    search.classList.remove("is-visible");
    body.classList.remove("search-is-visible");
    globalWrap.classList.remove("is-active");
  }

  document.addEventListener('keydown', function(e){
    if (e.key == 'Escape') {
      searchClose();
    }
  });


  /* ==========================================
  // Stop Animations During Window Resizing
  ========================================== */
  let disableTransition;

  window.addEventListener("resize", () => {
    stopAnimation();
  });

  function stopAnimation() {
    document.body.classList.add("disable-animation");
    clearTimeout(disableTransition);
    disableTransition = setTimeout(() => {
      document.body.classList.remove("disable-animation");
    }, 100);
  };


  // =====================
  // Simple Jekyll Search
  // =====================
  SimpleJekyllSearch({
    searchInput: document.getElementById("js-search-input"),
    resultsContainer: document.getElementById("js-results-container"),
    json: "/search.json",
    searchResultTemplate: '<div class="search-results__item"><a href="{url}" class="search-results__link"><time class="search-results-date" datetime="{date}">{date}</time><div class="search-results-title">{title}</div></a></div>',
    noResultsText: '<div class="no-results">No results found...</div>'
  });


  /* =======================
  // Transit Map
  ======================= */
  const transitMap = document.querySelector(".transit__map");

  if (transitMap) {
    const lineButtons = document.querySelectorAll(".transit__line");
    let focusedLine = null;

    // Picking a line dims every track and station not on it; picking it again
    // brings them all back.
    lineButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        focusedLine = focusedLine === button.dataset.line ? null : button.dataset.line;

        lineButtons.forEach(function (b) {
          b.setAttribute("aria-pressed", b.dataset.line === focusedLine ? "true" : "false");
        });

        transitMap.querySelectorAll("[data-lines]").forEach(function (el) {
          el.classList.toggle("is-dim", focusedLine !== null && el.dataset.lines.split(" ").indexOf(focusedLine) < 0);
        });
      });
    });

    // Tag links elsewhere on the site land here as /?tag=name.
    const tag = new URLSearchParams(window.location.search).get("tag");

    if (tag) {
      const tagNote = document.querySelector(".transit__tag-note");
      const wanted = tag.toLowerCase();

      tagNote.querySelector(".transit__tag-name").textContent = tag;
      tagNote.hidden = false;

      transitMap.querySelectorAll("[data-tags]").forEach(function (el) {
        el.classList.toggle("is-untagged", el.dataset.tags.split(",").indexOf(wanted) < 0);
      });
    }

    // Riders are dots that walk each line from station to station, wait a moment at
    // every stop, and turn back at the termini. They carry data-lines, so
    // picking a line dims the riders on the others too.
    const RIDER_SPEED_MIN = 18; // px per second
    const RIDER_SPEED_MAX = 42;
    const RIDER_DWELL_MIN = 900; // ms at a station
    const RIDER_DWELL_MAX = 2600;
    const RIDER_RETRY = 400; // ms before a blocked rider tries again
    const RIDER_GAP = 40; // px a station must be clear before a rider leaves it
    const RIDER_START_SPREAD = 8000; // ms over which the riders set off
    const RIDERS_PER_STATION = 1;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A station's centre on a line: the line's column, the station's row.
    const stationPoint = function (station, track) {
      return "translate(" + (track.offsetLeft + track.offsetWidth / 2) + "px, " + (station.offsetTop + station.offsetHeight / 2) + "px)";
    };

    const between = function (min, max) {
      return min + Math.random() * (max - min);
    };

    // Whether a walking rider on the line is within RIDER_GAP of a station.
    const crowded = function (line, station) {
      const y = station.offsetTop + station.offsetHeight / 2;

      return Array.from(line.moving).some(function (rider) {
        return Math.abs(new DOMMatrix(getComputedStyle(rider).transform).m42 - y) < RIDER_GAP;
      });
    };

    // Positions are read from the layout on every leg, so a resize only
    // affects the leg in progress. Returns a function that ends any leg in
    // progress and puts the rider on its station after the layout moves.
    //
    // Riders keep their distance through the line's shared state: a segment
    // (the track between two neighbouring stations) holds one rider at a
    // time, and a station takes one arriving rider at a time; nobody leaves
    // a station, or heads for one, while another rider is pulling in. A rider
    // also waits until no walking rider is within RIDER_GAP of its station,
    // so two setting off in opposite directions don't emerge side by side.
    //
    //   station 0  ( )
    //               |   segment 0: one rider at most
    //   station 1  ( )  arriving[1] > 0 holds riders waiting here
    //               |   segment 1
    //   station 2  ( )
    const walk = function (rider, line, start) {
      const stations = line.stations;
      const speed = between(RIDER_SPEED_MIN, RIDER_SPEED_MAX);
      let at = start;
      let step = Math.random() < .5 ? 1 : -1;

      const place = function () {
        rider.style.transform = stationPoint(stations[at], line.track);
      };

      const leg = function () {
        if (!stations[at + step]) {
          step = -step;
        }

        const next = at + step;
        const segment = Math.min(at, next);

        if (line.segments.has(segment) || line.arriving[at] > 0 || line.arriving[next] > 0 || crowded(line, stations[at])) {
          setTimeout(leg, RIDER_RETRY);
          return;
        }

        const from = stations[at];
        const to = stations[next];
        const distance = Math.abs(to.offsetTop - from.offsetTop);

        line.segments.add(segment);
        line.arriving[next]++;
        line.moving.add(rider);
        at = next;
        place();

        rider.animate(
          [{ transform: stationPoint(from, line.track) }, { transform: stationPoint(to, line.track) }],
          { duration: distance / speed * 1000, easing: "ease-in-out" }
        ).onfinish = function () {
          line.segments.delete(segment);
          line.arriving[next]--;
          line.moving.delete(rider);
          place();
          setTimeout(leg, between(RIDER_DWELL_MIN, RIDER_DWELL_MAX));
        };
      };

      // Each rider sets off at its own moment, not all on the same beat.
      place();
      setTimeout(leg, Math.random() * RIDER_START_SPREAD);

      return function () {
        rider.getAnimations().forEach(function (animation) {
          animation.finish();
        });

        place();
      };
    };

    // Rows change height when the web fonts arrive or the page is resized, so
    // riders start once fonts are ready and follow the map's size after that.
    const startRiders = function () {
      const riders = document.createElement("div");
      const places = [];

      riders.className = "transit__riders";
      riders.setAttribute("aria-hidden", "true");
      transitMap.appendChild(riders);

      lineButtons.forEach(function (button) {
        const line = button.dataset.line;
        const track = transitMap.querySelector('.transit__track[data-lines="' + line + '"]');
        const stations = Array.from(transitMap.querySelectorAll(".transit__station")).filter(function (station) {
          return station.dataset.lines.split(" ").indexOf(line) >= 0;
        });

        if (stations.length < 2) {
          return;
        }

        const count = Math.max(1, Math.round(stations.length * RIDERS_PER_STATION));
        const shared = {
          stations: stations,
          track: track,
          segments: new Set(),
          arriving: stations.map(function () {
            return 0;
          }),
          moving: new Set()
        };

        // Riders start spread along the line, one per station.
        for (let n = 0; n < count; n++) {
          const rider = document.createElement("span");
          rider.className = "transit__rider";
          rider.dataset.lines = line;
          rider.classList.toggle("is-dim", focusedLine !== null && focusedLine !== line);
          riders.appendChild(rider);
          places.push(walk(rider, shared, n % stations.length));
        }
      });

      new ResizeObserver(function () {
        places.forEach(function (place) {
          place();
        });
      }).observe(transitMap);
    };

    if (!reduceMotion) {
      document.fonts.ready.then(startRiders);
    }
  }


  /* =======================
  // Scroll Top Button
  ======================= */
  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });

});