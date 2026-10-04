/**
 * Harbor Ledger — News magazine
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("nmToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("nmToastTitle");
    var bodyEl = document.getElementById("nmToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var nav = document.querySelector(".nm-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".nm-toggler i");
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
  var search = document.getElementById("nmSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".nm-article"));

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
    var result = document.getElementById("nmResult");
    if (result) result.textContent = visible + " stor" + (visible === 1 ? "y" : "ies");
  }

  document.querySelectorAll("[data-nm-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-nm-filter") || "all";
      document.querySelectorAll("[data-nm-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("is-active", active);
      });
      applyFilter();
    });
  });

  search?.addEventListener("input", applyFilter);

  var stories = {
    "grid-battery": {
      title: "Grid-scale battery deal signed in Texas",
      byline: "Meera Poluru · Oct 4 · 6 min read",
      body:
        "Harbor North Utilities agreed to a 400 MWh storage contract with Poluru Energy, anchoring overnight wind from the Gulf corridor. Regulators cleared the tariff rider last week; construction starts in Q1 on a site outside Austin.",
    },
    "ai-editor": {
      title: "Newsrooms pilot AI-assisted editing desks",
      byline: "Ravi Poluru · Oct 3 · 5 min read",
      body:
        "Three Harbor Media titles are testing an internal tool that suggests headlines and pull quotes—human editors approve every publish. The pilot does not auto-post to social feeds.",
    },
    "chennai-metro": {
      title: "Chennai metro extension opens two stations early",
      byline: "Ishaan Poluru · Oct 3 · 4 min read",
      body:
        "Ridership models predicted a soft launch, but weekend crowds exceeded forecasts. City officials credited synchronized bus feeder routes.",
    },
    "design-systems": {
      title: "Why design systems belong in city portals",
      byline: "Kavya Poluru · Oct 2 · 7 min read",
      body:
        "A consistent component library cut permit form abandonment by 18% in a Hyderabad pilot. The report recommends shared tokens across departments.",
    },
    "opinion-climate": {
      title: "Opinion: Flood maps should update quarterly",
      byline: "James Poluru · Oct 2 · 3 min read",
      body:
        "Static FEMA layers lag behind new construction. Harbor Ledger argues for open data feeds and citizen reporting channels tied to GIS teams.",
    },
    "culture-jazz": {
      title: "Austin jazz week returns to Rainey Street",
      byline: "Anika Poluru · Oct 1 · 4 min read",
      body:
        "Forty venues participate in the revived festival. Organizers capped outdoor stages at 85 dB after neighborhood feedback.",
    },
  };

  function openStory(id) {
    var data = stories[id];
    if (!data) return;
    var panel = document.getElementById("nmReader");
    document.getElementById("nmReaderTitle").textContent = data.title;
    document.getElementById("nmReaderByline").textContent = data.byline;
    document.getElementById("nmReaderBody").textContent = data.body;
    panel?.classList.add("is-open");
    panel?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.querySelectorAll("[data-nm-read]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openStory(btn.getAttribute("data-nm-read"));
    });
  });

  document.getElementById("nmReaderClose")?.addEventListener("click", function () {
    document.getElementById("nmReader")?.classList.remove("is-open");
  });

  document.getElementById("nmNewsletterForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Subscribed (demo)", "No email was sent. This is a sample signup.");
  });

  document.getElementById("nmContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Tip received", "Demo only. Nothing was routed to the newsroom.");
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
    document.querySelectorAll(".nm-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".nm-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
