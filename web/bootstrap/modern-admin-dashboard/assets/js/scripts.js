/**
 * ShopRaja — Modern Ecommerce Admin Dashboard
 * Sidebar, charts, order filters, KPIs, export, toasts, and light UX
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DENSITY_KEY = "ftl-compact-density";

  const sidebar = document.getElementById("ftlSidebar");
  const overlay = document.getElementById("ftlSidebarOverlay");
  const menuToggle = document.getElementById("ftlMenuToggle");
  const sidebarClose = document.getElementById("ftlSidebarClose");

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add("is-open");
    overlay?.classList.add("is-visible");
    menuToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("is-open");
    overlay?.classList.remove("is-visible");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleSidebar() {
    if (sidebar?.classList.contains("is-open")) closeSidebar();
    else openSidebar();
  }

  menuToggle?.addEventListener("click", toggleSidebar);
  sidebarClose?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSidebar();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) closeSidebar();
  });

  sidebar?.querySelectorAll(".ftl-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) closeSidebar();
    });
  });

  /* Toast ---------------------------------------------------------------- */
  const toastEl = document.getElementById("ftlToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("ftlToastTitle");
    const bodyEl = document.getElementById("ftlToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  /* Compact density ------------------------------------------------------ */
  const themeToggle = document.getElementById("ftlThemeToggle");
  function applyDensity(compact) {
    document.body.classList.toggle("ftl-compact", compact);
    themeToggle?.setAttribute("aria-pressed", compact ? "true" : "false");
    const icon = themeToggle?.querySelector("i");
    if (icon) icon.className = compact ? "bi bi-arrows-expand" : "bi bi-arrows-collapse";
  }

  try {
    applyDensity(localStorage.getItem(DENSITY_KEY) === "1");
  } catch (err) {
    applyDensity(false);
  }

  themeToggle?.addEventListener("click", () => {
    const next = !document.body.classList.contains("ftl-compact");
    applyDensity(next);
    try {
      localStorage.setItem(DENSITY_KEY, next ? "1" : "0");
    } catch (err) {
      /* ignore */
    }
    showToast(next ? "Compact density" : "Comfortable density", "Layout spacing updated for this browser.");
  });

  /* Search focus shortcut (/) -------------------------------------------- */
  const globalSearch = document.getElementById("ftlGlobalSearch");
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = (event.target && event.target.tagName) || "";
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || event.target?.isContentEditable) return;
    event.preventDefault();
    globalSearch?.focus();
  });

  /* Active nav by hash / scroll targets ---------------------------------- */
  const navLinks = Array.from(document.querySelectorAll(".ftl-sidebar-nav .ftl-nav-link[href^='#']"));
  const sectionIds = navLinks
    .map((link) => link.getAttribute("href")?.slice(1))
    .filter(Boolean);

  function setActiveNav(id) {
    document.querySelectorAll(".ftl-sidebar-nav .ftl-nav-link").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isDash = href === "index.html" || href.endsWith("/index.html");
      const match = href === `#${id}`;
      link.classList.toggle("active", id ? match : isDash);
    });
  }

  function updateActiveFromScroll() {
    let current = "";
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top <= 120) current = id;
    });
    setActiveNav(current);
  }

  window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
  updateActiveFromScroll();

  /* Back to top ---------------------------------------------------------- */
  const backTop = document.getElementById("ftlBackTop");
  function updateBackTop() {
    backTop?.classList.toggle("is-visible", window.scrollY > 480);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* KPI counters --------------------------------------------------------- */
  function animateCount(el) {
    const target = Number(el.getAttribute("data-count") || "0");
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = Number(el.getAttribute("data-decimals") || "0");
    const duration = reduceMotion ? 0 : 1200;
    const start = performance.now();

    function format(value) {
      const num = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
      return `${prefix}${num}${suffix}`;
    }

    if (duration === 0) {
      el.textContent = format(target);
      return;
    }

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll(".ftl-stat-value[data-count]");
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => obs.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* Notifications mark read ---------------------------------------------- */
  const notifDot = document.getElementById("ftlNotifDot");
  document.getElementById("ftlMarkNotifRead")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelectorAll("#ftlNotifMenu .ftl-notif-item").forEach((item) => {
      item.classList.add("is-read");
    });
    notifDot?.classList.add("d-none");
    showToast("Notifications cleared", "All alerts marked as read for this session.");
  });

  /* Orders filter / search ----------------------------------------------- */
  const orderSearch = document.getElementById("ftlOrderSearch");
  const orderFilterBtns = document.querySelectorAll("[data-order-filter]");
  const orderRows = document.querySelectorAll("#ftlOrdersTable tbody tr");
  const orderCount = document.getElementById("ftlOrderCount");
  const orderEmpty = document.getElementById("ftlOrderEmpty");
  let activeOrderFilter = "all";

  function applyOrderFilters() {
    if (!orderRows.length) return;
    const q = (orderSearch?.value || globalSearch?.value || "").trim().toLowerCase();
    let visible = 0;

    orderRows.forEach((row) => {
      const status = row.getAttribute("data-status") || "";
      const text = row.textContent.toLowerCase();
      const statusOk = activeOrderFilter === "all" || status === activeOrderFilter;
      const searchOk = !q || text.includes(q);
      const show = statusOk && searchOk;
      row.classList.toggle("ftl-hidden", !show);
      if (show) visible += 1;
    });

    if (orderCount) {
      orderCount.textContent = `Showing ${visible} order${visible === 1 ? "" : "s"}`;
    }
    orderEmpty?.classList.toggle("d-none", visible !== 0);
  }

  orderFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeOrderFilter = btn.getAttribute("data-order-filter") || "all";
      orderFilterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyOrderFilters();
    });
  });
  orderSearch?.addEventListener("input", applyOrderFilters);
  globalSearch?.addEventListener("input", applyOrderFilters);
  applyOrderFilters();

  /* Order actions -------------------------------------------------------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return false;
    }
  }

  document.querySelectorAll(".ftl-copy-order").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const order = btn.getAttribute("data-order") || "";
      const ok = await copyText(order);
      showToast(ok ? "Copied" : "Copy failed", ok ? `Order ${order} copied to clipboard.` : "Clipboard permission denied.");
    });
  });

  document.querySelectorAll(".ftl-order-action").forEach((btn) => {
    btn.addEventListener("click", () => {
      const order = btn.getAttribute("data-order") || "order";
      const action = btn.getAttribute("data-action");
      if (action === "ship") {
        const row = btn.closest("tr");
        const badge = row?.querySelector(".ftl-status");
        if (row && badge) {
          row.setAttribute("data-status", "shipped");
          badge.className = "ftl-status ftl-status-shipped";
          badge.textContent = "Shipped";
          applyOrderFilters();
        }
        showToast("Order updated", `${order} marked as shipped (demo).`);
      } else {
        showToast("Order details", `Opening ${order} — connect this to your order detail page.`);
      }
    });
  });

  /* Export CSV ----------------------------------------------------------- */
  document.getElementById("ftlExportOrders")?.addEventListener("click", () => {
    const rows = Array.from(document.querySelectorAll("#ftlOrdersTable tbody tr")).filter(
      (row) => !row.classList.contains("ftl-hidden")
    );
    if (!rows.length) {
      showToast("Nothing to export", "No visible orders match the current filters.");
      return;
    }

    const lines = [["Order", "Customer", "Email", "Product", "Amount", "Status"]];
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      lines.push([
        cells[0]?.textContent.trim() || "",
        row.querySelector(".ftl-customer-name")?.textContent.trim() || "",
        row.querySelector(".ftl-customer-email")?.textContent.trim() || "",
        cells[2]?.textContent.trim() || "",
        cells[3]?.textContent.trim() || "",
        row.querySelector(".ftl-status")?.textContent.trim() || "",
      ]);
    });

    const csv = lines
      .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shopraja-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Export ready", `Downloaded ${rows.length} order${rows.length === 1 ? "" : "s"} as CSV.`);
  });

  /* Restock -------------------------------------------------------------- */
  document.querySelectorAll(".ftl-restock-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-product") || "item";
      const row = btn.closest("li");
      const qty = row?.querySelector(".ftl-alert-qty");
      const bar = row?.querySelector(".progress-bar");
      if (qty) {
        qty.textContent = "120 left";
        qty.classList.remove("ftl-text-danger", "ftl-text-warn");
        qty.classList.add("ftl-text-ok");
      }
      if (bar) {
        bar.className = "progress-bar bg-success ftl-w-100";
      }
      btn.disabled = true;
      btn.textContent = "Restocked";
      showToast("Restock queued", `${product} marked restocked (demo inventory update).`);
    });
  });

  /* Add product modal ---------------------------------------------------- */
  const productForm = document.getElementById("ftlProductForm");
  const productModalEl = document.getElementById("ftlProductModal");
  const productModal =
    productModalEl && typeof bootstrap !== "undefined"
      ? bootstrap.Modal.getOrCreateInstance(productModalEl)
      : null;

  productForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!productForm.checkValidity()) {
      productForm.classList.add("was-validated");
      return;
    }
    const name = document.getElementById("ftlProductName")?.value.trim() || "Product";
    productForm.reset();
    productForm.classList.remove("was-validated");
    productModal?.hide();
    showToast("Product saved", `${name} added to the catalog (demo).`);
  });

  /* Charts -------------------------------------------------------------- */
  const salesCanvas = document.getElementById("ftlSalesChart");
  const trafficCanvas = document.getElementById("ftlTrafficChart");

  const salesData = {
    "7d": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [8200, 9400, 7800, 11200, 12600, 14900, 13100],
    },
    "30d": {
      labels: ["W1", "W2", "W3", "W4"],
      values: [42000, 48500, 51200, 54800],
    },
    "90d": {
      labels: ["Jan", "Feb", "Mar"],
      values: [142000, 158500, 171200],
    },
  };

  const rangeCopy = {
    "7d": "Revenue performance for the last 7 days",
    "30d": "Revenue performance for the last 30 days",
    "90d": "Revenue performance for the last 90 days",
  };

  let salesChart = null;

  function createSalesChart(range = "7d") {
    if (!salesCanvas || typeof Chart === "undefined") return;

    const dataset = salesData[range] || salesData["7d"];
    const sub = document.querySelector("#analytics .ftl-panel-sub");
    if (sub) sub.textContent = rangeCopy[range] || rangeCopy["7d"];

    if (salesChart) {
      salesChart.data.labels = dataset.labels;
      salesChart.data.datasets[0].data = dataset.values;
      salesChart.update();
      return;
    }

    salesChart = new Chart(salesCanvas, {
      type: "line",
      data: {
        labels: dataset.labels,
        datasets: [
          {
            label: "Revenue",
            data: dataset.values,
            borderColor: "#D90000",
            backgroundColor: "rgba(217, 0, 0, 0.1)",
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#D90000",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        animation: reduceMotion ? false : undefined,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f172a",
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label(context) {
                const value = context.parsed.y || 0;
                return ` $${value.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#64748b", font: { family: "Inter", size: 12 } },
            border: { display: false },
          },
          y: {
            grid: { color: "#e2e8f0" },
            ticks: {
              color: "#64748b",
              font: { family: "Inter", size: 12 },
              callback(value) {
                return `$${Number(value) / 1000}k`;
              },
            },
            border: { display: false },
          },
        },
      },
    });
  }

  function createTrafficChart() {
    if (!trafficCanvas || typeof Chart === "undefined") return;

    new Chart(trafficCanvas, {
      type: "doughnut",
      data: {
        labels: ["Organic", "Paid Ads", "Social", "Referral"],
        datasets: [
          {
            data: [42, 28, 18, 12],
            backgroundColor: ["#D90000", "#007DCC", "#f59e0b", "#64748b"],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        animation: reduceMotion ? false : undefined,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f172a",
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label(context) {
                return ` ${context.label}: ${context.parsed}%`;
              },
            },
          },
        },
      },
    });
  }

  createSalesChart("7d");
  createTrafficChart();

  document.querySelectorAll(".ftl-range-group [data-range]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".ftl-range-group [data-range]").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      createSalesChart(button.getAttribute("data-range"));
    });
  });
})();
