/**
 * CaseHarbor — Customer support helpdesk
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("hdToast");
  var toastTimer;

  function showToast(title, body) {
    var titleEl = document.getElementById("hdToastTitle");
    var bodyEl = document.getElementById("hdToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var navToggle = document.getElementById("hdNavToggle");
  var navPanel = document.getElementById("hdNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#hdNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      var icon = navToggle?.querySelector("i");
      if (icon) {
        icon.classList.add("bi-list");
        icon.classList.remove("bi-x-lg");
      }
    });
  });

  var header = document.getElementById("hdHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filter = "all";
  var searchInput = document.getElementById("hdSearch");
  var tickets = Array.prototype.slice.call(document.querySelectorAll(".hd-ticket"));

  function applyFilter() {
    var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;
    tickets.forEach(function (ticket) {
      var status = ticket.getAttribute("data-status") || "";
      var statusOk = filter === "all" || status === filter;
      var hay = (ticket.getAttribute("data-search") || "") + " " + ticket.textContent;
      var queryOk = !q || hay.toLowerCase().includes(q);
      var show = statusOk && queryOk;
      ticket.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    var count = document.getElementById("hdTicketCount");
    var empty = document.getElementById("hdTicketEmpty");
    if (count) count.textContent = visible + " conversation" + (visible === 1 ? "" : "s");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-hd-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-hd-filter") || "all";
      document.querySelectorAll("[data-hd-filter]").forEach(function (b) {
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

  var dialog = document.getElementById("hdDialog");
  var dialogTitle = document.getElementById("hdDialogTitle");
  var dialogBody = document.getElementById("hdDialogBody");

  function openTicket(btn) {
    if (!dialog || !dialogTitle || !dialogBody) return;
    var title = btn.getAttribute("data-title") || "Conversation";
    var sender = btn.getAttribute("data-sender") || "Customer";
    var status = btn.getAttribute("data-status") || "Open";
    dialogTitle.textContent = title;
    dialogBody.innerHTML =
      '<p class="text-sm text-muted">From ' +
      esc(sender) +
      " · " +
      esc(status) +
      '</p><p class="mt-2 text-sm text-muted">Hi team — ' +
      esc(title.toLowerCase()) +
      " I'd appreciate a hand when you have a moment. Thank you!</p>" +
      '<form id="hdReplyForm" class="mt-4 grid gap-3">' +
      '<label class="font-ui grid gap-1 text-xs font-bold text-muted">Your reply<textarea class="min-h-28 rounded-xl border border-line bg-white px-3 py-2.5 font-normal text-ink" required placeholder="Hi ' +
      esc(sender) +
      ', happy to help…"></textarea></label>' +
      '<button type="submit" class="font-ui rounded-xl bg-brand px-4 py-3 text-sm font-black text-white hover:bg-brand-dark">Save reply draft</button>' +
      '<p class="text-xs text-muted">Demo only. Nothing is sent to a customer.</p></form>';
    dialog.showModal();
    document.getElementById("hdReplyForm")?.addEventListener("submit", function (event) {
      event.preventDefault();
      dialog.close();
      showToast("Draft saved", "Reply stored in this session only (not persisted).");
    });
  }

  document.querySelectorAll("[data-hd-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openTicket(btn);
    });
  });

  document.querySelectorAll("[data-hd-assign]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var who = btn.getAttribute("data-hd-assign") || "You";
      showToast("Assigned (demo)", who + " is now the owner in this sample UI.");
    });
  });

  document.getElementById("hdDialogClose")?.addEventListener("click", function () {
    dialog?.close();
  });

  dialog?.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  document.getElementById("hdContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only. Sales team was not notified.");
  });

  document.getElementById("hdDemoForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Workspace created", "Demo signup — no account was provisioned.");
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
    document.querySelectorAll(".hd-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".hd-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  applyFilter();
})();
