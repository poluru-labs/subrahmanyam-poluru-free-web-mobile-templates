/**
 * Parkline — Property management portal
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var watchKey = "parkline:watchlist";
  var ticketKey = "parkline:tickets";
  var toastEl = document.getElementById("pmToast");
  var toastTimer;
  var category = "all";
  var savedOnly = false;
  var watchlist = [];
  var tickets = [];

  try {
    watchlist = JSON.parse(localStorage.getItem(watchKey) || "[]") || [];
    tickets = JSON.parse(localStorage.getItem(ticketKey) || "[]") || [];
  } catch {
    watchlist = [];
    tickets = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("pmToastTitle");
    var bodyEl = document.getElementById("pmToastBody");
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

  var navToggle = document.getElementById("pmNavToggle");
  var navPanel = document.getElementById("pmNavPanel");

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

  document.querySelectorAll("#pmNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  var header = document.getElementById("pmHeader");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 6;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("border-line", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function updateWatchCount() {
    var els = document.querySelectorAll("[data-pm-watch-count]");
    els.forEach(function (el) {
      el.textContent = String(watchlist.length);
    });
  }
  updateWatchCount();

  var cards = Array.prototype.slice.call(document.querySelectorAll(".pm-property"));
  var searchInput = document.getElementById("pmSearch");
  var savedToggle = document.getElementById("pmSavedToggle");

  function applyFilter() {
    var query = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var cat = card.getAttribute("data-category") || "";
      var id = card.getAttribute("data-pm-id") || "";
      var categoryOk = category === "all" || cat === category;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !query || hay.toLowerCase().indexOf(query) !== -1;
      var savedOk = !savedOnly || watchlist.indexOf(id) >= 0;
      var show = categoryOk && queryOk && savedOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("pmPropertyCount");
    var empty = document.getElementById("pmEmpty");
    if (count) count.textContent = visible + " propert" + (visible === 1 ? "y" : "ies");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-pm-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      category = btn.getAttribute("data-pm-filter") || "all";
      document.querySelectorAll("[data-pm-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("text-ink", active);
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
    showToast(savedOnly ? "Watchlist only" : "All properties", savedOnly ? "Showing saved buildings." : "Full portfolio is visible.");
  });

  document.querySelectorAll("[data-pm-watch]").forEach(function (btn) {
    var id = btn.getAttribute("data-pm-watch") || "";
    if (watchlist.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-bookmark-fill"></i>' : '<i class="bi bi-bookmark"></i>';
      if (active && watchlist.indexOf(id) < 0) watchlist.push(id);
      if (!active) {
        watchlist = watchlist.filter(function (x) {
          return x !== id;
        });
      }
      writeList(watchKey, watchlist);
      updateWatchCount();
      if (savedOnly) applyFilter();
      showToast(active ? "Saved" : "Removed", active ? "Property added to this browser watchlist." : "Property left the watchlist.");
    });
  });

  document.querySelectorAll("[data-pm-ticket]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var property = btn.getAttribute("data-pm-ticket") || "";
      var select = document.getElementById("pmTicketProperty");
      if (select) select.value = property;
      document.getElementById("maintenance")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Property selected", "Describe the work in the maintenance form.");
    });
  });

  function renderTickets() {
    var list = document.getElementById("pmTicketList");
    var empty = document.getElementById("pmTicketEmpty");
    var badge = document.getElementById("pmTicketCount");
    if (badge) badge.textContent = String(tickets.length);
    if (!list) return;
    if (!tickets.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = tickets
      .slice()
      .reverse()
      .map(function (item) {
        return (
          '<li class="rounded-xl border border-line bg-white p-4">' +
          '<div class="flex flex-wrap items-start justify-between gap-2">' +
          "<strong class=\"font-display\">" +
          esc(item.title) +
          "</strong>" +
          '<button class="font-ui text-sm font-bold text-brand-ink hover:text-ink" type="button" data-pm-remove="' +
          esc(item.id) +
          '">Remove</button></div>' +
          '<p class="mt-2 text-sm text-muted">' +
          esc(item.property) +
          " · " +
          esc(item.unit) +
          " · " +
          esc(item.priority) +
          "</p></li>"
        );
      })
      .join("");
  }

  document.getElementById("pmTicketList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-pm-remove]");
    if (!btn) return;
    var id = btn.getAttribute("data-pm-remove");
    tickets = tickets.filter(function (item) {
      return item.id !== id;
    });
    writeList(ticketKey, tickets);
    renderTickets();
    showToast("Removed", "Demo ticket cleared from this browser.");
  });

  document.getElementById("pmTicketForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var propertySelect = document.getElementById("pmTicketProperty");
    var propOption = propertySelect?.querySelector('option[value="' + String(data.get("property") || "") + '"]');
    var record = {
      id: String(Date.now()),
      title: String(data.get("title") || "").trim(),
      property: propOption ? propOption.textContent : String(data.get("property") || ""),
      unit: String(data.get("unit") || "").trim(),
      priority: String(data.get("priority") || "Normal")
    };
    if (!record.title) {
      showToast("Add a title", "Name the maintenance request first.");
      return;
    }
    tickets.push(record);
    if (!writeList(ticketKey, tickets)) {
      showToast("Not stored", "Browser storage is unavailable.");
      return;
    }
    form.reset();
    renderTickets();
    showToast("Ticket saved", "Demo only. No vendor was dispatched.");
  });

  document.getElementById("pmContactForm")?.addEventListener("submit", function (event) {
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
    document.querySelectorAll(".pm-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".pm-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  renderTickets();
  applyFilter();
})();
