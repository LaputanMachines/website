function toggleNavigationBar() {
  if (document.getElementById("navigationBar").classList.contains("collapsedNavigationBar")) {
    // Expands the navigation bar division and navigation button
    document.getElementById("navigationBar").classList.remove("collapsedNavigationBar");
    document.getElementById("navigationBar").classList.add("expandedNavigationBar");
    document.getElementById("collapseContainer").classList.remove("collapsedNavigationButton");
    document.getElementById("collapseContainer").classList.add("expandedNavigationButton");
    document.getElementById("collapseButton").innerHTML="<";  // Legacy
    document.getElementById("collapseButton").textContent="<";
  } else if (document.getElementById("navigationBar").classList.contains("expandedNavigationBar")) {
    // Collapses the navigation bar and navigation button
    document.getElementById("navigationBar").classList.remove("expandedNavigationBar");
    document.getElementById("navigationBar").classList.add("collapsedNavigationBar");
    document.getElementById("collapseContainer").classList.remove("expandedNavigationButton");
    document.getElementById("collapseContainer").classList.add("collapsedNavigationButton");
    document.getElementById("collapseButton").innerHTML=">";  // Legacy
    document.getElementById("collapseButton").textContent=">";
   }
}
