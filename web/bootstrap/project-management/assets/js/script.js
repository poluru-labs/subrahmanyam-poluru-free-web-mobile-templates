/**
 * PlanHarbor — Project management
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("pmToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("pmToastTitle");
    var bodyEl = document.getElementById("pmToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var nav = document.querySelector(".pm-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".pm-toggler i");
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
      if (!collapseEl || !collapseEl.classList.contains("show")) return;
      if (typeof bootstrap === "undefined") return;
      bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
    });
  });

  var filter = "all";
  var search = document.getElementById("pmSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".pm-task"));

  function applyFilter() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var proj = card.getAttribute("data-project") || "";
      var projOk = filter === "all" || proj === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = projOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var result = document.getElementById("pmResult");
    if (result) result.textContent = visible + " task" + (visible === 1 ? "" : "s") + " visible";
    updateColumnCounts();
  }

  function updateColumnCounts() {
    document.querySelectorAll("[data-pm-column]").forEach(function (col) {
      var stage = col.getAttribute("data-pm-column");
      var count = col.querySelectorAll(".pm-task:not(.is-hidden)").length;
      var badge = col.querySelector("[data-pm-count]");
      if (badge) badge.textContent = String(count);
    });
  }

  document.querySelectorAll("[data-pm-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-pm-filter") || "all";
      document.querySelectorAll("[data-pm-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("is-active", active);
      });
      applyFilter();
    });
  });

  search?.addEventListener("input", applyFilter);

  document.querySelectorAll("[data-pm-advance]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".pm-task");
      var col = card?.closest("[data-pm-column]");
      if (!card || !col) return;
      var next = col.nextElementSibling;
      while (next && !next.hasAttribute("data-pm-column")) {
        next = next.nextElementSibling;
      }
      if (!next || !next.hasAttribute("data-pm-column")) {
        showToast("At final stage", "This task is already in Done for the demo.");
        btn.disabled = true;
        return;
      }
      next.querySelector(".pm-kanban-cards")?.appendChild(card);
      showToast("Task moved", card.querySelector(".pm-task-title")?.textContent + " → " + next.getAttribute("data-pm-column") + ".");
      updateColumnCounts();
      applyFilter();
    });
  });

  document.getElementById("pmContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Sales was not notified.");
  });

  document.getElementById("pmDemoForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Workspace created", "Demo signup — no account was provisioned.");
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".pm-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".pm-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
