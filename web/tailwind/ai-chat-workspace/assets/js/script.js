(function () {
  "use strict";

  var yearEl = document.getElementById("acw-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toggle = document.querySelector(".acw-nav-toggle");
  var nav = document.getElementById("acw-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var navLinks = document.querySelectorAll(".acw-nav-link[href^='#']");
  var sections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.length > 1) {
      var section = document.querySelector(id);
      if (section) {
        sections.push({ id: id.slice(1), el: section });
      }
    }
  });

  function setActiveNav() {
    var scrollY = window.scrollY + 120;
    var current = "home";

    sections.forEach(function (item) {
      if (item.el.offsetTop <= scrollY) {
        current = item.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      var match = href === "#" + current;
      link.classList.toggle("is-active", match);
    });
  }

  var form = document.querySelector(".acw-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (!btn) {
        return;
      }
      var original = btn.textContent;
      btn.textContent = "Request saved (demo)";
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2800);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();
})();
