(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var header = document.querySelector(".ln-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggler = document.querySelector(".navbar-toggler");
  var collapse = document.getElementById("mainNav");
  if (toggler && collapse) {
    collapse.addEventListener("shown.bs.collapse", function () {
      toggler.querySelector("i").className = "bi bi-x-lg";
    });
    collapse.addEventListener("hidden.bs.collapse", function () {
      toggler.querySelector("i").className = "bi bi-list";
    });
    collapse.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function () {
        var instance = bootstrap.Collapse.getInstance(collapse);
        if (instance) instance.hide();
      });
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealNodes = document.querySelectorAll(".ln-reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealNodes.forEach(function (node) { node.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealNodes.forEach(function (node) { observer.observe(node); });
  }

  var people = Array.prototype.slice.call(document.querySelectorAll("[data-person]"));
  var team = "all";
  var place = "all";
  var query = "";
  var empty = document.getElementById("directory-empty");
  var count = document.getElementById("directory-count");

  function paintDirectory() {
    var shown = 0;
    people.forEach(function (row) {
      var hay = (row.getAttribute("data-search") || "").toLowerCase();
      var ok = (team === "all" || row.getAttribute("data-team") === team)
        && (place === "all" || row.getAttribute("data-place") === place)
        && (query === "" || hay.indexOf(query) !== -1);
      row.hidden = !ok;
      if (ok) shown += 1;
    });
    if (empty) empty.hidden = shown !== 0;
    if (count) count.textContent = shown + (shown === 1 ? " person" : " people");
  }

  document.querySelectorAll("[data-team-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      team = button.getAttribute("data-team-filter");
      document.querySelectorAll("[data-team-filter]").forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      paintDirectory();
    });
  });

  document.querySelectorAll("[data-place-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      place = button.getAttribute("data-place-filter");
      document.querySelectorAll("[data-place-filter]").forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      paintDirectory();
    });
  });

  var search = document.getElementById("directory-search");
  if (search) {
    search.addEventListener("input", function () {
      query = search.value.trim().toLowerCase();
      paintDirectory();
    });
  }
  paintDirectory();

  var notices = Array.prototype.slice.call(document.querySelectorAll("[data-notice]"));
  var noticeEmpty = document.getElementById("notice-empty");
  document.querySelectorAll("[data-notice-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      var topic = button.getAttribute("data-notice-filter");
      document.querySelectorAll("[data-notice-filter]").forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      var shown = 0;
      notices.forEach(function (card) {
        var ok = topic === "all" || card.getAttribute("data-notice") === topic;
        card.hidden = !ok;
        if (ok) shown += 1;
      });
      if (noticeEmpty) noticeEmpty.hidden = shown !== 0;
    });
  });

  var balance = 18;
  var daysInput = document.getElementById("leave-days");
  var previewLeft = document.getElementById("leave-left");
  var previewNote = document.getElementById("leave-note");

  function paintLeave() {
    var days = Number(daysInput && daysInput.value);
    if (!daysInput || !Number.isFinite(days) || days < 1) {
      if (previewLeft) previewLeft.textContent = String(balance);
      if (previewNote) previewNote.textContent = "Enter at least one day to preview the balance.";
      return;
    }
    var left = balance - days;
    if (previewLeft) previewLeft.textContent = left < 0 ? "0" : String(left);
    if (previewNote) {
      previewNote.textContent = left < 0
        ? "That request is longer than the 18 days on this sample balance."
        : days + (days === 1 ? " day" : " days") + " would leave " + left + " on the sample balance.";
    }
  }

  if (daysInput) daysInput.addEventListener("input", paintLeave);
  paintLeave();

  var leaveForm = document.getElementById("leave-form");
  var leaveSuccess = document.getElementById("leave-success");
  var leaveReset = document.getElementById("leave-reset");
  if (leaveForm) {
    leaveForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var days = Number(daysInput.value);
      var over = days > balance;
      daysInput.setCustomValidity(over ? "Over the sample balance" : "");
      if (!leaveForm.checkValidity()) {
        leaveForm.classList.add("was-validated");
        return;
      }
      leaveForm.hidden = true;
      if (leaveSuccess) {
        var kind = document.getElementById("leave-type");
        leaveSuccess.hidden = false;
        var line = document.getElementById("leave-success-line");
        if (line) {
          line.textContent = (kind ? kind.options[kind.selectedIndex].text : "Time off")
            + " for " + days + (days === 1 ? " day" : " days") + " is noted on this page. Nothing was sent.";
        }
      }
    });
  }
  if (leaveReset && leaveForm) {
    leaveReset.addEventListener("click", function () {
      leaveForm.reset();
      leaveForm.classList.remove("was-validated");
      if (daysInput) daysInput.setCustomValidity("");
      leaveForm.hidden = false;
      if (leaveSuccess) leaveSuccess.hidden = true;
      paintLeave();
    });
  }

  var askForm = document.getElementById("ask-form");
  var askSuccess = document.getElementById("ask-success");
  var askReset = document.getElementById("ask-reset");
  if (askForm) {
    askForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!askForm.checkValidity()) {
        askForm.classList.add("was-validated");
        return;
      }
      askForm.hidden = true;
      if (askSuccess) askSuccess.hidden = false;
    });
  }
  if (askReset && askForm) {
    askReset.addEventListener("click", function () {
      askForm.reset();
      askForm.classList.remove("was-validated");
      askForm.hidden = false;
      if (askSuccess) askSuccess.hidden = true;
    });
  }
})();
