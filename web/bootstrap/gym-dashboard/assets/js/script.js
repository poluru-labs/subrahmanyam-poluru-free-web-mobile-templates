/**
 * Forge Athletic — Gym operations dashboard
 */
(function () {
  "use strict";

  const toastEl = document.getElementById("gxdToast");
  const toastBody = document.getElementById("gxdToastBody");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2600 })
      : null;

  function showToast(message) {
    if (toastBody) toastBody.textContent = message;
    toast?.show();
  }

  const sidebar = document.getElementById("gxdSidebar");
  const overlay = document.getElementById("gxdOverlay");

  function setSidebar(open) {
    sidebar?.classList.toggle("is-open", open);
    overlay?.classList.toggle("is-visible", open);
    document.body.style.overflow = open && window.innerWidth < 992 ? "hidden" : "";
  }

  document.getElementById("gxdMenuBtn")?.addEventListener("click", () => setSidebar(true));
  document.getElementById("gxdSidebarClose")?.addEventListener("click", () => setSidebar(false));
  overlay?.addEventListener("click", () => setSidebar(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebar(false);
  });
  document.querySelectorAll("#gxdSidebar a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) setSidebar(false);
    });
  });

  const clock = document.getElementById("gxdClock");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => {
      clock.textContent = fmt.format(new Date());
    };
    tick();
    window.setInterval(tick, 30000);
  }

  function setupFilter(searchId, planId, statusId, itemSelector, emptyId) {
    const search = document.getElementById(searchId);
    const plan = document.getElementById(planId);
    const status = document.getElementById(statusId);
    const empty = document.getElementById(emptyId);
    const items = Array.from(document.querySelectorAll(itemSelector));
    if (!items.length) return;

    function apply() {
      const q = (search?.value || "").trim().toLowerCase();
      const planVal = (plan?.value || "all").toLowerCase();
      const statusVal = (status?.value || "all").toLowerCase();
      let visible = 0;
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const itemPlan = (item.getAttribute("data-plan") || "").toLowerCase();
        const itemStatus = (item.getAttribute("data-status") || "").toLowerCase();
        const show =
          (!q || text.includes(q)) &&
          (planVal === "all" || itemPlan.includes(planVal)) &&
          (statusVal === "all" || itemStatus === statusVal);
        item.classList.toggle("d-none", !show);
        if (show) visible += 1;
      });
      empty?.classList.toggle("is-visible", visible === 0);
    }

    search?.addEventListener("input", apply);
    plan?.addEventListener("change", apply);
    status?.addEventListener("change", apply);
  }

  setupFilter("gxdMemberSearch", "gxdMemberPlan", "gxdMemberStatus", "[data-member-card]", "gxdMemberEmpty");
  setupFilter("gxdTrainerSearch", "gxdTrainerFocus", "gxdTrainerStatus", "[data-trainer-card]", "gxdTrainerEmpty");
  setupFilter("gxdClassSearch", "gxdClassStudio", "gxdClassStatus", "[data-class-row]", "gxdClassEmpty");

  document.getElementById("gxdCheckinForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const name = form.elements.namedItem("member")?.value || "Member";
    showToast(`${name} checked in at Gate A`);
    form.reset();
    form.classList.remove("was-validated");
  });

  document.querySelectorAll("[data-class-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-class-action");
      const title = btn.getAttribute("data-class-name") || "Class";
      if (action === "waitlist") showToast(`${title} — added to waitlist`);
      else if (action === "cancel") showToast(`${title} cancelled for this member`);
      else showToast(`${title} booked`);
    });
  });

  document.querySelectorAll("[data-member-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-member-action");
      const name = btn.getAttribute("data-member-name") || "Member";
      showToast(action === "freeze" ? `${name} membership frozen` : `Check-in started for ${name}`);
    });
  });

  document.getElementById("gxdContactForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    showToast("Message sent to club operations");
    form.reset();
    form.classList.remove("was-validated");
  });

  document.getElementById("gxdTopSearch")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const q = event.currentTarget.value.trim();
    if (q) showToast(`Search for “${q}” — open Members or Classes`);
  });

  const docsSections = document.querySelectorAll(".gxd-docs-content section[id]");
  const docsLinks = document.querySelectorAll(".gxd-docs-nav a[href^='#']");
  if (docsSections.length && docsLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    docsLinks.forEach((link) => {
      const id = link.getAttribute("href")?.slice(1);
      if (id) map.set(id, link);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          docsLinks.forEach((l) => l.classList.remove("is-active"));
          map.get(entry.target.id)?.classList.add("is-active");
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    docsSections.forEach((section) => observer.observe(section));
  }
})();
