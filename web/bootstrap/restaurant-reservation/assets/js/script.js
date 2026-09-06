/**
 * Laurel — Restaurant reservation
 * Menu/event filters, guest stepper, booking form, newsletter, toasts
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DRAFT_KEY = "lr-reserve-draft";

  const toastEl = document.getElementById("lrToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("lrToastTitle");
    const bodyEl = document.getElementById("lrToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  const navbar = document.getElementById("lrNavbar");
  function updateNavbar() {
    navbar?.classList.toggle("lr-navbar-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  const navCollapseEl = document.getElementById("lrNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.lr-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
    });
  });

  const sectionIds = [
    "home",
    "story",
    "menu",
    "chefs",
    "experiences",
    "events",
    "reserve",
    "reviews",
    "visit",
    "faq",
  ];
  const navLinks = Array.from(document.querySelectorAll(".lr-navbar .nav-link"));

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

  const backTop = document.getElementById("lrBackTop");
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
      const value = target * eased;
      el.textContent = value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll(".lr-counter");
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

  const menuChips = document.querySelectorAll("[data-menu-filter]");
  const menuItems = document.querySelectorAll(".lr-menu-item");
  const menuSearch = document.getElementById("lrMenuSearch");
  const menuCount = document.getElementById("lrMenuCount");
  const menuEmpty = document.getElementById("lrMenuEmpty");
  let menuFilter = "all";

  function applyMenuFilters() {
    const q = (menuSearch?.value || "").trim().toLowerCase();
    let visible = 0;
    menuItems.forEach((item) => {
      const cat = item.getAttribute("data-cat");
      const text = item.textContent.toLowerCase();
      const catOk = menuFilter === "all" || cat === menuFilter;
      const searchOk = !q || text.includes(q);
      const show = catOk && searchOk;
      item.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    if (menuCount) {
      menuCount.textContent = `Showing ${visible} dish${visible === 1 ? "" : "es"}`;
    }
    menuEmpty?.classList.toggle("d-none", visible !== 0);
  }

  menuChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      menuChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      menuFilter = chip.getAttribute("data-menu-filter") || "all";
      applyMenuFilters();
    });
  });
  menuSearch?.addEventListener("input", applyMenuFilters);
  if (menuItems.length) applyMenuFilters();

  const eventChips = document.querySelectorAll("[data-event-filter]");
  const eventItems = document.querySelectorAll(".lr-event-item");
  const eventEmpty = document.getElementById("lrEventEmpty");

  eventChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      eventChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.getAttribute("data-event-filter") || "all";
      let visible = 0;
      eventItems.forEach((item) => {
        const show = filter === "all" || item.getAttribute("data-event") === filter;
        item.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      eventEmpty?.classList.toggle("d-none", visible !== 0);
    });
  });

  document.querySelectorAll(".lr-rsvp").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-event-name") || "this event";
      showToast("Request received", `${name} is held for Maya Poluru’s book — demo only.`);
    });
  });

  const guests = document.getElementById("lrGuests");
  function clampGuests(value) {
    return Math.min(14, Math.max(1, value));
  }
  document.getElementById("lrGuestMinus")?.addEventListener("click", () => {
    if (!guests) return;
    guests.value = String(clampGuests(Number(guests.value || 2) - 1));
  });
  document.getElementById("lrGuestPlus")?.addEventListener("click", () => {
    if (!guests) return;
    guests.value = String(clampGuests(Number(guests.value || 2) + 1));
  });

  const dateInput = document.getElementById("lrDate");
  if (dateInput) {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    dateInput.min = iso;
    if (!dateInput.value) dateInput.value = iso;
  }

  const form = document.getElementById("lrReserveForm");
  const note = document.getElementById("lrFormNote");

  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (saved && form) {
      ["lrName", "lrEmail", "lrPhone", "lrDate", "lrTime", "lrGuests", "lrSeating", "lrOccasion", "lrNotes"].forEach(
        (id) => {
          const el = document.getElementById(id);
          const key = id.replace("lr", "").toLowerCase();
          const map = {
            name: saved.name,
            email: saved.email,
            phone: saved.phone,
            date: saved.date,
            time: saved.time,
            guests: saved.guests,
            seating: saved.seating,
            occasion: saved.occasion,
            notes: saved.notes,
          };
          if (el && map[key] != null) el.value = map[key];
        }
      );
    }
  } catch (err) {
    /* ignore */
  }

  function formData() {
    return {
      name: document.getElementById("lrName")?.value || "",
      email: document.getElementById("lrEmail")?.value || "",
      phone: document.getElementById("lrPhone")?.value || "",
      date: document.getElementById("lrDate")?.value || "",
      time: document.getElementById("lrTime")?.value || "",
      guests: document.getElementById("lrGuests")?.value || "",
      seating: document.getElementById("lrSeating")?.value || "",
      occasion: document.getElementById("lrOccasion")?.value || "",
      notes: document.getElementById("lrNotes")?.value || "",
    };
  }

  document.getElementById("lrSaveDraft")?.addEventListener("click", () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData()));
      showToast("Draft saved", "Your reservation request is stored in this browser.");
      if (note) note.textContent = "Draft saved locally.";
    } catch (err) {
      showToast("Save failed", "Local storage is unavailable.");
    }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.reportValidity();
      if (note) note.textContent = "Please complete the required fields.";
      return;
    }
    const data = formData();
    if (note) {
      note.textContent = `Held for ${data.name} · ${data.guests} guests · ${data.date} ${data.time}.`;
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      /* ignore */
    }
    form.reset();
    form.classList.remove("was-validated");
    if (guests) guests.value = "2";
    if (dateInput) dateInput.value = dateInput.min;
    showToast("Table requested", "Demo confirmation — connect this form to your reservation book.");
  });

  document.getElementById("lrNewsForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("lrNewsEmail");
    if (!email?.checkValidity()) {
      email?.reportValidity();
      return;
    }
    email.value = "";
    showToast("You’re on the list", "Supper notes will land in this inbox (demo).");
  });

  const weekday = new Date().getDay();
  document.querySelectorAll(".lr-hours li[data-days]").forEach((row) => {
    const days = (row.getAttribute("data-days") || "")
      .split(",")
      .map((value) => Number(value.trim()));
    if (days.includes(weekday)) row.classList.add("is-today");
  });
})();
