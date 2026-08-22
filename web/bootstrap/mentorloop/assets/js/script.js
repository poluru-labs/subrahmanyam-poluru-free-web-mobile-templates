/**
 * MentorLoop — Mentorship Network Portal
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toastEl = document.getElementById("mlpToast");
  const toastBody = document.getElementById("mlpToastBody");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2800 })
      : null;

  function showToast(message) {
    if (toastBody) toastBody.textContent = message;
    toast?.show();
  }

  window.mlpShowToast = showToast;

  /* Mobile nav: close on link click */
  const navCollapseEl = document.getElementById("mlpNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll("#mlpNav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
    });
  });

  /* Back to top */
  const backTop = document.getElementById("mlpBackTop");
  function syncBackTop() {
    backTop?.classList.toggle("is-visible", window.scrollY > 420);
  }
  window.addEventListener("scroll", syncBackTop, { passive: true });
  syncBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".mlp-reveal");
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("mlp-visible"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("mlp-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("mlp-visible"));
  }

  /* Directory filters (mentors / mentees) */
  function setupDirectory(options) {
    const {
      searchId,
      skillId,
      focusId,
      itemSelector,
      emptyId,
    } = options;

    const search = document.getElementById(searchId);
    const skill = document.getElementById(skillId);
    const focus = document.getElementById(focusId);
    const empty = document.getElementById(emptyId);
    const items = Array.from(document.querySelectorAll(itemSelector));
    if (!items.length) return;

    function apply() {
      const q = (search?.value || "").trim().toLowerCase();
      const skillVal = (skill?.value || "all").toLowerCase();
      const focusVal = (focus?.value || "all").toLowerCase();
      let visible = 0;

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const itemSkill = (item.getAttribute("data-skills") || "").toLowerCase();
        const itemFocus = (item.getAttribute("data-focus") || "").toLowerCase();
        const matchQ = !q || text.includes(q);
        const matchSkill = skillVal === "all" || itemSkill.includes(skillVal);
        const matchFocus = focusVal === "all" || itemFocus.includes(focusVal);
        const show = matchQ && matchSkill && matchFocus;
        item.classList.toggle("d-none", !show);
        if (show) visible += 1;
      });

      empty?.classList.toggle("is-visible", visible === 0);
    }

    search?.addEventListener("input", apply);
    skill?.addEventListener("change", apply);
    focus?.addEventListener("change", apply);
  }

  setupDirectory({
    searchId: "mlpMentorSearch",
    skillId: "mlpMentorSkill",
    focusId: "mlpMentorFocus",
    itemSelector: "[data-mentor-card]",
    emptyId: "mlpMentorEmpty",
  });

  setupDirectory({
    searchId: "mlpMenteeSearch",
    skillId: "mlpMenteeSkill",
    focusId: "mlpMenteeFocus",
    itemSelector: "[data-mentee-card]",
    emptyId: "mlpMenteeEmpty",
  });

  /* Matching wizard */
  const wizard = document.getElementById("mlpWizard");
  if (wizard) {
    const panes = Array.from(wizard.querySelectorAll("[data-wizard-pane]"));
    const chips = Array.from(document.querySelectorAll(".mlp-wizard-chip"));
    let step = 0;

    function render() {
      panes.forEach((pane, i) => pane.classList.toggle("d-none", i !== step));
      chips.forEach((chip, i) => {
        chip.classList.toggle("is-active", i === step);
        chip.classList.toggle("is-done", i < step);
      });
    }

    wizard.querySelectorAll("[data-wizard-next]").forEach((btn) => {
      btn.addEventListener("click", () => {
        step = Math.min(step + 1, panes.length - 1);
        render();
      });
    });

    wizard.querySelectorAll("[data-wizard-prev]").forEach((btn) => {
      btn.addEventListener("click", () => {
        step = Math.max(step - 1, 0);
        render();
      });
    });

    wizard.querySelector("[data-wizard-finish]")?.addEventListener("click", () => {
      const score = document.getElementById("mlpMatchScore");
      if (score) score.textContent = "92%";
      showToast("Match preferences saved — top mentors ready");
      step = panes.length - 1;
      render();
    });

    render();
  }

  /* Session booking */
  const sessionForm = document.getElementById("mlpSessionForm");
  sessionForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!sessionForm.checkValidity()) {
      sessionForm.classList.add("was-validated");
      return;
    }
    showToast("Session request sent — awaiting confirmation");
    sessionForm.reset();
    sessionForm.classList.remove("was-validated");
  });

  document.querySelectorAll("[data-session-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-session-action");
      showToast(action === "confirm" ? "Session confirmed" : "Reminder sent");
    });
  });

  /* Outcomes form + localStorage draft */
  const outcomeForm = document.getElementById("mlpOutcomeForm");
  const OUTCOME_KEY = "mlp-outcome-draft-v1";

  if (outcomeForm) {
    try {
      const saved = JSON.parse(localStorage.getItem(OUTCOME_KEY) || "null");
      if (saved) {
        Object.entries(saved).forEach(([name, value]) => {
          const field = outcomeForm.elements.namedItem(name);
          if (field && "value" in field) field.value = value;
        });
      }
    } catch {
      /* ignore */
    }

    const persist = () => {
      const data = {};
      Array.from(outcomeForm.elements).forEach((el) => {
        if (el.name && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) {
          data[el.name] = el.value;
        }
      });
      localStorage.setItem(OUTCOME_KEY, JSON.stringify(data));
    };

    outcomeForm.addEventListener("input", persist);
    outcomeForm.addEventListener("change", persist);

    outcomeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!outcomeForm.checkValidity()) {
        outcomeForm.classList.add("was-validated");
        return;
      }
      localStorage.removeItem(OUTCOME_KEY);
      showToast("Outcome logged — thanks for closing the loop");
      outcomeForm.reset();
      outcomeForm.classList.remove("was-validated");
    });
  }

  /* Contact form */
  document.getElementById("mlpContactForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    showToast("Message sent — we will reply soon");
    form.reset();
    form.classList.remove("was-validated");
  });

  /* Request / connect buttons on profiles */
  document.querySelectorAll("[data-connect]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-connect") || "member";
      showToast(`Connection request sent to ${name}`);
    });
  });

  /* Docs nav active state */
  const docsSections = document.querySelectorAll(".mlp-docs-content section[id]");
  const docsLinks = document.querySelectorAll(".mlp-docs-nav a[href^='#']");
  if (docsSections.length && docsLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    docsLinks.forEach((link) => {
      const id = link.getAttribute("href")?.slice(1);
      if (id) map.set(id, link);
    });
    const docsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          docsLinks.forEach((l) => l.classList.remove("is-active"));
          map.get(entry.target.id)?.classList.add("is-active");
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    docsSections.forEach((section) => docsObserver.observe(section));
  }
})();
