/**
 * BrightPath Foundation — Nonprofit Impact Dashboard
 * Counters, filters, donate/volunteer forms, regions, share, toasts
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Toast ---------------------------------------------------------------- */
  const toastEl = document.getElementById("npToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3400 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("npToastTitle");
    const bodyEl = document.getElementById("npToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  /* Navbar scrolled state ------------------------------------------------ */
  const navbar = document.getElementById("npNavbar");
  function updateNavbar() {
    navbar?.classList.toggle("np-navbar-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

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

  const sectionIds = ["home", "impact", "programs", "geography", "reports", "stories", "partners", "donate", "faq"];
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

  /* Back to top ---------------------------------------------------------- */
  const backTop = document.getElementById("npBackTop");
  function updateBackTop() {
    backTop?.classList.toggle("np-back-top-visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

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

  /* Program filter ------------------------------------------------------- */
  const programBtns = document.querySelectorAll("[data-program-filter]");
  const programCards = document.querySelectorAll("#npProgramGrid > [data-program]");
  const programCount = document.getElementById("npProgramCount");
  const programEmpty = document.getElementById("npProgramEmpty");
  let programFilter = "all";

  function applyProgramFilter() {
    let visible = 0;
    programCards.forEach((card) => {
      const show = programFilter === "all" || card.getAttribute("data-program") === programFilter;
      card.classList.toggle("np-hidden", !show);
      if (show) visible += 1;
    });
    if (programCount) {
      programCount.textContent = `Showing ${visible} program${visible === 1 ? "" : "s"}`;
    }
    programEmpty?.classList.toggle("d-none", visible !== 0);
  }

  programBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      programFilter = btn.getAttribute("data-program-filter") || "all";
      programBtns.forEach((b) => b.classList.remove("np-chip-active"));
      btn.classList.add("np-chip-active");
      applyProgramFilter();
    });
  });
  if (programCards.length) applyProgramFilter();

  /* Story filter --------------------------------------------------------- */
  const storyBtns = document.querySelectorAll("[data-story-filter]");
  const storyCards = document.querySelectorAll("#npStoryGrid > [data-story]");
  const storyEmpty = document.getElementById("npStoryEmpty");
  let storyFilter = "all";

  function applyStoryFilter() {
    let visible = 0;
    storyCards.forEach((card) => {
      const show = storyFilter === "all" || card.getAttribute("data-story") === storyFilter;
      card.classList.toggle("np-hidden", !show);
      if (show) visible += 1;
    });
    storyEmpty?.classList.toggle("d-none", visible !== 0);
  }

  storyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      storyFilter = btn.getAttribute("data-story-filter") || "all";
      storyBtns.forEach((b) => b.classList.remove("np-chip-active"));
      btn.classList.add("np-chip-active");
      applyStoryFilter();
    });
  });
  if (storyCards.length) applyStoryFilter();

  /* Annual report year + search ------------------------------------------ */
  const filterButtons = document.querySelectorAll(".np-filter-btn");
  const reportCards = document.querySelectorAll("#npReportGrid > [data-year]");
  const reportSearch = document.getElementById("npReportSearch");
  const reportCount = document.getElementById("npReportCount");
  const reportEmpty = document.getElementById("npReportEmpty");
  let yearFilter = "all";

  function applyReportFilters() {
    const q = (reportSearch?.value || "").trim().toLowerCase();
    let visible = 0;
    reportCards.forEach((card) => {
      const year = card.getAttribute("data-year");
      const text = card.textContent.toLowerCase();
      const yearOk = yearFilter === "all" || year === yearFilter;
      const searchOk = !q || text.includes(q);
      const show = yearOk && searchOk;
      card.classList.toggle("np-report-hidden", !show);
      card.classList.toggle("np-hidden", !show);
      if (show) visible += 1;
    });
    if (reportCount) {
      reportCount.textContent = `Showing ${visible} report${visible === 1 ? "" : "s"}`;
    }
    reportEmpty?.classList.toggle("d-none", visible !== 0);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      yearFilter = button.getAttribute("data-filter") || "all";
      filterButtons.forEach((btn) => btn.classList.remove("np-filter-active"));
      button.classList.add("np-filter-active");
      applyReportFilters();
    });
  });
  reportSearch?.addEventListener("input", applyReportFilters);
  if (reportCards.length) applyReportFilters();

  document.querySelectorAll(".np-download-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const name = btn.getAttribute("data-report") || "Report";
      showToast("Download started", `${name} — demo download. Connect to your document CDN.`);
    });
  });

  /* Regions + map pins --------------------------------------------------- */
  const regionItems = document.querySelectorAll("#npRegionList > [data-region]");
  const mapPins = document.querySelectorAll(".np-map-pin[data-region]");
  const regionSearch = document.getElementById("npRegionSearch");
  const regionEmpty = document.getElementById("npRegionEmpty");
  const mapHint = document.getElementById("npMapHint");

  const regionCopy = {
    pacific: "Pacific Northwest · 12 active sites",
    midwest: "Midwest Heartland · 9 active sites",
    southeast: "Southeast Corridor · 8 active sites",
    southwest: "Southwest · 7 active sites",
    northeast: "Northeast · 6 active sites",
  };

  function selectRegion(id) {
    regionItems.forEach((item) => {
      item.classList.toggle("np-region-active", item.getAttribute("data-region") === id);
    });
    mapPins.forEach((pin) => {
      pin.classList.toggle("np-pin-active", pin.getAttribute("data-region") === id);
    });
    if (mapHint && id) {
      mapHint.textContent = regionCopy[id] || "Region selected";
    }
  }

  function applyRegionSearch() {
    const q = (regionSearch?.value || "").trim().toLowerCase();
    let visible = 0;
    regionItems.forEach((item) => {
      const show = !q || item.textContent.toLowerCase().includes(q);
      item.classList.toggle("np-hidden", !show);
      if (show) visible += 1;
    });
    regionEmpty?.classList.toggle("d-none", visible !== 0);
  }

  regionItems.forEach((item) => {
    const activate = () => selectRegion(item.getAttribute("data-region"));
    item.addEventListener("click", activate);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
  mapPins.forEach((pin) => {
    pin.addEventListener("click", () => selectRegion(pin.getAttribute("data-region")));
  });
  regionSearch?.addEventListener("input", applyRegionSearch);

  /* Gift impact calculator ----------------------------------------------- */
  const giftInput = document.getElementById("npGiftAmount");
  const giftImpact = document.getElementById("npGiftImpact");
  const donateAmount = document.getElementById("npDonateAmount");

  function updateGiftImpact(amount) {
    const value = Math.max(0, Number(amount) || 0);
    const meals = Math.floor(value * 2);
    const sessions = Math.max(1, Math.floor(value / 25));
    const visits = Math.max(1, Math.floor(value / 40));
    if (giftImpact) {
      giftImpact.innerHTML = `$${value.toLocaleString()} can provide about <strong>${meals.toLocaleString()} meals</strong>, <strong>${sessions} tutoring session${sessions === 1 ? "" : "s"}</strong>, or <strong>${visits} clinic visit${visits === 1 ? "" : "s"}</strong>.`;
    }
  }

  function setGiftAmount(amount, syncDonate) {
    if (giftInput) giftInput.value = String(amount);
    document.querySelectorAll("[data-amount]").forEach((btn) => {
      btn.classList.toggle("np-amount-active", Number(btn.getAttribute("data-amount")) === Number(amount));
    });
    updateGiftImpact(amount);
    if (syncDonate && donateAmount) {
      donateAmount.value = String(amount);
      document.querySelectorAll("[data-donate-amount]").forEach((btn) => {
        btn.classList.toggle("np-amount-active", Number(btn.getAttribute("data-donate-amount")) === Number(amount));
      });
    }
  }

  giftInput?.addEventListener("input", () => setGiftAmount(giftInput.value, true));
  document.querySelectorAll("[data-amount]").forEach((btn) => {
    btn.addEventListener("click", () => setGiftAmount(btn.getAttribute("data-amount"), true));
  });
  document.querySelectorAll("[data-donate-amount]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = btn.getAttribute("data-donate-amount");
      if (donateAmount) donateAmount.value = String(amount);
      document.querySelectorAll("[data-donate-amount]").forEach((b) => {
        b.classList.toggle("np-amount-active", b === btn);
      });
      setGiftAmount(amount, false);
    });
  });
  donateAmount?.addEventListener("input", () => setGiftAmount(donateAmount.value, false));
  setGiftAmount(giftInput?.value || 50, true);

  /* Donate form ---------------------------------------------------------- */
  const donateForm = document.getElementById("npDonateForm");
  const donateModalEl = document.getElementById("npDonateModal");
  const donateModal =
    donateModalEl && typeof bootstrap !== "undefined"
      ? bootstrap.Modal.getOrCreateInstance(donateModalEl)
      : null;

  donateForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!donateForm.checkValidity()) {
      donateForm.classList.add("was-validated");
      return;
    }
    const amount = donateAmount?.value || "0";
    const name = document.getElementById("npDonateName")?.value.trim() || "Friend";
    donateForm.reset();
    donateForm.classList.remove("was-validated");
    setGiftAmount(50, true);
    donateModal?.hide();
    showToast("Thank you!", `${name}, your $${amount} demo gift was recorded. Connect a payment provider to go live.`);
  });

  /* Volunteer form ------------------------------------------------------- */
  const volunteerForm = document.getElementById("npVolunteerForm");
  const volunteerModalEl = document.getElementById("npVolunteerModal");
  const volunteerModal =
    volunteerModalEl && typeof bootstrap !== "undefined"
      ? bootstrap.Modal.getOrCreateInstance(volunteerModalEl)
      : null;

  volunteerForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!volunteerForm.checkValidity()) {
      volunteerForm.classList.add("was-validated");
      return;
    }
    const name = document.getElementById("npVolName")?.value.trim() || "Friend";
    volunteerForm.reset();
    volunteerForm.classList.remove("was-validated");
    volunteerModal?.hide();
    showToast("Interest received", `${name}, thanks for volunteering — our team will follow up (demo).`);
  });

  /* Share page ----------------------------------------------------------- */
  document.getElementById("npShareBtn")?.addEventListener("click", async () => {
    const shareData = {
      title: "BrightPath Foundation Impact",
      text: "See how BrightPath is expanding opportunity through education, health, food, and housing.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast("Shared", "Thanks for spreading the word.");
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied", "Impact page URL copied to your clipboard.");
    } catch (err) {
      showToast("Share unavailable", "Copy this page URL from your browser address bar.");
    }
  });

  /* Newsletter ----------------------------------------------------------- */
  const newsletterForm = document.getElementById("npNewsletterForm");
  const newsletterEmail = document.getElementById("npNewsletterEmail");
  const newsletterError = document.getElementById("npNewsletterError");

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = newsletterEmail?.checkValidity();
    if (!valid) {
      newsletterError?.removeAttribute("hidden");
      newsletterForm.classList.add("was-validated");
      return;
    }
    newsletterError?.setAttribute("hidden", "");
    newsletterForm.reset();
    newsletterForm.classList.remove("was-validated");
    showToast("You're on the list", "Demo signup saved — connect your email provider when ready.");
  });
})();
