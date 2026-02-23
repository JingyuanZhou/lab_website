/*************************************************************************
 * Footer world map: visit counts by country (IP-based).
 * Loads data from data/visitor_counts.json. Run after footer.html is loaded.
 *************************************************************************/

(function () {
  "use strict";

  // Country code (ISO 3166-1 alpha-2) -> [lat, lng] for marker placement
  var countryCoords = {
    US: [39.8283, -98.5795],
    CN: [35.8617, 104.1954],
    GB: [55.3781, -3.4360],
    DE: [51.1657, 10.4515],
    JP: [36.2048, 138.2529],
    FR: [46.2276, 2.2137],
    CA: [56.1304, -106.3468],
    AU: [-25.2744, 133.7751],
    IN: [20.5937, 78.9629],
    KR: [35.9078, 127.7669],
    SG: [1.3521, 103.8198],
    NL: [52.1326, 5.2913],
    CH: [46.8182, 8.2275],
    IT: [41.8719, 12.5674],
    ES: [40.4637, -3.7492],
    BR: [-14.2350, -51.9253],
    RU: [61.5240, 105.3188],
    SE: [60.1282, 18.6435],
    PL: [51.9194, 19.1451],
    TW: [23.6978, 120.9605],
    HK: [22.3193, 114.1694],
    MX: [23.6345, -102.5528],
    ZA: [-30.5595, 22.9375],
    NZ: [-40.9006, 174.8860],
    NO: [60.4720, 8.4689],
    FI: [61.9241, 25.7482],
    BE: [50.5039, 4.4699],
    AT: [47.5162, 14.5501],
    PT: [38.7223, -9.1393],
    IL: [31.0461, 34.8516],
    TR: [38.9637, 35.2433],
    SA: [23.8859, 45.0792],
    AE: [23.4241, 53.8478],
    MY: [4.2105, 101.9758],
    TH: [15.8700, 100.9925],
    ID: [-0.7893, 113.9213],
    PH: [12.8797, 121.7740],
    VN: [14.0583, 108.2772],
    EG: [26.8206, 30.8025],
    NG: [9.0820, 8.6753],
    AR: [-38.4161, -63.6167],
    CL: [-35.6751, -71.5430],
    CO: [4.5709, -74.2973],
    IE: [53.1424, -7.6921],
    DK: [56.2639, 9.5018],
    CZ: [49.8175, 15.4730],
    HU: [47.1625, 19.5033],
    RO: [45.9432, 24.9668],
    GR: [39.0742, 21.8243]
  };

  function initMap() {
    var container = document.getElementById("footer-map");
    if (!container) return;

    if (typeof L === "undefined") return;

    var map = L.map("footer-map", {
      center: [30, 0],
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(map);

    var dataUrl = "data/visitor_counts.json";
    fetch(dataUrl)
      .then(function (res) { return res.ok ? res.json() : {}; })
      .then(function (data) {
        if (!data || typeof data !== "object") return;
        var maxCount = 0;
        var entries = [];
        for (var code in data) {
          if (!data.hasOwnProperty(code)) continue;
          var c = parseInt(data[code], 10);
          if (isNaN(c) || c < 1) continue;
          if (c > maxCount) maxCount = c;
          entries.push({ code: code, count: c });
        }
        if (maxCount < 1) return;
        var minRadius = 8;
        var maxRadius = 28;
        entries.forEach(function (e) {
          var latlng = countryCoords[e.code];
          if (!latlng) return;
          var radius = minRadius + (maxRadius - minRadius) * (e.count / maxCount);
          var circle = L.circleMarker(latlng, {
            radius: radius,
            fillColor: "#2563eb",
            color: "#1d4ed8",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.65
          }).addTo(map);
          circle.bindTooltip(
            e.code + ": " + e.count + " " + (e.count === 1 ? "visit" : "visits"),
            { permanent: false, direction: "top", offset: [0, -radius - 4] }
          );
        });
      })
      .catch(function () {});
  }

  window.initFooterMap = initMap;
})();
