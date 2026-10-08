/**
 * StreakHarbor — Habit tracker app
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var storageKey = "streakharbor:habits";
  var journalKey = "streakharbor:journal";
  var toastEl = document.getElementById("htToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("htToastTitle");
    var bodyEl = document.getElementById("htToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function readHabits() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}") || {};
    } catch {
      return {};
    }
  }

  function writeHabits(data) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  var navToggle = document.getElementById("htNavToggle");
  var navPanel = document.getElementById("htNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#htNavPanel a[href^='#']").forEach(function (link) {
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

  var header = document.getElementById("htHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var habitState = readHabits();
  var dayButtons = Array.prototype.slice.call(document.querySelectorAll("[data-ht-day]"));

  function syncButton(btn, on) {
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.textContent = on ? "\u2713" : "\u00b7";
  }

  dayButtons.forEach(function (btn) {
    var key = btn.getAttribute("data-ht-day") || "";
    if (habitState[key]) syncButton(btn, true);
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      syncButton(btn, active);
      if (active) habitState[key] = true;
      else delete habitState[key];
      if (!writeHabits(habitState)) {
        showToast("Saved for this visit", "Browser storage is unavailable.");
      }
      updateStats();
    });
  });

  function updateStats() {
    var total = dayButtons.length;
    var done = dayButtons.filter(function (b) {
      return b.getAttribute("aria-pressed") === "true";
    }).length;
    var pct = total ? Math.round((done / total) * 100) : 0;

    var completedEl = document.getElementById("htCompleted");
    var pctEl = document.getElementById("htWeekPct");
    var bar = document.getElementById("htWeekBar");
    if (completedEl) completedEl.textContent = done + " / " + total;
    if (pctEl) pctEl.textContent = pct + "%";
    if (bar) bar.style.setProperty("--w", pct + "%");
  }

  var journal = document.getElementById("htJournal");
  if (journal) {
    try {
      journal.value = localStorage.getItem(journalKey) || "";
    } catch {
      /* ignore */
    }
  }

  document.getElementById("htJournalSave")?.addEventListener("click", function () {
    if (!journal) return;
    try {
      localStorage.setItem(journalKey, journal.value);
      showToast("Reflection saved", "Stored in this browser only.");
    } catch {
      showToast("Not saved", "Browser storage is unavailable.");
    }
  });

  document.getElementById("htContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Team was not notified.");
  });

  document.getElementById("htSignupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Welcome (demo)", "No account was created.");
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
    document.querySelectorAll(".ht-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".ht-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  updateStats();
})();
