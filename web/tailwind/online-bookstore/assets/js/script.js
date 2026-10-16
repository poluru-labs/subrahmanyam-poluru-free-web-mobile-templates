/**
 * BookHarbor — Online bookstore
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("bkToast");
  var toastTimer;
  var cartKey = "bookharbor:cart-count";
  var wishKey = "bookharbor:wishlist";
  var cartCount = 0;
  var wishlist = [];

  try {
    cartCount = parseInt(localStorage.getItem(cartKey) || "0", 10) || 0;
    wishlist = JSON.parse(localStorage.getItem(wishKey) || "[]") || [];
  } catch {
    cartCount = 0;
    wishlist = [];
  }

  var cartBadge = document.getElementById("bkCartCount");
  function updateCartBadge() {
    if (cartBadge) cartBadge.textContent = String(cartCount);
  }
  updateCartBadge();

  function showToast(title, body) {
    var titleEl = document.getElementById("bkToastTitle");
    var bodyEl = document.getElementById("bkToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("bkNavToggle");
  var navPanel = document.getElementById("bkNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#bkNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("bkHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var searchInput = document.getElementById("bkSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".bk-book"));

  function applyFilter() {
    var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var genre = card.getAttribute("data-genre") || "";
      var genreOk = filter === "all" || genre === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = genreOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("bkResult");
    var empty = document.getElementById("bkEmpty");
    if (count) count.textContent = visible + " title" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-bk-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-bk-filter") || "all";
      document.querySelectorAll("[data-bk-filter]").forEach(function (b) {
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

  document.querySelectorAll("[data-bk-wish]").forEach(function (btn) {
    var id = btn.getAttribute("data-bk-wish") || "";
    if (wishlist.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-bookmark-fill"></i>' : '<i class="bi bi-bookmark"></i>';
      if (active && wishlist.indexOf(id) < 0) wishlist.push(id);
      if (!active) wishlist = wishlist.filter(function (x) {
        return x !== id;
      });
      try {
        localStorage.setItem(wishKey, JSON.stringify(wishlist));
      } catch {
        /* ignore */
      }
      showToast(active ? "Saved" : "Removed", "Wishlist updated in this browser.");
    });
  });

  document.querySelectorAll("[data-bk-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var title = btn.getAttribute("data-bk-add") || "Book";
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

  document.getElementById("bkHeroSearch")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var q = document.getElementById("bkHeroQuery")?.value || "";
    if (searchInput) searchInput.value = q;
    applyFilter();
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Search applied", q ? 'Showing matches for "' + q.trim() + '".' : "Browse all titles below.");
  });

  document.getElementById("bkContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only.");
  });

  document.getElementById("bkNewsletterForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Subscribed (demo)", "No email was sent.");
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
    document.querySelectorAll(".bk-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".bk-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
