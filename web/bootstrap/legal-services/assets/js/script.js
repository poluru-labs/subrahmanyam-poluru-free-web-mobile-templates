(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var desktopQuery = window.matchMedia("(min-width: 992px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function isDesktop() {
    return desktopQuery.matches;
  }

  document.querySelectorAll(".mh-has-mega").forEach(function (item) {
    var toggle = item.querySelector("[data-bs-toggle='dropdown']");
    if (!toggle || typeof bootstrap === "undefined") return;

    var dropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
    var closeTimer;

    toggle.addEventListener("show.bs.dropdown", function () {
      document.querySelectorAll(".mh-has-mega [data-bs-toggle='dropdown']").forEach(function (other) {
        if (other === toggle) return;
        var instance = bootstrap.Dropdown.getInstance(other);
        if (instance) instance.hide();
      });
    });

    item.addEventListener("mouseenter", function () {
      if (!isDesktop()) return;
      window.clearTimeout(closeTimer);
      dropdown.show();
    });

    item.addEventListener("mouseleave", function () {
      if (!isDesktop()) return;
      closeTimer = window.setTimeout(function () {
        if (!item.contains(document.activeElement)) dropdown.hide();
      }, 140);
    });

    item.addEventListener("focusout", function (event) {
      if (!isDesktop()) return;
      if (!item.contains(event.relatedTarget)) dropdown.hide();
    });
  });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".mh-toggler i");

  if (collapseEl && togglerIcon) {
    collapseEl.addEventListener("shown.bs.collapse", function () {
      togglerIcon.classList.replace("bi-list", "bi-x-lg");
    });
    collapseEl.addEventListener("hidden.bs.collapse", function () {
      togglerIcon.classList.replace("bi-x-lg", "bi-list");
    });
  }

  document.querySelectorAll("#mainNav a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      document.querySelectorAll(".mh-has-mega [data-bs-toggle='dropdown']").forEach(function (toggle) {
        var instance = bootstrap.Dropdown.getInstance(toggle);
        if (instance) instance.hide();
      });
      if (!collapseEl || !collapseEl.classList.contains("show")) return;
      var collapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
      collapse.hide();
    });
  });

  var nav = document.querySelector(".mh-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var reveals = document.querySelectorAll(".mh-reveal");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = Number(el.getAttribute("data-count"));
    if (!Number.isFinite(target)) return;

    function render(value) {
      el.textContent = Math.round(value).toLocaleString("en-US");
    }

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      render(target);
      return;
    }

    var counted = false;
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || counted) return;
        counted = true;
        var start = performance.now();
        var duration = 900;
        function tick(now) {
          var progress = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - progress, 3);
          render(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.6 });
    countObserver.observe(el);
  });

  var form = document.getElementById("consult-form");
  var success = document.getElementById("consult-success");
  var resetBtn = document.getElementById("consult-reset");

  if (form && success) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        var invalid = form.querySelector(":invalid");
        if (invalid) invalid.focus();
        return;
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
    });
  }

  if (resetBtn && form && success) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      form.classList.remove("was-validated");
      form.hidden = false;
      success.hidden = true;
      var first = form.querySelector("input, select, textarea");
      if (first) first.focus();
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
