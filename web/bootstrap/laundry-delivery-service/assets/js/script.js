(function () {
  "use strict";

  var yearEl = document.getElementById("ldsYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var header = document.querySelector(".lds-header");
  var navbar = document.querySelector(".lds-navbar");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 8) {
      navbar.classList.add("lds-navbar--scrolled");
    } else {
      navbar.classList.remove("lds-navbar--scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navCollapse = document.getElementById("ldsNav");
  if (navCollapse && header) {
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

  var scheduleForm = document.querySelector(".lds-form");
  if (scheduleForm) {
    scheduleForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
})();
