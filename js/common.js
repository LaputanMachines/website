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
    const lineButtons = document.querySelectorAll(".transit__line"),
      serviceButtons = document.querySelectorAll(".transit__service button");
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

    serviceButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        transitMap.classList.toggle("is-express-only", button.dataset.service === "express");

        serviceButtons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === button ? "true" : "false");
        });
      });
    });
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