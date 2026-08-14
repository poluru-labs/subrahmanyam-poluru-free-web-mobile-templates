/**
 * Clearlane — Startup KPI Board
 * Counters, progress bars, period chips, scroll reveal, active nav
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const counters = document.querySelectorAll(".skb-counter");

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
