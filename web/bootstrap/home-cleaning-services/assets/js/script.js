/**
 * Brightfold — Home cleaning services
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var planKey = "brightfold:plan";
  var bookingKey = "brightfold:bookings";
  var toastEl = document.getElementById("hcToast");
  var toastTimer;
  var plan = {};
  var bookings = [];
  var activeFilter = "all";

  var catalog = {
    tidy: { title: "Whole-home tidy", price: 95, unit: "visit" },
    kitchen: { title: "Deep kitchen detail", price: 145, unit: "visit" },
    bath: { title: "Bathroom refresh", price: 85, unit: "visit" },
    moveout: { title: "Move-out reset", price: 220, unit: "visit" },
    weekly: { title: "Weekly rhythm", price: 89, unit: "visit" },
    office: { title: "Home office reset", price: 75, unit: "visit" },
    party: { title: "Post-gathering clean", price: 160, unit: "visit" },
    supplies: { title: "Eco supply kit", price: 25, unit: "kit" },
  };

  try {
    plan = JSON.parse(localStorage.getItem(planKey) || "{}") || {};
  } catch {
    plan = {};
  }

  try {
    bookings = JSON.parse(localStorage.getItem(bookingKey) || "[]") || [];
  } catch {
    bookings = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("hcToastTitle");
    var bodyEl = document.getElementById("hcToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function writePlan() {
    try {
      localStorage.setItem(planKey, JSON.stringify(plan));
      return true;
    } catch {
      return false;
    }
  }

  function writeBookings() {
    try {
      localStorage.setItem(bookingKey, JSON.stringify(bookings));
      return true;
    } catch {
      return false;
    }
  }

  function planCount() {
    return Object.values(plan).reduce(function (sum, qty) {
      return sum + qty;
    }, 0);
  }

  function formatMoney(amount) {
    return "$" + amount.toFixed(2);
  }

  var nav = document.querySelector(".hc-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var toggler = document.querySelector(".hc-toggler");
  var togglerIcon = toggler ? toggler.querySelector("i") : null;
  if (collapseEl && togglerIcon) {
    collapseEl.addEventListener("shown.bs.collapse", function () {
      togglerIcon.classList.replace("bi-list", "bi-x-lg");
      toggler.setAttribute("aria-label", "Close menu");
    });
    collapseEl.addEventListener("hidden.bs.collapse", function () {
      togglerIcon.classList.replace("bi-x-lg", "bi-list");
      toggler.setAttribute("aria-label", "Open menu");
    });
  }

  document.querySelectorAll("#mainNav a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!collapseEl || !collapseEl.classList.contains("show")) return;
      if (typeof bootstrap === "undefined") return;
      bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
    });
  });

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
    document.querySelectorAll(".hc-reveal").forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll(".hc-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  function renderPlanCount() {
    var countEl = document.getElementById("hcPlanCount");
    if (countEl) countEl.textContent = String(planCount());
  }

  function renderPlan() {
    var list = document.getElementById("hcPlanList");
    var totalEl = document.getElementById("hcPlanTotal");
    if (!list) return;

    var ids = Object.keys(plan).filter(function (id) {
      return plan[id] > 0;
    });

    if (!ids.length) {
      list.innerHTML = '<li class="hc-empty">Your plan is empty. Add services from the board.</li>';
      if (totalEl) totalEl.hidden = true;
      renderPlanCount();
      return;
    }

    var total = 0;
    list.innerHTML = ids
      .map(function (id) {
        var item = catalog[id];
        if (!item) return "";
        var qty = plan[id];
        total += item.price * qty;
        return (
          '<li><div class="hc-basket-row"><div><strong>' +
          esc(item.title) +
          '</strong><br /><span>' +
          formatMoney(item.price) +
          " / " +
          esc(item.unit) +
          '</span></div><div class="hc-basket-qty"><button type="button" data-qty-minus="' +
          esc(id) +
          '" aria-label="Decrease ' +
          esc(item.title) +
          '">−</button><span>' +
          qty +
          '</span><button type="button" data-qty-plus="' +
          esc(id) +
          '" aria-label="Increase ' +
          esc(item.title) +
          '">+</button></div></div></li>'
        );
      })
      .join("");

    if (totalEl) {
      totalEl.hidden = false;
      totalEl.innerHTML = "Estimated total: <strong>" + formatMoney(total) + "</strong>";
    }
    renderPlanCount();
  }

  function renderBookings() {
    var list = document.getElementById("hcBookingList");
    if (!list) return;
    if (!bookings.length) {
      list.innerHTML = '<li class="hc-empty">No booking requests yet.</li>';
      return;
    }
    list.innerHTML = bookings
      .slice()
      .reverse()
      .map(function (item, index) {
        var realIndex = bookings.length - 1 - index;
        var lines = item.planLines || 0;
        return (
          '<li><div class="hc-pickup-top"><strong>' +
          esc(item.name) +
          '</strong><button type="button" class="hc-linkish" data-remove-booking="' +
          realIndex +
          '">Remove</button></div><span>' +
          esc(item.slot) +
          " · " +
          lines +
          " plan line" +
          (lines === 1 ? "" : "s") +
          "</span></li>"
        );
      })
      .join("");
  }

  function applyServiceFilters() {
    var query = (document.getElementById("hcServiceSearch")?.value || "").trim().toLowerCase();
    var cards = document.querySelectorAll(".hc-produce");
    var visible = 0;
    cards.forEach(function (card) {
      var type = card.getAttribute("data-category") || "";
      var tags = (card.getAttribute("data-tags") || "").toLowerCase();
      var title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
      var matchFilter = activeFilter === "all" || type === activeFilter;
      var matchQuery = !query || tags.indexOf(query) !== -1 || title.indexOf(query) !== -1;
      var show = matchFilter && matchQuery;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var countEl = document.getElementById("hcServiceCount");
    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " item" : " items");
    }
  }

  document.getElementById("hcServiceFilters")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".hc-chip");
    if (!btn) return;
    activeFilter = btn.getAttribute("data-filter") || "all";
    document.querySelectorAll("#hcServiceFilters .hc-chip").forEach(function (chip) {
      var active = chip === btn;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });
    applyServiceFilters();
  });

  document.getElementById("hcServiceSearch")?.addEventListener("input", applyServiceFilters);

  document.getElementById("hcServiceGrid")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".hc-add");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    if (!id || !catalog[id]) return;
    plan[id] = (plan[id] || 0) + 1;
    writePlan();
    renderPlan();
    showToast("Added", catalog[id].title + " is in your plan.");
  });

  document.getElementById("hcPlanList")?.addEventListener("click", function (event) {
    var minus = event.target.closest("[data-qty-minus]");
    var plus = event.target.closest("[data-qty-plus]");
    var id = minus?.getAttribute("data-qty-minus") || plus?.getAttribute("data-qty-plus");
    if (!id) return;
    if (plus) {
      plan[id] = (plan[id] || 0) + 1;
    } else {
      plan[id] = (plan[id] || 0) - 1;
      if (plan[id] <= 0) delete plan[id];
    }
    writePlan();
    renderPlan();
  });

  document.getElementById("hcBookingList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-remove-booking]");
    if (!btn) return;
    var index = Number(btn.getAttribute("data-remove-booking"));
    if (Number.isNaN(index)) return;
    bookings.splice(index, 1);
    writeBookings();
    renderBookings();
    showToast("Removed", "Booking request deleted from this browser.");
  });

  document.getElementById("hcBookingForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var name = form.querySelector("#hcBookName")?.value?.trim() || "";
    var email = form.querySelector("#hcBookEmail")?.value?.trim() || "";
    var slot = form.querySelector("#hcBookSlot")?.value || "";
    if (!name || !email || !slot) return;

    var ids = Object.keys(plan).filter(function (id) {
      return plan[id] > 0;
    });

    bookings.push({
      name: name,
      email: email,
      slot: slot,
      notes: form.querySelector("#hcBookNotes")?.value?.trim() || "",
      plan: JSON.parse(JSON.stringify(plan)),
      planLines: ids.length,
      at: new Date().toISOString(),
    });
    writeBookings();
    renderBookings();
    form.reset();
    showToast("Booking saved", "Demo request stored with your plan snapshot.");
  });

  document.getElementById("hcContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Note saved", "Demo only — nothing was emailed.");
  });

  renderPlan();
  renderBookings();
  applyServiceFilters();
})();
