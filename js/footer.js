/*************************************************************************
 * For loading the footer (world map + visit counts by IP location).
 * The footer will not work if you open the file directly rather than on a web server.
 *************************************************************************/

(function () {
  "use strict";

  function loadFooterMap() {
    var container = document.getElementById("footer-map");
    if (!container || typeof L === "undefined") return;
    if (window.initFooterMap) window.initFooterMap();
  }

  function loadLeafletThenMap() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js";
    s.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    s.crossOrigin = "anonymous";
    s.onload = function () {
      var s2 = document.createElement("script");
      s2.src = "js/footer-map.js";
      s2.onload = loadFooterMap;
      document.body.appendChild(s2);
    };
    document.head.appendChild(s);
  }

  $(function () {
    $(".footer-container").load("footer.html", function () {
      loadLeafletThenMap();
    });
  });
})();