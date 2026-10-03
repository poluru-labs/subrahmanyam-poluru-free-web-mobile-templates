/**
 * Keyline — Car rental marketplace
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var storageKey = "keyline:favorites";
  var toastEl = document.getElementById("crToast");
  var toastTimer;

  function readFavorites() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  }

  function writeFavorites(list) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("crToastTitle");
    var bodyEl = document.getElementById("crToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("crNavToggle");
  var navPanel = document.getElementById("crNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll("#crNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("crHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var searchInput = document.getElementById("crSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".cr-card"));

  function applyFleetFilter() {
    var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var cat = card.getAttribute("data-category") || "";
      var catOk = filter === "all" || cat === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = catOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("crFleetCount");
    var empty = document.getElementById("crFleetEmpty");
    var label = visible + " vehicle" + (visible === 1 ? "" : "s");
    if (count) count.textContent = label;
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-cr-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-cr-filter") || "all";
      document.querySelectorAll("[data-cr-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("text-ink", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("text-ink", !active);
        b.classList.toggle("border-line", !active);
      });
      applyFleetFilter();
    });
  });

  searchInput?.addEventListener("input", applyFleetFilter);

  var favorites = readFavorites();
  document.querySelectorAll("[data-cr-fav]").forEach(function (btn) {
    var id = btn.getAttribute("data-cr-fav");
    if (favorites.includes(id)) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-heart-fill" aria-hidden="true"></i>';
    }
    btn.addEventListener("click", function () {
      var pressed = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
      btn.innerHTML = pressed
        ? '<i class="bi bi-heart-fill" aria-hidden="true"></i>'
        : '<i class="bi bi-heart" aria-hidden="true"></i>';
      if (pressed && !favorites.includes(id)) favorites.push(id);
      if (!pressed) favorites = favorites.filter(function (x) {
        return x !== id;
      });
      if (!writeFavorites(favorites)) {
        showToast("Saved this visit", "Browser storage unavailable.");
      } else {
        showToast(pressed ? "Saved" : "Removed", id + (pressed ? " added to favorites." : " removed from favorites."));
      }
    });
  });

  document.querySelectorAll("[data-cr-book]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-cr-book") || "Vehicle";
      showToast("Demo hold", name + " — checkout stays in this browser only.");
    });
  });

  var searchForm = document.getElementById("crSearchForm");
  searchForm?.addEventListener("submit", function (event) {
    event.preventDefault();
    var loc = document.getElementById("crPickup")?.value || "Austin";
    showToast("Dates noted", "Showing fleet near " + loc + ". Filter the list below.");
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("crContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Nothing was emailed to hosts.");
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
    document.querySelectorAll(".cr-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".cr-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFleetFilter();
})();
