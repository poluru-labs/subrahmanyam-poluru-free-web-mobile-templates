/**
 * ResearcherHub — Expert Portfolio
 * AOS init, counters, nav, publication filters, contact form
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* AOS ------------------------------------------------------------------- */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: reduceMotion,
    });
  }

  /* Nav: close mobile menu + active section ------------------------------- */
  const navCollapseEl = document.getElementById("rhNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.rh-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) {
        navCollapse.hide();
      }
    });
  });

  const sectionIds = [
    "home",
    "about",
    "impact",
    "publications",
    "talks",
    "media",
    "awards",
    "service-review",
    "teaching",
    "contact",
  ];
  const navLinks = Array.from(document.querySelectorAll(".rh-navbar .nav-link"));

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

  const counters = document.querySelectorAll(".rh-counter");

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

  /* Publication filters --------------------------------------------------- */
  const filterChips = document.querySelectorAll(".rh-filter-chips .rh-chip");
  const pubCards = document.querySelectorAll(".rh-pub-card");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      const filter = chip.getAttribute("data-filter") || "all";

      pubCards.forEach((card) => {
        const type = card.getAttribute("data-type");
        const show = filter === "all" || type === filter;
        card.classList.toggle("is-hidden", !show);
      });

      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    });
  });

  /* Contact form (demo) --------------------------------------------------- */
  const form = document.getElementById("rhContactForm");
  const note = document.getElementById("rhFormNote");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (note) note.textContent = "Please complete the required fields.";
        return;
      }

      if (note) {
        note.textContent = "Thanks — your message is ready to send (demo form).";
      }
      form.reset();
    });
  }
})();
