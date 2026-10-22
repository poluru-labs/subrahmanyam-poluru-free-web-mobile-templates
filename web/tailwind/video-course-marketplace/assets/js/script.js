/**
 * Reeldesk — Video course marketplace
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var savedKey = "reeldesk:saved";
  var enrollKey = "reeldesk:enrolls";
  var toastEl = document.getElementById("vdToast");
  var toastTimer;
  var category = "all";
  var savedOnly = false;
  var saved = [];
  var enrolls = [];

  var courseTitles = {
    "modern-web": "Modern web foundations",
    "ui-systems": "UI systems in Figma",
    "product-launch": "Product launch playbook",
    "motion-basics": "Motion for product teams",
    "python-data": "Python for data stories",
    accessibility: "Accessible interface patterns",
    "team-leads": "Leading small product teams",
    "video-edit": "Course video editing",
  };

  var paceLabels = {
    weekend: "Weekend sprint",
    evenings: "Evenings · 2 hrs/week",
    month: "One chapter per week",
  };

  try {
    saved = JSON.parse(localStorage.getItem(savedKey) || "[]") || [];
  } catch {
    saved = [];
  }

  try {
    enrolls = JSON.parse(localStorage.getItem(enrollKey) || "[]") || [];
  } catch {
    enrolls = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("vdToastTitle");
    var bodyEl = document.getElementById("vdToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function writeList(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  var navToggle = document.getElementById("vdNavToggle");
  var navPanel = document.getElementById("vdNavPanel");

  function setNavOpen(open) {
    navPanel?.classList.toggle("is-open", open);
    navToggle?.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    var icon = navToggle?.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  }

  navToggle?.addEventListener("click", function () {
    setNavOpen(!navPanel?.classList.contains("is-open"));
  });

  document.querySelectorAll("#vdNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  var header = document.getElementById("vdHeader");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 6;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("border-line", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".vd-reveal").forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll(".vd-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  function updateSavedCount() {
    document.querySelectorAll("[data-vd-saved-count]").forEach(function (el) {
      el.textContent = String(saved.length);
    });
  }

  function syncSaveButtons() {
    document.querySelectorAll(".vd-save").forEach(function (btn) {
      var id = btn.getAttribute("data-id");
      var on = saved.indexOf(id) !== -1;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      var icon = btn.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-bookmark-fill", on);
        icon.classList.toggle("bi-bookmark", !on);
      }
    });
  }

  var cards = Array.prototype.slice.call(document.querySelectorAll(".vd-course"));
  var searchInput = document.getElementById("vdSearch");
  var savedToggle = document.getElementById("vdSavedToggle");

  function applyFilters() {
    var query = (searchInput?.value || "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var id = card.getAttribute("data-id");
      var type = card.getAttribute("data-category") || "";
      var tags = (card.getAttribute("data-tags") || "").toLowerCase();
      var title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
      var matchCat = category === "all" || type === category;
      var matchQuery = !query || tags.indexOf(query) !== -1 || title.indexOf(query) !== -1;
      var matchSaved = !savedOnly || saved.indexOf(id) !== -1;
      var show = matchCat && matchQuery && matchSaved;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var countEl = document.getElementById("vdCourseCount");
    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " course" : " courses");
    }
  }

  document.getElementById("vdCourseFilters")?.addEventListener("click", function (event) {
    var chip = event.target.closest(".vd-chip");
    if (!chip) return;
    category = chip.getAttribute("data-filter") || "all";
    document.querySelectorAll("#vdCourseFilters .vd-chip").forEach(function (el) {
      var active = el === chip;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-pressed", active ? "true" : "false");
    });
    applyFilters();
  });

  searchInput?.addEventListener("input", applyFilters);

  savedToggle?.addEventListener("click", function () {
    savedOnly = !savedOnly;
    savedToggle.setAttribute("aria-pressed", savedOnly ? "true" : "false");
    applyFilters();
  });

  document.getElementById("vdCourseGrid")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".vd-save");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    if (!id) return;
    var idx = saved.indexOf(id);
    if (idx === -1) {
      saved.push(id);
      showToast("Saved", courseTitles[id] || "Course saved on this device.");
    } else {
      saved.splice(idx, 1);
      showToast("Removed", "Course left your saved list.");
    }
    writeList(savedKey, saved);
    updateSavedCount();
    syncSaveButtons();
    applyFilters();
  });

  function renderEnrolls() {
    var list = document.getElementById("vdEnrollList");
    if (!list) return;
    if (!enrolls.length) {
      list.innerHTML =
        '<li class="rounded-xl border border-dashed border-line px-3 py-4 text-center text-muted">No enroll requests yet.</li>';
      return;
    }
    list.innerHTML = enrolls
      .slice()
      .reverse()
      .map(function (item, index) {
        var realIndex = enrolls.length - 1 - index;
        return (
          '<li class="rounded-xl border border-line bg-brand-soft px-3 py-2"><div class="flex justify-between gap-2"><strong class="font-display text-sm text-ink">' +
          esc(item.name) +
          '</strong><button type="button" class="font-ui text-xs font-bold text-brand-ink vd-remove-enroll" data-index="' +
          realIndex +
          '">Remove</button></div><span class="text-xs text-muted">' +
          esc(courseTitles[item.course] || item.course) +
          " · " +
          esc(item.paceLabel) +
          "</span></li>"
        );
      })
      .join("");
  }

  document.getElementById("vdEnrollList")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".vd-remove-enroll");
    if (!btn) return;
    var index = Number(btn.getAttribute("data-index"));
    if (Number.isNaN(index)) return;
    enrolls.splice(index, 1);
    writeList(enrollKey, enrolls);
    renderEnrolls();
    showToast("Removed", "Enrollment deleted from this browser.");
  });

  document.getElementById("vdEnrollForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var name = form.querySelector("#vdEnrollName")?.value?.trim() || "";
    var email = form.querySelector("#vdEnrollEmail")?.value?.trim() || "";
    var course = form.querySelector("#vdEnrollCourse")?.value || "";
    var pace = form.querySelector("#vdEnrollPace")?.value || "";
    if (!name || !email || !course || !pace) return;
    enrolls.push({
      name: name,
      email: email,
      course: course,
      pace: pace,
      paceLabel: paceLabels[pace] || pace,
      saved: saved.slice(),
      at: new Date().toISOString(),
    });
    writeList(enrollKey, enrolls);
    renderEnrolls();
    form.reset();
    showToast("Enrollment saved", "Demo request stored locally.");
  });

  document.getElementById("vdContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Note saved", "Demo only — nothing was emailed.");
  });

  updateSavedCount();
  syncSaveButtons();
  renderEnrolls();
  applyFilters();
})();
