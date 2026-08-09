/**
 * SecOps — Network & Security Operations Dashboard
 * Sidebar toggle, traffic charts, threat severity chart
 */
(function () {
  "use strict";

  const sidebar = document.getElementById("admNwSidebar");
  const overlay = document.getElementById("admNwSidebarOverlay");
  const menuToggle = document.getElementById("admNwMenuToggle");
  const sidebarClose = document.getElementById("admNwSidebarClose");

  const COLORS = {
    primary: "#F97300",
    secondary: "#F05941",
    warn: "#d97706",
    muted: "#374151",
    ok: "#059669",
  };

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add("adm-nw-sidebar-open");
    overlay?.classList.add("adm-nw-overlay-visible");
    menuToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("adm-nw-sidebar-open");
    overlay?.classList.remove("adm-nw-overlay-visible");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleSidebar() {
    if (sidebar?.classList.contains("adm-nw-sidebar-open")) {
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

  sidebar?.querySelectorAll(".adm-nw-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) closeSidebar();
    });
  });

  /* Charts -------------------------------------------------------------- */
  const trafficCanvas = document.getElementById("admNwTrafficChart");
  const threatCanvas = document.getElementById("admNwThreatChart");

  const trafficData = {
    "1h": {
      labels: ["0m", "10m", "20m", "30m", "40m", "50m", "60m"],
      inbound: [420, 480, 510, 460, 590, 620, 580],
      outbound: [310, 340, 360, 390, 410, 455, 430],
    },
    "24h": {
      labels: ["00", "04", "08", "12", "16", "20", "24"],
      inbound: [280, 220, 450, 820, 960, 740, 510],
      outbound: [190, 160, 320, 610, 720, 580, 390],
    },
    "7d": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      inbound: [620, 680, 710, 760, 840, 520, 480],
      outbound: [440, 490, 510, 560, 610, 380, 350],
    },
  };

  let trafficChart = null;

  function createTrafficChart(range = "1h") {
    if (!trafficCanvas || typeof Chart === "undefined") return;

    const dataset = trafficData[range] || trafficData["1h"];

    if (trafficChart) {
      trafficChart.data.labels = dataset.labels;
      trafficChart.data.datasets[0].data = dataset.inbound;
      trafficChart.data.datasets[1].data = dataset.outbound;
      trafficChart.update();
      return;
    }

    trafficChart = new Chart(trafficCanvas, {
      type: "line",
      data: {
        labels: dataset.labels,
        datasets: [
          {
            label: "Inbound",
            data: dataset.inbound,
            borderColor: COLORS.primary,
            backgroundColor: "rgba(249, 115, 0, 0.12)",
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: COLORS.primary,
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
          },
          {
            label: "Outbound",
            data: dataset.outbound,
            borderColor: COLORS.secondary,
            backgroundColor: "rgba(240, 89, 65, 0.08)",
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: COLORS.secondary,
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
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              pointStyle: "circle",
              font: { family: "Inter", size: 12 },
              color: "#6b7280",
            },
          },
          tooltip: {
            backgroundColor: "#111827",
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label(context) {
                return ` ${context.dataset.label}: ${context.parsed.y} Mbps`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280", font: { family: "Inter", size: 12 } },
            border: { display: false },
          },
          y: {
            grid: { color: "#e5e7eb" },
            ticks: {
              color: "#6b7280",
              font: { family: "Inter", size: 12 },
              callback(value) {
                return `${value}`;
              },
            },
            border: { display: false },
          },
        },
      },
    });
  }

  function createDoughnut(canvas, labels, data) {
    if (!canvas || typeof Chart === "undefined") return;

    new Chart(canvas, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              COLORS.primary,
              COLORS.secondary,
              COLORS.warn,
              COLORS.muted,
            ],
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
            backgroundColor: "#111827",
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label(context) {
                return ` ${context.label}: ${context.parsed}`;
              },
            },
          },
        },
      },
    });
  }

  createTrafficChart("1h");
  createDoughnut(threatCanvas, ["Critical", "High", "Medium", "Low"], [3, 5, 4, 2]);
  createDoughnut(
    document.getElementById("admNwProtocolChart"),
    ["HTTPS", "DNS", "VPN", "Other"],
    [54, 16, 18, 12]
  );

  document.querySelectorAll(".adm-nw-range-group [data-range]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".adm-nw-range-group [data-range]").forEach((btn) => {
        btn.classList.remove("adm-nw-range-btn-active");
      });
      button.classList.add("adm-nw-range-btn-active");
      createTrafficChart(button.getAttribute("data-range"));
    });
  });

  document.querySelectorAll(".adm-nw-tabs").forEach((tabs) => {
    tabs.querySelectorAll(".adm-nw-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.querySelectorAll(".adm-nw-tab").forEach((item) => {
          item.classList.remove("adm-nw-tab-active");
        });
        tab.classList.add("adm-nw-tab-active");
      });
    });
  });
})();
