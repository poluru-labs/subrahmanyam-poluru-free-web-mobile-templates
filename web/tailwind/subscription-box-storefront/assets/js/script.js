/**
 * BoxHarbor — Subscription box storefront
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("sbToast");
  var toastTimer;
  var cartKey = "boxharbor:subs-count";
  var saveKey = "boxharbor:saved";
  var cartCount = 0;
  var saved = [];

  try {
    cartCount = parseInt(localStorage.getItem(cartKey) || "0", 10) || 0;
    saved = JSON.parse(localStorage.getItem(saveKey) || "[]") || [];
  } catch {
    cartCount = 0;
    saved = [];
  }

  var cartBadge = document.getElementById("sbCartCount");
  function updateCartBadge() {
    if (cartBadge) cartBadge.textContent = String(cartCount);
  }
  updateCartBadge();

  function showToast(title, body) {
    var titleEl = document.getElementById("sbToastTitle");
    var bodyEl = document.getElementById("sbToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("sbNavToggle");
  var navPanel = document.getElementById("sbNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#sbNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("sbHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var searchInput = document.getElementById("sbSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".sb-box"));

  function applyFilter() {
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
    var count = document.getElementById("sbResult");
    var empty = document.getElementById("sbEmpty");
    if (count) count.textContent = visible + " box" + (visible === 1 ? "" : "es");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-sb-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-sb-filter") || "all";
      document.querySelectorAll("[data-sb-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("text-white", active);
        b.classList.toggle("border-line", !active);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("text-muted", !active);
      });
      applyFilter();
    });
  });

  searchInput?.addEventListener("input", applyFilter);

  document.querySelectorAll("[data-sb-save]").forEach(function (btn) {
    var id = btn.getAttribute("data-sb-save") || "";
    if (saved.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-bookmark-fill"></i>' : '<i class="bi bi-bookmark"></i>';
      if (active && saved.indexOf(id) < 0) saved.push(id);
      if (!active) saved = saved.filter(function (x) {
        return x !== id;
      });
      try {
        localStorage.setItem(saveKey, JSON.stringify(saved));
      } catch {
        /* ignore */
      }
      showToast(active ? "Saved" : "Removed", "Watchlist updated in this browser.");
    });
  });

  document.querySelectorAll("[data-sb-subscribe]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var title = btn.getAttribute("data-sb-subscribe") || "Box";
      cartCount += 1;
      try {
        localStorage.setItem(cartKey, String(cartCount));
      } catch {
        /* ignore */
      }
      updateCartBadge();
      showToast("Added to cart", title + " — checkout is not connected.");
    });
  });

  document.getElementById("sbHeroSearch")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var q = document.getElementById("sbHeroQuery")?.value || "";
    if (searchInput) searchInput.value = q;
    applyFilter();
    document.getElementById("boxes")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Search applied", q ? 'Showing matches for "' + q.trim() + '".' : "Browse all boxes below.");
  });

  document.getElementById("sbCustomizeForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Preferences saved (demo)", "No account was created.");
  });

  document.getElementById("sbContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message sent (demo)", "No email was delivered.");
  });

  document.getElementById("sbGiftForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Gift note saved (demo)", "Gift subscriptions are UI-only here.");
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
    document.querySelectorAll(".sb-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".sb-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
