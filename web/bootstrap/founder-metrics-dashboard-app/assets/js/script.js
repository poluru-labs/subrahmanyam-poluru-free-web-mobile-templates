/**
 * Blvd — Founder Metrics Dashboard
 * Counters, progress bars, period chips, scroll reveal, active nav
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nav: close mobile menu + active section ------------------------------- */
  const navCollapseEl = document.getElementById("fmNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.fm-navbar a[href^="#"]').forEach((link) => {
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
    "finance",
    "customers",
    "product",
    "updates",
    "backers",
    "cta",
  ];
  const navLinks = Array.from(document.querySelectorAll(".fm-navbar .nav-link"));

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

  /* Scroll reveal --------------------------------------------------------- */
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

  /* Animated counters ----------------------------------------------------- */
  function animateCounter(el) {
    const target = Number(el.getAttribute("data-target") || "0");
    const decimals = Number(el.getAttribute("data-decimals") || "0");
    const duration = 1400;
    const start = performance.now();

    if (reduceMotion) {
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

  const counters = document.querySelectorAll(".fm-counter");

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => animateCounter(el));
  }

  /* Progress bars on scroll ----------------------------------------------- */
  function fillProgress(bar) {
    const value = Number(bar.getAttribute("data-progress") || "0");
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  }

  const progressBars = document.querySelectorAll(".fm-bar .progress-bar[data-progress]");

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

  /* Period chips + monthly/quarterly toggle ------------------------------- */
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

  periodChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      periodChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activePeriod = chip.getAttribute("data-period") || activePeriod;
      updatePeriodLabel();
    });
  });

  viewChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      viewChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeView = chip.getAttribute("data-view") || activeView;
      updatePeriodLabel();
    });
  });
})();
