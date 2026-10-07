/**
 * Workbay — Coworking space booking
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("cwToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("cwToastTitle");
    var bodyEl = document.getElementById("cwToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("cwNavToggle");
  var navPanel = document.getElementById("cwNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll("#cwNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("cwHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var searchInput = document.getElementById("cwSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".cw-space"));

  function applyFilter() {
    var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var type = card.getAttribute("data-type") || "";
      var typeOk = filter === "all" || type === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = typeOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("cwSpaceCount");
    var empty = document.getElementById("cwSpaceEmpty");
    if (count) count.textContent = visible + " space" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-cw-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-cw-filter") || "all";
      document.querySelectorAll("[data-cw-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("text-white", active);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("border-line", !active);
        b.classList.toggle("text-ink", !active);
      });
      applyFilter();
    });
  });

  searchInput?.addEventListener("input", applyFilter);

  var storageKey = "workbay:saved-spaces";
  function readSaved() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  }
  function writeSaved(list) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  var saved = readSaved();
  document.querySelectorAll("[data-cw-save]").forEach(function (btn) {
    var id = btn.getAttribute("data-cw-save");
    if (saved.includes(id)) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-bookmark-fill" aria-hidden="true"></i>';
    }
    btn.addEventListener("click", function () {
      var pressed = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
      btn.innerHTML = pressed
        ? '<i class="bi bi-bookmark-fill" aria-hidden="true"></i>'
        : '<i class="bi bi-bookmark" aria-hidden="true"></i>';
      if (pressed && !saved.includes(id)) saved.push(id);
      if (!pressed) saved = saved.filter(function (x) {
        return x !== id;
      });
      writeSaved(saved);
      showToast(pressed ? "Saved" : "Removed", id);
    });
  });

  document.querySelectorAll("[data-cw-book]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-cw-book") || "Space";
      showToast("Hold placed (demo)", name + " — no payment or calendar sync.");
    });
  });

  document.getElementById("cwBookForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var loc = document.getElementById("cwLocation")?.value || "Austin";
    showToast("Search ready", "Showing spaces in " + loc + ".");
    document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("cwContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Community team was not emailed.");
  });

  document.getElementById("cwTourForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Tour requested (demo)", "Nothing was sent to the front desk.");
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
    document.querySelectorAll(".cw-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".cw-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
