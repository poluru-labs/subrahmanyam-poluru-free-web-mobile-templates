/**
 * SecOps — Network & Security Operations Dashboard
 * Sidebar, charts, filters, triage actions, export, toasts
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SETTINGS_KEY = "adm-nw-settings";

  const COLORS = {
    primary: "#F97300",
    secondary: "#F05941",
    warn: "#d97706",
    muted: "#374151",
    ok: "#059669",
  };

  /* Shared chrome -------------------------------------------------------- */
  function ensureChrome() {
    if (!document.querySelector(".adm-nw-skip-link")) {
      const skip = document.createElement("a");
      skip.className = "adm-nw-skip-link";
      skip.href = "#admNwMainContent";
      skip.textContent = "Skip to content";
      document.body.prepend(skip);
    }

    const main = document.querySelector("main.adm-nw-content");
    if (main && !main.id) main.id = "admNwMainContent";

    if (!document.getElementById("admNwToast")) {
      const wrap = document.createElement("div");
      wrap.className = "toast-container position-fixed bottom-0 end-0 p-3";
      wrap.innerHTML = `
        <div id="admNwToast" class="toast adm-nw-toast" role="status" aria-live="polite" aria-atomic="true">
          <div class="toast-header">
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            <strong class="me-auto" id="admNwToastTitle">Done</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body" id="admNwToastBody">Action completed.</div>
        </div>`;
      document.body.appendChild(wrap);
    }

    if (!document.getElementById("admNwBackTop")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "admNwBackTop";
      btn.className = "adm-nw-back-top";
      btn.setAttribute("aria-label", "Back to top");
      btn.innerHTML = '<i class="bi bi-arrow-up" aria-hidden="true"></i>';
      document.body.appendChild(btn);
      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }

    if (!document.getElementById("admNwIncidentModal")) {
      const modal = document.createElement("div");
      modal.className = "modal fade";
      modal.id = "admNwIncidentModal";
      modal.tabIndex = -1;
      modal.setAttribute("aria-labelledby", "admNwIncidentModalLabel");
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content adm-nw-modal">
            <div class="modal-header">
              <h2 class="modal-title fs-5" id="admNwIncidentModalLabel">New incident</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="admNwIncidentForm" novalidate>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="admNwIncidentTitle" class="form-label">Title</label>
                  <input type="text" class="form-control" id="admNwIncidentTitle" required placeholder="e.g. Suspicious lateral movement" />
                  <div class="invalid-feedback">Enter an incident title.</div>
                </div>
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label for="admNwIncidentSeverity" class="form-label">Severity</label>
                    <select class="form-select" id="admNwIncidentSeverity" required>
                      <option value="">Select</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <div class="invalid-feedback">Choose a severity.</div>
                  </div>
                  <div class="col-sm-6">
                    <label for="admNwIncidentAsset" class="form-label">Asset / host</label>
                    <input type="text" class="form-control" id="admNwIncidentAsset" required placeholder="vpn-gw-01" />
                    <div class="invalid-feedback">Enter an asset.</div>
                  </div>
                </div>
                <div class="mt-3">
                  <label for="admNwIncidentNotes" class="form-label">Notes</label>
                  <textarea class="form-control" id="admNwIncidentNotes" rows="3" maxlength="500" placeholder="Context for the on-call analyst…"></textarea>
                  <div class="d-flex justify-content-end"><span class="adm-nw-char-count" id="admNwIncidentCount">0 / 500</span></div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn adm-nw-btn-outline" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn adm-nw-btn-primary">Create incident</button>
              </div>
            </form>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }
  }

  ensureChrome();

  const toastEl = document.getElementById("admNwToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("admNwToastTitle");
    const bodyEl = document.getElementById("admNwToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  /* Sidebar -------------------------------------------------------------- */
  const sidebar = document.getElementById("admNwSidebar");
  const overlay = document.getElementById("admNwSidebarOverlay");
  const menuToggle = document.getElementById("admNwMenuToggle");
  const sidebarClose = document.getElementById("admNwSidebarClose");

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
    if (sidebar?.classList.contains("adm-nw-sidebar-open")) closeSidebar();
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

  sidebar?.querySelectorAll(".adm-nw-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) closeSidebar();
    });
  });

  /* Back to top / live clock --------------------------------------------- */
  const backTop = document.getElementById("admNwBackTop");
  function updateBackTop() {
    backTop?.classList.toggle("adm-nw-back-top-visible", window.scrollY > 480);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();

  const pageSub = document.querySelector(".adm-nw-page-sub");
  if (pageSub && !document.getElementById("admNwLiveClock")) {
    const clock = document.createElement("span");
    clock.id = "admNwLiveClock";
    clock.className = "adm-nw-live-clock";
    clock.setAttribute("aria-live", "polite");
    pageSub.insertAdjacentElement("afterend", clock);

    function tickClock() {
      const now = new Date();
      clock.textContent = `Last refreshed · ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
    }
    tickClock();
    setInterval(tickClock, 1000);
  }

  /* Global search focus (/) ---------------------------------------------- */
  const globalSearch = document.querySelector(".adm-nw-search input[type='search']");
  if (globalSearch && !globalSearch.id) globalSearch.id = "admNwGlobalSearch";
  if (globalSearch && !globalSearch.parentElement.querySelector(".adm-nw-search-hint")) {
    const hint = document.createElement("kbd");
    hint.className = "adm-nw-search-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = "/";
    globalSearch.insertAdjacentElement("afterend", hint);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = (event.target && event.target.tagName) || "";
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || event.target?.isContentEditable) return;
    event.preventDefault();
    globalSearch?.focus();
  });

  /* Notifications mark read ---------------------------------------------- */
  document.querySelectorAll(".adm-nw-dropdown-header").forEach((header) => {
    if (header.querySelector(".adm-nw-mark-read")) return;
    const link = header.querySelector("a");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "adm-nw-mark-read";
    btn.textContent = "Mark all read";
    if (link) header.insertBefore(btn, link);
    else header.appendChild(btn);

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      document.querySelectorAll(".adm-nw-notif-item").forEach((item) => item.classList.add("adm-nw-notif-read"));
      document.querySelectorAll(".adm-nw-dot").forEach((dot) => dot.classList.add("d-none"));
      showToast("Alerts cleared", "Notification badges cleared for this session.");
    });
  });

  /* KPI counters --------------------------------------------------------- */
  function parseCountText(text) {
    const cleaned = text.trim().replace(/,/g, "");
    // Animate plain numbers, currency, k-compact, and percents — not times like "18m"
    const match = cleaned.match(/^(\$?)([\d.]+)(k|%)?$/i);
    if (!match) return null;
    let value = Number(match[2]);
    if (Number.isNaN(value)) return null;
    const suffixRaw = (match[3] || "").toLowerCase();
    if (suffixRaw === "k") value *= 1000;
    return {
      value,
      prefix: match[1] || "",
      suffix: suffixRaw === "%" ? "%" : "",
      compact: suffixRaw === "k" ? "k" : "",
      decimals: String(match[2]).includes(".") ? 1 : 0,
    };
  }

  document.querySelectorAll(".adm-nw-stat-value").forEach((el) => {
    if (el.hasAttribute("data-count")) return;
    const parsed = parseCountText(el.textContent);
    if (!parsed) return;
    el.setAttribute("data-count", String(parsed.value));
    el.setAttribute("data-prefix", parsed.prefix);
    el.setAttribute("data-suffix", parsed.suffix);
    el.setAttribute("data-compact", parsed.compact);
    el.setAttribute("data-decimals", String(parsed.decimals));
    el.textContent = parsed.prefix + "0" + parsed.suffix;
  });

  function formatCount(el, value) {
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const compact = el.getAttribute("data-compact") || "";
    const decimals = Number(el.getAttribute("data-decimals") || "0");
    let display = value;
    let end = suffix;
    if (compact === "k") {
      display = value / 1000;
      end = "k";
    }
    const num =
      decimals > 0 || compact
        ? display.toFixed(decimals > 0 ? decimals : compact ? 1 : 0)
        : Math.round(display).toLocaleString();
    return `${prefix}${num}${end}`;
  }

  function animateCount(el) {
    const target = Number(el.getAttribute("data-count") || "0");
    const duration = reduceMotion ? 0 : 1100;
    const start = performance.now();
    if (duration === 0) {
      el.textContent = formatCount(el, target);
      return;
    }
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatCount(el, target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll(".adm-nw-stat-value[data-count]");
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
        { threshold: 0.35 }
      );
      counters.forEach((el) => obs.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* Hydrate filterable rows ---------------------------------------------- */
  function slug(text) {
    return (text || "").trim().toLowerCase().replace(/\s+/g, "-");
  }

  document.querySelectorAll(".adm-nw-table tbody tr").forEach((row) => {
    const severity = row.querySelector(".adm-nw-severity")?.textContent;
    const statusPill = row.querySelector(".adm-nw-status-pill")?.textContent;
    const chip = row.querySelector(".adm-nw-chip")?.textContent;
    const chips = Array.from(row.querySelectorAll(".adm-nw-chip")).map((c) => c.textContent.trim());
    if (severity) row.dataset.severity = slug(severity);
    if (statusPill) row.dataset.status = slug(statusPill);
    if (chip && !row.dataset.status) row.dataset.status = slug(chip);

    const cells = row.querySelectorAll("td");
    // endpoints: OS often in 3rd column
    if (document.body.dataset.admNwPage === "endpoints" && cells[2]) {
      const os = cells[2].textContent.trim().toLowerCase();
      if (os.includes("windows")) row.dataset.os = "windows";
      else if (os.includes("macos") || os.includes("mac")) row.dataset.os = "macos";
      else if (os.includes("ubuntu") || os.includes("linux")) row.dataset.os = "linux";
      const posture = chips[0] || "";
      row.dataset.posture = slug(posture);
      if (/at risk|patch due/i.test(posture)) row.dataset.status = "at-risk";
      else if (/healthy/i.test(posture)) row.dataset.status = "healthy";
      else if (/offline/i.test(posture)) row.dataset.status = "offline";
      else if (/isolated/i.test(posture)) row.dataset.status = "isolated";
    }

    if (document.body.dataset.admNwPage === "users") {
      const role = chips.find((c) => /admin|analyst|viewer/i.test(c));
      if (role) row.dataset.role = slug(role);
    }

    const owner = cells[3]?.textContent?.trim() || "";
    if (document.body.dataset.admNwPage === "threats") {
      row.dataset.owner = owner.toLowerCase();
      row.dataset.mine = /subrahmanyam poluru/i.test(owner) ? "1" : "0";
    }

    const alertId = row.querySelector(".adm-nw-alert-id")?.textContent?.trim();
    if (alertId) row.dataset.copy = alertId;
  });

  document.querySelectorAll(".adm-nw-device-card").forEach((card) => {
    const meta = card.querySelector(".adm-nw-device-meta")?.textContent || "";
    const typeMatch = meta.match(/^(Firewall|Switch|Router|Collector|Wireless|VPN Gateway)/i);
    const siteMatch = meta.match(/HQ East|HQ West|Edge POP/i);
    if (typeMatch) {
      const t = typeMatch[1].toLowerCase();
      card.dataset.type = t.includes("vpn") ? "vpn" : t.includes("wireless") ? "wireless" : t;
    }
    if (siteMatch) card.dataset.site = slug(siteMatch[0]);
  });

  /* Normalize filter select values --------------------------------------- */
  document.querySelectorAll(".adm-nw-filter-select").forEach((select) => {
    Array.from(select.options).forEach((opt, index) => {
      if (opt.value) return;
      if (index === 0 || /^all\b/i.test(opt.textContent.trim())) {
        opt.value = "";
      } else {
        opt.value = slug(opt.textContent);
      }
    });
  });

  document.querySelectorAll(".adm-nw-tabs .adm-nw-tab").forEach((tab) => {
    if (tab.dataset.tabFilter) return;
    const label = tab.textContent.trim().toLowerCase();
    if (label.includes("all")) tab.dataset.tabFilter = "all";
    else if (label.includes("critical")) tab.dataset.tabFilter = "critical";
    else if (label.includes("assigned")) tab.dataset.tabFilter = "mine";
    else if (label.includes("contained")) tab.dataset.tabFilter = "contained";
    else tab.dataset.tabFilter = slug(label);
  });

  /* Generic filter engine ------------------------------------------------ */
  function setupFilterable(toolbar) {
    const search = toolbar.querySelector(".adm-nw-filter-search input");
    const selects = Array.from(toolbar.querySelectorAll(".adm-nw-filter-select"));
    const panel = toolbar.nextElementSibling;
    const tableRows = panel?.querySelectorAll?.(".adm-nw-table tbody tr");
    const deviceCards = panel?.querySelectorAll?.(".adm-nw-device-card")
      ? panel.querySelectorAll(".adm-nw-device-card")
      : toolbar.parentElement?.querySelectorAll(".adm-nw-device-card");
    const items = tableRows?.length ? Array.from(tableRows) : Array.from(deviceCards || []);
    if (!items.length) return;

    let empty = panel?.querySelector?.(".adm-nw-empty-state");
    if (!empty && panel) {
      empty = document.createElement("p");
      empty.className = "adm-nw-empty-state d-none";
      empty.textContent = "No results match your filters.";
      panel.appendChild(empty);
    }

    let countEl = toolbar.querySelector(".adm-nw-result-count");
    if (!countEl) {
      countEl = document.createElement("p");
      countEl.className = "adm-nw-result-count";
      toolbar.insertAdjacentElement("afterend", countEl);
    }

    const page = document.body.dataset.admNwPage || "";
    let tabFilter = "all";

    function apply() {
      const q = (search?.value || "").trim().toLowerCase();
      const selectValues = selects.map((s) => s.value);
      let visible = 0;

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const searchOk = !q || text.includes(q);
        let filtersOk = true;

        if (page === "threats") {
          const severity = selectValues[0] || "";
          const status = selectValues[1] || "";
          if (severity && item.dataset.severity !== severity) filtersOk = false;
          if (status && item.dataset.status !== status) filtersOk = false;
          if (tabFilter === "critical" && item.dataset.severity !== "critical") filtersOk = false;
          if (tabFilter === "contained" && item.dataset.status !== "contained") filtersOk = false;
          if (tabFilter === "mine" && item.dataset.mine !== "1") filtersOk = false;
        } else if (page === "endpoints") {
          const os = selectValues[0] || "";
          const status = selectValues[1] || "";
          if (os && item.dataset.os !== os) filtersOk = false;
          if (status && item.dataset.status !== status) filtersOk = false;
        } else if (page === "users") {
          const role = selectValues[0] || "";
          if (role && item.dataset.role !== role) filtersOk = false;
        } else if (page === "devices") {
          const type = selectValues[0] || "";
          const site = selectValues[1] || "";
          if (type && item.dataset.type !== type) filtersOk = false;
          if (site && item.dataset.site !== site) filtersOk = false;
        } else {
          selects.forEach((sel) => {
            const val = sel.value;
            if (!val) return;
            const label = (sel.getAttribute("aria-label") || "").toLowerCase();
            if (label.includes("severity") && item.dataset.severity !== val) filtersOk = false;
            if (label.includes("status") && item.dataset.status !== val) filtersOk = false;
            if (label.includes("role") && item.dataset.role !== val) filtersOk = false;
          });
        }

        const show = searchOk && filtersOk;
        item.classList.toggle("adm-nw-hidden", !show);
        if (show) visible += 1;
      });

      countEl.textContent = `Showing ${visible} result${visible === 1 ? "" : "s"}`;
      empty?.classList.toggle("d-none", visible !== 0);
    }

    search?.addEventListener("input", apply);
    selects.forEach((sel) => sel.addEventListener("change", apply));

    const tabs = document.querySelector(".adm-nw-tabs");
    tabs?.querySelectorAll(".adm-nw-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        tabFilter = tab.dataset.tabFilter || "all";
        apply();
      });
    });

    apply();
    return { apply, setTab: (v) => { tabFilter = v; apply(); } };
  }

  document.querySelectorAll(".adm-nw-toolbar").forEach(setupFilterable);

  /* Tabs visual + filter hook -------------------------------------------- */
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

  /* Overview alerts filter ----------------------------------------------- */
  const overviewTable = document.querySelector('body[data-adm-nw-page="overview"] .adm-nw-table');
  if (overviewTable && !document.querySelector(".adm-nw-toolbar")) {
    const panel = overviewTable.closest(".adm-nw-panel");
    const head = panel?.querySelector(".adm-nw-panel-head");
    if (panel && head) {
      const toolbar = document.createElement("div");
      toolbar.className = "adm-nw-toolbar";
      toolbar.innerHTML = `
        <div class="adm-nw-filter-search">
          <i class="bi bi-search" aria-hidden="true"></i>
          <input type="search" class="form-control" id="admNwAlertSearch" placeholder="Filter alerts…" aria-label="Filter alerts" />
        </div>
        <div class="adm-nw-chip-filters" role="group" aria-label="Severity filters">
          <button type="button" class="adm-nw-filter-chip adm-nw-filter-chip-active" data-severity-filter="all">All</button>
          <button type="button" class="adm-nw-filter-chip" data-severity-filter="critical">Critical</button>
          <button type="button" class="adm-nw-filter-chip" data-severity-filter="high">High</button>
          <button type="button" class="adm-nw-filter-chip" data-severity-filter="medium">Medium</button>
          <button type="button" class="adm-nw-filter-chip" data-severity-filter="low">Low</button>
        </div>`;
      head.insertAdjacentElement("afterend", toolbar);

      const rows = overviewTable.querySelectorAll("tbody tr");
      const countEl = document.createElement("p");
      countEl.className = "adm-nw-result-count";
      toolbar.insertAdjacentElement("afterend", countEl);
      const empty = document.createElement("p");
      empty.className = "adm-nw-empty-state d-none";
      empty.textContent = "No alerts match your filters.";
      overviewTable.parentElement.appendChild(empty);

      let sev = "all";
      function applyOverview() {
        const q = (document.getElementById("admNwAlertSearch")?.value || "").trim().toLowerCase();
        let visible = 0;
        rows.forEach((row) => {
          const text = row.textContent.toLowerCase();
          const okSev = sev === "all" || row.dataset.severity === sev;
          const okQ = !q || text.includes(q);
          const show = okSev && okQ;
          row.classList.toggle("adm-nw-hidden", !show);
          if (show) visible += 1;
        });
        countEl.textContent = `Showing ${visible} alert${visible === 1 ? "" : "s"}`;
        empty.classList.toggle("d-none", visible !== 0);
      }

      document.getElementById("admNwAlertSearch")?.addEventListener("input", applyOverview);
      toolbar.querySelectorAll("[data-severity-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sev = btn.getAttribute("data-severity-filter") || "all";
          toolbar.querySelectorAll("[data-severity-filter]").forEach((b) => b.classList.remove("adm-nw-filter-chip-active"));
          btn.classList.add("adm-nw-filter-chip-active");
          applyOverview();
        });
      });
      applyOverview();
    }
  }

  /* Copy helpers --------------------------------------------------------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return false;
    }
  }

  document.querySelectorAll(".adm-nw-alert-id, .adm-nw-code").forEach((el) => {
    el.classList.add("adm-nw-copyable");
    el.title = "Click to copy";
    el.addEventListener("click", async () => {
      const value = el.textContent.trim();
      const ok = await copyText(value);
      showToast(ok ? "Copied" : "Copy failed", ok ? `${value} copied to clipboard.` : "Clipboard permission denied.");
    });
  });

  /* Triage / endpoint actions -------------------------------------------- */
  document.querySelectorAll(".adm-nw-table tbody tr").forEach((row) => {
    row.querySelectorAll("button").forEach((btn) => {
      const label = btn.textContent.trim().toLowerCase();
      if (!label) return;

      btn.addEventListener("click", async () => {
        const alertId = row.querySelector(".adm-nw-alert-id")?.textContent?.trim() || "item";
        const host = row.querySelector("strong")?.textContent?.trim() || alertId;

        if (label === "investigate" || label === "open" || label === "review" || label === "details") {
          showToast("Case opened", `Opening ${alertId} — connect to your case management system.`);
        } else if (label === "assign") {
          row.dataset.owner = "subrahmanyam poluru";
          row.dataset.mine = "1";
          const ownerCell = row.children[3];
          if (ownerCell) ownerCell.textContent = "Subrahmanyam Poluru";
          const status = row.querySelector(".adm-nw-status-pill");
          if (status) {
            status.className = "adm-nw-status-pill adm-nw-status-investigating";
            status.textContent = "Investigating";
            row.dataset.status = "investigating";
          }
          showToast("Assigned", `${alertId} assigned to you (demo).`);
        } else if (label === "isolate") {
          const chip = row.querySelector(".adm-nw-chip");
          if (chip) {
            chip.className = "adm-nw-chip adm-nw-chip-danger";
            chip.textContent = "Isolated";
          }
          row.dataset.status = "isolated";
          btn.textContent = "Release";
          btn.classList.remove("adm-nw-btn-outline");
          btn.classList.add("adm-nw-btn-primary");
          showToast("Endpoint isolated", `${host} network isolation requested (demo).`);
        } else if (label === "release") {
          const chip = row.querySelector(".adm-nw-chip");
          if (chip) {
            chip.className = "adm-nw-chip adm-nw-chip-ok";
            chip.textContent = "Healthy";
          }
          row.dataset.status = "healthy";
          btn.textContent = "Isolate";
          btn.classList.add("adm-nw-btn-outline");
          btn.classList.remove("adm-nw-btn-primary");
          showToast("Endpoint released", `${host} returned to the network (demo).`);
        } else if (label === "ping") {
          showToast("Ping sent", `ICMP probe queued for ${host} (demo).`);
        }
      });
    });
  });

  /* Export CSV ----------------------------------------------------------- */
  function exportTable(table, filename) {
    const rows = Array.from(table.querySelectorAll("tbody tr")).filter((row) => !row.classList.contains("adm-nw-hidden"));
    if (!rows.length) {
      showToast("Nothing to export", "No visible rows match the current filters.");
      return;
    }
    const headers = Array.from(table.querySelectorAll("thead th"))
      .map((th) => th.textContent.trim())
      .filter(Boolean);
    const lines = [headers];
    rows.forEach((row) => {
      lines.push(
        Array.from(row.querySelectorAll("td")).map((td) =>
          td.textContent.replace(/\s+/g, " ").trim()
        )
      );
    });
    const csv = lines
      .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Export ready", `Downloaded ${rows.length} row${rows.length === 1 ? "" : "s"} as CSV.`);
  }

  document.querySelectorAll(".adm-nw-page-actions .btn, .adm-nw-report-actions .btn").forEach((btn) => {
    const label = btn.textContent.toLowerCase();
    if (!/export|download/i.test(label)) return;
    btn.addEventListener("click", () => {
      const table = document.querySelector(".adm-nw-table");
      if (table) {
        const page = document.body.dataset.admNwPage || "secops";
        exportTable(table, `secops-${page}.csv`);
      } else {
        showToast("Export queued", "Demo export prepared — connect to your reporting backend.");
      }
    });
  });

  /* Incident modal ------------------------------------------------------- */
  const incidentModalEl = document.getElementById("admNwIncidentModal");
  const incidentModal =
    incidentModalEl && typeof bootstrap !== "undefined"
      ? bootstrap.Modal.getOrCreateInstance(incidentModalEl)
      : null;
  const incidentForm = document.getElementById("admNwIncidentForm");
  const incidentNotes = document.getElementById("admNwIncidentNotes");
  const incidentCount = document.getElementById("admNwIncidentCount");

  function updateIncidentCount() {
    if (!incidentNotes || !incidentCount) return;
    incidentCount.textContent = `${incidentNotes.value.length} / ${incidentNotes.maxLength || 500}`;
  }
  incidentNotes?.addEventListener("input", updateIncidentCount);
  updateIncidentCount();

  document.querySelectorAll(".adm-nw-page-actions .btn").forEach((btn) => {
    const label = btn.textContent.toLowerCase();
    if (!/new incident|create incident/i.test(label)) return;
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#admNwIncidentModal");
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      incidentModal?.show();
    });
  });

  incidentForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!incidentForm.checkValidity()) {
      incidentForm.classList.add("was-validated");
      return;
    }
    const title = document.getElementById("admNwIncidentTitle")?.value.trim() || "Incident";
    incidentForm.reset();
    incidentForm.classList.remove("was-validated");
    updateIncidentCount();
    incidentModal?.hide();
    showToast("Incident created", `${title} opened in the threat queue (demo).`);
  });

  /* Settings persistence ------------------------------------------------- */
  if (document.body.dataset.admNwPage === "settings") {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
      if (saved) {
        ["orgName", "orgEnv", "orgTz", "orgRetention"].forEach((id) => {
          const el = document.getElementById(id);
          if (el && saved[id] != null) el.value = saved[id];
        });
        document.querySelectorAll(".adm-nw-form-check-input").forEach((input, index) => {
          if (typeof saved.switches?.[index] === "boolean") input.checked = saved.switches[index];
        });
        const envPill = document.querySelector(".adm-nw-env-pill");
        if (envPill && saved.orgName && saved.orgEnv) {
          envPill.innerHTML = `<i class="bi bi-building"></i> ${saved.orgName} · ${saved.orgEnv}`;
        }
      }
    } catch (err) {
      /* ignore */
    }

    document.querySelectorAll(".adm-nw-page-actions .btn").forEach((btn) => {
      const label = btn.textContent.toLowerCase();
      if (label.includes("save")) {
        btn.addEventListener("click", () => {
          const data = {
            orgName: document.getElementById("orgName")?.value || "",
            orgEnv: document.getElementById("orgEnv")?.value || "",
            orgTz: document.getElementById("orgTz")?.value || "",
            orgRetention: document.getElementById("orgRetention")?.value || "",
            switches: Array.from(document.querySelectorAll(".adm-nw-form-check-input")).map((i) => i.checked),
          };
          try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
            const envPill = document.querySelector(".adm-nw-env-pill");
            if (envPill) {
              envPill.innerHTML = `<i class="bi bi-building"></i> ${data.orgName} · ${data.orgEnv}`;
            }
            showToast("Settings saved", "Tenant preferences stored in this browser.");
          } catch (err) {
            showToast("Save failed", "Local storage is unavailable.");
          }
        });
      }
      if (label.includes("cancel")) {
        btn.addEventListener("click", () => {
          showToast("Changes discarded", "Reloading last saved settings.");
          window.location.reload();
        });
      }
    });
  }

  /* Reports generate ----------------------------------------------------- */
  document.querySelectorAll(".adm-nw-report-actions .btn, .adm-nw-page-actions .btn").forEach((btn) => {
    const label = btn.textContent.toLowerCase();
    if (!/generate|run report|schedule/i.test(label)) return;
    btn.addEventListener("click", () => {
      showToast("Report queued", "Demo report generation started — connect to your reporting API.");
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
        animation: reduceMotion ? false : undefined,
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
            backgroundColor: [COLORS.primary, COLORS.secondary, COLORS.warn, COLORS.muted],
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
})();
