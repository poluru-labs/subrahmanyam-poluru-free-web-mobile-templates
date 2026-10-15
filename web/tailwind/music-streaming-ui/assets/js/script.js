/**
 * WaveHarbor — Music streaming UI
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  document.body.classList.add("has-player");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("msToast");
  var toastTimer;
  var favKey = "waveharbor:favorites";
  var favorites = [];

  try {
    favorites = JSON.parse(localStorage.getItem(favKey) || "[]") || [];
  } catch {
    favorites = [];
  }

  function showToast(title, body) {
    var titleEl = document.getElementById("msToastTitle");
    var bodyEl = document.getElementById("msToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("msNavToggle");
  var navPanel = document.getElementById("msNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#msNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("msHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var searchInput = document.getElementById("msSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".ms-mix"));

  function applyFilter() {
    var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var mood = card.getAttribute("data-mood") || "";
      var moodOk = filter === "all" || mood === filter;
      var hay = (card.getAttribute("data-search") || "") + " " + card.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = moodOk && queryOk;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("msResult");
    var empty = document.getElementById("msEmpty");
    if (count) count.textContent = visible + " mix" + (visible === 1 ? "" : "es");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-ms-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-ms-filter") || "all";
      document.querySelectorAll("[data-ms-filter]").forEach(function (b) {
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

  document.querySelectorAll("[data-ms-fav]").forEach(function (btn) {
    var id = btn.getAttribute("data-ms-fav") || "";
    if (favorites.indexOf(id) >= 0) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
    }
    btn.addEventListener("click", function () {
      var active = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.innerHTML = active ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
      if (active && favorites.indexOf(id) < 0) favorites.push(id);
      if (!active) favorites = favorites.filter(function (x) {
        return x !== id;
      });
      try {
        localStorage.setItem(favKey, JSON.stringify(favorites));
      } catch {
        /* ignore */
      }
      showToast(active ? "Saved mix" : "Removed", "Library updated in this browser only.");
    });
  });

  var trackName = document.getElementById("msTrackName");
  var trackMeta = document.getElementById("msTrackMeta");
  var playBtn = document.getElementById("msPlay");
  var ctx;
  var oscillators = [];
  var playing = false;

  async function togglePlay(title, meta) {
    if (title && trackName) trackName.textContent = title;
    if (meta && trackMeta) trackMeta.textContent = meta;
    try {
      if (playing) {
        oscillators.forEach(function (o) {
          o.stop();
        });
        oscillators = [];
        playing = false;
        if (ctx) await ctx.suspend();
      } else {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        await ctx.resume();
        [130.81, 164.81, 196.0].forEach(function (f) {
          var osc = ctx.createOscillator();
          var g = ctx.createGain();
          osc.frequency.value = f;
          osc.type = "sine";
          g.gain.value = 0.025;
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start();
          oscillators.push(osc);
        });
        playing = true;
      }
      if (playBtn) {
        playBtn.innerHTML = playing
          ? '<i class="bi bi-pause-fill"></i> Pause'
          : '<i class="bi bi-play-fill"></i> Play';
      }
      if (playing && title) {
        showToast("Now playing (demo)", "Low-volume ambient preview in your browser.");
      }
    } catch {
      showToast("Audio unavailable", "Your browser blocked the demo preview.");
    }
  }

  playBtn?.addEventListener("click", function () {
    togglePlay();
  });

  document.querySelectorAll("[data-ms-play]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      togglePlay(
        btn.getAttribute("data-ms-play") || "Mix",
        btn.getAttribute("data-ms-meta") || "WaveHarbor demo"
      );
    });
  });

  document.getElementById("msContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only.");
  });

  document.getElementById("msSignupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Welcome (demo)", "No account was created.");
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
    document.querySelectorAll(".ms-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".ms-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
