function collapseNavigationBar() {
  if (document.getElementById("navigationBar").classList.contains("expandedNavigationBar")) {
    document.getElementById("navigationBar").classList.remove("expandedNavigationBar");
    document.getElementById("navigationBar").classList.add("collapsedNavigationBar");
   }
}

function expandNavigationBar() {
  if (document.getElementById("navigationBar").classList.contains("collapsedNavigationBar")) {
    document.getElementById("navigationBar").classList.remove("collapsedNavigationBar");
    document.getElementById("navigationBar").classList.add("expandedNavigationBar");
  }
}
