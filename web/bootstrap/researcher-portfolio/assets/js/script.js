/**
 * ResearcherHub — Expert Portfolio
 * AOS, counters, pub/talk filters, cite copy, contact draft, toasts
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DRAFT_KEY = "rh-contact-draft";

  /* Toast ---------------------------------------------------------------- */
  const toastEl = document.getElementById("rhToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("rhToastTitle");
    const bodyEl = document.getElementById("rhToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return false;
    }
  }

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

  /* Navbar scrolled ------------------------------------------------------ */
  const navbar = document.getElementById("rhNavbar");
  function updateNavbar() {
    navbar?.classList.toggle("rh-navbar-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

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
    "faq",
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

  /* Back to top ---------------------------------------------------------- */
  const backTop = document.getElementById("rhBackTop");
  function updateBackTop() {
    backTop?.classList.toggle("rh-back-top-visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

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

  /* Publication filters + search + year ---------------------------------- */
  const filterChips = document.querySelectorAll(".rh-filter-chips [data-filter]");
  const pubCards = document.querySelectorAll(".rh-pub-card");
  const pubSearch = document.getElementById("rhPubSearch");
  const pubYear = document.getElementById("rhPubYear");
  const pubCount = document.getElementById("rhPubCount");
  const pubEmpty = document.getElementById("rhPubEmpty");
  let typeFilter = "all";

  function applyPubFilters() {
    const q = (pubSearch?.value || "").trim().toLowerCase();
    const year = pubYear?.value || "all";
    let visible = 0;

    pubCards.forEach((card) => {
      const type = card.getAttribute("data-type");
      const cardYear = card.getAttribute("data-year");
      const text = card.textContent.toLowerCase();
      const typeOk = typeFilter === "all" || type === typeFilter;
      const yearOk = year === "all" || cardYear === year;
      const searchOk = !q || text.includes(q);
      const show = typeOk && yearOk && searchOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    if (pubCount) {
      pubCount.textContent = `Showing ${visible} publication${visible === 1 ? "" : "s"}`;
    }
    pubEmpty?.classList.toggle("d-none", visible !== 0);

    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      typeFilter = chip.getAttribute("data-filter") || "all";
      applyPubFilters();
    });
  });
  pubSearch?.addEventListener("input", applyPubFilters);
  pubYear?.addEventListener("change", applyPubFilters);
  if (pubCards.length) applyPubFilters();

  /* Cite / BibTeX -------------------------------------------------------- */
  document.querySelectorAll(".rh-cite-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".rh-pub-card");
      if (!card) return;
      const action = btn.getAttribute("data-cite-action");
      const value =
        action === "bibtex"
          ? card.getAttribute("data-bibtex") || ""
          : card.getAttribute("data-cite") || "";
      const ok = await copyText(value);
      showToast(
        ok ? (action === "bibtex" ? "BibTeX copied" : "Citation copied") : "Copy failed",
        ok ? "Paste into your reference manager or notes." : "Clipboard permission denied."
      );
    });
  });

  /* Talk filters --------------------------------------------------------- */
  const talkChips = document.querySelectorAll("[data-talk-filter]");
  const talkItems = document.querySelectorAll("#rhTalkList > [data-talk]");
  const talkEmpty = document.getElementById("rhTalkEmpty");

  talkChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      talkChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.getAttribute("data-talk-filter") || "all";
      let visible = 0;
      talkItems.forEach((item) => {
        const show = filter === "all" || item.getAttribute("data-talk") === filter;
        item.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      talkEmpty?.classList.toggle("d-none", visible !== 0);
    });
  });

  /* CV download ---------------------------------------------------------- */
  document.getElementById("rhDownloadCv")?.addEventListener("click", () => {
    showToast("CV download", "Demo — connect this button to your PDF CV URL.");
  });

  /* Copy email + share --------------------------------------------------- */
  document.getElementById("rhCopyEmail")?.addEventListener("click", async () => {
    const email = document.getElementById("rhEmailLink")?.textContent?.trim() || "mail.spoluru@gmail.com";
    const ok = await copyText(email);
    showToast(ok ? "Email copied" : "Copy failed", ok ? email : "Clipboard permission denied.");
  });

  document.getElementById("rhShareBtn")?.addEventListener("click", async () => {
    const shareData = {
      title: "Subrahmanyam Poluru — ResearcherHub",
      text: "Academic portfolio · Human-Centered AI & Responsible Systems",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast("Shared", "Thanks for sharing this profile.");
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
    const ok = await copyText(window.location.href);
    showToast(ok ? "Link copied" : "Share unavailable", ok ? "Profile URL copied to clipboard." : "Copy the URL from your browser.");
  });

  /* Contact form: char count, draft, toast -------------------------------- */
  const form = document.getElementById("rhContactForm");
  const note = document.getElementById("rhFormNote");
  const message = document.getElementById("rhMessage");
  const charCount = document.getElementById("rhCharCount");

  function updateCharCount() {
    if (!message || !charCount) return;
    charCount.textContent = `${message.value.length} / ${message.maxLength || 800}`;
  }
  message?.addEventListener("input", updateCharCount);
  updateCharCount();

  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (saved && form) {
      const map = {
        rhName: "name",
        rhEmail: "email",
        rhTopic: "topic",
        rhMessage: "message",
      };
      Object.keys(map).forEach((id) => {
        const el = document.getElementById(id);
        if (el && saved[map[id]] != null) el.value = saved[map[id]];
      });
      updateCharCount();
    }
  } catch (err) {
    /* ignore */
  }

  document.getElementById("rhSaveDraft")?.addEventListener("click", () => {
    const data = {
      name: document.getElementById("rhName")?.value || "",
      email: document.getElementById("rhEmail")?.value || "",
      topic: document.getElementById("rhTopic")?.value || "",
      message: message?.value || "",
    };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      showToast("Draft saved", "Your message draft is stored in this browser.");
      if (note) note.textContent = "Draft saved locally.";
    } catch (err) {
      showToast("Save failed", "Local storage is unavailable.");
    }
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        form.reportValidity();
        if (note) note.textContent = "Please complete the required fields.";
        return;
      }

      if (note) {
        note.textContent = "Thanks — your message is ready to send (demo form).";
      }
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (err) {
        /* ignore */
      }
      form.reset();
      form.classList.remove("was-validated");
      updateCharCount();
      showToast("Message queued", "Demo confirmation — connect this form to your inbox or CRM.");
    });
  }
})();
