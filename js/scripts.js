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
  if (isNavigationBarcollapsed) {  // Expands the navigation bar division and navigation button
    swapClasses(navigationBarEl, "collapsedNavigationBar", "expandedNavigationBar");
    swapClasses(collapseContainerEl, "collapsedNavigationButton", "expandedNavigationButton");
    swapClasses(mainEl, "collapsed", "expanded");
    updateText(collapseButtonEl, "<");
    document.cookie = "navigationIsExpanded = true";
  } else {  // Collapses the navigation bar and navigation button
    swapClasses(navigationBarEl, "expandedNavigationBar", "collapsedNavigationBar");
    swapClasses(collapseContainerEl, "expandedNavigationButton", "collapsedNavigationButton");
    swapClasses(mainEl, "expanded", "collapsed");
    updateText(collapseButtonEl, ">");
    document.cookie = "navigationIsExpanded = false";
   }
}
