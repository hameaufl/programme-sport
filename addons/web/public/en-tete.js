/* Date locale commune aux quatre en-têtes de Mon Rythme. Aucune donnée métier. */
(function () {
  "use strict";
  function actualiserDate() {
    var element = document.getElementById("todayLabel");
    if (!element) return;
    var maintenant = new Date();
    element.textContent = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(maintenant);
    element.dateTime = String(maintenant.getFullYear()) + "-" +
      String(maintenant.getMonth() + 1).padStart(2, "0") + "-" +
      String(maintenant.getDate()).padStart(2, "0");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", actualiserDate, {once:true});
  } else {
    actualiserDate();
  }
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) actualiserDate();
  });
  window.addEventListener("pageshow", actualiserDate);
  window.setInterval(actualiserDate, 60000);
}());
