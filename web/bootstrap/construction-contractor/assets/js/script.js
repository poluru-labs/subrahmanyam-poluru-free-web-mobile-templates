/**
 * Keelframe — Construction contractor
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var shortlistKey = "keelframe:shortlist";
  var quotesKey = "keelframe:quotes";
  var toastEl = document.getElementById("kfToast");
  var toastTimer;
  var shortlist = [];
  var quotes = [];
  var activeFilter = "all";

  var projectTitles = {
    kitchen: "Riverside kitchen refresh",
    reception: "Mueller office reception",
    deck: "Cedar deck rebuild",
    addition: "Bungalow second story",
    storefront: "South Lamar storefront",
    patio: "Patio and pergola",
  };

  try {
    shortlist = JSON.parse(localStorage.getItem(shortlistKey) || "[]") || [];
  } catch {
    shortlist = [];
  }

  try {
    quotes = JSON.parse(localStorage.getItem(quotesKey) || "[]") || [];
  } catch {
    quotes = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("kfToastTitle");
    var bodyEl = document.getElementById("kfToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function writeShortlist() {
    try {
      localStorage.setItem(shortlistKey, JSON.stringify(shortlist));
      return true;
    } catch {
      return false;
    }
  }

  function writeQuotes() {
    try {
      localStorage.setItem(quotesKey, JSON.stringify(quotes));
      return true;
    } catch {
      return false;
    }
  }

  var nav = document.querySelector(".kf-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var toggler = document.querySelector(".kf-toggler");
  var togglerIcon = toggler ? toggler.querySelector("i") : null;
  if (collapseEl && togglerIcon) {
    collapseEl.addEventListener("shown.bs.collapse", function () {
      togglerIcon.classList.replace("bi-list", "bi-x-lg");
      toggler.setAttribute("aria-label", "Close menu");
    });
    collapseEl.addEventListener("hidden.bs.collapse", function () {
      togglerIcon.classList.replace("bi-x-lg", "bi-list");
      toggler.setAttribute("aria-label", "Open menu");
    });
  }

  document.querySelectorAll("#mainNav a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!collapseEl || !collapseEl.classList.contains("show")) return;
      if (typeof bootstrap === "undefined") return;
      bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
    });
  });

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
    document.querySelectorAll(".kf-reveal").forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll(".kf-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  function syncSaveButtons() {
    document.querySelectorAll(".kf-save").forEach(function (btn) {
      var id = btn.getAttribute("data-id");
      var saved = shortlist.indexOf(id) !== -1;
      btn.setAttribute("aria-pressed", saved ? "true" : "false");
      var icon = btn.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-bookmark-fill", saved);
        icon.classList.toggle("bi-bookmark", !saved);
      }
    });
  }

  function renderShortlistCount() {
    var countEl = document.getElementById("kfShortlistCount");
    if (countEl) countEl.textContent = String(shortlist.length);
  }

  function renderShortlistView() {
    var list = document.getElementById("kfShortlistView");
    if (!list) return;
    if (!shortlist.length) {
      list.innerHTML = '<li class="kf-empty">None yet. Bookmark a project above.</li>';
      return;
    }
    list.innerHTML = shortlist
      .map(function (id) {
        return (
          "<li>" +
          esc(projectTitles[id] || id) +
          "</li>"
        );
      })
      .join("");
  }

  function renderQuotes() {
    var list = document.getElementById("kfQuoteList");
    if (!list) return;
    if (!quotes.length) {
      list.innerHTML = '<li class="kf-empty">No quote requests yet.</li>';
      return;
    }
    list.innerHTML = quotes
      .slice()
      .reverse()
      .map(function (item, index) {
        var realIndex = quotes.length - 1 - index;
        return (
          '<li><div class="kf-quote-top"><strong>' +
          esc(item.name) +
          '</strong><button type="button" class="kf-linkish" data-remove-quote="' +
          realIndex +
          '">Remove</button></div><span>' +
          esc(item.typeLabel) +
          " · " +
          esc(item.timelineLabel) +
          (item.shortlist.length ? " · " + item.shortlist.length + " saved" : "") +
          "</span></li>"
        );
      })
      .join("");
  }

  function applyProjectFilters() {
    var query = (document.getElementById("kfProjectSearch")?.value || "").trim().toLowerCase();
    var cards = document.querySelectorAll(".kf-project");
    var visible = 0;
    cards.forEach(function (card) {
      var type = card.getAttribute("data-type") || "";
      var tags = (card.getAttribute("data-tags") || "").toLowerCase();
      var title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
      var matchFilter = activeFilter === "all" || type === activeFilter;
      var matchQuery = !query || tags.indexOf(query) !== -1 || title.indexOf(query) !== -1;
      var show = matchFilter && matchQuery;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var countEl = document.getElementById("kfProjectCount");
    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " project" : " projects");
    }
  }

  document.getElementById("kfProjectFilters")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".kf-chip");
    if (!btn) return;
    activeFilter = btn.getAttribute("data-filter") || "all";
    document.querySelectorAll("#kfProjectFilters .kf-chip").forEach(function (chip) {
      var active = chip === btn;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });
    applyProjectFilters();
  });

  document.getElementById("kfProjectSearch")?.addEventListener("input", applyProjectFilters);

  document.getElementById("kfProjectGrid")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".kf-save");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    if (!id) return;
    var idx = shortlist.indexOf(id);
    if (idx === -1) {
      shortlist.push(id);
      showToast("Shortlisted", projectTitles[id] || "Project saved on this device.");
    } else {
      shortlist.splice(idx, 1);
      showToast("Removed", "Project left the shortlist.");
    }
    writeShortlist();
    syncSaveButtons();
    renderShortlistCount();
    renderShortlistView();
  });

  document.getElementById("kfQuoteList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-remove-quote]");
    if (!btn) return;
    var index = Number(btn.getAttribute("data-remove-quote"));
    if (Number.isNaN(index)) return;
    quotes.splice(index, 1);
    writeQuotes();
    renderQuotes();
    showToast("Removed", "Demo quote deleted from this browser.");
  });

  var typeLabels = {
    residential: "Residential remodel",
    commercial: "Commercial build-out",
    outdoor: "Outdoor / exterior",
    other: "Other / not sure",
  };

  var timelineLabels = {
    "0-3": "Next 0–3 months",
    "3-6": "3–6 months",
    "6+": "6+ months",
  };

  document.getElementById("kfQuoteForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var name = form.querySelector("#kfQuoteName")?.value?.trim() || "";
    var email = form.querySelector("#kfQuoteEmail")?.value?.trim() || "";
    var type = form.querySelector("#kfQuoteType")?.value || "";
    var timeline = form.querySelector("#kfQuoteTimeline")?.value || "";
    if (!name || !email || !type || !timeline) return;
    quotes.push({
      name: name,
      email: email,
      type: type,
      typeLabel: typeLabels[type] || type,
      timeline: timeline,
      timelineLabel: timelineLabels[timeline] || timeline,
      message: form.querySelector("#kfQuoteMsg")?.value?.trim() || "",
      shortlist: shortlist.slice(),
      at: new Date().toISOString(),
    });
    writeQuotes();
    renderQuotes();
    form.reset();
    showToast("Quote saved", "Demo request stored locally with your shortlist.");
  });

  document.getElementById("kfContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Note saved", "Demo only — nothing was emailed.");
  });

  syncSaveButtons();
  renderShortlistCount();
  renderShortlistView();
  renderQuotes();
  applyProjectFilters();
})();
