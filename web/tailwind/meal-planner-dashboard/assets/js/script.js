/**
 * MealHarbor — Meal planner dashboard
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toastEl = document.getElementById("mpToast");
  var toastTimer;
  var groceryKey = "mealharbor:grocery";

  function showToast(title, body) {
    var titleEl = document.getElementById("mpToastTitle");
    var bodyEl = document.getElementById("mpToastBody");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    toastEl?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl?.classList.remove("is-visible");
    }, 3200);
  }

  var navToggle = document.getElementById("mpNavToggle");
  var navPanel = document.getElementById("mpNavPanel");
  navToggle?.addEventListener("click", function () {
    var open = navPanel?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !open);
      icon.classList.toggle("bi-x-lg", open);
    }
  });

  document.querySelectorAll("#mpNavPanel a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      navPanel?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  var header = document.getElementById("mpHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 6);
    header.classList.toggle("border-line", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-mp-grocery]").forEach(function (input) {
    var id = input.getAttribute("data-mp-grocery") || "";
    try {
      if (localStorage.getItem(groceryKey + ":" + id) === "1") {
        input.checked = true;
        input.closest("label")?.classList.add("is-checked");
      }
    } catch {
      /* ignore */
    }
    input.addEventListener("change", function () {
      var label = input.closest("label");
      label?.classList.toggle("is-checked", input.checked);
      try {
        localStorage.setItem(groceryKey + ":" + id, input.checked ? "1" : "0");
      } catch {
        showToast("Saved for this visit", "Browser storage unavailable.");
      }
      updateGroceryCount();
    });
  });

  function updateGroceryCount() {
    var total = document.querySelectorAll("[data-mp-grocery]").length;
    var done = document.querySelectorAll("[data-mp-grocery]:checked").length;
    var el = document.getElementById("mpGroceryCount");
    if (el) el.textContent = done + " / " + total + " picked up";
  }
  updateGroceryCount();

  document.querySelectorAll("[data-mp-swap]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".mp-day");
      if (!card) return;
      var title = card.querySelector("[data-mp-title]");
      var img = card.querySelector("img");
      var altTitle = btn.getAttribute("data-mp-alt-title") || "Alternate meal";
      var altImg = btn.getAttribute("data-mp-alt-img") || "";
      if (!title || !img) return;
      var swapping = title.getAttribute("data-swapped") !== "true";
      if (swapping) {
        title.setAttribute("data-original", title.textContent);
        img.setAttribute("data-original-src", img.src);
        title.textContent = altTitle;
        if (altImg) img.src = altImg;
        title.setAttribute("data-swapped", "true");
        btn.textContent = "Swap back";
      } else {
        title.textContent = title.getAttribute("data-original") || title.textContent;
        var orig = img.getAttribute("data-original-src");
        if (orig) img.src = orig;
        title.removeAttribute("data-swapped");
        btn.textContent = "Swap meal";
      }
      img.alt = title.textContent;
      showToast("Meal updated", title.textContent + " for " + (card.querySelector(".mp-day-head")?.textContent || "this day") + ".");
    });
  });

  document.getElementById("mpContactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
    showToast("Message saved", "Demo only.");
  });

  document.getElementById("mpSignupForm")?.addEventListener("submit", function (event) {
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
    document.querySelectorAll(".mp-reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".mp-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }
})();
