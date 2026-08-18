/**
 * IT Consulting template — shared UX enhancements
 * Sticky header, counters, service filter, contact form, FAQ, careers filter
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Inject shared UI chrome ------------------------------------------------ */
  function ensureChrome() {
    if (!document.querySelector(".ftpl-skip-link")) {
      const skip = document.createElement("a");
      skip.className = "ftpl-skip-link";
      skip.href = "#main-content";
      skip.textContent = "Skip to content";
      document.body.prepend(skip);
    }

    if (!document.getElementById("main-content")) {
      const section = document.querySelector("body > section") || document.querySelector("main");
      if (section) section.id = "main-content";
    }

    if (!document.getElementById("ftplBackTop")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "ftplBackTop";
      btn.className = "ftpl-back-top";
      btn.setAttribute("aria-label", "Back to top");
      btn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
      document.body.appendChild(btn);
      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }

    if (!document.getElementById("ftplToast")) {
      const wrap = document.createElement("div");
      wrap.className = "toast-container position-fixed bottom-0 end-0 p-3";
      wrap.innerHTML = `
        <div id="ftplToast" class="toast ftpl-toast" role="status" aria-live="polite" aria-atomic="true">
          <div class="toast-header">
            <i class="fas fa-check-circle text-success me-2"></i>
            <strong class="me-auto" id="ftplToastTitle">Lorem Ipsum</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body" id="ftplToastBody">Done.</div>
        </div>`;
      document.body.appendChild(wrap);
    }
  }

  ensureChrome();

  const toastEl = document.getElementById("ftplToast");
  const toast =
    toastEl && typeof bootstrap !== "undefined"
      ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 })
      : null;

  function showToast(title, body) {
    const titleEl = document.getElementById("ftplToastTitle");
    const bodyEl = document.getElementById("ftplToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toast?.show();
  }

  /* Footer year ----------------------------------------------------------- */
  document.querySelectorAll("#year").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* Sticky header on scroll ----------------------------------------------- */
  const header = document.querySelector("header.border-bottom");
  function updateSticky() {
    if (!header) return;
    header.classList.toggle("ftpl-header-sticky", window.scrollY > 40);
    document.getElementById("ftplBackTop")?.classList.toggle("is-visible", window.scrollY > 480);
  }
  window.addEventListener("scroll", updateSticky, { passive: true });
  updateSticky();

  /* Close mobile nav on link click ---------------------------------------- */
  const navCollapseEl = document.getElementById("navbarsExample09");
  const navCollapse =
    navCollapseEl && typeof bootstrap !== "undefined"
      ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
      : null;

  document.querySelectorAll("#navbarsExample09 .nav-link:not(.dropdown-toggle), #navbarsExample09 .dropdown-item").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
    });
  });

  /* Animated counters (homepage stats) ------------------------------------ */
  function animateCounter(el) {
    const target = Number(el.getAttribute("data-target") || "0");
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = reduceMotion ? 0 : 1400;
    const start = performance.now();

    if (duration === 0) {
      el.textContent = `${target.toLocaleString()}${suffix}`;
      return;
    }

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased).toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll(".ftpl-stat-number[data-target]");
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => obs.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* Homepage service search / filter -------------------------------------- */
  const serviceSearch = document.getElementById("ftplServiceSearch");
  const serviceFilterBtns = document.querySelectorAll("[data-service-filter]");
  const serviceCards = document.querySelectorAll("#services [data-service]");
  const serviceCount = document.getElementById("ftplServiceCount");
  const serviceEmpty = document.getElementById("ftplServiceEmpty");
  let activeServiceFilter = "all";

  function applyServiceFilters() {
    if (!serviceCards.length) return;
    const q = (serviceSearch?.value || "").trim().toLowerCase();
    let visible = 0;

    serviceCards.forEach((card) => {
      const type = card.getAttribute("data-service") || "";
      const text = card.textContent.toLowerCase();
      const typeOk = activeServiceFilter === "all" || type === activeServiceFilter;
      const searchOk = !q || text.includes(q);
      const show = typeOk && searchOk;
      card.classList.toggle("ftpl-hidden", !show);
      if (show) visible += 1;
    });

    if (serviceCount) {
      serviceCount.textContent = `Showing ${visible} service${visible === 1 ? "" : "s"}`;
    }
    serviceEmpty?.classList.toggle("d-none", visible !== 0);
  }

  serviceFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeServiceFilter = btn.getAttribute("data-service-filter") || "all";
      serviceFilterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyServiceFilters();
    });
  });
  serviceSearch?.addEventListener("input", applyServiceFilters);
  if (serviceCards.length) applyServiceFilters();

  /* Contact form enhancements --------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const message = document.getElementById("message");
  const successMessage = document.getElementById("formSuccess");
  const DRAFT_KEY = "ftpl-contact-draft";

  if (message && !document.getElementById("ftplCharCount")) {
    const wrap = document.createElement("div");
    wrap.className = "d-flex justify-content-between align-items-center mb-2";
    const label = contactForm?.querySelector('label[for="message"]');
    if (label && label.parentElement) {
      const parent = label.parentElement;
      const count = document.createElement("span");
      count.id = "ftplCharCount";
      count.className = "ftpl-char-count";
      count.setAttribute("aria-live", "polite");
      message.setAttribute("maxlength", "800");
      label.classList.add("mb-0");
      wrap.appendChild(label);
      wrap.appendChild(count);
      parent.insertBefore(wrap, message);
    }
  }

  const charCount = document.getElementById("ftplCharCount");
  function updateCharCount() {
    if (!message || !charCount) return;
    charCount.textContent = `${message.value.length} / ${message.maxLength || 800}`;
  }
  message?.addEventListener("input", updateCharCount);
  updateCharCount();

  if (contactForm && !document.getElementById("ftplSaveDraft")) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      const draftBtn = document.createElement("button");
      draftBtn.type = "button";
      draftBtn.id = "ftplSaveDraft";
      draftBtn.className = "btn btn-outline-secondary btn-lg px-4 ms-2";
      draftBtn.innerHTML = '<i class="fas fa-save me-2"></i>Save draft';
      submitBtn.insertAdjacentElement("afterend", draftBtn);

      draftBtn.addEventListener("click", () => {
        const data = {
          firstName: document.getElementById("firstName")?.value || "",
          lastName: document.getElementById("lastName")?.value || "",
          email: document.getElementById("email")?.value || "",
          phone: document.getElementById("phone")?.value || "",
          company: document.getElementById("company")?.value || "",
          service: document.getElementById("service")?.value || "",
          budget: document.getElementById("budget")?.value || "",
          message: message?.value || "",
          newsletter: Boolean(document.getElementById("newsletter")?.checked),
        };
        try {
          localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
          showToast("Draft saved", "Your contact form draft was stored in this browser.");
        } catch (err) {
          showToast("Save failed", "Local storage is unavailable.");
        }
      });
    }

    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (saved) {
        Object.entries(saved).forEach(([key, value]) => {
          const el = document.getElementById(key);
          if (!el) return;
          if (el.type === "checkbox") el.checked = Boolean(value);
          else el.value = value;
        });
        updateCharCount();
      }
    } catch (err) {
      /* ignore */
    }
  }

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      return;
    }

    contactForm.classList.add("was-validated");
    successMessage?.classList.remove("d-none");
    showToast("Message sent", "Demo confirmation — connect this form to your backend when ready.");

    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      /* ignore */
    }

    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove("was-validated");
      updateCharCount();
      successMessage?.classList.add("d-none");
    }, 2500);
  });

  /* Contact FAQ → accordion ----------------------------------------------- */
  const faqItems = document.querySelectorAll(".ftpl-faq-item");
  if (faqItems.length && !document.getElementById("ftplFaqAccordion")) {
    const container = faqItems[0].closest(".row");
    if (container) {
      const accordion = document.createElement("div");
      accordion.className = "accordion ftpl-faq-accordion";
      accordion.id = "ftplFaqAccordion";

      faqItems.forEach((item, index) => {
        const title = item.querySelector("h5")?.textContent?.trim() || `Question ${index + 1}`;
        const body = item.querySelector("p")?.textContent?.trim() || "";
        const id = `ftplFaq${index + 1}`;
        const open = index === 0;
        accordion.insertAdjacentHTML(
          "beforeend",
          `<div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button${open ? "" : " collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="${open}" aria-controls="${id}">${title}</button>
            </h2>
            <div id="${id}" class="accordion-collapse collapse${open ? " show" : ""}" data-bs-parent="#ftplFaqAccordion">
              <div class="accordion-body">${body}</div>
            </div>
          </div>`
        );
      });

      container.replaceWith(accordion);
    }
  }

  /* Careers job filter ---------------------------------------------------- */
  const jobSearch = document.getElementById("ftplJobSearch");
  const jobFilterBtns = document.querySelectorAll("[data-job-filter]");
  const jobCards = document.querySelectorAll("[data-job]");
  const jobCount = document.getElementById("ftplJobCount");
  const jobEmpty = document.getElementById("ftplJobEmpty");
  let activeJobFilter = "all";

  function applyJobFilters() {
    if (!jobCards.length) return;
    const q = (jobSearch?.value || "").trim().toLowerCase();
    let visible = 0;
    jobCards.forEach((card) => {
      const type = card.getAttribute("data-job") || "";
      const text = card.textContent.toLowerCase();
      const typeOk = activeJobFilter === "all" || type === activeJobFilter;
      const searchOk = !q || text.includes(q);
      const show = typeOk && searchOk;
      card.classList.toggle("ftpl-hidden", !show);
      if (show) visible += 1;
    });
    if (jobCount) jobCount.textContent = `${visible} open role${visible === 1 ? "" : "s"}`;
    jobEmpty?.classList.toggle("d-none", visible !== 0);
  }

  jobFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeJobFilter = btn.getAttribute("data-job-filter") || "all";
      jobFilterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyJobFilters();
    });
  });
  jobSearch?.addEventListener("input", applyJobFilters);
  if (jobCards.length) applyJobFilters();

  document.querySelectorAll(".ftpl-apply-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.getAttribute("data-role") || "this role";
      showToast("Application started", `Demo: apply for ${role}. Route this to your ATS or contact form.`);
    });
  });

})();
