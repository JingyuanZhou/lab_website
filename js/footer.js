/*************************************************************************
 * For loading the footer (with RevolverMaps visitor map, no backend).
 * The footer will not work if you open the file directly rather than on a web server.
 *************************************************************************/

(function () {
  "use strict";

  function injectRevolverMaps() {
    var container = document.getElementById("revolvermaps-container");
    if (!container || container.querySelector("script")) return;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//rf.revolvermaps.com/0/0/6.js?i=5cmhshuph04&m=7&s=320&c=e63100&cr1=ffffff&f=arial&l=0&bv=90&lx=-420&ly=420&hi=20&he=7&hc=a8ddff&rs=80";
    script.async = true;
    container.appendChild(script);
  }

  $(function () {
    $(".footer-container").load("footer.html", injectRevolverMaps);
  });
})();
