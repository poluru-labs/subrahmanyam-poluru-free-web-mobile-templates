/**
 * Signaldesk — Customer feedback board
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var savedKey = "signaldesk:saved";
  var submitKey = "signaldesk:submissions";
  var votesKey = "signaldesk:votes";
  var toastEl = document.getElementById("fbToast");
  var toastTimer;
  var category = "all";
  var savedOnly = false;
  var saved = [];
  var submissions = [];
  var votes = {};

  try {
    saved = JSON.parse(localStorage.getItem(savedKey) || "[]") || [];
    submissions = JSON.parse(localStorage.getItem(submitKey) || "[]") || [];
    votes = JSON.parse(localStorage.getItem(votesKey) || "{}") || {};
  } catch {
    saved = [];
    submissions = [];
    votes = {};
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("fbToastTitle");
    var bodyEl = document.getElementById("fbToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
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

  var navToggle = document.getElementById("fbNavToggle");
  var navPanel = document.getElementById("fbNavPanel");

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

  document.querySelectorAll("#fbNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  var header = document.getElementById("fbHeader");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 6;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("border-line", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function updateSavedCount() {
    document.querySelectorAll("[data-fb-saved-count]").forEach(function (el) {
      el.textContent = String(saved.length);
    });
  }

  function voteTotal(card) {
    var id = card.getAttribute("data-fb-id") || "";
    var base = Number(card.getAttribute("data-base-votes") || 0);
    var extra = Number(votes[id] || 0);
    return base + extra;
  }

  function renderVoteLabels() {
    document.querySelectorAll(".fb-card").forEach(function (card) {
      var label = card.querySelector("[data-fb-vote-count]");
      if (label) label.textContent = String(voteTotal(card));
      var btn = card.querySelector("[data-fb-vote]");
      var id = card.getAttribute("data-fb-id") || "";
      if (btn && votes[id] > 0) {
        btn.setAttribute("aria-pressed", "true");
        btn.classList.add("bg-brand-soft", "border-brand-ink");
      }
    });
  }

  updateSavedCount();
  renderVoteLabels();

  var cards = Array.prototype.slice.call(document.querySelectorAll(".fb-card"));
  var searchInput = document.getElementById("fbSearch");
  var savedToggle = document.getElementById("fbSavedToggle");

  function applyFilter() {
    var query = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var cat = card.getAttribute("data-category") || "";
      var id = card.getAttribute("data-fb-id") || "";
      var categoryOk = category === "all" || cat === category;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !query || hay.toLowerCase().indexOf(query) !== -1;
      var savedOk = !savedOnly || saved.indexOf(id) >= 0;
      var show = categoryOk && queryOk && savedOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("fbItemCount");
    var empty = document.getElementById("fbEmpty");
    if (count) count.textContent = visible + " idea" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-fb-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      category = btn.getAttribute("data-fb-filter") || "all";
      document.querySelectorAll("[data-fb-filter]").forEach(function (b) {
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

  savedToggle?.addEventListener("click", function () {
    savedOnly = !savedOnly;
    savedToggle.setAttribute("aria-pressed", savedOnly ? "true" : "false");
    savedToggle.classList.toggle("bg-brand-soft", savedOnly);
    savedToggle.classList.toggle("border-brand-ink", savedOnly);
    applyFilter();
    showToast(savedOnly ? "Saved only" : "All ideas", savedOnly ? "Showing bookmarked feedback." : "Full board is visible.");
  });

  document.querySelectorAll("[data-fb-save]").forEach(function (btn) {
    var id = btn.getAttribute("data-fb-save") || "";
    if (saved.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-bookmark-fill"></i>' : '<i class="bi bi-bookmark"></i>';
      if (active && saved.indexOf(id) < 0) saved.push(id);
      if (!active) {
        saved = saved.filter(function (x) {
          return x !== id;
        });
      }
      writeJson(savedKey, saved);
      updateSavedCount();
      if (savedOnly) applyFilter();
      showToast(active ? "Saved" : "Removed", active ? "Idea bookmarked in this browser." : "Bookmark removed.");
    });
  });

  document.querySelectorAll("[data-fb-vote]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-fb-vote") || "";
      if (!id) return;
      if (btn.getAttribute("aria-pressed") === "true") {
        showToast("Already counted", "Your vote for this idea is already saved here.");
        return;
      }
      votes[id] = (votes[id] || 0) + 1;
      writeJson(votesKey, votes);
      btn.setAttribute("aria-pressed", "true");
      btn.classList.add("bg-brand-soft", "border-brand-ink");
      var card = btn.closest(".fb-card");
      if (card) {
        var label = card.querySelector("[data-fb-vote-count]");
        if (label) label.textContent = String(voteTotal(card));
      }
      showToast("Vote added", "Demo tally updated in this browser.");
    });
  });

  document.querySelectorAll("[data-fb-similar]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-fb-similar") || "";
      var select = document.getElementById("fbSubmitRelated");
      if (select) select.value = id;
      document.getElementById("submit")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Related idea", "Form prefilled — add your own details before saving.");
    });
  });

  function renderSubmissions() {
    var list = document.getElementById("fbSubmitList");
    var empty = document.getElementById("fbSubmitEmpty");
    if (!list) return;
    if (!submissions.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = submissions
      .slice()
      .reverse()
      .map(function (item) {
        return (
          '<li class="rounded-xl border border-line bg-white p-4">' +
          '<div class="flex flex-wrap items-start justify-between gap-2">' +
          '<strong class="font-display">' +
          esc(item.title) +
          "</strong>" +
          '<button class="font-ui text-sm font-bold text-brand-ink hover:text-ink" type="button" data-fb-remove="' +
          esc(item.id) +
          '">Remove</button></div>' +
          '<p class="mt-2 text-sm text-muted">' +
          esc(item.type) +
          " · " +
          esc(item.name) +
          "</p>" +
          '<p class="mt-2 text-sm text-ink">' +
          esc(item.detail) +
          "</p></li>"
        );
      })
      .join("");
  }

  document.getElementById("fbSubmitList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-fb-remove]");
    if (!btn) return;
    var id = btn.getAttribute("data-fb-remove");
    submissions = submissions.filter(function (item) {
      return item.id !== id;
    });
    writeJson(submitKey, submissions);
    renderSubmissions();
    showToast("Removed", "That submission left this browser.");
  });

  document.getElementById("fbSubmitForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var record = {
      id: String(Date.now()),
      title: String(data.get("title") || "").trim(),
      detail: String(data.get("detail") || "").trim(),
      name: String(data.get("name") || "").trim(),
      type: String(data.get("type") || "Feature"),
      related: String(data.get("related") || "")
    };
    if (!record.title || !record.detail) {
      showToast("Add details", "Title and description are required.");
      return;
    }
    submissions.push(record);
    if (!writeJson(submitKey, submissions)) {
      showToast("Not stored", "Browser storage is unavailable.");
      return;
    }
    form.reset();
    renderSubmissions();
    showToast("Feedback saved", "Demo only. Nothing was sent to a product team.");
  });

  document.getElementById("fbContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Note saved", "Demo only. Nothing was emailed.");
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
    document.querySelectorAll(".fb-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".fb-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  renderSubmissions();
  applyFilter();
})();
