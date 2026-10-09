/**
 * BillHarbor — Invoice generator SaaS
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("ivToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("ivToastTitle");
    var bodyEl = document.getElementById("ivToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function fmt(n) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function totals() {
    var lines = document.getElementById("ivLines");
    if (!lines) return;
    var subtotal = 0;
    lines.querySelectorAll(".iv-line").forEach(function (row) {
      var qty = Math.min(10000, Math.max(0, Number(row.querySelector(".iv-qty")?.value) || 0));
      var rate = Math.min(1000000, Math.max(0, Number(row.querySelector(".iv-rate")?.value) || 0));
      subtotal += qty * rate;
    });
    var taxPct = Math.min(100, Math.max(0, Number(document.getElementById("ivTaxRate")?.value) || 0));
    var tax = (subtotal * taxPct) / 100;
    var subEl = document.getElementById("ivSubtotal");
    var taxEl = document.getElementById("ivTaxTotal");
    var grandEl = document.getElementById("ivGrandTotal");
    var taxLabel = document.getElementById("ivTaxLabel");
    if (subEl) subEl.textContent = fmt(subtotal);
    if (taxEl) taxEl.textContent = fmt(tax);
    if (grandEl) grandEl.textContent = fmt(subtotal + tax);
    if (taxLabel) taxLabel.textContent = String(taxPct);
  }

  function bindLine(row) {
    row.querySelector(".iv-line-remove")?.addEventListener("click", function () {
      var lines = document.getElementById("ivLines");
      if (!lines || lines.querySelectorAll(".iv-line").length <= 1) {
        showToast("Keep one line", "Invoices need at least one item.");
        return;
      }
      row.remove();
      totals();
    });
  }

  document.getElementById("ivAddLine")?.addEventListener("click", function () {
    var lines = document.getElementById("ivLines");
    var first = lines?.querySelector(".iv-line");
    if (!first || !lines) return;
    var clone = first.cloneNode(true);
    var name = clone.querySelector(".iv-name");
    var qty = clone.querySelector(".iv-qty");
    var rate = clone.querySelector(".iv-rate");
    if (name) name.value = "";
    if (qty) qty.value = "1";
    if (rate) rate.value = "0";
    lines.appendChild(clone);
    bindLine(clone);
    clone.querySelector(".iv-name")?.focus();
    totals();
  });

  document.getElementById("ivLines")?.querySelectorAll(".iv-line").forEach(bindLine);

  document.addEventListener("input", function (event) {
    if (
      event.target.matches(".iv-qty, .iv-rate, #ivTaxRate")
    ) {
      totals();
    }
  });

  document.getElementById("ivPrint")?.addEventListener("click", function () {
    window.print();
    showToast("Print dialog", "Use Save as PDF in your browser if needed.");
  });

  var navToggle = document.getElementById("ivNavToggle");
  var navPanel = document.getElementById("ivNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#ivNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("ivHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.getElementById("ivContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Support was not notified.");
  });

  document.getElementById("ivSignupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Account created (demo)", "No billing profile was set up.");
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
    document.querySelectorAll(".iv-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".iv-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  totals();
})();
