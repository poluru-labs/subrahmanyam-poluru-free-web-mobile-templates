/**
 * Clearlane — Startup KPI Board
 * Counters, period KPI swap, runway calc, asks checklist, export/share, UX chrome
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ASKS_KEY = "skb-asks-v1";

  const toastEl = document.getElementById("skbToast");
  const toastBody = document.getElementById("skbToastBody");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2800 })
      : null;

  function showToast(message) {
    if (toastBody) toastBody.textContent = message;
    toast?.show();
  }

  const navCollapseEl = document.getElementById("skbNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.skb-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) {
        navCollapse.hide();
      }
    });
  });

  const sectionIds = [
    "home",
    "kpis",
    "growth",
    "fundraising",
    "customers",
    "burn",
    "product",
    "updates",
    "backers",
    "share",
  ];
  const navLinks = Array.from(document.querySelectorAll(".skb-navbar .nav-link"));

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = "home";

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollY) {
        current = id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === `#${current}`);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  const backTop = document.getElementById("skbBackTop");
  function syncBackTop() {
    if (!backTop) return;
    backTop.classList.toggle("is-visible", window.scrollY > 480);
  }
  window.addEventListener("scroll", syncBackTop, { passive: true });
  syncBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  const revealEls = document.querySelectorAll(".skb-reveal");

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("skb-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("skb-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("skb-visible"));
  }

  function formatValue(value, decimals) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  function animateCounter(el) {
    const target = Number(el.getAttribute("data-target") || "0");
    const decimals = Number(el.getAttribute("data-decimals") || "0");
    const duration = 1400;
    const start = performance.now();

    if (reduceMotion) {
      el.textContent = formatValue(target, decimals);
      return;
    }

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatValue(target * eased, decimals);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function setCounterValue(el, animate) {
    const target = Number(el.getAttribute("data-target") || "0");
    const decimals = Number(el.getAttribute("data-decimals") || "0");
    if (!animate || reduceMotion) {
      el.textContent = formatValue(target, decimals);
      return;
    }
    animateCounter(el);
  }

  const counters = document.querySelectorAll(".skb-counter");
  let countersReady = false;

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
          countersReady = true;
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => animateCounter(el));
    countersReady = true;
  }

  function fillProgress(bar) {
    const value = Number(bar.getAttribute("data-progress") || "0");
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  }

  const progressBars = document.querySelectorAll(".skb-bar .progress-bar[data-progress]");

  if (reduceMotion) {
    progressBars.forEach((bar) => fillProgress(bar));
  } else if ("IntersectionObserver" in window) {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          fillProgress(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    progressBars.forEach((bar) => progressObserver.observe(bar));
  } else {
    progressBars.forEach((bar) => fillProgress(bar));
  }

  /* Period + monthly/quarterly KPI swap */
  const periodLabel = document.getElementById("skbPeriodLabel");
  const periodChips = document.querySelectorAll(".skb-period-chips .skb-chip");
  const viewChips = document.querySelectorAll(".skb-toggle .skb-chip");
  let activePeriod = "Q3 2026";
  let activeView = "monthly";

  function updatePeriodLabel() {
    if (!periodLabel) return;
    const viewText = activeView === "monthly" ? "Monthly" : "Quarterly";
    periodLabel.textContent = `${activePeriod} · ${viewText}`;
  }

  function applyView(view, { animate } = { animate: true }) {
    activeView = view;
    const key = view === "quarterly" ? "quarterly" : "monthly";

    document.querySelectorAll(".skb-counter[data-monthly]").forEach((el) => {
      const next = el.getAttribute(`data-${key}`);
      if (next == null) return;
      el.setAttribute("data-target", next);
      if (countersReady) setCounterValue(el, animate);
    });

    document.querySelectorAll("[data-trend-monthly]").forEach((el) => {
      const next = el.getAttribute(`data-trend-${key}`);
      if (next != null) el.textContent = next;
    });

    document.querySelectorAll("[data-note-monthly]").forEach((el) => {
      const next = el.getAttribute(`data-note-${key}`);
      if (next != null) el.textContent = next;
    });

    updatePeriodLabel();
  }

  periodChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      periodChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activePeriod = chip.getAttribute("data-period") || activePeriod;
      updatePeriodLabel();
      showToast(`Reporting period: ${activePeriod}`);
    });
  });

  viewChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      viewChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const view = chip.getAttribute("data-view") || "monthly";
      applyView(view, { animate: true });
      showToast(view === "quarterly" ? "Showing quarterly KPIs" : "Showing monthly KPIs");
    });
  });

  /* Segment filter */
  const segmentSearch = document.getElementById("skbSegmentSearch");
  const segmentTable = document.getElementById("skbSegmentTable");
  const segmentEmpty = document.getElementById("skbSegmentEmpty");

  function filterSegments() {
    if (!segmentTable) return;
    const q = (segmentSearch?.value || "").trim().toLowerCase();
    let visible = 0;
    segmentTable.querySelectorAll("tbody tr").forEach((row) => {
      const match = !q || row.textContent.toLowerCase().includes(q);
      row.classList.toggle("d-none", !match);
      if (match) visible += 1;
    });
    segmentEmpty?.classList.toggle("d-none", visible > 0);
  }

  segmentSearch?.addEventListener("input", filterSegments);

  /* Runway calculator */
  const cashInput = document.getElementById("skbCashInput");
  const burnInput = document.getElementById("skbBurnInput");
  const runwayOut = document.getElementById("skbRunwayOut");
  const runwayHint = document.getElementById("skbRunwayHint");

  function updateRunway() {
    const cash = Number(cashInput?.value || 0);
    const burn = Number(burnInput?.value || 0);
    if (!runwayOut) return;

    if (!burn || burn <= 0 || cash < 0) {
      runwayOut.textContent = "—";
      if (runwayHint) runwayHint.textContent = "Enter cash and a positive monthly burn.";
      return;
    }

    const months = Math.floor(cash / burn);
    runwayOut.textContent = String(months);

    const end = new Date();
    end.setMonth(end.getMonth() + months);
    const endLabel = end.toLocaleString(undefined, { month: "short", year: "numeric" });
    if (runwayHint) {
      runwayHint.textContent =
        months <= 0
          ? "Burn exceeds cash on hand."
          : `Cash lasts through ~${endLabel} at current burn.`;
    }
  }

  cashInput?.addEventListener("input", updateRunway);
  burnInput?.addEventListener("input", updateRunway);
  updateRunway();

  /* Finance CSV export */
  function tableToCsv(table) {
    return Array.from(table.querySelectorAll("tr"))
      .map((row) =>
        Array.from(row.querySelectorAll("th, td"))
          .map((cell) => `"${cell.textContent.trim().replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
  }

  function downloadCsv(filename, csv) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportFinanceCsv() {
    const table = document.getElementById("skbFinanceTable");
    if (!table) return;
    downloadCsv("clearlane-trailing-finance.csv", tableToCsv(table));
    showToast("Finance CSV downloaded");
  }

  document.getElementById("skbFinanceExport")?.addEventListener("click", exportFinanceCsv);
  document.getElementById("skbExportCsv")?.addEventListener("click", exportFinanceCsv);

  document.getElementById("skbPrintBtn")?.addEventListener("click", () => window.print());
  document.getElementById("skbSharePrint")?.addEventListener("click", () => window.print());

  document.getElementById("skbCopyLink")?.addEventListener("click", async () => {
    const url = window.location.href.split("#")[0] + "#share";
    try {
      await navigator.clipboard.writeText(url);
      showToast("Board link copied");
    } catch {
      showToast("Copy failed — select the URL manually");
    }
  });

  /* Asks checklist + localStorage */
  const asksList = document.getElementById("skbAsksList");
  const asksStatus = document.getElementById("skbAsksStatus");
  const askInputs = asksList
    ? Array.from(asksList.querySelectorAll('input[type="checkbox"][data-ask-id]'))
    : [];

  function loadAsks() {
    try {
      const saved = JSON.parse(localStorage.getItem(ASKS_KEY) || "{}");
      askInputs.forEach((input) => {
        const id = input.getAttribute("data-ask-id");
        if (id && saved[id]) input.checked = true;
      });
    } catch {
      /* ignore */
    }
  }

  function saveAsks() {
    const data = {};
    askInputs.forEach((input) => {
      const id = input.getAttribute("data-ask-id");
      if (id) data[id] = input.checked;
    });
    localStorage.setItem(ASKS_KEY, JSON.stringify(data));
  }

  function syncAsksStatus() {
    const done = askInputs.filter((i) => i.checked).length;
    const total = askInputs.length;
    if (asksStatus) asksStatus.textContent = `${done} of ${total} tracked`;
    askInputs.forEach((input) => {
      input.closest(".skb-ask-item")?.classList.toggle("is-done", input.checked);
    });
  }

  askInputs.forEach((input) => {
    input.addEventListener("change", () => {
      saveAsks();
      syncAsksStatus();
    });
  });

  document.getElementById("skbAsksReset")?.addEventListener("click", () => {
    askInputs.forEach((input) => {
      input.checked = false;
    });
    localStorage.removeItem(ASKS_KEY);
    syncAsksStatus();
    showToast("Asks checklist cleared");
  });

  loadAsks();
  syncAsksStatus();

  /* Copy KPI value on double-click */
  document.querySelectorAll(".skb-kpi").forEach((card) => {
    card.addEventListener("dblclick", async () => {
      const label = card.querySelector(".skb-kpi-label")?.textContent?.trim() || "KPI";
      const value = card.querySelector(".skb-kpi-value")?.textContent?.trim() || "";
      const text = `${label}: ${value}`;
      try {
        await navigator.clipboard.writeText(text);
        showToast(`Copied ${label}`);
      } catch {
        showToast("Could not copy KPI");
      }
    });
  });
})();
