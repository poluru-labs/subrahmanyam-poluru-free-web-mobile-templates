/**
 * Elevate Awards — Nomination & Judging Platform
 * Counters, scroll reveal, progress bars, category filters, nav state
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* Category filters ------------------------------------------------------ */
  const filterButtons = document.querySelectorAll(".ea-filter-btn");
  const categoryCards = document.querySelectorAll("#eaCategoryGrid > [data-status]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter") || "all";
      filterButtons.forEach((btn) => btn.classList.remove("ea-filter-active"));
      button.classList.add("ea-filter-active");

      categoryCards.forEach((card) => {
        const status = card.getAttribute("data-status");
        const show = filter === "all" || status === filter;
        card.classList.toggle("ea-hidden", !show);
      });
    });
  });

  /* Nomination form demo handler ------------------------------------------ */
  const form = document.querySelector(".ea-form-card");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="bi bi-check2-circle me-2"></i>Nomination received';
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = original;
      form.reset();
    }, 2200);
  });
})();
