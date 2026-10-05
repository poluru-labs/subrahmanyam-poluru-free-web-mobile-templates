/**
 * Clearpath — Personal finance
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("pfToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("pfToastTitle");
    var bodyEl = document.getElementById("pfToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var nav = document.querySelector(".pf-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".pf-toggler i");
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
  var search = document.getElementById("pfSearch");
  var rows = Array.prototype.slice.call(document.querySelectorAll("#pfTable tbody tr"));

  function applyFilter() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
    var visible = 0;
    var spent = 0;
    rows.forEach(function (row) {
      var cat = row.getAttribute("data-category") || "";
      var catOk = filter === "all" || cat === filter;
      var hay = (row.getAttribute("data-search") || "") + " " + row.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = catOk && queryOk;
      row.classList.toggle("is-hidden", !show);
      if (show) {
        visible += 1;
        var amt = parseFloat(row.getAttribute("data-amount") || "0");
        if (!isNaN(amt) && amt < 0) spent += Math.abs(amt);
      }
    });
    var result = document.getElementById("pfResult");
    var spentEl = document.getElementById("pfSpentFiltered");
    if (result) result.textContent = visible + " transaction" + (visible === 1 ? "" : "s");
    if (spentEl) spentEl.textContent = "$" + spent.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  document.querySelectorAll("[data-pf-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-pf-filter") || "all";
      document.querySelectorAll("[data-pf-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("is-active", active);
      });
      applyFilter();
    });
  });

  search?.addEventListener("input", applyFilter);

  document.getElementById("pfExportBtn")?.addEventListener("click", function () {
    var visibleRows = rows.filter(function (row) {
      return !row.classList.contains("is-hidden");
    });
    var csv =
      "Date,Merchant,Category,Amount\n" +
      visibleRows
        .map(function (row) {
          var cells = Array.prototype.slice.call(row.querySelectorAll("td"));
          return cells
            .slice(0, 4)
            .map(function (cell) {
              return '"' + cell.innerText.replace(/"/g, '""').replace(/\n/g, " ") + '"';
            })
            .join(",");
        })
        .join("\n");
    var url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = "clearpath-transactions.csv";
    a.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    showToast("CSV downloaded", "Visible transactions only.");
  });

  document.getElementById("pfAddBtn")?.addEventListener("click", function () {
    showToast("Demo entry", "Add expense would open a form in production. Nothing saved.");
  });

  document.getElementById("pfContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Support was not notified.");
  });

  document.getElementById("pfSignupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Welcome (demo)", "Account signup is not connected.");
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
    document.querySelectorAll(".pf-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".pf-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
