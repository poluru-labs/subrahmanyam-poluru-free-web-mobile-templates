/**
 * Gridline — Harbor North analytics desk
 * Hash views, period KPIs, report filters, explore drill-down, CSV export
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const titles = {
    overview: "Overview",
    reports: "Reports",
    explore: "Explore",
    exports: "Exports",
    sources: "Sources",
  };

  const toastEl = document.getElementById("glToast");
  let toastTimer;

  function showToast(title, body) {
    const titleEl = document.getElementById("glToastTitle");
    const bodyEl = document.getElementById("glToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastEl?.classList.remove("is-visible"), 3200);
  }

  const sidebar = document.getElementById("glSidebar");
  const overlay = document.getElementById("glOverlay");

  function setSidebar(open) {
    sidebar?.classList.toggle("is-open", open);
    overlay?.classList.toggle("is-visible", open);
    document.body.style.overflow = open && window.innerWidth < 1024 ? "hidden" : "";
  }

  document.getElementById("glMenuBtn")?.addEventListener("click", () => setSidebar(true));
  document.getElementById("glSidebarClose")?.addEventListener("click", () => setSidebar(false));
  overlay?.addEventListener("click", () => setSidebar(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSidebar(false);
      document.getElementById("glDialog")?.close();
    }
  });

  const views = Array.from(document.querySelectorAll(".gl-view"));
  const navLinks = Array.from(document.querySelectorAll(".gl-nav-link[data-view]"));
  const crumb = document.getElementById("glCrumb");

  function showView(name) {
    const id = titles[name] ? name : "overview";
    views.forEach((view) => {
      const active = view.id === `view-${id}`;
      view.classList.toggle("is-active", active);
      view.hidden = !active;
    });
    navLinks.forEach((link) => {
      const on = link.getAttribute("data-view") === id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (crumb) crumb.textContent = titles[id];
    if (window.location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
    }
    if (window.innerWidth < 1024) setSidebar(false);
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-view]").forEach((el) => {
    el.addEventListener("click", (event) => {
      const name = el.getAttribute("data-view");
      if (!name || !titles[name]) return;
      event.preventDefault();
      showView(name);
    });
  });

  document.querySelectorAll("[data-view-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-view-jump");
      showView(name);
    });
  });

  window.addEventListener("hashchange", () => {
    showView(window.location.hash.replace("#", ""));
  });
  showView(window.location.hash.replace("#", "") || "overview");

  const clock = document.getElementById("glClock");
  if (clock) {
    clock.textContent = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date());
  }

  const periodData = {
    "7d": {
      revenue: "$96,210",
      revenueDelta: "+$6,140 vs prior 7d",
      workspaces: "1,184",
      workspacesMeta: "+4 net new",
      mrr: "$4,180",
      mrrDelta: "Expansion $2.6k · new $2.1k · churn −$0.5k",
      churn: "0.4%",
      churnDelta: "1 logo left · Starter",
      caption: "Last 7 days · Harbor product, USD",
      heights: [38, 44, 41, 52, 48, 61, 70],
      labels: ["9", "10", "11", "12", "13", "14", "15"],
      values: ["11", "13", "12", "15", "14", "18", "21"],
    },
    "30d": {
      revenue: "$412,880",
      revenueDelta: "+$24,610 vs prior 30d",
      workspaces: "1,184",
      workspacesMeta: "+22 net new",
      mrr: "$18,420",
      mrrDelta: "Expansion $11.4k · new $9.8k · churn −$2.8k",
      churn: "1.8%",
      churnDelta: "4 logos left · 2 on Starter",
      caption: "Mar–Sep 2026 · Harbor product, USD",
      heights: [42, 48, 46, 58, 62, 71, 86],
      labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      values: ["248", "271", "264", "318", "341", "388", "413"],
    },
    q3: {
      revenue: "$1.18M",
      revenueDelta: "+9.2% vs Q2",
      workspaces: "1,184",
      workspacesMeta: "+61 net new in Q3",
      mrr: "$61,900",
      mrrDelta: "Expansion $34.2k · new $38.1k · churn −$10.4k",
      churn: "2.1%",
      churnDelta: "11 logos · 7 Starter",
      caption: "Q3 2026 · Jul–Sep, USD thousands",
      heights: [54, 58, 61, 66, 71, 78, 86],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
      values: ["148", "156", "162", "178", "191", "210", "228"],
    },
    fy26: {
      revenue: "$3.42M",
      revenueDelta: "+18% vs FY25 YTD",
      workspaces: "1,184",
      workspacesMeta: "Book at Sep 15",
      mrr: "$188,400",
      mrrDelta: "YTD net new · expansion 58%",
      churn: "2.4%",
      churnDelta: "Logo churn FYTD",
      caption: "FY26 YTD · Apr–Sep, USD thousands",
      heights: [36, 41, 44, 52, 58, 69, 88],
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Run"],
      values: ["410", "468", "512", "604", "692", "818", "—"],
    },
  };

  function setPeriod(id) {
    const data = periodData[id] || periodData["30d"];
    document.querySelectorAll("[data-period]").forEach((chip) => {
      chip.classList.toggle("is-active", chip.getAttribute("data-period") === id);
    });
    const set = (elId, value) => {
      const el = document.getElementById(elId);
      if (el) el.textContent = value;
    };
    set("kpiRevenue", data.revenue);
    set("kpiRevenueDelta", data.revenueDelta);
    set("kpiWorkspaces", data.workspaces);
    set("kpiWorkspacesMeta", data.workspacesMeta);
    set("kpiMrr", data.mrr);
    set("kpiMrrDelta", data.mrrDelta);
    set("kpiChurn", data.churn);
    set("kpiChurnDelta", data.churnDelta);
    set("glChartCaption", data.caption);
    const bars = document.querySelectorAll("#glChart .gl-bar");
    bars.forEach((bar, i) => {
      bar.style.setProperty("--height", `${data.heights[i]}%`);
      const em = bar.querySelector("em");
      const span = bar.querySelector("span");
      if (em) em.textContent = data.values[i];
      if (span) span.textContent = data.labels[i];
      bar.classList.toggle("is-peak", i === bars.length - 1);
    });
    document.getElementById("glChart")?.setAttribute(
      "aria-label",
      `${data.caption}: ${data.values.join(", ")}`
    );
  }

  document.querySelectorAll("[data-period]").forEach((chip) => {
    chip.addEventListener("click", () => setPeriod(chip.getAttribute("data-period")));
  });

  let reportFilter = "all";

  function applyReportFilter() {
    const q = (document.getElementById("glTopSearch")?.value || "").trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll("#glReportGrid .gl-report").forEach((card) => {
      const catOk = reportFilter === "all" || card.getAttribute("data-category") === reportFilter;
      const queryOk = !q || (card.getAttribute("data-search") || "").toLowerCase().includes(q) || card.textContent.toLowerCase().includes(q);
      const show = catOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    const count = document.getElementById("glReportCount");
    if (count) count.textContent = `${visible} report${visible === 1 ? "" : "s"}`;
    const empty = document.getElementById("glReportEmpty");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-report-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      reportFilter = chip.getAttribute("data-report-filter") || "all";
      document.querySelectorAll("[data-report-filter]").forEach((other) => {
        other.classList.toggle("is-active", other === chip);
      });
      applyReportFilter();
    });
  });

  document.getElementById("glTopSearchForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showView("reports");
    applyReportFilter();
    const q = document.getElementById("glTopSearch")?.value || "";
    showToast("Search", q.trim() ? `Filtered reports for “${q.trim()}”.` : "Showing all reports.");
  });

  document.getElementById("glTopSearch")?.addEventListener("input", () => {
    if (!document.getElementById("view-reports")?.hidden) applyReportFilter();
  });

  document.querySelectorAll("[data-run-report]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Report queued", `${btn.getAttribute("data-run-report")} is running against harbor_prod (demo).`);
    });
  });

  document.getElementById("glNewReportBtn")?.addEventListener("click", () => {
    showToast("New report", "Drafts stay in this browser. Nothing is saved to Snowflake.");
  });

  document.getElementById("glBellBtn")?.addEventListener("click", () => {
    showView("overview");
    showToast("Flags", "Pro annual checkout is 33%. HubSpot lag is 41 minutes.");
  });

  function applyExploreFilter() {
    const office = document.getElementById("glFilterOffice")?.value || "all";
    const plan = document.getElementById("glFilterPlan")?.value || "all";
    const channel = document.getElementById("glFilterChannel")?.value || "all";
    const q = (document.getElementById("glFilterSearch")?.value || "").trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll("#glExploreTable tbody tr").forEach((row) => {
      const officeOk = office === "all" || row.getAttribute("data-office") === office;
      const planOk = plan === "all" || row.getAttribute("data-plan") === plan;
      const channelOk = channel === "all" || row.getAttribute("data-channel") === channel;
      const hay = (row.getAttribute("data-search") || "") + " " + row.textContent;
      const queryOk = !q || hay.toLowerCase().includes(q);
      const show = officeOk && planOk && channelOk && queryOk;
      row.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    const count = document.getElementById("glExploreCount");
    if (count) count.textContent = `${visible} workspace${visible === 1 ? "" : "s"}`;
    const empty = document.getElementById("glExploreEmpty");
    if (empty) empty.hidden = visible > 0;
  }

  ["glFilterOffice", "glFilterPlan", "glFilterChannel", "glFilterSearch"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", applyExploreFilter);
    document.getElementById(id)?.addEventListener("change", applyExploreFilter);
  });

  const dialog = document.getElementById("glDialog");
  const dialogTitle = document.getElementById("glDialogTitle");
  const dialogBody = document.getElementById("glDialogBody");

  document.getElementById("glDialogClose")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll("#glExploreTable tbody tr").forEach((row) => {
    row.addEventListener("click", () => {
      const name = row.querySelector("strong")?.textContent || "Workspace";
      const owner = row.querySelector("span")?.textContent || "";
      const cells = row.querySelectorAll("td");
      const plan = row.getAttribute("data-plan");
      const office = row.getAttribute("data-office");
      const channel = row.getAttribute("data-channel");
      const seats = cells[3]?.textContent || "—";
      const mrr = cells[4]?.textContent || "—";
      const invoice = cells[6]?.textContent || "—";
      if (dialogTitle) dialogTitle.textContent = name;
      if (dialogBody) {
        dialogBody.innerHTML = `
          <p>${owner}</p>
          <dl>
            <dt>Plan</dt><dd>${plan}</dd>
            <dt>Office</dt><dd>${office}</dd>
            <dt>Seats</dt><dd>${seats}</dd>
            <dt>MRR</dt><dd>${mrr}</dd>
            <dt>Channel</dt><dd>${channel}</dd>
            <dt>Last invoice</dt><dd>${invoice}</dd>
          </dl>
          <p>Seat adds this month: ${plan === "Starter" ? "0" : plan === "Pro" ? "3" : "7"}. No open invoices.</p>
          <p class="gl-note">Drill-down is sample data in this browser. No warehouse query is sent.</p>
        `;
      }
      dialog?.showModal();
    });
  });

  function downloadCsv() {
    const rows = Array.from(document.querySelectorAll("#glExploreTable tr")).filter(
      (row) => !row.classList.contains("is-hidden")
    );
    const csv = rows
      .map((row) =>
        Array.from(row.querySelectorAll("th,td"))
          .map((cell) => `"${cell.innerText.replace(/"/g, '""').replace(/\n/g, " ")}"`)
          .join(",")
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "gridline-workspaces.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("CSV downloaded", "Visible rows only. Nothing was sent to Harbor.");
  }

  document.getElementById("glExploreExport")?.addEventListener("click", downloadCsv);

  document.getElementById("glQueueExport")?.addEventListener("click", () => {
    showToast("Job queued", "CSV for the current explore filters. Demo only — file is not emailed.");
  });

  document.querySelectorAll("[data-retry]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-retry");
      const label = btn.textContent.trim();
      showToast(label === "Retry" ? "Retrying" : "Download", `${name} ${label === "Retry" ? "queued against harbor_prod." : "saved in this browser."}`);
    });
  });

  document.querySelectorAll("[data-refresh]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Sync", `${btn.getAttribute("data-refresh")} refresh requested. Demo only — lag numbers do not change.`);
    });
  });

  document.querySelectorAll("[data-open-report]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showView("reports");
      reportFilter = "growth";
      document.querySelectorAll("[data-report-filter]").forEach((chip) => {
        chip.classList.toggle("is-active", chip.getAttribute("data-report-filter") === "growth");
      });
      applyReportFilter();
    });
  });

  applyReportFilter();
  applyExploreFilter();

  if (reduceMotion) {
    document.documentElement.style.scrollBehavior = "auto";
  }
})();
