/**
 * Fieldrow — Farmer marketplace
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var basketKey = "fieldrow:basket";
  var pickupKey = "fieldrow:pickups";
  var toastEl = document.getElementById("fmToast");
  var toastTimer;
  var basket = {};
  var pickups = [];
  var activeFilter = "all";

  var catalog = {
    tomato: { title: "Heirloom tomatoes", price: 4.5, unit: "lb" },
    strawberry: { title: "Early strawberries", price: 6, unit: "pint" },
    eggs: { title: "Pasture eggs", price: 7, unit: "dozen" },
    honey: { title: "Wildflower honey", price: 12, unit: "jar" },
    kale: { title: "Lacinato kale", price: 3.5, unit: "bunch" },
    peach: { title: "Hill country peaches", price: 5.5, unit: "lb" },
    cheese: { title: "Fresh chèvre", price: 9, unit: "wheel" },
    bread: { title: "Country sourdough", price: 8, unit: "loaf" },
  };

  try {
    basket = JSON.parse(localStorage.getItem(basketKey) || "{}") || {};
  } catch {
    basket = {};
  }

  try {
    pickups = JSON.parse(localStorage.getItem(pickupKey) || "[]") || [];
  } catch {
    pickups = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("fmToastTitle");
    var bodyEl = document.getElementById("fmToastBody");
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

  function writeBasket() {
    try {
      localStorage.setItem(basketKey, JSON.stringify(basket));
      return true;
    } catch {
      return false;
    }
  }

  function writePickups() {
    try {
      localStorage.setItem(pickupKey, JSON.stringify(pickups));
      return true;
    } catch {
      return false;
    }
  }

  function basketCount() {
    return Object.values(basket).reduce(function (sum, qty) {
      return sum + qty;
    }, 0);
  }

  function formatMoney(amount) {
    return "$" + amount.toFixed(2);
  }

  var nav = document.querySelector(".fm-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var toggler = document.querySelector(".fm-toggler");
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
    document.querySelectorAll(".fm-reveal").forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll(".fm-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  function renderBasketCount() {
    var countEl = document.getElementById("fmBasketCount");
    if (countEl) countEl.textContent = String(basketCount());
  }

  function renderBasket() {
    var list = document.getElementById("fmBasketList");
    var totalEl = document.getElementById("fmBasketTotal");
    if (!list) return;

    var ids = Object.keys(basket).filter(function (id) {
      return basket[id] > 0;
    });

    if (!ids.length) {
      list.innerHTML = '<li class="fm-empty">Your basket is empty. Add produce from the board.</li>';
      if (totalEl) totalEl.hidden = true;
      renderBasketCount();
      return;
    }

    var total = 0;
    list.innerHTML = ids
      .map(function (id) {
        var item = catalog[id];
        if (!item) return "";
        var qty = basket[id];
        total += item.price * qty;
        return (
          '<li><div class="fm-basket-row"><div><strong>' +
          esc(item.title) +
          '</strong><br /><span>' +
          formatMoney(item.price) +
          " / " +
          esc(item.unit) +
          '</span></div><div class="fm-basket-qty"><button type="button" data-qty-minus="' +
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
    renderBasketCount();
  }

  function renderPickups() {
    var list = document.getElementById("fmPickupList");
    if (!list) return;
    if (!pickups.length) {
      list.innerHTML = '<li class="fm-empty">No pickup requests yet.</li>';
      return;
    }
    list.innerHTML = pickups
      .slice()
      .reverse()
      .map(function (item, index) {
        var realIndex = pickups.length - 1 - index;
        var lines = item.basketLines || 0;
        return (
          '<li><div class="fm-pickup-top"><strong>' +
          esc(item.name) +
          '</strong><button type="button" class="fm-linkish" data-remove-pickup="' +
          realIndex +
          '">Remove</button></div><span>Sat ' +
          esc(item.slot) +
          " · " +
          lines +
          " basket line" +
          (lines === 1 ? "" : "s") +
          "</span></li>"
        );
      })
      .join("");
  }

  function applyProduceFilters() {
    var query = (document.getElementById("fmProduceSearch")?.value || "").trim().toLowerCase();
    var cards = document.querySelectorAll(".fm-produce");
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
    var countEl = document.getElementById("fmProduceCount");
    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " item" : " items");
    }
  }

  document.getElementById("fmProduceFilters")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".fm-chip");
    if (!btn) return;
    activeFilter = btn.getAttribute("data-filter") || "all";
    document.querySelectorAll("#fmProduceFilters .fm-chip").forEach(function (chip) {
      var active = chip === btn;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });
    applyProduceFilters();
  });

  document.getElementById("fmProduceSearch")?.addEventListener("input", applyProduceFilters);

  document.getElementById("fmProduceGrid")?.addEventListener("click", function (event) {
    var btn = event.target.closest(".fm-add");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    if (!id || !catalog[id]) return;
    basket[id] = (basket[id] || 0) + 1;
    writeBasket();
    renderBasket();
    showToast("Added", catalog[id].title + " is in your basket.");
  });

  document.getElementById("fmBasketList")?.addEventListener("click", function (event) {
    var minus = event.target.closest("[data-qty-minus]");
    var plus = event.target.closest("[data-qty-plus]");
    var id = minus?.getAttribute("data-qty-minus") || plus?.getAttribute("data-qty-plus");
    if (!id) return;
    if (plus) {
      basket[id] = (basket[id] || 0) + 1;
    } else {
      basket[id] = (basket[id] || 0) - 1;
      if (basket[id] <= 0) delete basket[id];
    }
    writeBasket();
    renderBasket();
  });

  document.getElementById("fmPickupList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-remove-pickup]");
    if (!btn) return;
    var index = Number(btn.getAttribute("data-remove-pickup"));
    if (Number.isNaN(index)) return;
    pickups.splice(index, 1);
    writePickups();
    renderPickups();
    showToast("Removed", "Pickup request deleted from this browser.");
  });

  document.getElementById("fmPickupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var name = form.querySelector("#fmPickupName")?.value?.trim() || "";
    var email = form.querySelector("#fmPickupEmail")?.value?.trim() || "";
    var slot = form.querySelector("#fmPickupSlot")?.value || "";
    if (!name || !email || !slot) return;

    var ids = Object.keys(basket).filter(function (id) {
      return basket[id] > 0;
    });

    pickups.push({
      name: name,
      email: email,
      slot: slot,
      notes: form.querySelector("#fmPickupNotes")?.value?.trim() || "",
      basket: JSON.parse(JSON.stringify(basket)),
      basketLines: ids.length,
      at: new Date().toISOString(),
    });
    writePickups();
    renderPickups();
    form.reset();
    showToast("Pickup saved", "Demo request stored with your basket snapshot.");
  });

  document.getElementById("fmContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Note saved", "Demo only — nothing was emailed.");
  });

  renderBasket();
  renderPickups();
  applyProduceFilters();
})();
