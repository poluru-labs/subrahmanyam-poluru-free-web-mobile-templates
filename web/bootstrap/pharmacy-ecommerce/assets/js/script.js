/**
 * RxHarbor — Pharmacy e-commerce
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("phToast");
  var toastTimer;
  var cartKey = "rxharbor:cart-count";
  var cartCount = 0;

  try {
    cartCount = parseInt(localStorage.getItem(cartKey) || "0", 10) || 0;
  } catch {
    cartCount = 0;
  }

  var cartBadge = document.getElementById("phCartCount");
  function updateCartBadge() {
    if (cartBadge) cartBadge.textContent = String(cartCount);
  }
  updateCartBadge();

  function showToast(title, body) {
    var titleEl = document.getElementById("phToastTitle");
    var bodyEl = document.getElementById("phToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var nav = document.querySelector(".ph-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".ph-toggler i");
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
  var search = document.getElementById("phSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".ph-product"));

  function applyFilter() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
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
    var result = document.getElementById("phResult");
    var empty = document.getElementById("phEmpty");
    if (result) result.textContent = visible + " product" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-ph-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-ph-filter") || "all";
      document.querySelectorAll("[data-ph-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("is-active", active);
      });
      applyFilter();
    });
  });

  search?.addEventListener("input", applyFilter);

  document.querySelectorAll("[data-ph-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-ph-add") || "Item";
      cartCount += 1;
      try {
        localStorage.setItem(cartKey, String(cartCount));
      } catch {
        /* ignore */
      }
      updateCartBadge();
      showToast("Added to cart (demo)", name + " — checkout is not connected.");
    });
  });

  document.getElementById("phHeroSearch")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var q = document.getElementById("phHeroQuery")?.value || "";
    if (search) search.value = q;
    applyFilter();
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Search applied", q ? 'Showing matches for "' + q.trim() + '".' : "Browse all products below.");
  });

  document.getElementById("phRxForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Rx noted (demo)", "Prescription upload is not sent to a pharmacist in this template.");
  });

  document.getElementById("phContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Pharmacy staff were not notified.");
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
    document.querySelectorAll(".ph-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".ph-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
