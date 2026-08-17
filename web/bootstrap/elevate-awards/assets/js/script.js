/**
 * Elevate Awards — Nomination & Judging Platform
 * Counters, reveal, filters, countdown, scorecard, form, FAQ helpers
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DRAFT_KEY = "ea-nomination-draft";

  /* Toast helper ---------------------------------------------------------- */
  const toastEl = document.getElementById("eaToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("eaToastTitle");
    const bodyEl = document.getElementById("eaToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  /* Mobile nav close on link click ---------------------------------------- */
  const navCollapseEl = document.getElementById("eaNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.ea-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
    });
  });

  /* Active nav ------------------------------------------------------------ */
  const sectionIds = [
    "home",
    "overview",
    "workflow",
    "eligibility",
    "categories",
    "reviewers",
    "scoring",
    "finalists",
    "insights",
    "nominate",
    "faq",
    "launch",
  ];
  const navLinks = Array.from(document.querySelectorAll(".ea-navbar .nav-link"));

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
  const backTop = document.getElementById("eaBackTop");
  function updateBackTop() {
    if (!backTop) return;
    backTop.classList.toggle("is-visible", window.scrollY > 480);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* Scroll reveal --------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".ea-reveal");

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("ea-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("ea-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("ea-visible"));
  }

  /* Counters -------------------------------------------------------------- */
  function animateCounter(el) {
    const target = Number(el.getAttribute("data-target") || "0");
    const duration = 1400;
    const start = performance.now();

    if (reduceMotion) {
      el.textContent = target.toLocaleString();
      return;
    }

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    document.querySelectorAll(".ea-counter").forEach(animateCounter);
  }

  const overview = document.getElementById("overview");
  if (overview && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          startCounters();
          observer.disconnect();
        });
      },
      { threshold: 0.3 }
    );
    counterObserver.observe(overview);
  } else {
    startCounters();
  }

  /* Progress bars --------------------------------------------------------- */
  const progressBars = document.querySelectorAll(".ea-progress .progress-bar[data-progress]");

  function fillProgress(bar) {
    bar.style.width = `${bar.getAttribute("data-progress") || 0}%`;
  }

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
      { threshold: 0.4 }
    );
    progressBars.forEach((bar) => progressObserver.observe(bar));
  } else {
    progressBars.forEach(fillProgress);
  }

  /* Deadline countdown ---------------------------------------------------- */
  const countdown = document.getElementById("eaCountdown");
  if (countdown) {
    const deadline = new Date(countdown.getAttribute("data-deadline") || "").getTime();
    const daysEl = document.getElementById("eaDays");
    const hoursEl = document.getElementById("eaHours");
    const minsEl = document.getElementById("eaMins");
    const secsEl = document.getElementById("eaSecs");

    function pad(n) {
      return String(Math.max(0, n)).padStart(2, "0");
    }

    function tickCountdown() {
      const diff = deadline - Date.now();
      if (!Number.isFinite(deadline) || diff <= 0) {
        if (daysEl) daysEl.textContent = "00";
        if (hoursEl) hoursEl.textContent = "00";
        if (minsEl) minsEl.textContent = "00";
        if (secsEl) secsEl.textContent = "00";
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minsEl) minsEl.textContent = pad(mins);
      if (secsEl) secsEl.textContent = pad(secs);
    }

    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  /* Category filters + search --------------------------------------------- */
  const filterButtons = document.querySelectorAll(".ea-filter-btn[data-filter]");
  const categoryCards = document.querySelectorAll("#eaCategoryGrid > [data-status]");
  const categorySearch = document.getElementById("eaCategorySearch");
  const categoryCount = document.getElementById("eaCategoryCount");
  const categoryEmpty = document.getElementById("eaCategoryEmpty");
  let activeCategoryFilter = "all";

  function applyCategoryFilters() {
    const query = (categorySearch?.value || "").trim().toLowerCase();
    let visible = 0;

    categoryCards.forEach((card) => {
      const status = card.getAttribute("data-status");
      const name = (card.getAttribute("data-name") || card.textContent || "").toLowerCase();
      const statusOk = activeCategoryFilter === "all" || status === activeCategoryFilter;
      const searchOk = !query || name.includes(query);
      const show = statusOk && searchOk;
      card.classList.toggle("ea-hidden", !show);
      if (show) visible += 1;
    });

    if (categoryCount) {
      categoryCount.textContent = `Showing ${visible} categor${visible === 1 ? "y" : "ies"}`;
    }
    categoryEmpty?.classList.toggle("d-none", visible !== 0);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategoryFilter = button.getAttribute("data-filter") || "all";
      filterButtons.forEach((btn) => btn.classList.remove("ea-filter-active"));
      button.classList.add("ea-filter-active");
      applyCategoryFilters();
    });
  });

  categorySearch?.addEventListener("input", applyCategoryFilters);

  /* Screening table search + filter --------------------------------------- */
  const tableSearch = document.getElementById("eaTableSearch");
  const tableFilterBtns = document.querySelectorAll("[data-table-filter]");
  const tableRows = document.querySelectorAll("#eaScreeningTable tbody tr");
  const tableEmpty = document.getElementById("eaTableEmpty");
  let activeTableFilter = "all";

  function applyTableFilters() {
    const query = (tableSearch?.value || "").trim().toLowerCase();
    let visible = 0;

    tableRows.forEach((row) => {
      const status = row.getAttribute("data-status") || "";
      const text = row.textContent.toLowerCase();
      const statusOk = activeTableFilter === "all" || status === activeTableFilter;
      const searchOk = !query || text.includes(query);
      const show = statusOk && searchOk;
      row.classList.toggle("ea-hidden", !show);
      if (show) visible += 1;
    });

    tableEmpty?.classList.toggle("d-none", visible !== 0);
  }

  tableFilterBtns.forEach((button) => {
    button.addEventListener("click", () => {
      activeTableFilter = button.getAttribute("data-table-filter") || "all";
      tableFilterBtns.forEach((btn) => btn.classList.remove("ea-filter-active"));
      button.classList.add("ea-filter-active");
      applyTableFilters();
    });
  });

  tableSearch?.addEventListener("input", applyTableFilters);

  /* Copy nomination ID ---------------------------------------------------- */
  document.querySelectorAll(".ea-copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(value);
        showToast("Copied", `${value} copied to clipboard.`);
      } catch (err) {
        showToast("Copy failed", "Unable to copy in this browser.");
      }
    });
  });

  /* Dynamic nominee modal ------------------------------------------------- */
  const nomineeModalEl = document.getElementById("eaNomineeModal");
  const nomineeModal =
    nomineeModalEl && typeof bootstrap !== "undefined"
      ? bootstrap.Modal.getOrCreateInstance(nomineeModalEl)
      : null;

  const statusClassMap = {
    eligible: "ea-badge-ok",
    pending: "ea-badge-pending",
    review: "ea-badge-review",
  };

  const statusLabelMap = {
    eligible: "Eligible",
    pending: "Pending",
    review: "Under review",
  };

  document.querySelectorAll(".ea-preview-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      if (!row) return;

      const status = row.getAttribute("data-status") || "eligible";
      document.getElementById("eaModalId").textContent = row.getAttribute("data-id") || "";
      document.getElementById("eaModalOrg").textContent = row.getAttribute("data-org") || "";
      document.getElementById("eaModalMeta").textContent = `${row.getAttribute("data-cat") || ""} · ${row.getAttribute("data-loc") || ""}`;
      document.getElementById("eaModalNote").textContent = row.getAttribute("data-note") || "";
      document.getElementById("eaModalReviews").textContent = row.getAttribute("data-reviews") || "";

      const statusEl = document.getElementById("eaModalStatus");
      if (statusEl) {
        statusEl.className = `ea-badge ${statusClassMap[status] || "ea-badge-ok"}`;
        statusEl.textContent = statusLabelMap[status] || "Eligible";
      }

      nomineeModal?.show();
    });
  });

  /* Interactive scorecard ------------------------------------------------- */
  const scoreRows = document.querySelectorAll("#eaScorecard .ea-score-row");
  const compositeEl = document.getElementById("eaCompositeScore");
  const defaults = [];

  function updateScoreRow(row) {
    const range = row.querySelector(".ea-score-range");
    const valEl = row.querySelector(".ea-score-val");
    const bar = row.querySelector(".progress-bar");
    const max = Number(row.getAttribute("data-max") || range?.max || 1);
    const value = Number(range?.value || 0);
    if (valEl) valEl.textContent = String(value);
    if (bar) {
      const pct = Math.round((value / max) * 100);
      bar.style.width = `${pct}%`;
      bar.setAttribute("data-progress", String(pct));
    }
  }

  function updateComposite() {
    let total = 0;
    scoreRows.forEach((row) => {
      const range = row.querySelector(".ea-score-range");
      total += Number(range?.value || 0);
    });
    if (compositeEl) compositeEl.textContent = total.toFixed(1);
  }

  scoreRows.forEach((row) => {
    const range = row.querySelector(".ea-score-range");
    defaults.push(range ? range.value : "0");
    range?.addEventListener("input", () => {
      updateScoreRow(row);
      updateComposite();
    });
  });

  document.getElementById("eaResetScores")?.addEventListener("click", () => {
    scoreRows.forEach((row, index) => {
      const range = row.querySelector(".ea-score-range");
      if (range) range.value = defaults[index] || "0";
      updateScoreRow(row);
    });
    updateComposite();
    showToast("Scorecard reset", "Demo scores restored to defaults.");
  });

  /* Nominate from category ------------------------------------------------ */
  const categorySelect = document.getElementById("eaCategory");

  document.querySelectorAll(".ea-nominate-category").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category") || "";
      if (categorySelect && category) {
        categorySelect.value = category;
        categorySelect.classList.remove("is-invalid");
      }
      document.getElementById("nominate")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      showToast("Category selected", `${category} is ready on the nomination form.`);
    });
  });

  /* Nomination form: validation, draft, char count ------------------------ */
  const form = document.getElementById("eaNominationForm");
  const summary = document.getElementById("eaSummary");
  const charCount = document.getElementById("eaCharCount");
  const formStatus = document.getElementById("eaFormStatus");
  const saveDraftBtn = document.getElementById("eaSaveDraft");

  function updateCharCount() {
    if (!summary || !charCount) return;
    charCount.textContent = `${summary.value.length} / ${summary.maxLength || 600}`;
  }

  function collectDraft() {
    return {
      nominee: document.getElementById("eaNominee")?.value || "",
      category: categorySelect?.value || "",
      nominator: document.getElementById("eaNominator")?.value || "",
      email: document.getElementById("eaEmail")?.value || "",
      summary: summary?.value || "",
      confirm: Boolean(document.getElementById("eaConfirm")?.checked),
    };
  }

  function applyDraft(draft) {
    if (!draft) return;
    const nominee = document.getElementById("eaNominee");
    const nominator = document.getElementById("eaNominator");
    const email = document.getElementById("eaEmail");
    const confirm = document.getElementById("eaConfirm");
    if (nominee) nominee.value = draft.nominee || "";
    if (categorySelect && draft.category) categorySelect.value = draft.category;
    if (nominator) nominator.value = draft.nominator || "";
    if (email) email.value = draft.email || "";
    if (summary) summary.value = draft.summary || "";
    if (confirm) confirm.checked = Boolean(draft.confirm);
    updateCharCount();
  }

  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) applyDraft(JSON.parse(saved));
  } catch (err) {
    /* ignore corrupt draft */
  }

  summary?.addEventListener("input", updateCharCount);
  updateCharCount();

  saveDraftBtn?.addEventListener("click", () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(collectDraft()));
      if (formStatus) formStatus.textContent = "Draft saved in this browser.";
      showToast("Draft saved", "Your nomination draft was stored locally.");
    } catch (err) {
      showToast("Save failed", "Local storage is unavailable in this browser.");
    }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      if (formStatus) formStatus.textContent = "Please complete the required fields.";
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const original = button ? button.innerHTML : "";
    if (button) {
      button.disabled = true;
      button.innerHTML = '<i class="bi bi-check2-circle me-2"></i>Nomination received';
    }

    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      /* ignore */
    }

    if (formStatus) formStatus.textContent = "Thanks — your nomination was received (demo).";
    showToast("Nomination submitted", "Demo confirmation — connect this form to your API when ready.");

    setTimeout(() => {
      form.reset();
      form.classList.remove("was-validated");
      updateCharCount();
      if (button) {
        button.disabled = false;
        button.innerHTML = original;
      }
      if (formStatus) formStatus.textContent = "";
    }, 2200);
  });
})();
