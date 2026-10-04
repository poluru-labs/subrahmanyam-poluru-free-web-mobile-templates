/**
 * Stackforge — Coding bootcamp landing
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("cbToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("cbToastTitle");
    var bodyEl = document.getElementById("cbToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("cbNavToggle");
  var navPanel = document.getElementById("cbNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll("#cbNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("cbHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var searchInput = document.getElementById("cbSearch");
  var programs = Array.prototype.slice.call(document.querySelectorAll(".cb-program"));

  function applyProgramFilter() {
    var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    programs.forEach(function (card) {
      var level = card.getAttribute("data-level") || "";
      var levelOk = filter === "all" || level === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = levelOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("cbProgramCount");
    var empty = document.getElementById("cbProgramEmpty");
    if (count) count.textContent = visible + " program" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-cb-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-cb-filter") || "all";
      document.querySelectorAll("[data-cb-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("text-ink", true);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("border-line", !active);
      });
      applyProgramFilter();
    });
  });

  searchInput?.addEventListener("input", applyProgramFilter);

  var storageKey = "stackforge:saved-programs";
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
  document.querySelectorAll("[data-cb-save]").forEach(function (btn) {
    var id = btn.getAttribute("data-cb-save");
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
      showToast(pressed ? "Saved program" : "Removed", id);
    });
  });

  var syllabus = {
    "web-foundations": ["HTML semantics & accessibility", "CSS layout (flex + grid)", "JavaScript DOM basics", "Deploy a static portfolio"],
    "full-stack": ["Node APIs & validation", "PostgreSQL & migrations", "React routing", "Capstone: team marketplace"],
    "design-dev": ["Figma handoff checklist", "Design tokens in CSS", "Component library in React", "Ship a landing page"],
    "data-python": ["Python for data wrangling", "SQL joins & aggregates", "Notebooks & storytelling", "Dashboard mini-project"],
    "career-lab": ["Resume & portfolio audit", "Mock technical interviews", "Negotiation scripts", "Offer comparison worksheet"],
    "evening-js": ["Evening JS fundamentals", "Async & fetch", "Mini apps each week", "Final: API-powered UI"],
  };

  document.querySelectorAll("[data-cb-syllabus]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-cb-syllabus");
      var title = btn.getAttribute("data-cb-title") || "Program";
      var list = syllabus[key] || syllabus["web-foundations"];
      var panel = document.getElementById("cbSyllabusPanel");
      var titleEl = document.getElementById("cbSyllabusTitle");
      var bodyEl = document.getElementById("cbSyllabusBody");
      if (titleEl) titleEl.textContent = title;
      if (bodyEl) {
        bodyEl.innerHTML =
          "<ol class='mt-2 list-decimal space-y-2 pl-5 text-sm text-muted'>" +
          list.map(function (item) {
            return "<li>" + item + "</li>";
          }).join("") +
          "</ol>";
      }
      panel?.classList.add("is-open");
      panel?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  document.getElementById("cbSyllabusClose")?.addEventListener("click", function () {
    document.getElementById("cbSyllabusPanel")?.classList.remove("is-open");
  });

  document.getElementById("cbApplyForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Application saved", "Demo only. Nothing was sent to admissions.");
  });

  document.getElementById("cbContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Advisors were not emailed.");
  });

  document.querySelectorAll("[data-cb-week]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-cb-week]").forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("border-line", !active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      var label = document.getElementById("cbWeekLabel");
      var detail = document.getElementById("cbWeekDetail");
      if (label) label.textContent = btn.getAttribute("data-cb-week");
      if (detail) detail.textContent = btn.getAttribute("data-cb-detail") || "";
    });
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
    document.querySelectorAll(".cb-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".cb-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyProgramFilter();
})();
