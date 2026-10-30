(function () {
  "use strict";

  var yearEl = document.getElementById("lcfYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navbar = document.querySelector(".lcf-navbar");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 8) {
      navbar.classList.add("lcf-navbar--scrolled");
    } else {
      navbar.classList.remove("lcf-navbar--scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navCollapse = document.getElementById("lcfNav");
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

  var joinForm = document.querySelector(".lcf-form");
  if (joinForm) {
    joinForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
})();
