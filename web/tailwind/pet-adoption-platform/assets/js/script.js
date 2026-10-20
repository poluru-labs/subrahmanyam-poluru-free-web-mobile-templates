/**
 * Pawlane — Pet adoption platform
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var favKey = "pawlane:favorites";
  var inquiryKey = "pawlane:inquiries";
  var toastEl = document.getElementById("plToast");
  var toastTimer;
  var species = "all";
  var savedOnly = false;
  var favorites = [];
  var inquiries = [];

  try {
    favorites = JSON.parse(localStorage.getItem(favKey) || "[]") || [];
    inquiries = JSON.parse(localStorage.getItem(inquiryKey) || "[]") || [];
  } catch {
    favorites = [];
    inquiries = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("plToastTitle");
    var bodyEl = document.getElementById("plToastBody");
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

  var navToggle = document.getElementById("plNavToggle");
  var navPanel = document.getElementById("plNavPanel");

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

  function closeNav() {
    setNavOpen(false);
  }

  navToggle?.addEventListener("click", function () {
    setNavOpen(!navPanel?.classList.contains("is-open"));
  });

  document.querySelectorAll("#plNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  var header = document.getElementById("plHeader");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 6;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("border-line", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var cards = Array.prototype.slice.call(document.querySelectorAll(".pl-pet"));
  var searchInput = document.getElementById("plSearch");
  var savedToggle = document.getElementById("plSavedToggle");
  var savedNav = document.getElementById("plSavedNav");

  function updateSavedCount() {
    var countEl = document.getElementById("plSavedCount");
    if (countEl) countEl.textContent = String(favorites.length);
    var navCount = document.getElementById("plSavedNavCount");
    if (navCount) navCount.textContent = String(favorites.length);
  }

  function setSpecies(next) {
    species = next;
    document.querySelectorAll("[data-pl-filter]").forEach(function (btn) {
      var active = btn.getAttribute("data-pl-filter") === species;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("bg-brand", active);
      btn.classList.toggle("border-brand", active);
      btn.classList.toggle("bg-white", !active);
      btn.classList.toggle("border-line", !active);
    });
    applyFilter();
  }

  function applyFilter() {
    var query = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var kind = card.getAttribute("data-species") || "";
      var id = card.getAttribute("data-id") || "";
      var speciesOk = species === "all" || kind === species;
      var savedOk = !savedOnly || favorites.indexOf(id) !== -1;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !query || hay.toLowerCase().indexOf(query) !== -1;
      var show = speciesOk && savedOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("plPetCount");
    var empty = document.getElementById("plEmpty");
    if (count) {
      count.textContent = visible + " companion" + (visible === 1 ? "" : "s");
    }
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-pl-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setSpecies(btn.getAttribute("data-pl-filter") || "all");
    });
  });

  document.querySelectorAll("[data-pl-jump]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setSpecies(btn.getAttribute("data-pl-jump") || "all");
      document.getElementById("pets")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  searchInput?.addEventListener("input", applyFilter);

  function setSavedOnly(next) {
    savedOnly = next;
    if (savedToggle) {
      savedToggle.setAttribute("aria-pressed", savedOnly ? "true" : "false");
      savedToggle.classList.toggle("bg-ink", savedOnly);
      savedToggle.classList.toggle("text-white", savedOnly);
      savedToggle.classList.toggle("border-ink", savedOnly);
      savedToggle.classList.toggle("bg-white", !savedOnly);
      savedToggle.classList.toggle("text-ink", !savedOnly);
      savedToggle.classList.toggle("border-line", !savedOnly);
    }
    applyFilter();
  }

  savedToggle?.addEventListener("click", function () {
    setSavedOnly(!savedOnly);
  });

  savedNav?.addEventListener("click", function () {
    setSavedOnly(true);
    closeNav();
    document.getElementById("pets")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll("[data-pl-fav]").forEach(function (btn) {
    var id = btn.getAttribute("data-pl-fav");
    function paint(active) {
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active
        ? '<i class="bi bi-heart-fill" aria-hidden="true"></i>'
        : '<i class="bi bi-heart" aria-hidden="true"></i>';
    }
    paint(favorites.indexOf(id) !== -1);
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      paint(active);
      if (active && favorites.indexOf(id) === -1) favorites.push(id);
      if (!active) {
        favorites = favorites.filter(function (item) {
          return item !== id;
        });
      }
      updateSavedCount();
      if (!writeList(favKey, favorites)) {
        showToast("Saved this visit", "Browser storage is unavailable.");
      } else {
        var name = btn.getAttribute("data-pl-name") || "Companion";
        showToast(active ? "Saved" : "Removed", name + (active ? " is on your list." : " left your saved list."));
      }
      if (savedOnly) applyFilter();
    });
  });

  var petSelect = document.getElementById("plPetSelect");

  document.querySelectorAll("[data-pl-meet]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-pl-meet") || "";
      var name = btn.getAttribute("data-pl-name") || "this companion";
      if (petSelect) petSelect.value = id;
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Ready to meet", "Request started for " + name + ".");
    });
  });

  function renderInquiries() {
    var list = document.getElementById("plInquiryList");
    var empty = document.getElementById("plInquiryEmpty");
    if (!list) return;
    if (!inquiries.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = inquiries
      .slice()
      .reverse()
      .map(function (item) {
        return (
          '<li class="rounded-xl border border-line bg-canvas px-4 py-3">' +
          '<div class="flex items-start justify-between gap-3">' +
          '<p class="font-display font-bold text-ink">' + esc(item.petName) + "</p>" +
          '<button class="font-ui text-xs font-bold text-brand-ink" type="button" data-pl-remove="' + esc(item.id) + '">Remove</button>' +
          "</div>" +
          '<p class="mt-1 text-sm text-muted">' + esc(item.name) + " · " + esc(item.home) + " · " + esc(item.when) + "</p>" +
          "</li>"
        );
      })
      .join("");
  }

  document.getElementById("plInquiryList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-pl-remove]");
    if (!btn) return;
    var id = btn.getAttribute("data-pl-remove");
    inquiries = inquiries.filter(function (item) {
      return item.id !== id;
    });
    writeList(inquiryKey, inquiries);
    renderInquiries();
    showToast("Removed", "That demo request is gone from this browser.");
  });

  document.getElementById("plApplyForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var petId = String(data.get("pet") || "");
    var option = petSelect?.querySelector('option[value="' + petId + '"]');
    var record = {
      id: String(Date.now()),
      pet: petId,
      petName: option ? option.textContent : petId,
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      home: String(data.get("home") || "").trim(),
      when: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
    };
    inquiries.push(record);
    if (!writeList(inquiryKey, inquiries)) {
      showToast("Not stored", "Browser storage is unavailable. Nothing was sent.");
      return;
    }
    form.reset();
    if (petSelect) petSelect.value = petId;
    renderInquiries();
    showToast("Request saved", "Demo only. " + record.petName + " was not contacted.");
  });

  document.getElementById("plContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Note saved", "Demo only. Nothing was emailed to the shelter.");
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
    document.querySelectorAll(".pl-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".pl-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  updateSavedCount();
  renderInquiries();
  applyFilter();
})();
