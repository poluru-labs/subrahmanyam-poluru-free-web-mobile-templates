/**
 * Wayline — Logistics tracking
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("ltToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("ltToastTitle");
    var bodyEl = document.getElementById("ltToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var nav = document.querySelector(".lt-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".lt-toggler i");
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

  var search = document.getElementById("ltSearch");
  var status = document.getElementById("ltStatus");
  var rows = Array.prototype.slice.call(document.querySelectorAll("#ltTable tbody tr"));

  function applyFilter() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
    var st = status && status.value ? status.value : "all";
    var visible = 0;
    rows.forEach(function (row) {
      var statusOk = st === "all" || row.getAttribute("data-status") === st;
      var hay = (row.getAttribute("data-search") || "") + " " + row.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = statusOk && queryOk;
      row.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var result = document.getElementById("ltResult");
    var count = document.getElementById("ltLoadCount");
    var label = visible + " load" + (visible === 1 ? "" : "s");
    if (result) result.textContent = label;
    if (count) count.textContent = String(visible);
  }

  search?.addEventListener("input", applyFilter);
  status?.addEventListener("change", applyFilter);

  var trackInput = document.getElementById("ltTrackInput");
  var trackForm = document.getElementById("ltTrackForm");

  function openTimeline(id) {
    var panel = document.getElementById("ltTimeline");
    var title = document.getElementById("ltTimelineId");
    var body = document.getElementById("ltTimelineBody");
    var data = {
      "WL-884021": {
        route: "Austin, TX → Dallas, TX",
        steps: [
          { when: "Oct 3 · 06:12", label: "Picked up", detail: "Harbor DC · Ravi Poluru signed" },
          { when: "Oct 3 · 11:40", label: "In transit", detail: "I-35 north · GPS ping OK" },
          { when: "Est. Oct 3 · 18:00", label: "Out for delivery", detail: "Dallas hub dock 2" },
        ],
      },
      "WL-883902": {
        route: "Hyderabad → Chennai",
        steps: [
          { when: "Oct 2 · 22:10", label: "Departed origin", detail: "HITEC gate 4" },
          { when: "Oct 3 · 08:05", label: "Customs cleared", detail: "Ishaan Poluru filed docs" },
          { when: "Oct 3 · 14:30", label: "In transit", detail: "NH16 · on schedule" },
        ],
      },
      "WL-883771": {
        route: "London → Rotterdam",
        steps: [
          { when: "Oct 1 · 09:00", label: "Delivered", detail: "Proof · Kavya Poluru" },
          { when: "Oct 1 · 08:22", label: "Out for delivery", detail: "Tilbury unit 6" },
          { when: "Sep 30 · 19:15", label: "Arrived hub", detail: "Bond cleared" },
        ],
      },
    };
    var pack = data[id] || data["WL-884021"];
    if (title) title.textContent = id;
    if (body) {
      body.innerHTML =
        '<p class="lt-timeline-route">' +
        pack.route +
        '</p><ol class="lt-timeline-list">' +
        pack.steps
          .map(function (s) {
            return (
              '<li><span class="lt-timeline-when">' +
              s.when +
              '</span><strong>' +
              s.label +
              '</strong><span>' +
              s.detail +
              '</span></li>'
            );
          })
          .join('') +
        '</ol>';
    }
    panel?.classList.add("is-open");
    panel?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.querySelectorAll("[data-track]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openTimeline(btn.getAttribute("data-track"));
    });
  });

  trackForm?.addEventListener("submit", function (event) {
    event.preventDefault();
    var raw = (trackInput?.value || "").trim().toUpperCase();
    if (!raw) {
      showToast("Enter an ID", "Use WL-884021 or search the table below.");
      return;
    }
    var match = rows.find(function (row) {
      return row.textContent.toUpperCase().includes(raw);
    });
    if (match) {
      var id = match.querySelector("strong")?.textContent || raw;
      applyFilter();
      search.value = id;
      applyFilter();
      showView("shipments");
      openTimeline(id);
    } else {
      showToast("Not in sample book", raw + " is not in this demo. Try WL-884021.");
    }
  });

  function showView(hash) {
    if (window.location.hash !== "#" + hash) {
      history.replaceState(null, "", "#" + hash);
    }
  }

  document.getElementById("ltExportBtn")?.addEventListener("click", function () {
    var visibleRows = Array.prototype.slice.call(document.querySelectorAll("#ltTable tr")).filter(function (row) {
      return !row.classList.contains("is-hidden");
    });
    var csv = visibleRows
      .map(function (row) {
        return Array.prototype.slice
          .call(row.querySelectorAll("th,td"))
          .map(function (cell) {
            return '"' + cell.innerText.replace(/"/g, '""').replace(/\n/g, " ") + '"';
          })
          .join(",");
      })
      .join("\n");
    var url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = "wayline-loads.csv";
    a.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    showToast("CSV downloaded", "Visible loads only. Nothing was sent.");
  });

  document.getElementById("ltAlertBtn")?.addEventListener("click", function () {
    showToast("2 exceptions", "WL-883654 delayed · WL-883812 needs POD upload.");
    showView("shipments");
  });

  document.getElementById("ltContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Note saved", "Demo only. Nothing was emailed to dispatch.");
  });

  document.getElementById("ltTimelineClose")?.addEventListener("click", function () {
    document.getElementById("ltTimeline")?.classList.remove("is-open");
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
    document.querySelectorAll(".lt-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".lt-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
