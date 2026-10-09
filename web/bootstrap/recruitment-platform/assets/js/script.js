/**
 * HireHarbor — Recruitment platform
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("rpToast");
  var toastTimer;
  var savedKey = "hireharbor:saved-jobs";
  var saved = [];

  try {
    saved = JSON.parse(localStorage.getItem(savedKey) || "[]") || [];
  } catch {
    saved = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("rpToastTitle");
    var bodyEl = document.getElementById("rpToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var nav = document.querySelector(".rp-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".rp-toggler i");
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
  var search = document.getElementById("rpSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".rp-job"));

  function applyFilter() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var dept = card.getAttribute("data-dept") || "";
      var deptOk = filter === "all" || dept === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = deptOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var result = document.getElementById("rpResult");
    var empty = document.getElementById("rpEmpty");
    if (result) result.textContent = visible + " role" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-rp-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-rp-filter") || "all";
      document.querySelectorAll("[data-rp-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("is-active", active);
      });
      applyFilter();
    });
  });

  search?.addEventListener("input", applyFilter);

  document.querySelectorAll("[data-rp-save]").forEach(function (btn) {
    var id = btn.getAttribute("data-rp-save") || "";
    if (saved.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-bookmark-fill"></i> Saved';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active
        ? '<i class="bi bi-bookmark-fill"></i> Saved'
        : '<i class="bi bi-bookmark"></i> Save';
      if (active && saved.indexOf(id) < 0) saved.push(id);
      if (!active) saved = saved.filter(function (x) {
        return x !== id;
      });
      try {
        localStorage.setItem(savedKey, JSON.stringify(saved));
      } catch {
        /* ignore */
      }
      showToast(active ? "Job saved" : "Removed", "Bookmarks are stored in this browser only.");
    });
  });

  document.querySelectorAll("[data-rp-apply]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var title = btn.getAttribute("data-rp-apply") || "Role";
      showToast("Application started (demo)", title + " — no data was sent to an employer.");
    });
  });

  document.getElementById("rpHeroSearch")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var q = document.getElementById("rpHeroQuery")?.value || "";
    if (search) search.value = q;
    applyFilter();
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Search applied", q ? 'Showing matches for "' + q.trim() + '".' : "Browse all open roles below.");
  });

  document.getElementById("rpContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Sales was not notified.");
  });

  document.getElementById("rpEmployerForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Request received (demo)", "Employer signup is not connected.");
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
    document.querySelectorAll(".rp-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".rp-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
