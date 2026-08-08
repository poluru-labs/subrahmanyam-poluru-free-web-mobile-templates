/**
 * ShopRaja — Modern Ecommerce Admin Dashboard
 * Sidebar toggle, charts, and light UI interactions
 */
(function () {
  "use strict";

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
    if (sidebar?.classList.contains("is-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
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

  // Close mobile sidebar when a nav link is tapped
  sidebar?.querySelectorAll(".ftl-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) closeSidebar();
    });
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

  let salesChart = null;

  function createSalesChart(range = "7d") {
    if (!salesCanvas || typeof Chart === "undefined") return;

    const dataset = salesData[range] || salesData["7d"];

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
