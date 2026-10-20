/**
 * Bayline Auto — Auto repair service
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var storageKey = "bayline:visits";
  var toastEl = document.getElementById("arToast");
  var toastTimer;
  var visits = [];

  try {
    visits = JSON.parse(localStorage.getItem(storageKey) || "[]") || [];
  } catch {
    visits = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("arToastTitle");
    var bodyEl = document.getElementById("arToastBody");
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

  var nav = document.querySelector(".ar-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var toggler = document.querySelector(".ar-toggler");
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
  var cards = Array.prototype.slice.call(document.querySelectorAll(".ar-service"));
  var searchInput = document.getElementById("arSearch");

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
    var count = document.getElementById("arServiceCount");
    var empty = document.getElementById("arEmpty");
    if (count) count.textContent = visible + " service" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-ar-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-ar-filter") || "all";
      document.querySelectorAll("[data-ar-filter]").forEach(function (chip) {
        chip.classList.toggle("is-active", chip === btn);
        chip.setAttribute("aria-pressed", chip === btn ? "true" : "false");
      });
      applyFilter();
    });
  });

  searchInput?.addEventListener("input", applyFilter);

  var serviceSelect = document.getElementById("arService");
  var dateInput = document.getElementById("arDate");
  if (dateInput) {
    dateInput.min = new Date().toLocaleDateString("en-CA");
  }

  document.querySelectorAll("[data-ar-book]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-ar-book") || "";
      var name = btn.getAttribute("data-ar-name") || "this service";
      if (serviceSelect) serviceSelect.value = id;
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Service selected", name + " is ready to book.");
    });
  });

  function updateVisitCount() {
    var badge = document.getElementById("arVisitCount");
    if (badge) badge.textContent = String(visits.length);
  }

  function renderVisits() {
    var list = document.getElementById("arVisitList");
    var empty = document.getElementById("arVisitEmpty");
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
          '<li><div class="ar-appt-top"><strong>' +
          esc(item.service) +
          '</strong><button class="ar-linkish" type="button" data-ar-remove="' +
          esc(item.id) +
          '">Remove</button></div><p class="mb-0">' +
          esc(item.vehicle) +
          " · " +
          esc(item.when) +
          " · " +
          esc(item.name) +
          "</p></li>"
        );
      })
      .join("");
    updateVisitCount();
  }

  document.getElementById("arVisitList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-ar-remove]");
    if (!btn) return;
    var id = btn.getAttribute("data-ar-remove");
    visits = visits.filter(function (item) {
      return item.id !== id;
    });
    writeVisits();
    renderVisits();
    showToast("Removed", "That demo visit left this browser.");
  });

  document.getElementById("arBookForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var serviceId = String(data.get("service") || "");
    var option = serviceSelect?.querySelector('option[value="' + serviceId + '"]');
    var record = {
      id: String(Date.now()),
      service: option ? option.textContent : serviceId,
      vehicle: String(data.get("vehicle") || "").trim(),
      when: String(data.get("date") || ""),
      name: String(data.get("name") || "").trim()
    };
    visits.push(record);
    if (!writeVisits()) {
      showToast("Not stored", "Browser storage is unavailable. Nothing was sent.");
      return;
    }
    form.reset();
    if (serviceSelect) serviceSelect.value = serviceId;
    if (dateInput) dateInput.min = new Date().toLocaleDateString("en-CA");
    renderVisits();
    showToast("Visit saved", "Demo only. The shop was not contacted.");
  });

  document.getElementById("arContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Note saved", "Demo only. Nothing was emailed to the shop.");
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
    document.querySelectorAll(".ar-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".ar-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  renderVisits();
  applyFilter();
})();
