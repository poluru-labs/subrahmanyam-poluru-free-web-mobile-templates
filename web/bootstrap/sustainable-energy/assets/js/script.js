(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var nav = document.querySelector(".hd-nav");
  function onScroll() {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var collapseEl = document.getElementById("mainNav");
  var togglerIcon = document.querySelector(".hd-toggler i");
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

  var reveals = document.querySelectorAll(".hd-reveal");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  var offsets = { apartment: 0.42, house: 0.68, acreage: 0.82 };
  var homeNames = { apartment: "Apartment", house: "House", acreage: "Acreage" };
  var form = document.getElementById("estimate-form");
  var result = document.getElementById("estimate-result");
  var billInput = document.getElementById("bill");
  var homeInput = document.getElementById("home-type");

  function money(value) {
    return "$" + Math.round(value).toLocaleString("en-US");
  }

  function paintEstimate(bill, home) {
    var annual = bill * 12;
    var offset = offsets[home] || offsets.house;
    var savings = annual * offset * 0.75;
    var panels = Math.max(4, Math.round((annual * offset) / 420));
    var system = panels * 310;
    var years = savings > 0 ? Math.round((system / savings) * 10) / 10 : 0;
    var solar = Math.round(offset * 80);
    var storage = Math.round(offset * 12);
    var grid = Math.max(0, 100 - solar - storage);

    document.getElementById("est-save").textContent = money(savings);
    document.getElementById("est-panels").textContent = String(panels);
    document.getElementById("est-years").textContent = years.toFixed(1).replace(".0", "");
    document.getElementById("est-bill").textContent = money(annual);
    var mixHome = document.getElementById("mix-home");
    if (mixHome) mixHome.textContent = "Sample month · " + (homeNames[home] || "House");

    ["solar", "storage", "grid"].forEach(function (key) {
      var amount = key === "solar" ? solar : key === "storage" ? storage : grid;
      var bar = document.querySelector('[data-mix="' + key + '"]');
      var label = document.querySelector('[data-mix-label="' + key + '"]');
      if (bar) bar.style.width = amount + "%";
      if (label) label.textContent = amount + "%";
    });

    if (result) {
      result.hidden = false;
    }
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        var invalid = form.querySelector(":invalid");
        if (invalid) invalid.focus();
        return;
      }
      paintEstimate(Number(billInput.value), homeInput.value);
    });
  }

  paintEstimate(180, "house");

  var billingButtons = document.querySelectorAll("[data-cycle]");
  function setCycle(cycle) {
    billingButtons.forEach(function (button) {
      var on = button.getAttribute("data-cycle") === cycle;
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll(".hd-price").forEach(function (price) {
      var amount = price.getAttribute(cycle === "year" ? "data-year" : "data-month");
      price.querySelector("strong").textContent = amount;
      price.querySelector("small").textContent = cycle === "year" ? "/ year" : "/ month";
    });
  }

  billingButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setCycle(button.getAttribute("data-cycle"));
    });
  });

  var planSelect = document.getElementById("quote-plan");
  var planCards = document.querySelectorAll(".hd-plan");

  document.querySelectorAll("[data-choose]").forEach(function (button) {
    button.addEventListener("click", function () {
      var name = button.getAttribute("data-choose");
      if (planSelect) planSelect.value = name;
      planCards.forEach(function (card) {
        card.classList.toggle("is-picked", card.getAttribute("data-plan") === name);
      });
      var ask = document.getElementById("ask");
      if (ask) ask.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      if (planSelect) planSelect.focus();
    });
  });

  var quote = document.getElementById("quote-form");
  var quoteSuccess = document.getElementById("quote-success");
  var quoteReset = document.getElementById("quote-reset");

  if (quote && quoteSuccess) {
    quote.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!quote.checkValidity()) {
        quote.classList.add("was-validated");
        var invalid = quote.querySelector(":invalid");
        if (invalid) invalid.focus();
        return;
      }
      var chosen = planSelect ? planSelect.options[planSelect.selectedIndex].text : "your plan";
      var note = document.getElementById("quote-note");
      if (note) note.textContent = "Nothing was sent. A working studio would reply about the " + chosen + " plan within two business days.";
      quote.hidden = true;
      quoteSuccess.hidden = false;
      quoteSuccess.focus();
    });
  }

  if (quoteReset && quote && quoteSuccess) {
    quoteReset.addEventListener("click", function () {
      quote.reset();
      quote.classList.remove("was-validated");
      quote.hidden = false;
      quoteSuccess.hidden = true;
      planCards.forEach(function (card) { card.classList.remove("is-picked"); });
      var first = quote.querySelector("input");
      if (first) first.focus();
    });
  }
})();
