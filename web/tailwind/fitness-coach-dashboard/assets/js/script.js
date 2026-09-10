/**
 * Stride — Fitness coach dashboard
 * Hash views, client switcher, lifts, meals, sessions
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const titles = {
    overview: "Overview",
    workouts: "Workouts",
    nutrition: "Nutrition",
    progress: "Progress",
    sessions: "Sessions",
  };

  const clients = {
    leela: {
      name: "Leela Poluru",
      short: "Leela",
      block: "strength",
      adhere: "82%",
      next: "6:30",
      nextMeta: "Strength · floor 2",
      cal: "1,840",
      complete: "4 / 5",
      protein: "138 g",
      proteinPct: 74,
      carbs: "180 g",
      carbPct: 62,
      fat: "58 g",
      fatPct: 55,
    },
    kavya: {
      name: "Kavya Poluru",
      short: "Kavya",
      block: "condition",
      adhere: "74%",
      next: "7:15",
      nextMeta: "Condition · track",
      cal: "1,960",
      complete: "3 / 4",
      protein: "112 g",
      proteinPct: 61,
      carbs: "210 g",
      carbPct: 70,
      fat: "64 g",
      fatPct: 60,
    },
    ishaan: {
      name: "Ishaan Poluru",
      short: "Ishaan",
      block: "warmup",
      adhere: "91%",
      next: "8:00",
      nextMeta: "Push · floor 1",
      cal: "2,420",
      complete: "5 / 5",
      protein: "176 g",
      proteinPct: 88,
      carbs: "260 g",
      carbPct: 80,
      fat: "72 g",
      fatPct: 66,
    },
  };

  const blocks = ["warmup", "strength", "condition", "recover"];

  const toastEl = document.getElementById("stToast");
  let toastTimer;

  function showToast(title, body) {
    const titleEl = document.getElementById("stToastTitle");
    const bodyEl = document.getElementById("stToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastEl?.classList.remove("is-visible"), 3200);
  }

  const sidebar = document.getElementById("stSidebar");
  const overlay = document.getElementById("stOverlay");

  function setSidebar(open) {
    sidebar?.classList.toggle("is-open", open);
    overlay?.classList.toggle("is-visible", open);
    document.body.style.overflow = open && window.innerWidth < 1024 ? "hidden" : "";
  }

  document.getElementById("stMenuBtn")?.addEventListener("click", () => setSidebar(true));
  document.getElementById("stSidebarClose")?.addEventListener("click", () => setSidebar(false));
  overlay?.addEventListener("click", () => setSidebar(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebar(false);
  });

  const views = Array.from(document.querySelectorAll(".st-view"));
  const navLinks = Array.from(document.querySelectorAll(".st-nav-link[data-view]"));
  const crumb = document.getElementById("stCrumb");

  function showView(name) {
    const id = titles[name] ? name : "overview";
    views.forEach((view) => {
      const active = view.id === `view-${id}`;
      view.classList.toggle("is-active", active);
      view.hidden = !active;
    });
    navLinks.forEach((link) => {
      const on = link.getAttribute("data-view") === id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (crumb) crumb.textContent = titles[id];
    if (window.location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
    }
    if (window.innerWidth < 1024) setSidebar(false);
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-view]").forEach((el) => {
    el.addEventListener("click", (event) => {
      const name = el.getAttribute("data-view");
      if (!name || !titles[name]) return;
      event.preventDefault();
      showView(name);
    });
  });

  document.querySelectorAll("[data-view-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-view-jump");
      const client = btn.getAttribute("data-client");
      showView(name);
      if (client) setClient(client);
    });
  });

  window.addEventListener("hashchange", () => {
    showView(window.location.hash.replace("#", ""));
  });
  showView(window.location.hash.replace("#", "") || "overview");

  const clock = document.getElementById("stClock");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    clock.textContent = fmt.format(new Date());
  }

  let currentClient = "leela";

  function query() {
    return (document.getElementById("stTopSearch")?.value || "").trim().toLowerCase();
  }

  function applyFilters() {
    const q = query();
    document.querySelectorAll(".st-meal[data-client-row], .st-chart-block[data-client-row]").forEach((row) => {
      const clientOk = row.getAttribute("data-client-row") === currentClient;
      const queryOk = !q || row.textContent.toLowerCase().includes(q);
      row.classList.toggle("is-hidden", !(clientOk && queryOk));
    });
    document.querySelectorAll(".st-plan[data-client-row], .st-session[data-client-row]").forEach((card) => {
      const queryOk = !q || card.textContent.toLowerCase().includes(q);
      card.classList.toggle("is-hidden", !queryOk);
      card.classList.toggle("is-current", card.getAttribute("data-client-row") === currentClient);
    });
  }

  function setClient(id) {
    currentClient = clients[id] ? id : "leela";
    const client = clients[currentClient];
    const blockIndex = blocks.indexOf(client.block);

    document.querySelectorAll("[data-client-chip]").forEach((chip) => {
      chip.classList.toggle("is-active", chip.getAttribute("data-client-chip") === currentClient);
    });

    document.querySelectorAll("[data-block]").forEach((step) => {
      const index = blocks.indexOf(step.getAttribute("data-block"));
      step.classList.toggle("is-active", index === blockIndex);
      step.classList.toggle("is-done", index < blockIndex);
    });

    const meter = document.getElementById("stMeter");
    if (meter) meter.textContent = `${client.short} · ${client.complete} · ${client.adhere}`;

    const label = document.getElementById("stClientLabel");
    if (label) label.textContent = client.name;

    const adhere = document.getElementById("stAdhereStat");
    if (adhere) adhere.textContent = client.adhere;

    const next = document.getElementById("stNextStat");
    if (next) next.textContent = client.next;

    const nextMeta = document.getElementById("stNextMeta");
    if (nextMeta) nextMeta.textContent = client.nextMeta;

    const cal = document.getElementById("stCalStat");
    if (cal) cal.textContent = client.cal;

    const ring = document.getElementById("stMacroRing");
    if (ring) ring.style.setProperty("--st-ring", String(client.proteinPct));
    const pct = document.getElementById("stMacroPct");
    if (pct) pct.textContent = `${client.proteinPct}%`;

    const pro = document.getElementById("stProVal");
    const proBar = document.getElementById("stProBar");
    if (pro) pro.textContent = client.protein;
    if (proBar) proBar.style.width = `${client.proteinPct}%`;

    const carb = document.getElementById("stCarbVal");
    const carbBar = document.getElementById("stCarbBar");
    if (carb) carb.textContent = client.carbs;
    if (carbBar) carbBar.style.width = `${client.carbPct}%`;

    const fat = document.getElementById("stFatVal");
    const fatBar = document.getElementById("stFatBar");
    if (fat) fat.textContent = client.fat;
    if (fatBar) fatBar.style.width = `${client.fatPct}%`;

    applyFilters();
  }

  document.querySelectorAll("[data-client-chip]").forEach((chip) => {
    chip.addEventListener("click", () => setClient(chip.getAttribute("data-client-chip")));
  });

  document.querySelectorAll("[data-log]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-log");
      showToast("Lift logged", `${name} is on Subbu Poluru’s desk (demo).`);
    });
  });

  document.querySelectorAll("[data-checkin]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-checkin");
      const card = btn.closest(".st-session");
      const status = card?.querySelector(".st-status");
      if (status) {
        status.className = "st-status is-live";
        status.textContent = "On floor";
      }
      showToast("Checked in", `${name} is on the floor.`);
    });
  });

  document.querySelectorAll("[data-move]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Slot moved", `${btn.getAttribute("data-move")} was shifted (demo).`);
    });
  });

  document.querySelectorAll("[data-day]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Volume", `${clients[currentClient].short} · ${btn.getAttribute("data-day")} volume.`);
    });
  });

  document.getElementById("stConfirmMeal")?.addEventListener("click", () => {
    showToast("Meal in", `${clients[currentClient].name}’s lunch is confirmed.`);
  });

  document.getElementById("stAdjustBtn")?.addEventListener("click", () => {
    showToast("Macros", `Asha Poluru will retune ${clients[currentClient].short}’s plate.`);
  });

  document.getElementById("stBookBtn")?.addEventListener("click", () => {
    showToast("Booked", `Anika Poluru held a late slot for ${clients[currentClient].name}.`);
  });

  document.getElementById("stTopSearchForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const q = document.getElementById("stTopSearch")?.value || "";
    showView("workouts");
    applyFilters();
    showToast("Search", q.trim() ? `Filtered for “${q.trim()}”.` : "Showing the floor.");
  });

  document.getElementById("stTopSearch")?.addEventListener("input", applyFilters);

  document.getElementById("stBellBtn")?.addEventListener("click", () => {
    showView("sessions");
    showToast("Next up", `${clients[currentClient].name} at ${clients[currentClient].next}.`);
  });

  setClient("leela");

  if (reduceMotion) {
    document.documentElement.style.scrollBehavior = "auto";
  }
})();
