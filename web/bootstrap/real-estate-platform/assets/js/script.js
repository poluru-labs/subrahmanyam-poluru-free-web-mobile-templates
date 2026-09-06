/**
 * Lotline — Real estate marketplace
 * Listing filters, inquiry form, neighborhood shortcuts, toasts
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DRAFT_KEY = "ll-inquire-draft";

  const toastEl = document.getElementById("llToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("llToastTitle");
    const bodyEl = document.getElementById("llToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  const navbar = document.getElementById("llNavbar");
  function updateNavbar() {
    navbar?.classList.toggle("ll-navbar-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  const navCollapseEl = document.getElementById("llNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.ll-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
    });
  });

  const sectionIds = ["home", "listings", "neighborhoods", "agents", "how", "inquire", "reviews", "office", "faq"];
  const navLinks = Array.from(document.querySelectorAll(".ll-navbar .nav-link"));

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

  const backTop = document.getElementById("llBackTop");
  function updateBackTop() {
    backTop?.classList.toggle("is-visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

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
      el.textContent = (target * eased).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll(".ll-counter");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => observer.observe(el));
  } else {
    counters.forEach((el) => animateCounter(el));
  }

  const homes = document.querySelectorAll(".ll-home");
  const chips = document.querySelectorAll("[data-list-filter]");
  const countEl = document.getElementById("llListCount");
  const emptyEl = document.getElementById("llListEmpty");
  const noteEl = document.getElementById("llSearchNote");
  const queryEl = document.getElementById("llQuery");
  const intentEl = document.getElementById("llIntent");
  const typeEl = document.getElementById("llType");
  const bedsEl = document.getElementById("llBeds");
  const priceEl = document.getElementById("llPrice");

  const filters = {
    query: "",
    intent: "all",
    type: "all",
    beds: 0,
    price: 0,
  };

  function applyFilters() {
    let visible = 0;
    homes.forEach((card) => {
      const intent = card.getAttribute("data-intent");
      const type = card.getAttribute("data-type");
      const beds = Number(card.getAttribute("data-beds") || "0");
      const price = Number(card.getAttribute("data-price") || "0");
      const hood = card.getAttribute("data-hood") || "";
      const text = `${card.textContent} ${hood}`.toLowerCase();
      const queryOk = !filters.query || text.includes(filters.query);
      const intentOk = filters.intent === "all" || intent === filters.intent;
      const typeOk = filters.type === "all" || type === filters.type;
      const bedsOk = beds >= filters.beds;
      const priceOk = !filters.price || price <= filters.price;
      const show = queryOk && intentOk && typeOk && bedsOk && priceOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    if (countEl) countEl.textContent = `Showing ${visible} home${visible === 1 ? "" : "s"}`;
    emptyEl?.classList.toggle("d-none", visible !== 0);
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const value = chip.getAttribute("data-list-filter") || "all";
      if (value === "sale" || value === "rent") {
        filters.intent = value;
        filters.type = "all";
        if (intentEl) intentEl.value = value;
        if (typeEl) typeEl.value = "all";
      } else if (value === "house" || value === "condo") {
        filters.type = value;
        filters.intent = "all";
        if (typeEl) typeEl.value = value;
        if (intentEl) intentEl.value = "all";
      } else {
        filters.intent = "all";
        filters.type = "all";
        if (intentEl) intentEl.value = "all";
        if (typeEl) typeEl.value = "all";
      }
      applyFilters();
    });
  });

  document.getElementById("llSearchForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    filters.query = (queryEl?.value || "").trim().toLowerCase();
    filters.intent = intentEl?.value || "all";
    filters.type = typeEl?.value || "all";
    filters.beds = Number(bedsEl?.value || "0");
    filters.price = Number(priceEl?.value || "0");
    chips.forEach((chip) => {
      const value = chip.getAttribute("data-list-filter");
      chip.classList.toggle("is-active", value === "all" && filters.intent === "all" && filters.type === "all");
    });
    if (filters.intent !== "all") {
      chips.forEach((chip) => {
        chip.classList.toggle("is-active", chip.getAttribute("data-list-filter") === filters.intent);
      });
    } else if (filters.type !== "all") {
      chips.forEach((chip) => {
        chip.classList.toggle("is-active", chip.getAttribute("data-list-filter") === filters.type);
      });
    }
    applyFilters();
    const visible = Array.from(homes).filter((card) => !card.classList.contains("is-hidden")).length;
    if (noteEl) {
      noteEl.textContent = visible
        ? `${visible} listing${visible === 1 ? "" : "s"} match this search.`
        : "No listings match. Try another neighborhood.";
    }
    document.getElementById("listings")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    showToast("Search updated", "Listings below match your filters.");
  });

  document.querySelectorAll("[data-hood-search]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hood = btn.getAttribute("data-hood-search") || "";
      if (queryEl) queryEl.value = hood;
      filters.query = hood;
      filters.intent = "all";
      filters.type = "all";
      filters.beds = 0;
      filters.price = 0;
      if (intentEl) intentEl.value = "all";
      if (typeEl) typeEl.value = "all";
      if (bedsEl) bedsEl.value = "0";
      if (priceEl) priceEl.value = "0";
      chips.forEach((chip) => chip.classList.toggle("is-active", chip.getAttribute("data-list-filter") === "all"));
      applyFilters();
      document.getElementById("listings")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      showToast("Neighborhood", `Showing homes in ${hood}.`);
    });
  });

  applyFilters();

  function fillInquiry(home, agent) {
    const homeEl = document.getElementById("llHome");
    const agentEl = document.getElementById("llAgent");
    if (homeEl && home) homeEl.value = home;
    if (agentEl && agent) agentEl.value = agent;
    document.getElementById("inquire")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  document.querySelectorAll(".ll-ask").forEach((btn) => {
    btn.addEventListener("click", () => {
      fillInquiry(btn.getAttribute("data-home") || "", btn.getAttribute("data-agent") || "");
      showToast("Inquiry started", "The listing and agent are on the form.");
    });
  });

  document.querySelectorAll(".ll-ask-agent").forEach((btn) => {
    btn.addEventListener("click", () => {
      fillInquiry("", btn.getAttribute("data-agent") || "");
      showToast("Agent selected", `${btn.getAttribute("data-agent")} will get this note.`);
    });
  });

  const form = document.getElementById("llInquireForm");
  const formNote = document.getElementById("llFormNote");

  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (saved && form) {
      const map = {
        llName: saved.name,
        llEmail: saved.email,
        llPhone: saved.phone,
        llAgent: saved.agent,
        llHome: saved.home,
        llGoal: saved.goal,
        llBudget: saved.budget,
        llMessage: saved.message,
      };
      Object.keys(map).forEach((id) => {
        const el = document.getElementById(id);
        if (el && map[id] != null) el.value = map[id];
      });
    }
  } catch (err) {
    /* ignore */
  }

  function formData() {
    return {
      name: document.getElementById("llName")?.value || "",
      email: document.getElementById("llEmail")?.value || "",
      phone: document.getElementById("llPhone")?.value || "",
      agent: document.getElementById("llAgent")?.value || "",
      home: document.getElementById("llHome")?.value || "",
      goal: document.getElementById("llGoal")?.value || "",
      budget: document.getElementById("llBudget")?.value || "",
      message: document.getElementById("llMessage")?.value || "",
    };
  }

  document.getElementById("llSaveDraft")?.addEventListener("click", () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData()));
      showToast("Draft saved", "Your inquiry is stored in this browser.");
      if (formNote) formNote.textContent = "Draft saved locally.";
    } catch (err) {
      showToast("Save failed", "Local storage is unavailable.");
    }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.reportValidity();
      if (formNote) formNote.textContent = "Please complete the required fields.";
      return;
    }
    const data = formData();
    if (formNote) {
      formNote.textContent = `Sent to ${data.agent}${data.home ? ` · ${data.home}` : ""}.`;
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      /* ignore */
    }
    form.reset();
    form.classList.remove("was-validated");
    showToast("Inquiry sent", "Demo confirmation — connect this form to your CRM.");
  });

  document.getElementById("llNewsForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("llNewsEmail");
    if (!email?.checkValidity()) {
      email?.reportValidity();
      return;
    }
    email.value = "";
    showToast("You’re on the list", "New listings will land in this inbox (demo).");
  });
})();
