(function () {
  "use strict";

  var STORAGE = "folio:jobs";
  var stages = [
    { id: "saved", label: "Saved" },
    { id: "applied", label: "Applied" },
    { id: "interview", label: "Interview" },
    { id: "offer", label: "Offer" }
  ];
  var order = stages.map(function (stage) { return stage.id; });

  var seed = [
    { id: "n1", company: "Northwind Press", role: "Editor", place: "Remote", stage: "applied", follow: "2026-10-08" },
    { id: "n2", company: "Harbor & Co", role: "Product designer", place: "Chicago", stage: "interview", follow: "2026-10-06" },
    { id: "n3", company: "Lumen Field", role: "Frontend developer", place: "Austin", stage: "saved", follow: "" },
    { id: "n4", company: "Kindred Lab", role: "Researcher", place: "Remote", stage: "offer", follow: "2026-10-10" },
    { id: "n5", company: "Paper Route", role: "Brand designer", place: "Chicago", stage: "applied", follow: "2026-10-15" },
    { id: "n6", company: "Oak & Wire", role: "Support lead", place: "Remote", stage: "closed", follow: "" }
  ];

  var jobs = load();
  var filter = "all";
  var query = "";

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE);
      var parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch (error) {
      return seed.map(copy);
    }
    return seed.map(copy);
  }

  function copy(job) {
    return {
      id: job.id,
      company: job.company,
      role: job.role,
      place: job.place,
      stage: job.stage,
      follow: job.follow || ""
    };
  }

  function save() {
    try { localStorage.setItem(STORAGE, JSON.stringify(jobs)); } catch (error) { /* visit-only */ }
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function labelFor(id) {
    if (id === "closed") return "Passed";
    var match = stages.find(function (stage) { return stage.id === id; });
    return match ? match.label : id;
  }

  function visible(job) {
    var hay = (job.company + " " + job.role + " " + job.place).toLowerCase();
    var stageOk = filter === "all"
      ? job.stage !== "closed"
      : job.stage === filter;
    return stageOk && (query === "" || hay.indexOf(query) !== -1);
  }

  function paintStats() {
    var open = jobs.filter(function (job) { return job.stage !== "closed"; }).length;
    var talk = jobs.filter(function (job) { return job.stage === "interview"; }).length;
    var offers = jobs.filter(function (job) { return job.stage === "offer"; }).length;
    var follows = jobs.filter(function (job) { return job.stage !== "closed" && job.follow; }).length;
    setText("stat-open", String(open));
    setText("stat-talk", String(talk));
    setText("stat-offer", String(offers));
    setText("stat-follow", String(follows));

    var next = jobs
      .filter(function (job) { return job.stage === "interview" || job.stage === "offer"; })
      .sort(function (a, b) { return (a.follow || "9999").localeCompare(b.follow || "9999"); })[0];
    setText("next-company", next ? next.company : "Nothing scheduled");
    setText("next-meta", next ? next.role + " · " + labelFor(next.stage) : "Add a role to start the sample board.");
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function card(job) {
    var next = order.indexOf(job.stage);
    var advance = next > -1 && next < order.length - 1;
    var follow = job.follow ? "<p class=\"mt-2 text-sm text-muted\">Follow-up " + esc(job.follow) + "</p>" : "";
    var move = advance
      ? "<button type=\"button\" class=\"rounded-full bg-brand px-3 py-1.5 text-sm font-bold text-white hover:bg-brand-dark\" data-move=\"" + esc(job.id) + "\">Move forward</button>"
      : "<span class=\"text-sm font-bold text-brand\">" + (job.stage === "offer" ? "Offer stage" : "Passed") + "</span>";
    var pass = job.stage === "closed"
      ? ""
      : "<button type=\"button\" class=\"rounded-full border border-line px-3 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft\" data-pass=\"" + esc(job.id) + "\">Pass</button>";
    return "<article class=\"fo-card rounded-2xl border border-line bg-canvas p-4\">"
      + "<p class=\"text-xs font-bold uppercase tracking-wide text-brand\">" + esc(job.place) + "</p>"
      + "<h3 class=\"mt-1 font-display text-xl text-ink\">" + esc(job.role) + "</h3>"
      + "<p class=\"text-muted\">" + esc(job.company) + "</p>"
      + follow
      + "<div class=\"mt-3 flex flex-wrap gap-2\">" + move + pass + "</div>"
      + "</article>";
  }

  function paintBoard() {
    var board = document.getElementById("board");
    var empty = document.getElementById("board-empty");
    if (!board) return;
    var columns = filter === "all" ? stages : [{ id: filter, label: labelFor(filter) }];
    var shown = 0;
    board.className = filter === "all"
      ? "grid gap-4 lg:grid-cols-4"
      : "grid gap-4";
    board.innerHTML = columns.map(function (stage) {
      var items = jobs.filter(function (job) {
        return job.stage === stage.id && visible(job);
      });
      shown += items.length;
      var cards = items.length
        ? items.map(card).join("")
        : "<p class=\"text-sm text-muted\">Nothing in " + esc(stage.label.toLowerCase()) + ".</p>";
      return "<section class=\"rounded-3xl border border-line bg-white p-4 shadow-[0_12px_30px_rgba(233,69,96,0.06)]\" aria-label=\"" + esc(stage.label) + "\">"
        + "<header class=\"mb-3 flex items-center justify-between\">"
        + "<h3 class=\"font-display text-lg text-ink\">" + esc(stage.label) + "</h3>"
        + "<span class=\"rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand\">" + items.length + "</span>"
        + "</header>"
        + "<div class=\"grid gap-3\">" + cards + "</div>"
        + "</section>";
    }).join("");
    if (empty) empty.hidden = shown !== 0;
    setText("board-count", shown + (shown === 1 ? " role" : " roles"));
  }

  function paintFollows() {
    var list = document.getElementById("follow-list");
    if (!list) return;
    var items = jobs
      .filter(function (job) { return job.follow && job.stage !== "closed"; })
      .sort(function (a, b) { return a.follow.localeCompare(b.follow); });
    list.innerHTML = items.length
      ? items.map(function (job) {
        return "<li class=\"flex items-center justify-between gap-3 border-b border-line py-3 last:border-0\">"
          + "<div><strong class=\"font-display\">" + esc(job.company) + "</strong>"
          + "<p class=\"text-sm text-muted\">" + esc(job.role) + " · " + esc(labelFor(job.stage)) + "</p></div>"
          + "<span class=\"text-sm font-bold text-brand\">" + esc(job.follow) + "</span></li>";
      }).join("")
      : "<li class=\"text-muted\">No follow-ups on the sample board.</li>";
  }

  function paint() {
    paintStats();
    paintBoard();
    paintFollows();
  }

  document.querySelectorAll("[data-stage]").forEach(function (button) {
    button.addEventListener("click", function () {
      filter = button.getAttribute("data-stage");
      document.querySelectorAll("[data-stage]").forEach(function (other) {
        var on = other === button;
        other.setAttribute("aria-pressed", on ? "true" : "false");
        other.classList.toggle("bg-brand", on);
        other.classList.toggle("text-white", on);
        other.classList.toggle("border-brand", on);
        other.classList.toggle("bg-white", !on);
        other.classList.toggle("text-ink", !on);
      });
      paintBoard();
    });
  });

  var search = document.getElementById("role-search");
  if (search) {
    search.addEventListener("input", function () {
      query = search.value.trim().toLowerCase();
      paintBoard();
    });
  }

  var board = document.getElementById("board");
  if (board) {
    board.addEventListener("click", function (event) {
      var move = event.target.closest("[data-move]");
      var pass = event.target.closest("[data-pass]");
      var id = move ? move.getAttribute("data-move") : pass ? pass.getAttribute("data-pass") : "";
      if (!id) return;
      var job = jobs.find(function (item) { return item.id === id; });
      if (!job) return;
      if (move) {
        var index = order.indexOf(job.stage);
        if (index > -1 && index < order.length - 1) job.stage = order[index + 1];
      }
      if (pass) job.stage = "closed";
      save();
      paint();
    });
  }

  var form = document.getElementById("add-form");
  var success = document.getElementById("add-success");
  var resetBtn = document.getElementById("add-reset");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      var data = new FormData(form);
      jobs.unshift({
        id: "n" + Date.now(),
        company: String(data.get("company")).trim(),
        role: String(data.get("role")).trim(),
        place: String(data.get("place")).trim() || "Remote",
        stage: String(data.get("stage")),
        follow: String(data.get("follow") || "")
      });
      save();
      form.reset();
      form.classList.remove("was-validated");
      form.hidden = true;
      if (success) {
        success.hidden = false;
        setText("add-success-line", "Added on this page. Nothing was sent.");
      }
      paint();
    });
  }
  if (resetBtn && form) {
    resetBtn.addEventListener("click", function () {
      form.hidden = false;
      if (success) success.hidden = true;
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  var restore = document.getElementById("restore-sample");
  if (restore) {
    restore.addEventListener("click", function () {
      jobs = seed.map(copy);
      try { localStorage.removeItem(STORAGE); } catch (error) { /* ignore */ }
      filter = "all";
      query = "";
      if (search) search.value = "";
      if (form) {
        form.hidden = false;
        form.reset();
        form.classList.remove("was-validated");
      }
      if (success) success.hidden = true;
      document.querySelectorAll("[data-stage]").forEach(function (button) {
        var on = button.getAttribute("data-stage") === "all";
        button.setAttribute("aria-pressed", on ? "true" : "false");
        button.classList.toggle("bg-brand", on);
        button.classList.toggle("text-white", on);
        button.classList.toggle("border-brand", on);
        button.classList.toggle("bg-white", !on);
        button.classList.toggle("text-ink", !on);
      });
      paint();
    });
  }

  paint();
})();
