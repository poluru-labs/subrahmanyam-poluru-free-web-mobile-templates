/**
 * Commonroom — Community discussion forum
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var savedKey = "commonroom:saved";
  var postKey = "commonroom:posts";
  var toastEl = document.getElementById("crToast");
  var toastTimer;
  var category = "all";
  var savedOnly = false;
  var saved = [];
  var posts = [];

  try {
    saved = JSON.parse(localStorage.getItem(savedKey) || "[]") || [];
    posts = JSON.parse(localStorage.getItem(postKey) || "[]") || [];
  } catch {
    saved = [];
    posts = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("crToastTitle");
    var bodyEl = document.getElementById("crToastBody");
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

  var navToggle = document.getElementById("crNavToggle");
  var navPanel = document.getElementById("crNavPanel");

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

  document.querySelectorAll("#crNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  var header = document.getElementById("crHeader");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 6;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("border-line", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function updateSavedCount() {
    document.querySelectorAll("[data-cr-saved-count]").forEach(function (el) {
      el.textContent = String(saved.length);
    });
  }
  updateSavedCount();

  var cards = Array.prototype.slice.call(document.querySelectorAll(".cr-thread"));
  var searchInput = document.getElementById("crSearch");
  var savedToggle = document.getElementById("crSavedToggle");

  function applyFilter() {
    var query = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var cat = card.getAttribute("data-category") || "";
      var id = card.getAttribute("data-cr-id") || "";
      var categoryOk = category === "all" || cat === category;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !query || hay.toLowerCase().indexOf(query) !== -1;
      var savedOk = !savedOnly || saved.indexOf(id) >= 0;
      var show = categoryOk && queryOk && savedOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("crThreadCount");
    var empty = document.getElementById("crEmpty");
    if (count) count.textContent = visible + " thread" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-cr-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      category = btn.getAttribute("data-cr-filter") || "all";
      document.querySelectorAll("[data-cr-filter]").forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-brand", active);
        b.classList.toggle("border-brand", active);
        b.classList.toggle("text-white", active);
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
    showToast(savedOnly ? "Saved only" : "All threads", savedOnly ? "Showing bookmarked discussions." : "Full board is visible.");
  });

  document.querySelectorAll("[data-cr-save]").forEach(function (btn) {
    var id = btn.getAttribute("data-cr-save") || "";
    if (saved.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-bookmark-fill"></i>' : '<i class="bi bi-bookmark"></i>';
      if (active && saved.indexOf(id) < 0) saved.push(id);
      if (!active) {
        saved = saved.filter(function (x) {
          return x !== id;
        });
      }
      writeList(savedKey, saved);
      updateSavedCount();
      if (savedOnly) applyFilter();
      showToast(active ? "Saved" : "Removed", active ? "Thread bookmarked in this browser." : "Bookmark removed.");
    });
  });

  document.querySelectorAll("[data-cr-reply]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-cr-reply") || "";
      var select = document.getElementById("crPostThread");
      if (select) select.value = id;
      document.getElementById("compose")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Thread selected", "Draft your reply in the compose form.");
    });
  });

  function renderPosts() {
    var list = document.getElementById("crPostList");
    var empty = document.getElementById("crPostEmpty");
    if (!list) return;
    if (!posts.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = posts
      .slice()
      .reverse()
      .map(function (item) {
        return (
          '<li class="rounded-xl border border-line bg-white p-4">' +
          '<div class="flex flex-wrap items-start justify-between gap-2">' +
          '<strong class="font-display">' +
          esc(item.title) +
          "</strong>" +
          '<button class="font-ui text-sm font-bold text-brand-ink hover:text-ink" type="button" data-cr-remove="' +
          esc(item.id) +
          '">Remove</button></div>' +
          '<p class="mt-2 text-sm text-muted">' +
          esc(item.category) +
          " · " +
          esc(item.author) +
          "</p>" +
          '<p class="mt-2 text-sm text-ink">' +
          esc(item.body) +
          "</p></li>"
        );
      })
      .join("");
  }

  document.getElementById("crPostList")?.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-cr-remove]");
    if (!btn) return;
    var id = btn.getAttribute("data-cr-remove");
    posts = posts.filter(function (item) {
      return item.id !== id;
    });
    writeList(postKey, posts);
    renderPosts();
    showToast("Removed", "That draft left this browser.");
  });

  document.getElementById("crPostForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var threadSelect = document.getElementById("crPostThread");
    var threadId = String(data.get("thread") || "");
    var threadOption = threadSelect?.querySelector('option[value="' + threadId + '"]');
    var record = {
      id: String(Date.now()),
      title: String(data.get("title") || "").trim(),
      body: String(data.get("body") || "").trim(),
      author: String(data.get("name") || "").trim(),
      category: threadOption ? threadOption.textContent.split(" · ")[0] : "New topic",
      threadId: threadId
    };
    if (!record.title || !record.body) {
      showToast("Add details", "Title and message are required.");
      return;
    }
    posts.push(record);
    if (!writeList(postKey, posts)) {
      showToast("Not stored", "Browser storage is unavailable.");
      return;
    }
    form.reset();
    renderPosts();
    showToast("Draft saved", "Demo only. Nothing was posted to a live forum.");
  });

  document.getElementById("crContactForm")?.addEventListener("submit", function (event) {
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
    document.querySelectorAll(".cr-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".cr-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  renderPosts();
  applyFilter();
})();
