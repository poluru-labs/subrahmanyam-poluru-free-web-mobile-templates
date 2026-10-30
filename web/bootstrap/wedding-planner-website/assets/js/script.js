(function () {
  "use strict";

  var yearEl = document.getElementById("wpwYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navbar = document.querySelector(".wpw-navbar");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 8) {
      navbar.classList.add("wpw-navbar--scrolled");
    } else {
      navbar.classList.remove("wpw-navbar--scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navCollapse = document.getElementById("wpwNav");
  if (navCollapse) {
    navCollapse.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 991.98px)").matches) {
          var instance = bootstrap.Collapse.getInstance(navCollapse);
          if (instance) {
            instance.hide();
          }
        }
      });
    });
  }

  var consultForm = document.querySelector(".wpw-form");
  if (consultForm) {
    consultForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
})();
