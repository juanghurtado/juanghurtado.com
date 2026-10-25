(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function isDark() {
    return root.dataset.theme === "dark";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      /* modo privado sin almacenamiento */
    }

    if (toggle) {
      toggle.setAttribute("aria-checked", theme === "dark" ? "true" : "false");
    }
  }

  if (toggle) {
    toggle.setAttribute("aria-checked", isDark() ? "true" : "false");

    toggle.addEventListener("click", function () {
      applyTheme(isDark() ? "light" : "dark");
    });
  }

  window.addEventListener("keydown", function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    var target = event.target;
    var tag = target && target.tagName ? target.tagName.toLowerCase() : "";

    if (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      (target && target.isContentEditable)
    ) {
      return;
    }

    if (event.key === "d" || event.key === "D") {
      applyTheme(isDark() ? "light" : "dark");
    }
  });

  /* Anclas visibles al pasar por encima de los encabezados. */
  var prose = document.querySelector(".prose");

  if (prose) {
    prose.querySelectorAll("h2[id], h3[id], h4[id]").forEach(function (heading) {
      var anchor = document.createElement("a");
      anchor.className = "anchor";
      anchor.href = "#" + heading.id;
      anchor.setAttribute("aria-label", "Enlazar a esta sección");
      anchor.textContent = "#";

      anchor.addEventListener("click", function () {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(window.location.href).catch(function () {});
        }
      });

      heading.appendChild(anchor);
    });
  }
})();
