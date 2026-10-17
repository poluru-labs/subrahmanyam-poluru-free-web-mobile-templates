/**
 * TrainHarbor — Personal trainer booking
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("ptToast");
  var toastTimer;
  var bookingsKey = "trainharbor:bookings";
  var favKey = "trainharbor:favorites";
  var bookingCount = 0;
  var favorites = [];
  var selectedSlot = "";

  try {
    bookingCount = JSON.parse(localStorage.getItem(bookingsKey) || "[]").length;
    favorites = JSON.parse(localStorage.getItem(favKey) || "[]") || [];
  } catch {
    bookingCount = 0;
    favorites = [];
  }

  var badge = document.getElementById("ptBookingCount");
  function updateBadge() {
    if (badge) badge.textContent = String(bookingCount);
  }
  updateBadge();

  function showToast(title, body) {
    var titleEl = document.getElementById("ptToastTitle");
    var bodyEl = document.getElementById("ptToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("ptNavToggle");
  var navPanel = document.getElementById("ptNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#ptNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("ptHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var cards = Array.prototype.slice.call(document.querySelectorAll(".pt-trainer"));

  function applyFilter() {
    var visible = 0;
    cards.forEach(function (card) {
      var spec = card.getAttribute("data-specialty") || "";
      var show = filter === "all" || spec === filter;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("ptTrainerCount");
    if (count) count.textContent = visible + " coach" + (visible === 1 ? "" : "es");
  }

  document.querySelectorAll("[data-pt-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-pt-filter") || "all";
      document.querySelectorAll("[data-pt-filter]").forEach(function (b) {
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

  document.querySelectorAll("[data-pt-fav]").forEach(function (btn) {
    var id = btn.getAttribute("data-pt-fav") || "";
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
      showToast(active ? "Saved coach" : "Removed", "Favorites stored in this browser only.");
    });
  });

  var trainerSelect = document.getElementById("ptTrainerSelect");
  document.querySelectorAll("[data-pt-book]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-pt-book") || "";
      var name = btn.getAttribute("data-pt-name") || "Coach";
      if (trainerSelect) trainerSelect.value = id;
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Coach selected", name + " — pick a time slot below.");
    });
  });

  document.querySelectorAll("[data-pt-slot]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectedSlot = btn.getAttribute("data-pt-slot") || "";
      document.querySelectorAll("[data-pt-slot]").forEach(function (b) {
        b.classList.remove("is-selected");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-selected");
      btn.setAttribute("aria-pressed", "true");
    });
  });

  document.getElementById("ptBookingForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var trainerOpt = trainerSelect?.selectedOptions[0];
    var trainerName = trainerOpt ? trainerOpt.textContent.trim() : "Coach";
    if (!selectedSlot) {
      showToast("Pick a time", "Select an available slot before confirming.");
      return;
    }
    var entry = {
      trainer: trainerSelect?.value || "",
      trainerName: trainerName,
      slot: selectedSlot,
      name: form.querySelector('[name="name"]')?.value || "",
      at: new Date().toISOString(),
    };
    var list = [];
    try {
      list = JSON.parse(localStorage.getItem(bookingsKey) || "[]");
    } catch {
      list = [];
    }
    list.push(entry);
    try {
      localStorage.setItem(bookingsKey, JSON.stringify(list));
    } catch {
      /* ignore */
    }
    bookingCount = list.length;
    updateBadge();
    form.reset();
    selectedSlot = "";
    document.querySelectorAll("[data-pt-slot]").forEach(function (b) {
      b.classList.remove("is-selected");
      b.setAttribute("aria-pressed", "false");
    });
    showToast("Session booked (demo)", trainerName + " · " + entry.slot + " — no calendar sync.");
  });

  document.getElementById("ptContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only — no email sent.");
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
    document.querySelectorAll(".pt-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".pt-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
