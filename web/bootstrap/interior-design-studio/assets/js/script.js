(function () {
  "use strict";

  var yearEl = document.getElementById("ids-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navLinks = document.querySelectorAll(".ids-nav-link[href^='#']");
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
    var scrollY = window.scrollY + 100;
    var current = "home";

    sections.forEach(function (item) {
      if (item.el.offsetTop <= scrollY) {
        current = item.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      var match = href === "#" + current || (current === "home" && href === "#home");
      link.classList.toggle("active", match);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var collapse = document.getElementById("idsNav");
      if (collapse && collapse.classList.contains("show")) {
        var toggler = document.querySelector(".ids-nav-toggle");
        if (toggler && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        }
      }
    });
  });

  var contactForm = document.querySelector(".ids-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var btn = contactForm.querySelector('[type="submit"]');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = "Message sent — we’ll be in touch";
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
          contactForm.reset();
        }, 3200);
      }
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();
})();
