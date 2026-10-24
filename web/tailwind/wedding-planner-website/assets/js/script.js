/**
 * Vowline — Wedding planner
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var savedKey = "vowline:saved";
  var inquiryKey = "vowline:inquiries";
  var toastEl = document.getElementById("vwToast");
  var toastTimer;
  var category = "all";
  var savedOnly = false;
  var saved = [];
  var inquiries = [];

  var celebrationTitles = {
    "wildflower-court": "Wildflower courtyard vow",
    "hill-country": "Hill country weekend",
    "ballroom-lights": "Ballroom under soft lights",
    "winter-garden": "Winter garden reception",
    "elopement-oaks": "Live oaks elopement",
    "supper-long": "Long table supper",
  };

  var seasonLabels = {
    spring: "Spring 2026",
    summer: "Summer 2025",
    fall: "Fall 2025",
    winter: "Winter 2025",
  };

  try {
    saved = JSON.parse(localStorage.getItem(savedKey) || "[]") || [];
  } catch {
    saved = [];
  }

  try {
    inquiries = JSON.parse(localStorage.getItem(inquiryKey) || "[]") || [];
  } catch {
    inquiries = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("vwToastTitle");
    var bodyEl = document.getElementById("vwToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function writeList(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  var navToggle = document.getElementById("vwNavToggle");
  var navPanel = document.getElementById("vwNavPanel");

  function setNavOpen(open) {
    navPanel?.classList.toggle("is-open", open);
    navToggle?.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    var icon = navToggle?.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  }

  navToggle?.addEventListener("click", function () {
    setNavOpen(!navPanel?.classList.contains("is-open"));
  });

  document.querySelectorAll("#vwNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  var header = document.getElementById("vwHeader");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 6;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("border-line", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".vw-reveal").forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll(".vw-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  function updateSavedCount() {
    document.querySelectorAll("[data-vw-saved-count]").forEach(function (el) {
      el.textContent = String(saved.length);
    });
  }

  function syncSaveButtons() {
    document.querySelectorAll(".vw-save").forEach(function (btn) {
      var id = btn.getAttribute("data-id");
      var on = saved.indexOf(id) !== -1;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      var icon = btn.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-heart-fill", on);
        icon.classList.toggle("bi-heart", !on);
      }
    });
  }

  var cards = Array.prototype.slice.call(document.querySelectorAll(".vw-celebration"));
  var searchInput = document.getElementById("vwSearch");
  var savedToggle = document.getElementById("vwSavedToggle");

  function applyFilters() {
    var query = (searchInput?.value || "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var id = card.getAttribute("data-id");
      var type = card.getAttribute("data-category") || "";
      var tags = (card.getAttribute("data-tags") || "").toLowerCase();
      var title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
      var matchCat = category === "all" || type === category;
      var matchQuery = !query || tags.indexOf(query) !== -1 || title.indexOf(query) !== -1;
      var matchSaved = !savedOnly || saved.indexOf(id) !== -1;
      var show = matchCat && matchQuery && matchSaved;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var countEl = document.getElementById("vwCelebrationCount");
    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " celebration" : " celebrations");
    }
  }

  document.getElementById("vwCelebrationFilters")?.addEventListener("click", function (event) {
    var chip = event.target.closest(".vw-chip");
    if (!chip) return;
    category = chip.getAttribute("data-filter") || "all";
    document.querySelectorAll("#vwCelebrationFilters .vw-chip").forEach(function (el) {
      var active = el === chip;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-pressed", active ? "true" : "false");
    });
    applyFilters();
  });

  searchInput?.addEventListener("input", applyFilters);

  savedToggle?.addEventListener("click", function () {
    savedOnly = !savedOnly;
    savedToggle.setAttribute("aria-pressed", savedOnly ? "true" : "false");
    applyFilters();
  });

  document.getElementById("vwCelebrationGrid")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".vw-save");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    if (!id) return;
    var idx = saved.indexOf(id);
    if (idx === -1) {
      saved.push(id);
      showToast("Saved", celebrationTitles[id] || "Look saved on this device.");
    } else {
      saved.splice(idx, 1);
      showToast("Removed", "Celebration left your saved list.");
    }
    writeList(savedKey, saved);
    updateSavedCount();
    syncSaveButtons();
    applyFilters();
  });

  function renderInquiries() {
    var list = document.getElementById("vwInquiryList");
    if (!list) return;
    if (!inquiries.length) {
      list.innerHTML =
        '<li class="rounded-xl border border-dashed border-line px-3 py-4 text-center text-muted">No inquiries yet.</li>';
      return;
    }
    list.innerHTML = inquiries
      .slice()
      .reverse()
      .map(function (item, index) {
        var realIndex = inquiries.length - 1 - index;
        return (
          '<li class="rounded-xl border border-line bg-brand-soft px-3 py-2"><div class="flex justify-between gap-2"><strong class="font-display text-sm text-ink">' +
          esc(item.name) +
          '</strong><button type="button" class="font-ui text-xs font-bold text-brand-ink vw-remove-inquiry" data-index="' +
          realIndex +
          '">Remove</button></div><span class="text-xs text-muted">' +
          esc(item.packageLabel) +
          " · " +
          esc(seasonLabels[item.season] || item.season) +
          "</span></li>"
        );
      })
      .join("");
  }

  document.getElementById("vwInquiryList")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".vw-remove-inquiry");
    if (!btn) return;
    var index = Number(btn.getAttribute("data-index"));
    if (Number.isNaN(index)) return;
    inquiries.splice(index, 1);
    writeList(inquiryKey, inquiries);
    renderInquiries();
    showToast("Removed", "Inquiry deleted from this browser.");
  });

  var packageLabels = {
    essential: "Essential coordination",
    full: "Full planning",
    destination: "Destination week",
  };

  document.getElementById("vwInquiryForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var name = form.querySelector("#vwInquiryName")?.value?.trim() || "";
    var email = form.querySelector("#vwInquiryEmail")?.value?.trim() || "";
    var pkg = form.querySelector("#vwInquiryPackage")?.value || "";
    var season = form.querySelector("#vwInquirySeason")?.value || "";
    if (!name || !email || !pkg || !season) return;
    inquiries.push({
      name: name,
      email: email,
      package: pkg,
      packageLabel: packageLabels[pkg] || pkg,
      season: season,
      notes: form.querySelector("#vwInquiryNotes")?.value?.trim() || "",
      saved: saved.slice(),
      at: new Date().toISOString(),
    });
    writeList(inquiryKey, inquiries);
    renderInquiries();
    form.reset();
    showToast("Inquiry saved", "Demo request stored locally.");
  });

  document.getElementById("vwContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Note saved", "Demo only — nothing was emailed.");
  });

  updateSavedCount();
  syncSaveButtons();
  renderInquiries();
  applyFilters();
})();
