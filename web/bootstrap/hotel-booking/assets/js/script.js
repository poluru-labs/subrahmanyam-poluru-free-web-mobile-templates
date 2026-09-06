/**
 * Flare — Hotel & resort booking
 * Availability search, room filters, reservation form, newsletter, toasts
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DRAFT_KEY = "fl-book-draft";

  const toastEl = document.getElementById("flToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("flToastTitle");
    const bodyEl = document.getElementById("flToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  const navbar = document.getElementById("flNavbar");
  function updateNavbar() {
    navbar?.classList.toggle("fl-navbar-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  const navCollapseEl = document.getElementById("flNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  document.querySelectorAll('.fl-navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
    });
  });

  const sectionIds = ["home", "stay", "rooms", "amenities", "dining", "book", "reviews", "visit", "faq"];
  const navLinks = Array.from(document.querySelectorAll(".fl-navbar .nav-link"));

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

  const backTop = document.getElementById("flBackTop");
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

  const counters = document.querySelectorAll(".fl-counter");
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

  function isoDate(offsetDays) {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().slice(0, 10);
  }

  function nightsBetween(start, end) {
    if (!start || !end) return 0;
    const a = new Date(`${start}T00:00:00`);
    const b = new Date(`${end}T00:00:00`);
    const diff = Math.round((b - a) / 86400000);
    return diff;
  }

  const checkIn = document.getElementById("flCheckIn");
  const checkOut = document.getElementById("flCheckOut");
  const bookIn = document.getElementById("flBookIn");
  const bookOut = document.getElementById("flBookOut");
  const today = isoDate(0);
  const tomorrow = isoDate(1);

  [checkIn, bookIn].forEach((el) => {
    if (!el) return;
    el.min = today;
    if (!el.value) el.value = today;
  });
  [checkOut, bookOut].forEach((el) => {
    if (!el) return;
    el.min = tomorrow;
    if (!el.value) el.value = tomorrow;
  });

  function syncCheckoutMin(startEl, endEl) {
    if (!startEl || !endEl || !startEl.value) return;
    const next = new Date(`${startEl.value}T00:00:00`);
    next.setDate(next.getDate() + 1);
    const min = next.toISOString().slice(0, 10);
    endEl.min = min;
    if (endEl.value && endEl.value <= startEl.value) endEl.value = min;
  }

  checkIn?.addEventListener("change", () => syncCheckoutMin(checkIn, checkOut));
  bookIn?.addEventListener("change", () => syncCheckoutMin(bookIn, bookOut));

  function bindStepper(minusId, plusId, inputId, min, max) {
    const input = document.getElementById(inputId);
    document.getElementById(minusId)?.addEventListener("click", () => {
      if (!input) return;
      input.value = String(Math.max(min, Number(input.value || min) - 1));
    });
    document.getElementById(plusId)?.addEventListener("click", () => {
      if (!input) return;
      input.value = String(Math.min(max, Number(input.value || min) + 1));
    });
  }
  bindStepper("flSearchMinus", "flSearchPlus", "flSearchGuests", 1, 6);
  bindStepper("flBookMinus", "flBookPlus", "flBookGuests", 1, 6);

  const roomChips = document.querySelectorAll("[data-room-filter]");
  const roomItems = document.querySelectorAll(".fl-room-item");
  const roomCount = document.getElementById("flRoomCount");
  const roomEmpty = document.getElementById("flRoomEmpty");
  const searchGuests = document.getElementById("flSearchGuests");
  const searchType = document.getElementById("flSearchType");
  const searchNote = document.getElementById("flSearchNote");
  let typeFilter = "all";
  let occupancy = 1;
  let typeFromSearch = "all";

  function applyRoomFilters() {
    const guests = Math.max(occupancy, Number(searchGuests?.value || 1));
    const type = typeFromSearch !== "all" ? typeFromSearch : typeFilter;
    let visible = 0;

    roomItems.forEach((item) => {
      const maxGuests = Number(item.getAttribute("data-guests") || "2");
      const roomType = item.getAttribute("data-type");
      const typeOk = type === "all" || roomType === type;
      const guestsOk = maxGuests >= guests;
      const show = typeOk && guestsOk;
      item.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    if (roomCount) {
      roomCount.textContent = `Showing ${visible} room${visible === 1 ? "" : "s"}`;
    }
    roomEmpty?.classList.toggle("d-none", visible !== 0);
  }

  roomChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      roomChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      typeFilter = chip.getAttribute("data-room-filter") || "all";
      typeFromSearch = "all";
      if (searchType) searchType.value = "all";
      applyRoomFilters();
    });
  });

  document.getElementById("flSearchForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const nights = nightsBetween(checkIn?.value, checkOut?.value);
    if (nights < 1) {
      if (searchNote) searchNote.textContent = "Check-out must be after check-in.";
      showToast("Check dates", "Choose a check-out after check-in.");
      return;
    }
    occupancy = Number(searchGuests?.value || 2);
    typeFromSearch = searchType?.value || "all";
    typeFilter = typeFromSearch;
    roomChips.forEach((chip) => {
      chip.classList.toggle("is-active", (chip.getAttribute("data-room-filter") || "all") === typeFilter);
    });
    applyRoomFilters();
    if (bookIn && checkIn?.value) bookIn.value = checkIn.value;
    if (bookOut && checkOut?.value) bookOut.value = checkOut.value;
    const bookGuests = document.getElementById("flBookGuests");
    if (bookGuests) bookGuests.value = String(occupancy);
    syncCheckoutMin(bookIn, bookOut);
    if (searchNote) {
      searchNote.textContent = `${nights} night${nights === 1 ? "" : "s"} · ${occupancy} guest${occupancy === 1 ? "" : "s"}. Rooms below are filtered.`;
    }
    document.getElementById("rooms")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    showToast("Dates searched", "Available rooms are listed for those dates.");
  });

  applyRoomFilters();

  document.querySelectorAll(".fl-book-room").forEach((btn) => {
    btn.addEventListener("click", () => {
      const room = btn.getAttribute("data-room") || "";
      const pick = document.getElementById("flRoomPick");
      if (pick && room) pick.value = room;
      if (bookIn && checkIn?.value) bookIn.value = checkIn.value;
      if (bookOut && checkOut?.value) bookOut.value = checkOut.value;
      const bookGuests = document.getElementById("flBookGuests");
      if (bookGuests && searchGuests?.value) bookGuests.value = searchGuests.value;
      document.getElementById("book")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      showToast("Room selected", `${room} is ready on the reservation form.`);
    });
  });

  const form = document.getElementById("flBookForm");
  const note = document.getElementById("flFormNote");

  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (saved && form) {
      const map = {
        flName: saved.name,
        flEmail: saved.email,
        flPhone: saved.phone,
        flRoomPick: saved.room,
        flBookIn: saved.checkin,
        flBookOut: saved.checkout,
        flBookGuests: saved.guests,
        flOccasion: saved.occasion,
        flNotes: saved.notes,
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
      name: document.getElementById("flName")?.value || "",
      email: document.getElementById("flEmail")?.value || "",
      phone: document.getElementById("flPhone")?.value || "",
      room: document.getElementById("flRoomPick")?.value || "",
      checkin: document.getElementById("flBookIn")?.value || "",
      checkout: document.getElementById("flBookOut")?.value || "",
      guests: document.getElementById("flBookGuests")?.value || "",
      occasion: document.getElementById("flOccasion")?.value || "",
      notes: document.getElementById("flNotes")?.value || "",
    };
  }

  document.getElementById("flSaveDraft")?.addEventListener("click", () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData()));
      showToast("Draft saved", "Your stay request is stored in this browser.");
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
    const nights = nightsBetween(data.checkin, data.checkout);
    if (nights < 1) {
      if (note) note.textContent = "Check-out must be after check-in.";
      return;
    }
    if (note) {
      note.textContent = `Held for ${data.name} · ${data.room} · ${nights} night${nights === 1 ? "" : "s"}.`;
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      /* ignore */
    }
    form.reset();
    form.classList.remove("was-validated");
    const guestsEl = document.getElementById("flBookGuests");
    if (guestsEl) guestsEl.value = "2";
    if (bookIn) bookIn.value = today;
    if (bookOut) bookOut.value = tomorrow;
    showToast("Stay requested", "Demo confirmation — connect this form to your reservation system.");
  });

  document.getElementById("flNewsForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("flNewsEmail");
    if (!email?.checkValidity()) {
      email?.reportValidity();
      return;
    }
    email.value = "";
    showToast("You’re on the list", "Stay notes will land in this inbox (demo).");
  });
})();
