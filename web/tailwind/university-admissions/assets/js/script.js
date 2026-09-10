/**
 * Harborwell — University admissions
 * Hash views, program switcher, uploads, timeline filter
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const titles = {
    overview: "Overview",
    applications: "Applications",
    documents: "Documents",
    timeline: "Timeline",
    messages: "Messages",
  };

  const programs = {
    cs: {
      name: "Computer Science",
      stage: "review",
      complete: "4 / 6 files",
      deadline: "Oct 15",
      short: "CS",
    },
    bio: {
      name: "Biology",
      stage: "materials",
      complete: "3 / 6 files",
      deadline: "Nov 1",
      short: "Bio",
    },
    arch: {
      name: "Architecture",
      stage: "start",
      complete: "2 / 6 files",
      deadline: "Jan 6",
      short: "Arch",
    },
  };

  const stages = ["start", "materials", "review", "decision"];

  const toastEl = document.getElementById("hwToast");
  let toastTimer;

  function showToast(title, body) {
    const titleEl = document.getElementById("hwToastTitle");
    const bodyEl = document.getElementById("hwToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastEl?.classList.remove("is-visible"), 3200);
  }

  const sidebar = document.getElementById("hwSidebar");
  const overlay = document.getElementById("hwOverlay");

  function setSidebar(open) {
    sidebar?.classList.toggle("is-open", open);
    overlay?.classList.toggle("is-visible", open);
    document.body.style.overflow = open && window.innerWidth < 1024 ? "hidden" : "";
  }

  document.getElementById("hwMenuBtn")?.addEventListener("click", () => setSidebar(true));
  document.getElementById("hwSidebarClose")?.addEventListener("click", () => setSidebar(false));
  overlay?.addEventListener("click", () => setSidebar(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebar(false);
  });

  const views = Array.from(document.querySelectorAll(".hw-view"));
  const navLinks = Array.from(document.querySelectorAll(".hw-nav-link[data-view]"));
  const crumb = document.getElementById("hwCrumb");

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
      const program = btn.getAttribute("data-program");
      showView(name);
      if (program) setProgram(program);
    });
  });

  window.addEventListener("hashchange", () => {
    showView(window.location.hash.replace("#", ""));
  });
  showView(window.location.hash.replace("#", "") || "overview");

  const clock = document.getElementById("hwClock");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    clock.textContent = fmt.format(new Date());
  }

  let currentProgram = "cs";

  function applyQueryFilter() {
    const q = (document.getElementById("hwTopSearch")?.value || "").trim().toLowerCase();
    document.querySelectorAll(".hw-doc[data-program-row], .hw-event[data-program-row], .hw-note[data-program-row]").forEach((row) => {
      const programOk = row.getAttribute("data-program-row") === currentProgram;
      const queryOk = !q || row.textContent.toLowerCase().includes(q);
      row.classList.toggle("is-hidden", !(programOk && queryOk));
    });
    document.querySelectorAll(".hw-app-card[data-program-row]").forEach((card) => {
      card.classList.toggle("is-current", card.getAttribute("data-program-row") === currentProgram);
    });
  }

  function setProgram(id) {
    currentProgram = programs[id] ? id : "cs";
    const program = programs[currentProgram];
    const stageIndex = stages.indexOf(program.stage);

    document.querySelectorAll("[data-program-chip]").forEach((chip) => {
      chip.classList.toggle("is-active", chip.getAttribute("data-program-chip") === currentProgram);
    });

    document.querySelectorAll("[data-stage]").forEach((step) => {
      const index = stages.indexOf(step.getAttribute("data-stage"));
      step.classList.toggle("is-active", index === stageIndex);
      step.classList.toggle("is-done", index < stageIndex);
    });

    const meter = document.getElementById("hwMeter");
    if (meter) meter.textContent = `${program.short} · ${program.complete} · ${program.deadline}`;

    const label = document.getElementById("hwProgramLabel");
    if (label) label.textContent = program.name;

    const files = document.getElementById("hwFileStat");
    if (files) files.textContent = program.complete.replace(" files", "");

    const deadline = document.getElementById("hwDeadlineStat");
    if (deadline) deadline.textContent = program.deadline;

    applyQueryFilter();
  }

  document.querySelectorAll("[data-program-chip]").forEach((chip) => {
    chip.addEventListener("click", () => setProgram(chip.getAttribute("data-program-chip")));
  });

  const drop = document.getElementById("hwDrop");
  const fileInput = document.getElementById("hwFileInput");

  function ingestFile(file) {
    if (!file) return;
    const program = programs[currentProgram];
    const list = document.getElementById("hwDocList");
    const card = document.createElement("article");
    card.className = "hw-doc";
    card.setAttribute("data-program-row", currentProgram);

    const icon = document.createElement("span");
    icon.className = "hw-doc-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<i class="bi bi-file-earmark-arrow-up"></i>';

    const copy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = file.name;
    const meta = document.createElement("p");
    meta.textContent = `Just now · queued for Maya Poluru · ${program.name}`;
    copy.append(title, meta);

    const status = document.createElement("span");
    status.className = "hw-status is-ready";
    status.textContent = "In";

    card.append(icon, copy, status);
    list?.prepend(card);
    showToast("File queued", `${file.name} is on the ${program.name} desk (demo).`);
  }

  fileInput?.addEventListener("change", () => {
    ingestFile(fileInput.files?.[0]);
    fileInput.value = "";
  });

  ["dragenter", "dragover"].forEach((type) => {
    drop?.addEventListener(type, (event) => {
      event.preventDefault();
      drop.classList.add("is-over");
    });
  });

  ["dragleave", "drop"].forEach((type) => {
    drop?.addEventListener(type, (event) => {
      event.preventDefault();
      drop.classList.remove("is-over");
    });
  });

  drop?.addEventListener("drop", (event) => {
    ingestFile(event.dataTransfer?.files?.[0]);
  });

  document.getElementById("hwTopSearchForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const q = document.getElementById("hwTopSearch")?.value || "";
    showView("documents");
    applyQueryFilter();
    showToast("Search", q.trim() ? `Filtered for “${q.trim()}”.` : "Showing the active program.");
  });

  document.getElementById("hwTopSearch")?.addEventListener("input", applyQueryFilter);

  document.getElementById("hwBellBtn")?.addEventListener("click", () => {
    showView("messages");
    showToast("Desk", "Maya Poluru is waiting on the Harborwell supplement.");
  });

  document.getElementById("hwReplyForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("hwReply");
    const text = (input?.value || "").trim();
    if (!text) {
      showToast("Empty reply", "Write a note for Maya Poluru first.");
      return;
    }
    const card = document.querySelector("#view-messages .hw-card");
    const note = document.createElement("div");
    note.className = "hw-note";
    note.setAttribute("data-program-row", currentProgram);

    const avatar = document.createElement("span");
    avatar.className = "hw-avatar hw-avatar-ink";
    avatar.textContent = "LP";

    const copy = document.createElement("div");
    const who = document.createElement("strong");
    who.textContent = "Leela Poluru · applicant";
    const body = document.createElement("p");
    body.textContent = text;
    copy.append(who, body);

    note.append(avatar, copy);
    card?.insertBefore(note, document.getElementById("hwReplyForm"));
    if (input) input.value = "";
    showToast("Sent", "Maya Poluru will see this on the demo desk.");
  });

  setProgram("cs");

  if (reduceMotion) {
    document.documentElement.style.scrollBehavior = "auto";
  }
})();
