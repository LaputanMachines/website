function swapClasses(element, initialClass, finalClass) {
  /**
  * Swaps the classes of elements.
  * @param {Element} element - Element whose classes we wish to swap.
  * @param {string} initialClass - Initial class name of the element.
  * @param {string} finalClass - Desired class name of the element.
  */
  element.classList.remove(initialClass);
  element.classList.add(finalClass);
}

function updateText(element, newText) {
  /**
  * Updates an element's text value.
  * @param {Element} element - Element whose text we wish to update.
  * @param {string} newText - Text with which to update the element with.
  */
  element.innerHTML = newText;
  element.textContent = newText;
}

function toggleNavigationBar() {
  /**
  * Toggles the position of the navigation bar and main frame.
  */
  var mainEl = document.getElementById("main");
  var navigationBarEl = document.getElementById("navigationBar");
  var collapseButtonEl = document.getElementById("collapseButton");
  var collapseContainerEl = document.getElementById("collapseContainer");
  var isNavigationBarcollapsed = navigationBarEl.classList.contains("collapsedNavigationBar");

  var originalNavigationBarState, desiredNavigationBarState, originalNavigationButtonState,
  desiredNavigationButtonState, originalBodyState, desiredBodyState, desiredTextValue,
  navigationCookieValue;

  if (isNavigationBarcollapsed) {
    originalNavigationBarState = "collapsedNavigationBar";
    desiredNavigationBarState = "expandedNavigationBar";
    originalNavigationButtonState = "collapsedNavigationButton";
    desiredNavigationButtonState = "expandedNavigationButton";
    originalBodyState = "collapsed";
    desiredBodyState = "expanded";
    desiredTextValue = "<";
    navigationCookieValue = "true";
  } else {
    originalNavigationBarState = "expandedNavigationBar";
    desiredNavigationBarState = "collapsedNavigationBar";
    originalNavigationButtonState = "expandedNavigationButton";
    desiredNavigationButtonState = "collapsedNavigationButton";
    originalBodyState = "expanded";
    desiredBodyState = "collapsed";
    desiredTextValue = ">";
    navigationCookieValue = "false";
   }

   swapClasses(navigationBarEl, originalNavigationBarState, desiredNavigationBarState);
   swapClasses(collapseContainerEl, originalNavigationButtonState, desiredNavigationButtonState);
   swapClasses(mainEl, originalBodyState, desiredBodyState);
   updateText(collapseButtonEl, desiredTextValue);
   document.cookie = "navigationIsExpanded = ".concat(navigationCookieValue);
}

function fetchCookies() {
  /**
  * Fetches the cookies onload, and uses them to decide whether to expand/collapse
  * the navigation bar.
  */
  var currentCookies = document.cookie;
  // If navigationIsExpanded in currentCookies, then do nothing
  // Else collapse the navigation bar on load
}
