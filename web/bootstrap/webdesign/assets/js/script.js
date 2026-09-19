(function () {
  "use strict";

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toastEl = document.getElementById("ftlToast");
  var toastTitle = document.getElementById("ftlToastTitle");
  var toastBody = document.getElementById("ftlToastBody");
  var toast =
    toastEl && typeof bootstrap !== "undefined"
      ? new bootstrap.Toast(toastEl, { delay: 3500 })
      : null;

  function showToast(title, message) {
    if (!toast) {
      return;
    }
    toastTitle.textContent = title;
    toastBody.textContent = message;
    toast.show();
  }

  var navCollapseEl = document.getElementById("navbarNav");
  var navCollapse =
    navCollapseEl && typeof bootstrap !== "undefined"
      ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
      : null;

  document.querySelectorAll("#navbarNav .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse && window.matchMedia("(max-width: 991.98px)").matches) {
        navCollapse.hide();
      }
    });
  });

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-nav .nav-link[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActiveNav() {
    var offset = 120;
    var current = sections[0];
    sections.forEach(function (section) {
      if (window.scrollY + offset >= section.offsetTop) {
        current = section;
      }
    });
    navLinks.forEach(function (link) {
      var isActive = current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("active", Boolean(isActive));
    });
  }

  var backTop = document.getElementById("ftlBackTop");
  function updateBackTop() {
    if (!backTop) {
      return;
    }
    backTop.classList.toggle("is-visible", window.scrollY > 400);
  }

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", function () {
    setActiveNav();
    updateBackTop();
  });
  setActiveNav();
  updateBackTop();

  var counters = document.querySelectorAll(".ftl-stat-number[data-count]");
  var countersStarted = false;

  function animateCounters() {
    counters.forEach(function (el) {
      var target = Number(el.getAttribute("data-count")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1200;
      var start = performance.now();

      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    });
  }

  if ("IntersectionObserver" in window && counters.length) {
    var statsObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    var statsSection = document.getElementById("stats");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  var filterButtons = document.querySelectorAll(".ftl-filter-btn");
  var portfolioItems = document.querySelectorAll(".ftl-portfolio-item");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      filterButtons.forEach(function (btn) {
        var isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      portfolioItems.forEach(function (item) {
        var match = filter === "all" || item.getAttribute("data-category") === filter;
        item.classList.toggle("d-none", !match);
      });
    });
  });

  function bindDemoForm(form, onValid) {
    if (!form) {
      return;
    }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      onValid();
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  bindDemoForm(document.getElementById("contactForm"), function () {
    showToast("Message sent", "Thanks — we will get back to you shortly.");
  });

  bindDemoForm(document.getElementById("newsletterForm"), function () {
    showToast("Subscribed", "You are on the list for monthly design tips.");
  });
})();
