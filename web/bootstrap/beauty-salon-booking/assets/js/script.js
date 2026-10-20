/**
 * Sable Room — Beauty salon booking
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var storageKey = "sableroom:visits";
  var toastEl = document.getElementById("sbToast");
  var toastTimer;
  var visits = [];
  var selectedSlot = "";

  try {
    visits = JSON.parse(localStorage.getItem(storageKey) || "[]") || [];
  } catch {
    visits = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("sbToastTitle");
    var bodyEl = document.getElementById("sbToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function writeVisits() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(visits));
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

  var nav = document.querySelector(".sb-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var toggler = document.querySelector(".sb-toggler");
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

  var filter = "all";
  var cards = Array.prototype.slice.call(document.querySelectorAll(".sb-service"));
  var searchInput = document.getElementById("sbSearch");

  function applyFilter() {
    var query = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var category = card.getAttribute("data-category") || "";
      var categoryOk = filter === "all" || category === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !query || hay.toLowerCase().indexOf(query) !== -1;
      var show = categoryOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("sbServiceCount");
    var empty = document.getElementById("sbEmpty");
    if (count) count.textContent = visible + " service" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-sb-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-sb-filter") || "all";
      document.querySelectorAll("[data-sb-filter]").forEach(function (chip) {
        chip.classList.toggle("is-active", chip === btn);
        chip.setAttribute("aria-pressed", chip === btn ? "true" : "false");
      });
      applyFilter();
    });
  });

  searchInput?.addEventListener("input", applyFilter);

  var serviceSelect = document.getElementById("sbService");
  var stylistSelect = document.getElementById("sbStylist");
  var dateInput = document.getElementById("sbDate");
  if (dateInput) dateInput.min = new Date().toLocaleDateString("en-CA");

  document.querySelectorAll("[data-sb-book]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-sb-book") || "";
      var name = btn.getAttribute("data-sb-name") || "this service";
      var stylist = btn.getAttribute("data-sb-stylist") || "";
      if (serviceSelect) serviceSelect.value = id;
      if (stylist && stylistSelect) stylistSelect.value = stylist;
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Service selected", name + " is ready to book.");
    });
  });

  document.querySelectorAll("[data-sb-slot]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectedSlot = btn.getAttribute("data-sb-slot") || "";
      document.querySelectorAll("[data-sb-slot]").forEach(function (slot) {
        var on = slot === btn;
        slot.classList.toggle("is-selected", on);
        slot.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
  });

  function updateVisitCount() {
    var badge = document.getElementById("sbVisitCount");
    if (badge) badge.textContent = String(visits.length);
  }

  function renderVisits() {
    var list = document.getElementById("sbVisitList");
    var empty = document.getElementById("sbVisitEmpty");
    if (!list) return;
    if (!visits.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      updateVisitCount();
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = visits
      .slice()
      .reverse()
      .map(function (item) {
        return (
          '<li><div class="sb-appt-top"><strong>' +
          esc(item.service) +
          '</strong><button class="sb-linkish" type="button" data-sb-remove="' +
          esc(item.id) +
          '">Remove</button></div><p class="mb-0">' +
          esc(item.stylist) +
          " · " +
          esc(item.when) +
          " · " +
          esc(item.slot) +
          "</p></li>"
        );
      })
      .join("");
    updateVisitCount();
  }

  document.getElementById("sbVisitList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-sb-remove]");
    if (!btn) return;
    var id = btn.getAttribute("data-sb-remove");
    visits = visits.filter(function (item) {
      return item.id !== id;
    });
    writeVisits();
    renderVisits();
    showToast("Removed", "That demo visit left this browser.");
  });

  document.getElementById("sbBookForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!selectedSlot) {
      showToast("Choose a time", "Pick one of the open chairs first.");
      return;
    }
    var form = event.target;
    var data = new FormData(form);
    var serviceId = String(data.get("service") || "");
    var stylistId = String(data.get("stylist") || "");
    var serviceOption = serviceSelect?.querySelector('option[value="' + serviceId + '"]');
    var stylistOption = stylistSelect?.querySelector('option[value="' + stylistId + '"]');
    var record = {
      id: String(Date.now()),
      service: serviceOption ? serviceOption.textContent : serviceId,
      stylist: stylistOption ? stylistOption.textContent : stylistId,
      when: String(data.get("date") || ""),
      slot: selectedSlot,
      name: String(data.get("name") || "").trim()
    };
    visits.push(record);
    if (!writeVisits()) {
      showToast("Not stored", "Browser storage is unavailable. Nothing was sent.");
      return;
    }
    form.reset();
    if (serviceSelect) serviceSelect.value = serviceId;
    if (stylistSelect) stylistSelect.value = stylistId;
    if (dateInput) dateInput.min = new Date().toLocaleDateString("en-CA");
    selectedSlot = "";
    document.querySelectorAll("[data-sb-slot]").forEach(function (slot) {
      slot.classList.remove("is-selected");
      slot.setAttribute("aria-pressed", "false");
    });
    renderVisits();
    showToast("Chair saved", "Demo only. The salon was not contacted.");
  });

  document.getElementById("sbContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Note saved", "Demo only. Nothing was emailed to the salon.");
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
    document.querySelectorAll(".sb-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".sb-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  renderVisits();
  applyFilter();
})();
