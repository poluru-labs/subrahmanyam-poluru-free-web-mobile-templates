/**
 * BrightPath Foundation — Nonprofit Impact Dashboard
 * Counters, scroll reveal, progress bars, report filters
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Smooth-scroll nav: close mobile menu + active link -------------------- */
  const navCollapseEl = document.getElementById("npNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.np-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) {
        navCollapse.hide();
      }
    });
  });

  const sectionIds = ["home", "impact", "programs", "geography", "reports", "stories", "partners", "donate"];
  const navLinks = Array.from(document.querySelectorAll(".np-navbar .nav-link"));

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
  const revealEls = document.querySelectorAll(".np-reveal");

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("np-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("np-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("np-visible"));
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

  const counters = document.querySelectorAll(".np-counter");
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(animateCounter);
  }

  const impactSection = document.getElementById("impact");
  if (impactSection && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          startCounters();
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );
    counterObserver.observe(impactSection);
  } else {
    startCounters();
  }

  /* Progress bars --------------------------------------------------------- */
  const progressBars = document.querySelectorAll(".np-progress .progress-bar[data-progress]");

  function fillProgress(bar) {
    const value = bar.getAttribute("data-progress") || "0";
    bar.style.width = `${value}%`;
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

  /* Annual report year filter --------------------------------------------- */
  const filterButtons = document.querySelectorAll(".np-filter-btn");
  const reportCards = document.querySelectorAll("#npReportGrid > [data-year]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter") || "all";

      filterButtons.forEach((btn) => btn.classList.remove("np-filter-active"));
      button.classList.add("np-filter-active");

      reportCards.forEach((card) => {
        const year = card.getAttribute("data-year");
        const show = filter === "all" || year === filter;
        card.classList.toggle("np-report-hidden", !show);
      });
    });
  });
})();
