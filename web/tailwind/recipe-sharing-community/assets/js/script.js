/**
 * Simmerbox — Recipe sharing community
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var savedKey = "simmerbox:saved";
  var shareKey = "simmerbox:shares";
  var toastEl = document.getElementById("rsToast");
  var toastTimer;
  var category = "all";
  var savedOnly = false;
  var saved = [];
  var shares = [];

  try {
    saved = JSON.parse(localStorage.getItem(savedKey) || "[]") || [];
    shares = JSON.parse(localStorage.getItem(shareKey) || "[]") || [];
  } catch {
    saved = [];
    shares = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("rsToastTitle");
    var bodyEl = document.getElementById("rsToastBody");
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

  var navToggle = document.getElementById("rsNavToggle");
  var navPanel = document.getElementById("rsNavPanel");

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

  document.querySelectorAll("#rsNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  var header = document.getElementById("rsHeader");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 6;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("border-line", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function updateSavedCount() {
    document.querySelectorAll("[data-rs-saved-count]").forEach(function (el) {
      el.textContent = String(saved.length);
    });
  }
  updateSavedCount();

  var cards = Array.prototype.slice.call(document.querySelectorAll(".rs-recipe"));
  var searchInput = document.getElementById("rsSearch");
  var savedToggle = document.getElementById("rsSavedToggle");

  function applyFilter() {
    var query = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var cat = card.getAttribute("data-category") || "";
      var id = card.getAttribute("data-rs-id") || "";
      var categoryOk = category === "all" || cat === category;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !query || hay.toLowerCase().indexOf(query) !== -1;
      var savedOk = !savedOnly || saved.indexOf(id) >= 0;
      var show = categoryOk && queryOk && savedOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("rsRecipeCount");
    var empty = document.getElementById("rsEmpty");
    if (count) count.textContent = visible + " recipe" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-rs-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      category = btn.getAttribute("data-rs-filter") || "all";
      document.querySelectorAll("[data-rs-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("text-ink", active);
        b.classList.toggle("border-line", !active);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("text-muted", !active);
      });
      applyFilter();
    });
  });

  searchInput?.addEventListener("input", applyFilter);

  savedToggle?.addEventListener("click", function () {
    savedOnly = !savedOnly;
    savedToggle.setAttribute("aria-pressed", savedOnly ? "true" : "false");
    savedToggle.classList.toggle("bg-brand-soft", savedOnly);
    savedToggle.classList.toggle("border-brand-ink", savedOnly);
    applyFilter();
    showToast(savedOnly ? "Saved only" : "All recipes", savedOnly ? "Showing your saved cards." : "Full library is visible.");
  });

  document.querySelectorAll("[data-rs-save]").forEach(function (btn) {
    var id = btn.getAttribute("data-rs-save") || "";
    if (saved.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
      if (active && saved.indexOf(id) < 0) saved.push(id);
      if (!active) {
        saved = saved.filter(function (x) {
          return x !== id;
        });
      }
      writeList(savedKey, saved);
      updateSavedCount();
      if (savedOnly) applyFilter();
      showToast(active ? "Saved" : "Removed", active ? "Recipe added to this browser." : "Recipe left your saved list.");
    });
  });

  document.querySelectorAll("[data-rs-cook]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-rs-cook") || "";
      var select = document.getElementById("rsShareRecipe");
      if (select) select.value = id;
      document.getElementById("share")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Recipe selected", "Add your note in the share form.");
    });
  });

  function renderShares() {
    var list = document.getElementById("rsShareList");
    var empty = document.getElementById("rsShareEmpty");
    if (!list) return;
    if (!shares.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = shares
      .slice()
      .reverse()
      .map(function (item) {
        return (
          '<li class="rounded-xl border border-line bg-white p-4">' +
          '<div class="flex flex-wrap items-start justify-between gap-2">' +
          '<strong class="font-display">' +
          esc(item.title) +
          "</strong>" +
          '<button class="font-ui text-sm font-bold text-brand-ink hover:text-ink" type="button" data-rs-remove="' +
          esc(item.id) +
          '">Remove</button></div>' +
          '<p class="mt-2 text-sm text-muted">' +
          esc(item.recipe) +
          " · " +
          esc(item.cook) +
          "</p></li>"
        );
      })
      .join("");
  }

  document.getElementById("rsShareList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-rs-remove]");
    if (!btn) return;
    var id = btn.getAttribute("data-rs-remove");
    shares = shares.filter(function (item) {
      return item.id !== id;
    });
    writeList(shareKey, shares);
    renderShares();
    showToast("Removed", "That demo note left this browser.");
  });

  document.getElementById("rsShareForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var recipeSelect = document.getElementById("rsShareRecipe");
    var recipeId = String(data.get("recipe") || "");
    var recipeOption = recipeSelect?.querySelector('option[value="' + recipeId + '"]');
    var record = {
      id: String(Date.now()),
      title: String(data.get("title") || "").trim(),
      recipe: recipeOption ? recipeOption.textContent : recipeId,
      cook: String(data.get("name") || "").trim()
    };
    if (!record.title) {
      showToast("Add a title", "Name your tip or variation first.");
      return;
    }
    shares.push(record);
    if (!writeList(shareKey, shares)) {
      showToast("Not stored", "Browser storage is unavailable.");
      return;
    }
    form.reset();
    renderShares();
    showToast("Note saved", "Demo only. Nothing was posted to a feed.");
  });

  document.getElementById("rsContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Note saved", "Demo only. Nothing was emailed.");
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rs-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".rs-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  renderShares();
  applyFilter();
})();
