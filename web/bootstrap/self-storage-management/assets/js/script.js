(function () {
  "use strict";

  var yearEl = document.getElementById("ssmYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navbar = document.querySelector(".ssm-navbar");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 8) {
      navbar.classList.add("ssm-navbar--scrolled");
    } else {
      navbar.classList.remove("ssm-navbar--scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navCollapse = document.getElementById("ssmNav");
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

  var reserveForm = document.querySelector(".ssm-form");
  if (reserveForm) {
    reserveForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
})();
