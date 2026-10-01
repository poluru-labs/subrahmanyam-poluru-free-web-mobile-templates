(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var nav = document.querySelector(".cv-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".cv-toggler i");
  if (collapseEl && togglerIcon && typeof bootstrap !== "undefined") {
    collapseEl.addEventListener("shown.bs.collapse", function () {
      togglerIcon.classList.replace("bi-list", "bi-x-lg");
    });
    collapseEl.addEventListener("hidden.bs.collapse", function () {
      togglerIcon.classList.replace("bi-x-lg", "bi-list");
    });
  }

  document.querySelectorAll("#mainNav a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!collapseEl || !collapseEl.classList.contains("show") || typeof bootstrap === "undefined") return;
      bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
    });
  });

  var reveals = document.querySelectorAll(".cv-reveal");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  var rows = Array.prototype.slice.call(document.querySelectorAll(".cv-episode"));
  var chips = Array.prototype.slice.call(document.querySelectorAll("[data-category]"));
  var search = document.getElementById("episode-search");
  var empty = document.getElementById("episode-empty");
  var countEl = document.getElementById("episode-count");
  var showButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-show]"));

  var player = document.getElementById("player");
  var playerShow = document.getElementById("player-show");
  var playerTitle = document.getElementById("player-title");
  var playerCover = document.getElementById("player-cover");
  var playerToggle = document.getElementById("player-toggle");
  var playerPrev = document.getElementById("player-prev");
  var playerNext = document.getElementById("player-next");
  var playerRange = document.getElementById("player-range");
  var playerElapsed = document.getElementById("player-elapsed");
  var playerTotal = document.getElementById("player-total");
  var playerSpeed = document.getElementById("player-speed");
  var playerStatus = document.getElementById("player-status");
  var heroPanel = document.querySelector(".cv-hero-panel");

  var category = "all";
  var showFilter = "all";
  var query = "";
  var current = null;
  var playing = false;
  var position = 0;
  var speed = 1;
  var seeking = false;
  var raf = 0;
  var last = 0;
  var paintedId = "";
  var speeds = [1, 1.25, 1.5, 2];

  function formatTime(seconds) {
    var total = Math.max(0, Math.floor(seconds));
    var minutes = Math.floor(total / 60);
    var remain = total % 60;
    return minutes + ":" + String(remain).padStart(2, "0");
  }

  function durationOf(row) {
    return Number(row.getAttribute("data-minutes")) * 60;
  }

  function applyFilters() {
    var visible = 0;
    var q = query.trim().toLowerCase();
    rows.forEach(function (row) {
      var haystack = (row.getAttribute("data-show") + " " + row.getAttribute("data-title")).toLowerCase();
      var categoryOk = category === "all" || category === "saved"
        ? (category === "saved" ? row.classList.contains("is-saved") : true)
        : row.getAttribute("data-category") === category;
      var showOk = showFilter === "all" || row.getAttribute("data-show") === showFilter;
      var searchOk = !q || haystack.indexOf(q) !== -1;
      var show = categoryOk && showOk && searchOk;
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) {
      empty.hidden = visible !== 0;
      if (category === "saved" && visible === 0 && !q) {
        empty.textContent = "Save an episode to keep it in this list for the visit.";
      } else {
        empty.textContent = "No episodes match that filter.";
      }
    }
    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " episode" : " episodes");
    }
    showButtons.forEach(function (button) {
      button.classList.toggle("is-on", button.getAttribute("data-filter-show") === showFilter);
    });
  }

  function speedLabel() {
    if (speed === 1) return "1×";
    if (speed === 1.25) return "1.25×";
    if (speed === 1.5) return "1.5×";
    return "2×";
  }

  function paintTime() {
    if (!current) return;
    var duration = durationOf(current);
    playerElapsed.textContent = formatTime(position);
    playerRange.setAttribute("aria-valuenow", String(Math.floor(position)));
    playerRange.setAttribute("aria-valuetext", formatTime(position) + " of " + formatTime(duration));
    if (!seeking) playerRange.value = String(Math.floor(position));
    var pct = duration ? (position / duration) * 100 : 0;
    playerRange.style.setProperty("--pct", pct + "%");
  }

  function renderPlayer() {
    if (!current || !player) return;
    var duration = durationOf(current);
    player.hidden = false;
    document.body.classList.add("has-player");
    if (paintedId !== current.id) {
      playerShow.textContent = current.getAttribute("data-show");
      playerTitle.textContent = current.getAttribute("data-title");
      playerCover.className = "cv-cover cv-cover-sm " + current.getAttribute("data-cover");
      var sourceIcon = current.querySelector(".cv-cover i");
      playerCover.innerHTML = sourceIcon ? sourceIcon.outerHTML : "";
      playerTotal.textContent = formatTime(duration);
      playerRange.max = String(duration);
      playerRange.setAttribute("aria-valuemax", String(duration));
      paintedId = current.id;
    }
    paintTime();
    var icon = playing ? "bi-pause-fill" : "bi-play-fill";
    playerToggle.querySelector("i").className = "bi " + icon;
    playerToggle.setAttribute("aria-label", playing ? "Pause" : "Play");
    playerSpeed.textContent = speedLabel();
    rows.forEach(function (row) {
      row.classList.toggle("is-current", row === current);
      var button = row.querySelector(".cv-icon-btn[data-play]");
      if (!button) return;
      var rowIcon = button.querySelector("i");
      var title = row.getAttribute("data-title");
      var on = row === current && playing;
      rowIcon.className = on ? "bi bi-pause-fill" : "bi bi-play-fill";
      button.setAttribute("aria-label", (on ? "Pause " : "Play ") + title);
    });
    if (heroPanel) {
      heroPanel.classList.toggle("is-playing", playing && current.id === "ep-table");
    }
  }

  function setStatus(text) {
    if (playerStatus) playerStatus.textContent = text;
  }

  function tick(now) {
    if (!last) last = now;
    var delta = (now - last) / 1000;
    last = now;
    if (delta > 0.25) delta = 0.016;
    if (playing && current && !seeking) {
      position += delta * speed;
      var duration = durationOf(current);
      if (position >= duration) {
        position = duration;
        var upcoming = nextRow();
        if (upcoming) {
          openEpisode(upcoming, true);
          return;
        }
        playing = false;
        setStatus("Finished " + current.getAttribute("data-title"));
        renderPlayer();
      }
    }
    paintTime();
    if (playing) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
      last = 0;
    }
  }

  function ensureTick() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function openEpisode(row, autoplay) {
    if (!row) return;
    if (current !== row) {
      current = row;
      position = 0;
    }
    playing = autoplay;
    renderPlayer();
    setStatus((autoplay ? "Playing " : "Ready ") + row.getAttribute("data-title"));
    if (playing) ensureTick();
  }

  function toggleCurrent(row) {
    if (current === row && playing) {
      playing = false;
      renderPlayer();
      setStatus("Paused " + row.getAttribute("data-title"));
      return;
    }
    if (current === row && !playing) {
      playing = true;
      renderPlayer();
      setStatus("Playing " + row.getAttribute("data-title"));
      ensureTick();
      return;
    }
    openEpisode(row, true);
  }

  function nextRow() {
    if (!current) return rows[0];
    var index = rows.indexOf(current);
    return rows[index + 1] || null;
  }

  document.querySelectorAll("[data-play]").forEach(function (button) {
    button.addEventListener("click", function () {
      var row = document.getElementById(button.getAttribute("data-play"));
      if (button.classList.contains("cv-icon-btn")) toggleCurrent(row);
      else openEpisode(row, true);
    });
  });

  if (playerToggle) {
    playerToggle.addEventListener("click", function () {
      if (!current) {
        openEpisode(rows[0], true);
        return;
      }
      toggleCurrent(current);
    });
  }

  if (playerNext) {
    playerNext.addEventListener("click", function () {
      var upcoming = nextRow();
      if (upcoming && upcoming !== current) openEpisode(upcoming, true);
    });
  }

  if (playerPrev) {
    playerPrev.addEventListener("click", function () {
      if (!current) {
        openEpisode(rows[0], true);
        return;
      }
      if (position > 3) {
        position = 0;
        renderPlayer();
        setStatus("Restarted " + current.getAttribute("data-title"));
        return;
      }
      var index = rows.indexOf(current);
      if (index <= 0) {
        position = 0;
        renderPlayer();
        return;
      }
      openEpisode(rows[index - 1], playing);
    });
  }

  if (playerRange) {
    playerRange.addEventListener("pointerdown", function () { seeking = true; });
    playerRange.addEventListener("pointerup", function () { seeking = false; });
    playerRange.addEventListener("change", function () { seeking = false; });
    playerRange.addEventListener("input", function () {
      position = Number(playerRange.value);
      renderPlayer();
    });
  }

  if (playerSpeed) {
    playerSpeed.addEventListener("click", function () {
      var index = speeds.indexOf(speed);
      speed = speeds[(index + 1) % speeds.length];
      renderPlayer();
      setStatus("Speed " + playerSpeed.textContent);
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      category = chip.getAttribute("data-category");
      chips.forEach(function (other) {
        var on = other === chip;
        other.classList.toggle("is-on", on);
        other.setAttribute("aria-pressed", on ? "true" : "false");
      });
      applyFilters();
    });
  });

  showButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var name = button.getAttribute("data-filter-show");
      showFilter = showFilter === name ? "all" : name;
      if (showFilter !== "all") {
        category = "all";
        chips.forEach(function (chip) {
          var on = chip.getAttribute("data-category") === "all";
          chip.classList.toggle("is-on", on);
          chip.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
      applyFilters();
      var episodes = document.getElementById("episodes");
      if (episodes) episodes.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    });
  });

  if (search) {
    search.addEventListener("input", function () {
      query = search.value;
      applyFilters();
    });
  }

  document.querySelectorAll(".cv-save").forEach(function (button) {
    button.addEventListener("click", function () {
      var row = button.closest(".cv-episode");
      var saved = !row.classList.contains("is-saved");
      row.classList.toggle("is-saved", saved);
      button.setAttribute("aria-pressed", saved ? "true" : "false");
      button.setAttribute("aria-label", (saved ? "Remove saved episode " : "Save episode ") + row.getAttribute("data-title"));
      button.querySelector("i").className = saved ? "bi bi-bookmark-fill" : "bi bi-bookmark";
      applyFilters();
    });
  });

  document.querySelectorAll(".cv-follow").forEach(function (button) {
    button.addEventListener("click", function () {
      var on = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", on ? "true" : "false");
      button.textContent = on ? "Following" : "Follow";
    });
  });

  var form = document.getElementById("join-form");
  var success = document.getElementById("join-success");
  var reset = document.getElementById("join-reset");
  if (form && success) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        var invalid = form.querySelector(":invalid");
        if (invalid) invalid.focus();
        return;
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
    });
  }
  if (reset && form && success) {
    reset.addEventListener("click", function () {
      form.reset();
      form.classList.remove("was-validated");
      form.hidden = false;
      success.hidden = true;
      var field = form.querySelector("input");
      if (field) field.focus();
    });
  }

  applyFilters();
})();
