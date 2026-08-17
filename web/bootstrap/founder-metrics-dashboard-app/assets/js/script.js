/**
 * Blvd — Founder Metrics Dashboard
 * Counters, period swap, share/export, runway calc, asks checklist
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ASK_KEY = "fm-ask-checklist";

  /* Toast ----------------------------------------------------------------- */
  const toastEl = document.getElementById("fmToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("fmToastTitle");
    const bodyEl = document.getElementById("fmToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  /* Last updated ---------------------------------------------------------- */
  const lastUpdated = document.getElementById("fmLastUpdated");
  if (lastUpdated) {
    const now = new Date();
    lastUpdated.dateTime = now.toISOString();
    lastUpdated.textContent = now.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  /* Nav ------------------------------------------------------------------- */
  const navCollapseEl = document.getElementById("fmNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.fm-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
    });
  });

  const sectionIds = [
    "home",
    "kpis",
    "growth",
    "fundraising",
    "finance",
    "customers",
    "product",
    "updates",
    "backers",
    "tools",
    "cta",
  ];
  const navLinks = Array.from(document.querySelectorAll(".fm-navbar .nav-link"));

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = "home";
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollY) current = id;
    });
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === `#${current}`);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  /* Back to top ----------------------------------------------------------- */
  const backTop = document.getElementById("fmBackTop");
  function updateBackTop() {
    backTop?.classList.toggle("is-visible", window.scrollY > 480);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* Reveal ---------------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".fm-reveal");
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("fm-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("fm-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("fm-visible"));
  }

  /* Counters -------------------------------------------------------------- */
  function animateCounter(el) {
    const target = Number(el.getAttribute("data-target") || "0");
    const decimals = Number(el.getAttribute("data-decimals") || "0");
    const duration = reduceMotion ? 0 : 1100;
    const start = performance.now();

    if (duration === 0) {
      el.textContent = target.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      return;
    }

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counters = Array.from(document.querySelectorAll(".fm-counter"));
  let countersBooted = false;

  function bootCounters() {
    if (countersBooted) return;
    countersBooted = true;
    counters.forEach(animateCounter);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          bootCounters();
          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );
    const kpiGrid = document.getElementById("fmKpiGrid");
    if (kpiGrid) counterObserver.observe(kpiGrid);
    else bootCounters();
  } else {
    bootCounters();
  }

  /* Progress bars --------------------------------------------------------- */
  function fillProgress(bar) {
    const value = Number(bar.getAttribute("data-progress") || "0");
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  }

  const progressBars = document.querySelectorAll(".fm-bar .progress-bar[data-progress]");
  if (reduceMotion) {
    progressBars.forEach(fillProgress);
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
    progressBars.forEach(fillProgress);
  }

  /* Period / view toggle with KPI swap ------------------------------------ */
  const periodLabel = document.getElementById("fmPeriodLabel");
  const periodChips = document.querySelectorAll(".fm-period-chips .fm-chip");
  const viewChips = document.querySelectorAll(".fm-view-toggle .fm-chip");
  let activePeriod = "Q2 2026";
  let activeView = "monthly";

  function updatePeriodLabel() {
    if (!periodLabel) return;
    const viewText = activeView === "monthly" ? "Monthly" : "Quarterly";
    periodLabel.textContent = `${activePeriod} · ${viewText}`;
  }

  function applyViewToKpis(view) {
    const attr = view === "quarterly" ? "data-quarterly" : "data-monthly";
    const trendAttr = view === "quarterly" ? "data-trend-quarterly" : "data-trend-monthly";
    const noteAttr = view === "quarterly" ? "data-note-quarterly" : "data-note-monthly";

    document.querySelectorAll(".fm-kpi-card").forEach((card) => {
      const counter = card.querySelector(".fm-counter");
      const trendVal = card.querySelector(".fm-trend-val");
      const trend = card.querySelector(".fm-trend");
      const note = card.querySelector(".fm-kpi-note");

      if (counter) {
        const next = counter.getAttribute(attr);
        if (next != null) {
          counter.setAttribute("data-target", next);
          animateCounter(counter);
        }
      }
      if (trend && trendVal) {
        const nextTrend = trend.getAttribute(trendAttr);
        if (nextTrend != null) trendVal.textContent = nextTrend;
      }
      if (note) {
        const nextNote = note.getAttribute(noteAttr);
        if (nextNote != null) note.textContent = nextNote;
      }
    });
  }

  periodChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      periodChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activePeriod = chip.getAttribute("data-period") || activePeriod;
      updatePeriodLabel();
      showToast("Period updated", `Reporting period set to ${activePeriod}.`);
    });
  });

  viewChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      viewChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeView = chip.getAttribute("data-view") || activeView;
      updatePeriodLabel();
      applyViewToKpis(activeView);
      showToast(
        "View updated",
        activeView === "monthly" ? "Showing monthly KPI snapshot." : "Showing quarterly KPI snapshot."
      );
    });
  });

  /* KPI summary helpers --------------------------------------------------- */
  function buildKpiSummary() {
    const lines = [
      `Blvd Metrics — ${activePeriod} · ${activeView === "monthly" ? "Monthly" : "Quarterly"}`,
      "",
    ];
    document.querySelectorAll(".fm-kpi-card").forEach((card) => {
      const label = card.querySelector(".fm-kpi-label")?.textContent?.trim() || "";
      const value = card.querySelector(".fm-kpi-value")?.textContent?.replace(/\s+/g, " ").trim() || "";
      const trend = card.querySelector(".fm-trend-val")?.textContent?.trim() || "";
      lines.push(`${label}: ${value}${trend ? ` (${trend})` : ""}`);
    });
    lines.push("");
    lines.push("Highlights:");
    lines.push("- MRR crossed $248k with durable expansion");
    lines.push("- Lead investor term sheet executed");
    lines.push("- Enterprise pipeline up 22% QoQ");
    lines.push("");
    lines.push("Asks:");
    document.querySelectorAll("#fmAskChecklist .fm-check-item").forEach((item) => {
      const checked = item.querySelector("input")?.checked;
      const text = item.querySelector("span")?.textContent?.trim() || "";
      lines.push(`- [${checked ? "x" : " "}] ${text}`);
    });
    return lines.join("\n");
  }

  async function copyText(text, successMsg) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied", successMsg);
    } catch (err) {
      showToast("Copy failed", "Clipboard is unavailable in this browser.");
    }
  }

  document.getElementById("fmCopyKpis")?.addEventListener("click", () => {
    copyText(buildKpiSummary(), "KPI summary copied to clipboard.");
  });

  document.getElementById("fmCopySummaryTool")?.addEventListener("click", () => {
    copyText(buildKpiSummary(), "KPI summary copied to clipboard.");
  });

  /* Download / print ------------------------------------------------------ */
  function downloadReport() {
    const content = buildKpiSummary();
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blvd-metrics-${activePeriod.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("Report ready", "Text report downloaded.");
  }

  document.getElementById("fmDownloadReport")?.addEventListener("click", downloadReport);
  document.getElementById("fmDownloadReportTool")?.addEventListener("click", downloadReport);

  function printBoard() {
    window.print();
  }
  document.getElementById("fmPrintBoard")?.addEventListener("click", printBoard);
  document.getElementById("fmPrintBoardTool")?.addEventListener("click", printBoard);

  /* Finance CSV export ---------------------------------------------------- */
  document.getElementById("fmExportFinance")?.addEventListener("click", () => {
    const table = document.getElementById("fmFinanceTable");
    if (!table) return;
    const rows = Array.from(table.querySelectorAll("tr")).map((tr) =>
      Array.from(tr.children)
        .map((cell) => `"${cell.textContent.trim().replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blvd-finance-trailing-six-months.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("CSV exported", "Finance table downloaded.");
  });

  /* Segment search -------------------------------------------------------- */
  const segmentSearch = document.getElementById("fmSegmentSearch");
  const segmentRows = document.querySelectorAll("#fmSegmentTable tbody tr");
  const segmentEmpty = document.getElementById("fmSegmentEmpty");

  segmentSearch?.addEventListener("input", () => {
    const q = segmentSearch.value.trim().toLowerCase();
    let visible = 0;
    segmentRows.forEach((row) => {
      const show = !q || row.textContent.toLowerCase().includes(q);
      row.classList.toggle("fm-hidden", !show);
      if (show) visible += 1;
    });
    segmentEmpty?.classList.toggle("d-none", visible !== 0);
  });

  /* Asks checklist -------------------------------------------------------- */
  const askInputs = document.querySelectorAll("#fmAskChecklist input[data-ask-id]");
  let askState = {};
  try {
    askState = JSON.parse(localStorage.getItem(ASK_KEY) || "{}") || {};
  } catch (err) {
    askState = {};
  }

  askInputs.forEach((input) => {
    const id = input.getAttribute("data-ask-id");
    if (id && askState[id]) input.checked = true;
    input.addEventListener("change", () => {
      if (!id) return;
      askState[id] = input.checked;
      try {
        localStorage.setItem(ASK_KEY, JSON.stringify(askState));
      } catch (err) {
        /* ignore */
      }
    });
  });

  /* Runway calculator ----------------------------------------------------- */
  const cashInput = document.getElementById("fmCashBalance");
  const burnInput = document.getElementById("fmMonthlyBurn");
  const runwayMonthsEl = document.getElementById("fmRunwayMonths");
  const runwayDateEl = document.getElementById("fmRunwayDate");
  const runwayBar = document.getElementById("fmRunwayBar");

  function updateRunway() {
    const cash = Number(cashInput?.value || 0);
    const burn = Number(burnInput?.value || 0);
    if (!burn || burn <= 0 || cash < 0) {
      if (runwayMonthsEl) runwayMonthsEl.textContent = "—";
      if (runwayDateEl) runwayDateEl.textContent = "Enter valid burn";
      if (runwayBar) runwayBar.style.width = "0%";
      return;
    }
    const months = cash / burn;
    if (runwayMonthsEl) runwayMonthsEl.textContent = months.toFixed(1);
    const zero = new Date();
    zero.setMonth(zero.getMonth() + Math.floor(months));
    if (runwayDateEl) {
      runwayDateEl.textContent = zero.toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      });
    }
    if (runwayBar) {
      const pct = Math.max(0, Math.min(100, (months / 24) * 100));
      runwayBar.style.width = `${pct}%`;
    }
  }

  cashInput?.addEventListener("input", updateRunway);
  burnInput?.addEventListener("input", updateRunway);
  updateRunway();

  /* Share modal ----------------------------------------------------------- */
  const shareText = document.getElementById("fmShareText");
  const mailShare = document.getElementById("fmMailShare");
  const shareModalEl = document.getElementById("fmShareModal");

  function refreshShareDraft() {
    const draft = buildKpiSummary();
    if (shareText) shareText.value = draft;
    if (mailShare) {
      const subject = encodeURIComponent(`Blvd investor update — ${activePeriod}`);
      const body = encodeURIComponent(draft);
      mailShare.href = `mailto:mail.spoluru@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  shareModalEl?.addEventListener("show.bs.modal", refreshShareDraft);

  document.getElementById("fmCopyShare")?.addEventListener("click", () => {
    copyText(shareText?.value || buildKpiSummary(), "Update draft copied.");
  });
})();
