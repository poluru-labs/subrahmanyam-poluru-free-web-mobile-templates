(function () {
  "use strict";

  var yearEl = document.getElementById("pcvYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navbar = document.querySelector(".pcv-navbar");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 8) {
      navbar.classList.add("pcv-navbar--scrolled");
    } else {
      navbar.classList.remove("pcv-navbar--scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navCollapse = document.getElementById("pcvNav");
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

  var bookForm = document.querySelector(".pcv-form");
  if (bookForm) {
    bookForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
})();
