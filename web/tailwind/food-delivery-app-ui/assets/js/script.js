/**
 * PlateHarbor — Food delivery app UI
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("fdToast");
  var toastTimer;
  var cartKey = "plateharbor:cart-count";
  var favKey = "plateharbor:favorites";
  var cartCount = 0;
  var favorites = [];

  try {
    cartCount = parseInt(localStorage.getItem(cartKey) || "0", 10) || 0;
    favorites = JSON.parse(localStorage.getItem(favKey) || "[]") || [];
  } catch {
    cartCount = 0;
    favorites = [];
  }

  var cartBadge = document.getElementById("fdCartCount");
  function updateCartBadge() {
    if (cartBadge) cartBadge.textContent = String(cartCount);
  }
  updateCartBadge();

  function showToast(title, body) {
    var titleEl = document.getElementById("fdToastTitle");
    var bodyEl = document.getElementById("fdToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("fdNavToggle");
  var navPanel = document.getElementById("fdNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#fdNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      var icon = navToggle?.querySelector("i");
      if (icon) {
        icon.classList.add("bi-list");
        icon.classList.remove("bi-x-lg");
      }
    });
  });

  var header = document.getElementById("fdHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-fd-fav]").forEach(function (btn) {
    var id = btn.getAttribute("data-fd-fav") || "";
    if (favorites.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
      if (active && favorites.indexOf(id) < 0) favorites.push(id);
      if (!active) favorites = favorites.filter(function (x) {
        return x !== id;
      });
      try {
        localStorage.setItem(favKey, JSON.stringify(favorites));
      } catch {
        /* ignore */
      }
      showToast(active ? "Saved" : "Removed", active ? "Restaurant added to favorites (demo)." : "Removed from favorites.");
    });
  });

  var filter = "all";
  var searchInput = document.getElementById("fdSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".fd-restaurant"));

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
    var count = document.getElementById("fdResultCount");
    var empty = document.getElementById("fdEmpty");
    if (count) count.textContent = visible + " spot" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-fd-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-fd-filter") || "all";
      document.querySelectorAll("[data-fd-filter]").forEach(function (b) {
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

  document.querySelectorAll("[data-fd-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-fd-add") || "Meal";
      cartCount += 1;
      try {
        localStorage.setItem(cartKey, String(cartCount));
      } catch {
        /* ignore */
      }
      updateCartBadge();
      showToast("Added to cart", name + " — checkout is not connected.");
    });
  });

  document.getElementById("fdHeroForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var addr = document.getElementById("fdAddress")?.value || "";
    if (searchInput) searchInput.value = addr;
    applyFilter();
    document.getElementById("restaurants")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Delivery area set", addr ? "Showing restaurants near “" + addr.trim() + "” (demo)." : "Browse all kitchens below.");
  });

  document.getElementById("fdContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Support was not notified.");
  });

  document.getElementById("fdPartnerForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Partner request noted", "Demo signup for restaurant partners.");
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
    document.querySelectorAll(".fd-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".fd-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
