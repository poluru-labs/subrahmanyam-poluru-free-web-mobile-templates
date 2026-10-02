/**
 * Baystock — Inventory desk
 * Stock filter, receive demo, CSV export, contact note, sticky nav
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("invToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("invToastTitle");
    var bodyEl = document.getElementById("invToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var nav = document.querySelector(".inv-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".inv-toggler i");
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

  var search = document.getElementById("invSearch");
  var warehouse = document.getElementById("invWarehouse");
  var rows = Array.prototype.slice.call(document.querySelectorAll("#invTable tbody tr"));

  function applyFilter() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
    var wh = warehouse && warehouse.value ? warehouse.value : "all";
    var visible = 0;
    rows.forEach(function (row) {
      var warehouseOk = wh === "all" || row.getAttribute("data-warehouse") === wh;
      var hay = (row.getAttribute("data-search") || "") + " " + row.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = warehouseOk && queryOk;
      row.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var result = document.getElementById("invResult");
    var skuCount = document.getElementById("invSkuCount");
    var label = visible + " item" + (visible === 1 ? "" : "s");
    if (result) result.textContent = label;
    if (skuCount) skuCount.textContent = String(visible);
  }

  search?.addEventListener("input", applyFilter);
  warehouse?.addEventListener("change", applyFilter);

  document.querySelectorAll("[data-adjust]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sku = btn.getAttribute("data-adjust");
      var row = btn.closest("tr");
      var cell = row ? row.children[3] : null;
      if (!cell) return;
      var next = Number(cell.textContent.replace(/,/g, "")) + 1;
      cell.textContent = next.toLocaleString("en-US");
      showToast("Count adjusted", sku + " is now " + next + " on this page (demo).");
    });
  });

  document.getElementById("invReceiveBtn")?.addEventListener("click", function () {
    var row = document.querySelector('tr[data-search*="tape-2"]');
    if (row) {
      row.children[3].textContent = "44";
      var badge = row.querySelector(".inv-badge");
      if (badge) {
        badge.className = "inv-badge is-ok";
        badge.textContent = "Ok";
      }
    }
    showToast("PO-4412 received", "TAPE-2 is 44 in Hyderabad. Demo only — nothing was posted.");
  });

  document.getElementById("invExportBtn")?.addEventListener("click", function () {
    var visibleRows = Array.prototype.slice.call(document.querySelectorAll("#invTable tr")).filter(function (row) {
      return !row.classList.contains("is-hidden");
    });
    var csv = visibleRows
      .map(function (row) {
        return Array.prototype.slice.call(row.querySelectorAll("th,td"))
          .map(function (cell) {
            return '"' + cell.innerText.replace(/"/g, '""').replace(/\n/g, " ") + '"';
          })
          .join(",");
      })
      .join("\n");
    var url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = "baystock-stock.csv";
    a.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    showToast("CSV downloaded", "Visible rows only. Nothing was sent to Harbor.");
  });

  document.getElementById("invContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Note saved", "Demo only. Nothing was emailed to the Austin desk.");
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
    document.querySelectorAll(".inv-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".inv-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }
})();
