"use strict";
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const names = ["Subbu", "Subra", "Poluru", "Anu", "Ravi", "Meera"],
  categories = [
    "Account Access",
    "Billing",
    "Troubleshooting",
    "Getting Started",
    "FAQs",
  ],
  colors = ["#3978ed", "#80a7f6", "#a7bef4", "#65c4af", "#c9d9f7"];
const now = new Date(),
  DAY = 86400000,
  stamp = (d) => new Date(d).toISOString();
function seed() {
  const subjects = [
    "Unable to reset password",
    "Invoice download failed",
    "Account access request",
    "Payment deducted twice",
    "Dashboard not loading",
    "How to invite team members",
    "Update billing address",
    "API connection timeout",
    "Change account email",
    "Export report is incomplete",
    "Unable to upload an attachment",
    "Set up two-factor authentication",
    "Subscription upgrade query",
    "Notifications not arriving",
    "Restore archived workspace",
    "Add a new payment method",
    "Mobile app login issue",
    "Where can I find my invoices?",
    "Configure workspace permissions",
    "Slow search results",
    "Cancel duplicate subscription",
    "Getting started with automations",
    "Missing conversation history",
    "Update company details",
    "Integrate email channel",
    "Reopen a closed account",
    "Custom domain setup",
    "Team invitation expired",
    "Download monthly statement",
    "Change notification settings",
    "Help with data migration",
    "Live chat widget setup",
    "Request a product walkthrough",
    "Incorrect invoice amount",
    "Reset security settings",
    "Manage saved replies",
  ];
  return {
    tickets: subjects.map((subject, i) => {
      let status =
        i < 10 ? "Open" : i < 17 ? "Pending" : i < 20 ? "Open" : "Resolved";
      return {
        id: 1042 + i,
        subject,
        customer: ["Poluru", "Subbu", "Subra", "Anu", "Ravi", "Meera"][i % 6],
        email:
          ["poluru", "subbu", "subra", "anu", "ravi", "meera"][i % 6] +
          "@example.com",
        priority:
          i < 3
            ? "Urgent"
            : i % 4 === 0
              ? "High"
              : i % 3 === 0
                ? "Low"
                : "Medium",
        status,
        agent: i % 5 === 0 ? "Unassigned" : names[i % 6],
        channel: ["Email", "Chat", "Web", "Phone"][i % 4],
        category: categories[i % 5],
        created: stamp(new Date(now.getTime() - (i % 14) * DAY - 12 * 3600000)),
        deadline: stamp(
          new Date(
            status === "Resolved"
              ? now.getTime() -
                  (i % 14) * DAY -
                  12 * 3600000 +
                  (2 + (i % 9) + (i % 11 === 0 ? -1 : 4)) * 3600000
              : now.getTime() +
                  (i === 3 ? -2 : i < 3 ? i + 0.75 : 8 + i) * 3600000,
          ),
        ),
        response: 9 + (i % 24),
        resolution: 2 + (i % 9),
        csat: 88 + (i % 12),
        slaMet: status === "Resolved" ? i % 11 !== 0 : i !== 3,
        resolved:
          status === "Resolved"
            ? stamp(
                new Date(
                  now.getTime() -
                    (i % 14) * DAY -
                    12 * 3600000 +
                    (2 + (i % 9)) * 3600000,
                ),
              )
            : null,
        messages: [
          {
            author: ["Poluru", "Subbu", "Subra", "Anu", "Ravi", "Meera"][i % 6],
            text: `Hi team, I need help with ${subject.toLowerCase()}. Could you please take a look? Thank you!`,
            type: "public",
            time: stamp(
              new Date(now.getTime() - (i % 14) * DAY - 12 * 3600000),
            ),
          },
        ],
        history: [
          "Ticket created via " + ["Email", "Chat", "Web", "Phone"][i % 4],
        ],
      };
    }),
    agents: names.map((name, i) => ({
      name,
      team: i < 3 ? "Customer Support" : "Technical Support",
      availability: i === 4 ? "Away" : i === 5 ? "Offline" : "Online",
    })),
    articles: [
      "Create your first workspace",
      "Invite and manage your team",
      "Reset your password",
      "Secure your account with two-factor authentication",
      "Download invoices and receipts",
      "Manage your subscription",
      "Troubleshoot login issues",
      "Fix common connection errors",
      "Frequently asked questions",
      "Understand roles and permissions",
      "Set up email notifications",
      "Contact our support team",
    ].map((title, i) => ({
      id: i + 1,
      title,
      category: categories[[3, 3, 0, 0, 1, 1, 2, 2, 4, 0, 3, 4][i]],
      excerpt: [
        "A step-by-step guide to get you back on track.",
        "Everything you need to know, all in one place.",
      ][i % 2],
      body: `${title}\n\nBefore you begin\nMake sure you are signed in to your workspace and have access to the email address associated with your account.\n\nStep 1 · Open your workspace settings\nSelect your profile in the top-right corner, then choose Workspace settings.\n\nStep 2 · Review your options\nOpen the relevant section and follow the prompts. For password resets, choose Account Access and request a reset link. For billing, open Billing and select the invoice or plan you need.\n\nStep 3 · Save and verify\nSave your changes, then refresh the page to confirm everything looks right.\n\nStill need a hand?\nOur support team is happy to help. Create a ticket and include the steps you have already tried.`,
      status: i === 10 ? "Draft" : "Published",
      updated: stamp(new Date(now.getTime() - (i + 1) * DAY)),
      helpful: 92 + (i % 7),
      votes: 30 + i,
    })),
    chats: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      customer: names[i % 6],
      status: i < 4 ? "Active" : i < 6 ? "Waiting" : "Closed",
      agent: names[i % 6],
      unread: i < 3 ? i + 1 : 0,
      messages: [
        {
          author: names[i % 6],
          text: [
            "Hi! I need some help with my account.",
            "Can you help me download my invoice?",
            "Thanks for getting back to me!",
          ][i % 3],
          time: stamp(new Date(now.getTime() - i * 600000)),
        },
      ],
    })),
    activity: [
      { text: "Subbu resolved ticket HD-1066", time: stamp(now) },
      {
        text: "Subra replied to Poluru on HD-1042",
        time: stamp(new Date(now - 1200000)),
      },
      {
        text: "Anu published “Reset your password”",
        time: stamp(new Date(now - 2400000)),
      },
    ],
    settings: {
      name: "Help Support",
      email: "support@example.com",
      timezone: "America/Chicago",
      start: "09:00",
      end: "17:00",
      days: "Monday–Friday",
      notify: true,
      categories: categories.join(", "),
      priorities: "Low, Medium, High, Urgent",
      canned:
        "Thanks for reaching out! I’m looking into this and will get back to you shortly.",
    },
    policies: [
      { priority: "Urgent", response: 1, resolution: 4 },
      { priority: "High", response: 2, resolution: 8 },
      { priority: "Medium", response: 4, resolution: 24 },
      { priority: "Low", response: 8, resolution: 48 },
    ],
    feedback: {},
  };
}
let db;
try {
  db = JSON.parse(localStorage.getItem("hlp-dsk-v1")) || seed();
} catch {
  db = seed();
}
let state = {
    range: "Last 7 Days",
    queue: "All Tickets",
    query: "",
    status: "",
    priority: "",
    agent: "",
    channel: "",
    category: "",
    date: "",
    page: 1,
    sort: "id",
    ascending: true,
    chat: 1,
    chatView: "Active",
    kb: "All articles",
    kbQuery: "",
    reportTeam: "",
    reportAgent: "",
    reportChannel: "",
  },
  charts = [];
function save() {
  try {
    localStorage.setItem("hlp-dsk-v1", JSON.stringify(db));
  } catch {
    toast(
      "Storage is unavailable or full. Changes will last only for this session.",
    );
  }
}
function toast(text) {
  $("#toast").textContent = text;
  $("#toast").classList.add("hlp-dsk-show");
  clearTimeout(window.hlpToast);
  window.hlpToast = setTimeout(
    () => $("#toast").classList.remove("hlp-dsk-show"),
    4000,
  );
}
function log(text) {
  db.activity.unshift({ text, time: stamp(new Date()) });
  db.activity = db.activity.slice(0, 25);
  save();
}
const icon = (n) => `<i class="bi bi-${n}" aria-hidden="true"></i>`;
const btn = (label, action, ic = "", primary = false, extra = "") =>
  `<button class="hlp-dsk-btn ${primary ? "hlp-dsk-primary" : ""}" data-action="${action}" ${extra}>${ic ? icon(ic) : ""}${label}</button>`;
const avatar = (name, i = 0) =>
  `<span class="hlp-dsk-avatar ${["hlp-dsk-avatar-blue", "hlp-dsk-avatar-purple", "", "hlp-dsk-avatar-green"][i % 4]}">${esc(name === "Unassigned" ? "–" : name.slice(0, 2).toUpperCase())}</span>`;
const badge = (s) =>
  `<span class="hlp-dsk-badge ${["Urgent", "Overdue", "Breached"].includes(s) ? "hlp-dsk-badge-red" : ["Pending", "High", "At risk", "Away", "Draft", "Waiting"].includes(s) ? "hlp-dsk-badge-amber" : ["Resolved", "Online", "Published", "Closed"].includes(s) ? "hlp-dsk-badge-green" : ["Low", "Offline", "Unassigned"].includes(s) ? "hlp-dsk-badge-gray" : ""}">${esc(s)}</span>`;
const date = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
const time = (d) =>
  new Date(d).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
function sla(t) {
  if (t.status === "Resolved") return badge("Resolved");
  let h = (new Date(t.deadline) - new Date()) / 3600000;
  return `<span class="${h < 0 ? "hlp-dsk-danger" : ""}" style="${h >= 0 && h < 4 ? "color:#c18b35" : ""}">${icon("clock")} ${h < 0 ? "Overdue" : `${Math.floor(h)}h ${Math.floor((h % 1) * 60)}m`}</span>`;
}
function ticketCategories() {
  return [
    ...new Set([
      ...db.settings.categories.split(",").map((c) => c.trim()),
      ...db.tickets.map((t) => t.category),
    ]),
  ];
}
function priorities() {
  return [
    ...new Set([
      ...db.settings.priorities.split(",").map((c) => c.trim()),
      ...db.tickets.map((t) => t.priority),
    ]),
  ];
}
function options(arr, selected = "", empty = "") {
  return (
    (empty ? `<option value="">${empty}</option>` : "") +
    arr
      .map(
        (a) => `<option ${a === selected ? "selected" : ""}>${esc(a)}</option>`,
      )
      .join("")
  );
}
function select(name, arr, val = "", placeholder = "") {
  return `<select class="hlp-dsk-select" aria-label="${esc(name)}" data-filter="${name}">${options(arr, val, placeholder)}</select>`;
}
function field(label, name, value = "", type = "text") {
  return `<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" required ${type === "number" ? 'min="0.25" step="0.25"' : ""}></label>`;
}
function selectField(label, name, arr, value) {
  return `<label>${label}<select name="${name}">${options(arr, value)}</select></label>`;
}
function header(title, sub, actions = "") {
  return `<div class="hlp-dsk-page-head"><div><h1>${title}</h1><p>${sub}</p></div><div class="d-flex gap-2">${actions}</div></div>`;
}
function cardHead(title, sub = "", right = "") {
  return `<div class="hlp-dsk-card-head"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${right}</div>`;
}
function metric(label, value, change, ic) {
  return `<div class="hlp-dsk-card hlp-dsk-kpi"><div class="hlp-dsk-kpi-label">${label}${icon(ic)}</div><div class="hlp-dsk-kpi-value">${value}</div><div class="hlp-dsk-kpi-change"><strong style="color:${(label === "Open Tickets" || label === "Unassigned Tickets" || label === "Avg. First Response") && change.startsWith("↑") ? "#bf8526" : "#15986f"}">${change}</strong>${/^[↑↓]/.test(change) ? " vs. previous period" : ""}</div></div>`;
}
function periodTickets(previous = false) {
  let end =
    state.range === "Custom" && state.to
      ? new Date(state.to + "T23:59:59")
      : new Date();
  let days =
    state.range === "Today" ? 1 : state.range === "Last 30 Days" ? 30 : 7;
  let start =
    state.range === "Custom" && state.from
      ? new Date(state.from)
      : new Date(new Date(end).setHours(0, 0, 0, 0) - (days - 1) * DAY);
  if (previous) {
    let span = state.range === "Custom" ? end - start + 1 : days * DAY;
    end = new Date(start - 1);
    start = new Date(+start - span);
  }
  return db.tickets.filter(
    (t) => new Date(t.created) >= start && new Date(t.created) <= end,
  );
}
function stats(t) {
  let resolved = t.filter((x) => x.status === "Resolved"),
    responded = t.filter((x) => x.response > 0),
    rated = t.filter((x) => x.csat > 0);
  return {
    open: t.filter((x) => x.status !== "Resolved").length,
    unassigned: t.filter(
      (x) => x.agent === "Unassigned" && x.status !== "Resolved",
    ).length,
    response: responded.length
      ? Math.round(
          responded.reduce((s, x) => s + x.response, 0) / responded.length,
        )
      : 0,
    rate: t.length ? Math.round((resolved.length / t.length) * 100) : 0,
    sla: t.length
      ? Math.round((t.filter((x) => x.slaMet).length / t.length) * 100)
      : 0,
    resolution: resolved.length
      ? (
          resolved.reduce((s, x) => s + x.resolution, 0) / resolved.length
        ).toFixed(1)
      : 0,
    csat: rated.length
      ? Math.round(rated.reduce((s, x) => s + x.csat, 0) / rated.length)
      : 0,
  };
}
function diff(a, b, suffix = "") {
  return `${a >= b ? "↑" : "↓"} ${Math.abs(a - b)}${suffix}`;
}
function ranges() {
  return `<div class="hlp-dsk-filter-row"><div class="hlp-dsk-segments">${["Today", "Last 7 Days", "Last 30 Days", "Custom"].map((s) => `<button data-action="range" data-value="${s}" class="${state.range === s ? "hlp-dsk-active" : ""}">${s === "Custom" ? icon("calendar4-week") + " " : ""}${s}</button>`).join("")}</div><div class="hlp-dsk-live-label"><span class="hlp-dsk-dot"></span> Updated just now ${icon("arrow-repeat")}</div></div>`;
}
function sidebar(page) {
  let nav = (id, label, ic, count = "", sub = false) =>
    `<a href="#${id}" class="hlp-dsk-nav ${page === id || (page === "ticket" && id === "tickets") ? "hlp-dsk-active" : ""} ${sub ? "hlp-dsk-subnav" : ""}">${icon(ic)}${label}${count !== "" ? `<span class="hlp-dsk-count">${count}</span>` : ""}</a>`;
  $("#sidebar").innerHTML =
    `<a class="hlp-dsk-brand" href="#overview"><span class="hlp-dsk-brand-icon">${icon("headset")}</span>Helpdesk<span style="color:#2563eb">.</span></a><div class="hlp-dsk-workspace"><span class="hlp-dsk-avatar hlp-dsk-avatar-blue" style="border-radius:6px">A</span><div><strong>${esc(db.settings.name)}</strong><div class="hlp-dsk-small">Support workspace</div></div><span class="ms-auto">${icon("chevron-expand")}</span></div><div class="hlp-dsk-nav-label">WORKSPACE</div>${nav("overview", "Overview", "grid-1x2")}${nav("tickets", "All Tickets", "inbox", db.tickets.filter((t) => t.status !== "Resolved").length)}${nav("my-tickets", "My Tickets", "person", db.tickets.filter((t) => t.agent === "Subbu" && t.status !== "Resolved").length, true)}${nav("unassigned", "Unassigned", "person-dash", db.tickets.filter((t) => t.agent === "Unassigned" && t.status !== "Resolved").length, true)}${nav("high-priority", "High Priority", "flag", "", true)}${nav("sla-risk", "SLA at Risk", "alarm", "", true)}${nav("resolved", "Resolved", "check2-circle", "", true)}${nav("agents", "Agents & Teams", "people")}${nav("sla", "SLA Monitoring", "shield-check")}<div class="hlp-dsk-nav-label">ENGAGE & INSIGHTS</div>${nav("knowledge", "Knowledge Base", "book")}${nav(
      "chat",
      "Live Chat",
      "chat-dots",
      db.chats.reduce((s, c) => s + c.unread, 0),
    )}${nav("reports", "Reports", "bar-chart")}<div class="hlp-dsk-sidebar-bottom">${nav("settings", "Settings", "gear")}${nav("help", "Help & Resources", "question-circle")}<div class="hlp-dsk-demo"><strong>${icon("box")} Demo workspace</strong>Explore freely. Changes are saved<br>only in this browser.</div></div>`;
}
function urgentTable(t, full = false) {
  return `<div class="hlp-dsk-table-wrap"><table class="hlp-dsk-table"><thead><tr>${full ? '<th><input type="checkbox" id="select-all" aria-label="Select all visible tickets"></th>' : ""}<th>${full ? '<button class="hlp-dsk-link" data-action="sort" data-value="id">Ticket ↕</button>' : "Ticket"}</th>${full ? "<th>Customer</th>" : ""}<th>${full ? '<button class="hlp-dsk-link" data-action="sort" data-value="priority">Priority ↕</button>' : "Priority"}</th><th>Status</th><th>Assigned to</th>${full ? "<th>Channel</th>" : ""}<th>SLA ${icon("chevron-down")}</th></tr></thead><tbody>${t.length ? t.map((t, i) => `<tr>${full ? `<td><input type="checkbox" class="hlp-dsk-ticket-check" value="${t.id}" aria-label="Select HD-${t.id}"></td>` : ""}<td><a href="#ticket/${t.id}"><strong>${esc(t.subject)}</strong><div class="hlp-dsk-small">HD-${t.id}${full ? "" : ' <span class="mx-1">·</span> ' + esc(t.customer)}</div></a></td>${full ? `<td>${esc(t.customer)}</td>` : ""}<td>${badge(t.priority)}</td><td>${badge(t.status)}</td><td><span class="d-flex align-items-center gap-2">${avatar(t.agent, i)}<span>${esc(t.agent)}</span></span></td>${full ? `<td>${icon({ Email: "envelope", Chat: "chat-dots", Web: "globe", Phone: "telephone" }[t.channel])} ${esc(t.channel)}</td>` : ""}<td>${sla(t)}</td></tr>`).join("") : `<tr><td colspan="9"><div class="hlp-dsk-empty">${icon("inbox")}<br>No tickets match these filters.</div></td></tr>`}</tbody></table></div>`;
}
function workload(limit = 4) {
  return `<div class="hlp-dsk-workload">${db.agents
    .slice(0, limit)
    .map((a, i) => {
      let n = db.tickets.filter(
        (t) => t.agent === a.name && t.status !== "Resolved",
      ).length;
      return `<div class="hlp-dsk-workload-row"><div class="hlp-dsk-workload-info">${avatar(a.name, i)}<strong>${a.name}</strong><span class="hlp-dsk-dot"></span><small>${n} tickets</small></div><div class="hlp-dsk-progress"><span style="width:${(n / 8) * 100}%;background:${colors[i % 5]}"></span></div></div>`;
    })
    .join("")}</div>`;
}
function overview() {
  let t = periodTickets(),
    s = stats(t),
    p = stats(periodTickets(true));
  return (
    header(
      "A little clarity. A lot of progress.",
      "Here’s what’s happening with your support team today.",
      btn("Export", "export", "download") +
        btn("New ticket", "new-ticket", "plus-lg", true),
    ) +
    ranges() +
    `<div class="hlp-dsk-kpis">${metric("Open Tickets", s.open, diff(s.open, p.open), "inbox")}${metric("Unassigned Tickets", s.unassigned, diff(s.unassigned, p.unassigned), "person-dash")}${metric("Avg. First Response", s.response + '<span style="font-size:18px;font-weight:500"> min</span>', diff(s.response, p.response, " min"), "stopwatch")}${metric("Resolution Rate", s.rate + "%", diff(s.rate, p.rate, " pts"), "check2-circle")}${metric("SLA Compliance", s.sla + "%", diff(s.sla, p.sla, " pts"), "shield-check")}</div><div class="hlp-dsk-grid-main"><section class="hlp-dsk-card">${cardHead("Ticket activity", "A look at incoming tickets and resolutions", `<div class="hlp-dsk-legend"><span>Created</span><span>Resolved</span></div>`)}<div class="hlp-dsk-chart hlp-dsk-chart-large"><canvas id="trend" aria-label="Created and resolved tickets over time" role="img"></canvas></div></section><section class="hlp-dsk-card">${cardHead("Tickets by category", "Where your customers need a hand", icon("three-dots"))}<div class="hlp-dsk-donut-wrap"><canvas id="category-chart" aria-label="Ticket category distribution" role="img"></canvas><div class="hlp-dsk-donut-center"><strong>${t.length}</strong><span class="hlp-dsk-small">Total tickets</span></div></div><div class="hlp-dsk-category-legend">${ticketCategories()
      .map(
        (c, i) =>
          `<div><span class="hlp-dsk-swatch" style="background:${colors[i % colors.length]}"></span>${c}<strong>${t.filter((x) => x.category === c).length}</strong></div>`,
      )
      .join(
        "",
      )}</div></section></div><div class="hlp-dsk-grid-main"><section class="hlp-dsk-card hlp-dsk-urgent">${cardHead('Needs your attention <span class="hlp-dsk-badge hlp-dsk-badge-red ms-1">' + db.tickets.filter((x) => x.status !== "Resolved" && ["High", "Urgent"].includes(x.priority)).length + "</span>", "High-priority tickets that could use a little extra care", '<a class="hlp-dsk-link" href="#high-priority">View all tickets ' + icon("arrow-right") + "</a>")}${urgentTable(db.tickets.filter((x) => x.status !== "Resolved" && ["High", "Urgent"].includes(x.priority)).slice(0, 4))}</section><section class="hlp-dsk-card">${cardHead("Team workload", "Keeping the work balanced", '<a class="hlp-dsk-link" href="#agents">View team ' + icon("arrow-right") + "</a>")}${workload()}<div class="hlp-dsk-card-foot"><span><span class="hlp-dsk-dot"></span> ${db.agents.filter((a) => a.availability === "Online").length} agents online</span><span>${db.agents.length} total agents</span></div></section></div><div class="hlp-dsk-grid-bottom"><section class="hlp-dsk-card">${cardHead("Conversations, everywhere", "Ticket volume by channel")}<div class="hlp-dsk-chart" style="height:185px"><canvas id="channel-chart" role="img" aria-label="Ticket volume by channel"></canvas></div></section><section class="hlp-dsk-card">${cardHead("Recent activity", "The latest from your support workspace", `<button class="hlp-dsk-link" data-action="activity">View all ${icon("arrow-right")}</button>`)}<div class="hlp-dsk-activity">${activityRows(db.activity.slice(0, 3))}</div></section></div>`
  );
}
function activityRows(a) {
  return a
    .map(
      (x, i) =>
        `<div class="hlp-dsk-activity-row">${avatar(x.text.split(" ")[0], i)}<div>${esc(x.text)}<div class="hlp-dsk-small">Customer support workspace</div></div><small>${time(x.time)}</small></div>`,
    )
    .join("");
}
function filteredTickets() {
  return db.tickets
    .filter(
      (t) =>
        (!state.query ||
          `${t.id} ${t.subject} ${t.customer}`
            .toLowerCase()
            .includes(state.query.toLowerCase())) &&
        (!state.status || t.status === state.status) &&
        (!state.priority || t.priority === state.priority) &&
        (!state.agent || t.agent === state.agent) &&
        (!state.channel || t.channel === state.channel) &&
        (!state.category || t.category === state.category) &&
        (!state.date || t.created.slice(0, 10) === state.date) &&
        (state.queue === "My Tickets"
          ? t.agent === "Subbu" && t.status !== "Resolved"
          : state.queue === "Unassigned"
            ? t.agent === "Unassigned" && t.status !== "Resolved"
            : state.queue === "High Priority"
              ? ["Urgent", "High"].includes(t.priority) &&
                t.status !== "Resolved"
              : state.queue === "SLA at Risk"
                ? new Date(t.deadline) - new Date() < 4 * 3600000 &&
                  t.status !== "Resolved"
                : state.queue === "Resolved"
                  ? t.status === "Resolved"
                  : true),
    )
    .sort((a, b) => {
      let d =
        state.sort === "id"
          ? a.id - b.id
          : ["Low", "Medium", "High", "Urgent"].indexOf(a.priority) -
            ["Low", "Medium", "High", "Urgent"].indexOf(b.priority);
      return state.ascending ? d : -d;
    });
}
function tickets() {
  let t = filteredTickets(),
    pages = Math.max(1, Math.ceil(t.length / 10));
  state.page = Math.min(state.page, pages);
  return (
    header(
      state.queue,
      "Every conversation, organized. Give each customer the support they deserve.",
      btn("Export", "export", "download") +
        btn("New ticket", "new-ticket", "plus-lg", true),
    ) +
    `<section class="hlp-dsk-card"><div class="hlp-dsk-toolbar"><label class="hlp-dsk-search">${icon("search")}<input id="ticket-search" type="search" placeholder="Search tickets…" aria-label="Search tickets" value="${esc(state.query)}"></label>${select("status", ["Open", "Pending", "Resolved"], state.status, "All statuses")}${select("priority", priorities(), state.priority, "All priorities")}${select("agent", ["Unassigned", ...names], state.agent, "All agents")}${select("channel", ["Email", "Chat", "Web", "Phone"], state.channel, "All channels")}${select("category", ticketCategories(), state.category, "All categories")}<input class="hlp-dsk-select" type="date" data-filter="date" aria-label="Ticket creation date" value="${state.date}">${btn("Clear", "clear-filters", "x")}</div><div class="hlp-dsk-toolbar align-items-center"><span class="hlp-dsk-small">With selected:</span>${btn("Assign", "bulk-agent", "person-plus")}${btn("Set priority", "bulk-priority", "flag")}${btn("Update status", "bulk-status", "check2-circle")}<span class="ms-auto hlp-dsk-small">${t.length} tickets</span></div>${urgentTable(t.slice((state.page - 1) * 10, state.page * 10), true)}<div class="hlp-dsk-pagination"><span class="hlp-dsk-small">Showing ${t.length ? (state.page - 1) * 10 + 1 : 0}–${Math.min(state.page * 10, t.length)} of ${t.length}</span><div class="d-flex align-items-center gap-3">${btn("Previous", "prev", "chevron-left", false, state.page === 1 ? "disabled" : "")}<span class="hlp-dsk-small">${state.page} / ${pages}</span>${btn("Next", "next", "chevron-right", false, state.page === pages ? "disabled" : "")}</div></div></section>`
  );
}
function detail(id) {
  let t = db.tickets.find((x) => x.id === +id);
  if (!t)
    return (
      header("Ticket not found", "This ticket no longer exists.") +
      '<a href="#tickets">Back to tickets</a>'
    );
  return (
    header(
      `HD-${t.id}`,
      esc(t.subject),
      btn(
        t.status === "Resolved" ? "Reopen ticket" : "Resolve ticket",
        "resolve",
        "check2-circle",
        true,
        `data-id="${t.id}"`,
      ) + btn("Escalate", "escalate", "flag", false, `data-id="${t.id}"`),
    ) +
    `<div class="hlp-dsk-two-col"><section class="hlp-dsk-card hlp-dsk-pad"><div class="d-flex justify-content-between"><h2>Conversation</h2>${badge(t.status)}</div>${t.messages.map((m) => `<div class="hlp-dsk-message ${m.type === "note" ? "hlp-dsk-note" : ""}"><strong>${esc(m.author)}</strong> <span class="hlp-dsk-badge ${m.type === "note" ? "hlp-dsk-badge-amber" : ""}">${m.type === "note" ? "Internal note · team only" : "Public message"}</span><p class="mb-0 mt-2" style="white-space:pre-wrap">${esc(m.text)}</p>${m.attachment ? `<div>${icon("paperclip")} ${esc(m.attachment)}</div>` : ""}<small>${date(m.time)} at ${time(m.time)}</small></div>`).join("")}<form class="hlp-dsk-form" id="reply-form" data-id="${t.id}"><div class="d-flex gap-3">${selectField("Reply type", "type", ["Public reply", "Internal note"], "Public reply")}<label>Canned response<select id="canned"><option value="">Choose a saved reply</option><option value="default">Thanks for reaching out</option><option value="article">Share password guide</option></select></label></div><label for="reply">Message<textarea id="reply" name="message" rows="4" required placeholder="Write a thoughtful reply…"></textarea></label><label>Attachment <span class="hlp-dsk-small">(demo: file name only)</span><input name="attachment" type="file"></label><button class="hlp-dsk-btn hlp-dsk-primary">${icon("send")} Send message</button></form><hr style="border-color:#dfe5ed"><h3>Activity history</h3>${t.history.map((x) => `<p class="hlp-dsk-small">${icon("clock-history")} ${esc(x)}</p>`).join("")}</section><aside><section class="hlp-dsk-card hlp-dsk-pad mb-3"><h2 class="mb-3">Customer information</h2><div class="d-flex gap-3 align-items-center">${avatar(t.customer)}<div><strong>${esc(t.customer)}</strong><div class="hlp-dsk-small">${esc(t.email)}</div></div></div><p class="hlp-dsk-small mt-3 mb-0">Help workspace · Customer since 2025</p></section><section class="hlp-dsk-card hlp-dsk-pad mb-3"><h2 class="mb-3">Ticket properties</h2><form id="ticket-properties" class="hlp-dsk-form" data-id="${t.id}">${selectField("Assigned agent", "agent", ["Unassigned", ...names], t.agent)}${selectField("Priority", "priority", priorities(), t.priority)}${selectField(
      "Category",
      "category",
      db.settings.categories.split(",").map((x) => x.trim()),
      t.category,
    )}${selectField("Status", "status", ["Open", "Pending", "Resolved"], t.status)}<button class="hlp-dsk-btn hlp-dsk-primary">Save changes</button></form></section><section class="hlp-dsk-card hlp-dsk-pad mb-3"><h2 class="mb-3">SLA deadlines</h2><p class="hlp-dsk-small">First response deadline</p><strong>${date(t.firstDeadline || new Date(t.created).getTime() + 3600000)} · ${time(t.firstDeadline || new Date(t.created).getTime() + 3600000)}</strong><p class="hlp-dsk-small mt-3">${t.response ? "First response recorded: " + t.response + " min" : "Awaiting first response"}</p><p class="hlp-dsk-small mt-3">Resolution deadline</p><strong>${date(t.deadline)} · ${time(t.deadline)}</strong><p class="mt-2">${sla(t)}</p></section><section class="hlp-dsk-card hlp-dsk-pad"><h2 class="mb-3">Related knowledge</h2>${
      db.articles
        .filter((a) => a.category === t.category && a.status === "Published")
        .map(
          (a) =>
            `<p><a href="#article/${a.id}">${icon("file-earmark-text")} ${esc(a.title)}</a></p>`,
        )
        .join("") || '<a href="#knowledge">Browse knowledge base</a>'
    }</section></aside></div>`
  );
}
function agents() {
  return (
    header(
      "Good support starts with a great team.",
      "People, availability, and workloads — all in one place.",
      btn("Assign tickets", "bulk-agent-all", "person-plus", true),
    ) +
    `<div class="hlp-dsk-agent-grid">${db.agents
      .map((a, i) => {
        let t = db.tickets.filter((t) => t.agent === a.name),
          s = stats(t);
        return `<section class="hlp-dsk-card hlp-dsk-agent-card"><div class="d-flex justify-content-between align-items-center">${avatar(a.name, i)}${badge(a.availability)}</div><h2 class="mt-3">${a.name}</h2><div class="hlp-dsk-small mt-1">${a.team}</div><div class="hlp-dsk-agent-stats"><div><strong>${s.open}</strong><small>Assigned</small></div><div><strong>${t.length - s.open}</strong><small>Resolved</small></div><div><strong>${s.csat}%</strong><small>CSAT</small></div></div>${btn("View profile", "agent-profile", "person", false, `data-value="${a.name}"`)}</section>`;
      })
      .join(
        "",
      )}</div><div class="hlp-dsk-grid-main"><section class="hlp-dsk-card">${cardHead("Workload distribution", "Current active tickets by agent")}<div class="hlp-dsk-chart"><canvas id="workload-chart" role="img" aria-label="Agent workloads"></canvas></div></section><section class="hlp-dsk-card">${cardHead("Team availability", "Keep assignments up to date")}<div class="hlp-dsk-pad hlp-dsk-form">${db.agents.map((a) => `<label>${a.name}<select data-availability="${a.name}">${options(["Online", "Away", "Offline"], a.availability)}</select></label>`).join("")}</div></section></div>${performanceTable(db.tickets)}`
  );
}
function performanceTable(t) {
  return `<section class="hlp-dsk-card">${cardHead("Agent performance", "Calculated from the selected ticket records")}<div class="hlp-dsk-table-wrap mt-3"><table class="hlp-dsk-table"><thead><tr><th>Agent / Team</th><th>Availability</th><th>Assigned</th><th>Resolved</th><th>Avg. response</th><th>CSAT</th></tr></thead><tbody>${db.agents
    .map((a, i) => {
      let at = t.filter((x) => x.agent === a.name),
        s = stats(at);
      return `<tr><td><strong>${a.name}</strong><div class="hlp-dsk-small">${a.team}</div></td><td>${badge(a.availability)}</td><td>${s.open}</td><td>${at.length - s.open}</td><td>${s.response} min</td><td>${s.csat}%</td></tr>`;
    })
    .join("")}</tbody></table></div></section>`;
}
function slaPage() {
  let s = stats(db.tickets),
    risk = db.tickets.filter(
      (t) =>
        t.status !== "Resolved" &&
        new Date(t.deadline) - new Date() < 4 * 3600000,
    ),
    breached = risk.filter((t) => new Date(t.deadline) < new Date());
  return (
    header(
      "Keep every promise.",
      "Stay ahead of deadlines and deliver support your customers can count on.",
      btn("Edit SLA policies", "policies", "sliders", true),
    ) +
    `<div class="hlp-dsk-kpis hlp-dsk-report-kpis">${metric("SLA Compliance", s.sla + "%", "Current workspace", "shield-check")}${metric("At-Risk Tickets", risk.length - breached.length, "Under 4 hours left", "alarm")}${metric("Breached Tickets", breached.length, "Needs attention", "exclamation-triangle")}${metric("Avg. Resolution", s.resolution + " h", "Resolved tickets", "stopwatch")}</div><div class="hlp-dsk-grid-main"><section class="hlp-dsk-card">${cardHead("Compliance trend", "SLA adherence by ticket creation date")}<div class="hlp-dsk-chart"><canvas id="sla-trend" role="img" aria-label="SLA compliance trend"></canvas></div></section><section class="hlp-dsk-card">${cardHead("Breaches by priority", "Across the entire workspace")}<div class="hlp-dsk-chart"><canvas id="breach-chart" role="img" aria-label="Breaches by priority"></canvas></div></section></div><section class="hlp-dsk-card mb-4">${cardHead("Approaching deadlines", "Take action before customers have to follow up")}<div class="hlp-dsk-table-wrap mt-3"><table class="hlp-dsk-table"><thead><tr><th>Ticket</th><th>Priority</th><th>Agent</th><th>Time remaining</th><th>Action</th></tr></thead><tbody>${risk.map((t) => `<tr><td><a href="#ticket/${t.id}"><strong>HD-${t.id} · ${esc(t.subject)}</strong></a></td><td>${badge(t.priority)}</td><td>${t.agent}</td><td>${sla(t)}</td><td>${btn("Escalate", "escalate", "arrow-up-right", false, `data-id="${t.id}"`)}</td></tr>`).join("") || '<tr><td colspan="5" class="hlp-dsk-empty">All deadlines are on track.</td></tr>'}</tbody></table></div></section><section class="hlp-dsk-card hlp-dsk-pad"><h2>Workspace SLA policies</h2><p class="hlp-dsk-small mt-2">${esc(db.settings.days)} · ${esc(db.settings.start)}–${esc(db.settings.end)} · ${esc(db.settings.timezone)}. Policies apply to new tickets in business hours.</p><div class="d-flex gap-4 flex-wrap mt-4">${db.policies.map((p) => `<div><h3>${badge(p.priority)}</h3><p>${p.response}h first response<br>${p.resolution}h resolution</p></div>`).join("")}</div></section>`
  );
}
function knowledge() {
  let a = db.articles.filter(
    (a) =>
      (state.kb === "All articles" ||
        a.category === state.kb ||
        a.status === state.kb) &&
      `${a.title} ${a.excerpt} ${a.body}`
        .toLowerCase()
        .includes(state.kbQuery.toLowerCase()),
  );
  return (
    header(
      "Answers that go a little further.",
      "A shared home for helpful guides, thoughtful answers, and team knowledge.",
      btn("Create article", "new-article", "plus-lg", true),
    ) +
    `<div class="hlp-dsk-filter-row"><label class="hlp-dsk-search">${icon("search")}<input id="kb-search" placeholder="Search your knowledge base…" aria-label="Search articles" value="${esc(state.kbQuery)}"></label>${select("kb", ["All articles", ...categories, "Draft", "Published"], state.kb)}</div><div class="hlp-dsk-article-grid">${a.map((a) => `<article class="hlp-dsk-card hlp-dsk-article">${icon("file-earmark-text")}<div class="d-flex justify-content-between"><span class="hlp-dsk-small">${a.category}</span>${badge(a.status)}</div><h2><a href="#article/${a.id}">${esc(a.title)}</a></h2><p>${esc(a.excerpt)}</p><div class="hlp-dsk-article-meta"><span>Updated ${date(a.updated)}</span><span>${icon("hand-thumbs-up")} ${a.helpful}%</span></div></article>`).join("") || '<div class="hlp-dsk-empty">No articles found. Try a different search or create an article.</div>'}</div>`
  );
}
function article(id) {
  let a = db.articles.find((x) => x.id === +id);
  if (!a) return header("Article not found", "Return to the knowledge base.");
  return (
    header(
      esc(a.title),
      `${esc(a.category)} · Updated ${date(a.updated)}`,
      btn(
        "Edit article",
        "edit-article",
        "pencil",
        false,
        `data-id="${a.id}"`,
      ) + btn("Delete", "delete-article", "trash", false, `data-id="${a.id}"`),
    ) +
    `<article class="hlp-dsk-card hlp-dsk-pad"><div class="hlp-dsk-prose">${badge(a.status)}<div class="mt-4">${esc(a.body)}</div><hr><h3>Was this article helpful?</h3><div class="d-flex gap-2">${btn("Yes, helpful", "feedback", "hand-thumbs-up", false, `data-id="${a.id}" data-value="yes" ${db.feedback[a.id] ? "disabled" : ""}`)}${btn("Not quite", "feedback", "hand-thumbs-down", false, `data-id="${a.id}" data-value="no" ${db.feedback[a.id] ? "disabled" : ""}`)}</div><p class="hlp-dsk-small">${db.feedback[a.id] ? "Thank you for your feedback." : a.helpful + "% found this helpful"}</p><h3>Related articles</h3>${db.articles
      .filter(
        (x) =>
          x.id !== a.id &&
          x.category === a.category &&
          x.status === "Published",
      )
      .map(
        (x) =>
          `<a class="d-block" href="#article/${x.id}">${esc(x.title)} ${icon("arrow-right")}</a>`,
      )
      .join("")}</div></article>`
  );
}
function chat() {
  let list = db.chats.filter((c) => c.status === state.chatView),
    c = list.find((c) => c.id === state.chat) || list[0];
  if (c) {
    state.chat = c.id;
    c.unread = 0;
    save();
  }
  return (
    header(
      "Every conversation matters.",
      "Connect with your customers in real time. Messages are simulated locally.",
      btn("Simulate incoming", "simulate-chat", "chat-dots"),
    ) +
    `<section class="hlp-dsk-card"><div class="hlp-dsk-toolbar"><div class="hlp-dsk-segments">${["Active", "Waiting", "Closed"].map((v) => `<button data-action="chat-view" data-value="${v}" class="${state.chatView === v ? "hlp-dsk-active" : ""}">${v} (${db.chats.filter((c) => c.status === v).length})</button>`).join("")}</div></div><div class="hlp-dsk-chat-layout"><div class="hlp-dsk-chat-inbox">${list.map((c) => `<button class="hlp-dsk-chat-contact ${c.id === state.chat ? "hlp-dsk-active" : ""}" data-action="chat-select" data-id="${c.id}">${avatar(c.customer, c.id)}<div class="flex-grow-1"><strong>${c.customer}</strong><p class="hlp-dsk-small my-1">${esc(c.messages.at(-1).text.slice(0, 34))}…</p><span class="hlp-dsk-small">${time(c.messages.at(-1).time)}</span></div>${c.unread ? badge(c.unread) : ""}</button>`).join("") || '<div class="hlp-dsk-empty">No conversations.</div>'}</div>${c ? `<div class="hlp-dsk-chat-body"><div class="d-flex justify-content-between align-items-center pb-3 border-bottom"><div><h2>${c.customer}</h2><span class="hlp-dsk-small"><span class="hlp-dsk-dot"></span>Online · Demo conversation</span></div>${btn(c.status === "Closed" ? "Reopen" : "Close", "chat-close", "check2", false, `data-id="${c.id}"`)}</div><div class="hlp-dsk-chat-messages">${c.messages.map((m) => `<div class="hlp-dsk-message ${m.author === "You" ? "hlp-dsk-outgoing" : ""}"><strong>${m.author}</strong><div>${esc(m.text)}</div><small>${time(m.time)}</small></div>`).join("")}</div><form id="chat-form" class="hlp-dsk-form" data-id="${c.id}"><label>Quick reply<select id="chat-quick"><option value="">Choose a quick reply</option><option>${esc(db.settings.canned)}</option><option>Happy to help! Could you share a little more detail?</option></select></label><label>Message<textarea name="message" id="chat-message" rows="2" required placeholder="Write your message…" ${c.status === "Closed" ? "disabled" : ""}></textarea></label><button class="hlp-dsk-btn hlp-dsk-primary" ${c.status === "Closed" ? "disabled" : ""}>${icon("send")} Send message</button></form></div><aside class="hlp-dsk-chat-customer"><h3>Customer details</h3><div class="my-4">${avatar(c.customer, c.id)}<h2 class="mt-3">${c.customer}</h2><p class="hlp-dsk-small mt-1">${c.customer.toLowerCase()}@example.com</p></div><form class="hlp-dsk-form" id="chat-assign" data-id="${c.id}">${selectField("Assigned agent", "agent", names, c.agent)}<button class="hlp-dsk-btn">Save assignment</button></form><hr><p class="hlp-dsk-small">${db.tickets.filter((t) => t.customer === c.customer).length} support tickets</p>${btn(c.ticket ? "View HD-" + c.ticket : "Convert to ticket", c.ticket ? "chat-ticket" : "convert-chat", "ticket-detailed", false, `data-id="${c.id}"`)}</aside>` : '<div class="hlp-dsk-empty">Select a conversation to get started.</div>'}</div></section>`
  );
}
function reportTickets() {
  return periodTickets().filter(
    (t) =>
      (!state.reportAgent || t.agent === state.reportAgent) &&
      (!state.reportChannel || t.channel === state.reportChannel) &&
      (!state.reportTeam ||
        db.agents.find((a) => a.name === t.agent)?.team === state.reportTeam),
  );
}
function reports() {
  let t = reportTickets(),
    s = stats(t);
  return (
    header(
      "Turn insights into better support.",
      "Understand the numbers behind your customer experience.",
      btn("Export CSV", "export", "download", true),
    ) +
    ranges() +
    `<div class="hlp-dsk-filter-row justify-content-start">${select("reportTeam", ["Customer Support", "Technical Support"], state.reportTeam, "All teams")}${select("reportAgent", names, state.reportAgent, "All agents")}${select("reportChannel", ["Email", "Chat", "Web", "Phone"], state.reportChannel, "All channels")}<span class="hlp-dsk-small">${t.length} matching tickets</span></div><div class="hlp-dsk-kpis hlp-dsk-report-kpis">${metric("Total Tickets", t.length, "Selected period", "inbox")}${metric("First Response", s.response + " min", "Selected period", "stopwatch")}${metric("Avg. Resolution", s.resolution + " h", "Resolved tickets", "check2-circle")}${metric("Customer Satisfaction", s.csat + "%", "Selected period", "emoji-smile")}</div><div class="hlp-dsk-grid-main"><section class="hlp-dsk-card">${cardHead("Ticket trends", "Created and resolved tickets")}<div class="hlp-dsk-chart"><canvas id="trend" role="img" aria-label="Ticket trends"></canvas></div></section><section class="hlp-dsk-card">${cardHead("Response & resolution", "Average time in hours by agent")}<div class="hlp-dsk-chart"><canvas id="response-chart" role="img" aria-label="Response and resolution times"></canvas></div></section></div><div class="hlp-dsk-grid-main"><section class="hlp-dsk-card">${cardHead("SLA compliance", "Percentage of tickets meeting policy")}<div class="hlp-dsk-chart"><canvas id="sla-trend" role="img" aria-label="SLA compliance"></canvas></div></section><section class="hlp-dsk-card">${cardHead("Customer satisfaction", "Average CSAT score by agent")}<div class="hlp-dsk-chart"><canvas id="csat-chart" role="img" aria-label="Customer satisfaction"></canvas></div></section></div>${performanceTable(t)}`
  );
}
function settings() {
  return (
    header(
      "Make this workspace yours.",
      "Thoughtful defaults, with room to work your way.",
    ) +
    `<section class="hlp-dsk-card hlp-dsk-pad hlp-dsk-settings"><form id="settings-form" class="hlp-dsk-form"><h2 class="mb-4">Workspace profile</h2><div class="row"><div class="col-md-6">${field("Workspace name", "name", db.settings.name)}</div><div class="col-md-6">${field("Support email", "email", db.settings.email, "email")}</div></div><hr><h2 class="my-4">Business hours</h2>${selectField("Timezone", "timezone", ["America/Chicago", "America/New_York", "Europe/London", "Asia/Kolkata"], db.settings.timezone)}${selectField("Working days", "days", ["Monday–Friday", "Monday–Saturday", "Every day"], db.settings.days)}<div class="row"><div class="col-6">${field("Opening time", "start", db.settings.start, "time")}</div><div class="col-6">${field("Closing time", "end", db.settings.end, "time")}</div></div><hr><h2 class="my-4">Notifications & organization</h2><label class="hlp-dsk-check"><input name="notify" type="checkbox" ${db.settings.notify ? "checked" : ""}> Enable simulated incoming notifications</label>${field("Ticket categories (comma separated)", "categories", db.settings.categories)}${field("Priorities", "priorities", db.settings.priorities)}<label>Default canned response<textarea rows="3" name="canned" required>${esc(db.settings.canned)}</textarea></label><p id="settings-error" class="hlp-dsk-danger" role="alert"></p><button class="hlp-dsk-btn hlp-dsk-primary">${icon("check2")} Save settings</button></form></section><section class="hlp-dsk-card hlp-dsk-pad hlp-dsk-settings mt-4"><h2 class="mb-3">Team members</h2><p class="hlp-dsk-small">Manage availability, team membership, and assignments in Agents & Teams.</p><a class="hlp-dsk-btn" href="#agents">Manage team ${icon("arrow-right")}</a><hr><h3>Demo data</h3><p class="hlp-dsk-small">Reset tickets, articles, conversations, and settings to their original sample values.</p>${btn("Reset demo workspace", "reset", "arrow-counterclockwise")}</section>`
  );
}
function showModal(title, body) {
  $("#modal").innerHTML =
    `<div class="hlp-dsk-dialog-head"><h2 id="modal-title">${title}</h2><button class="hlp-dsk-icon-btn" data-action="close-modal" aria-label="Close dialog">${icon("x-lg")}</button></div>${body}`;
  if (!$("#modal").open) $("#modal").showModal();
}
function render() {
  charts.forEach((c) => c.destroy());
  charts = [];
  let [page = "overview", id] = location.hash.slice(1).split("/");
  if (!page) page = "overview";
  let queueMap = {
    tickets: "All Tickets",
    "my-tickets": "My Tickets",
    unassigned: "Unassigned",
    "high-priority": "High Priority",
    "sla-risk": "SLA at Risk",
    resolved: "Resolved",
  };
  if (queueMap[page]) state.queue = queueMap[page];
  sidebar(page);
  let title =
    {
      overview: "Overview",
      tickets: "All Tickets",
      agents: "Agents & Teams",
      sla: "SLA Monitoring",
      knowledge: "Knowledge Base",
      chat: "Live Chat",
      reports: "Reports",
      settings: "Settings",
      ticket: "Ticket details",
      article: "Knowledge article",
      help: "Help & Resources",
      ...queueMap,
    }[page] || "Overview";
  document.title = title + " · Helpdesk Support";
  $("#breadcrumb").innerHTML =
    `Workspace ${icon("chevron-right")} <strong>${title}</strong>`;
  $("#main").innerHTML = queueMap[page]
    ? tickets()
    : (
        {
          overview,
          agents,
          sla: slaPage,
          knowledge,
          chat,
          reports,
          settings,
          ticket: () => detail(id),
          article: () => article(id),
          help: () =>
            header(
              "A little help, whenever you need it.",
              "Everything you need to explore your demo workspace.",
            ) +
            `<section class="hlp-dsk-card hlp-dsk-pad"><h2>Welcome to Helpdesk Support</h2><p class="mt-3">Create tickets, assign your team, send demo replies, and build a helpful knowledge base. Your work is saved in this browser.</p><p>Use <kbd>⌘ K</kbd> or <kbd>Ctrl K</kbd> to search tickets. Use Escape to close a dialog.</p><p>Chat replies and notifications are simulated. Attachments store file names only.</p><a href="#knowledge" class="hlp-dsk-btn">Browse knowledge base</a></section>`,
        }[page] || overview
      )();
  drawCharts(page);
}
function chart(id, type, data, extra = {}) {
  let el = $("#" + id);
  if (!el) return;
  if (!window.Chart) {
    el.parentElement.innerHTML =
      '<div class="hlp-dsk-empty">Charts could not load. Check your connection and reload.</div>';
    return;
  }
  charts.push(
    new Chart(el, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: "#0f172a", padding: 12 },
        },
        scales:
          type === "doughnut"
            ? {}
            : {
                x: {
                  grid: { display: false },
                  border: { display: false },
                  ticks: { font: { size: 10 }, color: "#929daf" },
                },
                y: {
                  beginAtZero: true,
                  border: { display: false },
                  grid: { color: "#eef1f6" },
                  ticks: { font: { size: 10 }, color: "#929daf", precision: 0 },
                },
              },
        ...extra,
      },
    }),
  );
}
function drawCharts(page) {
  let t =
    page === "reports"
      ? reportTickets()
      : page === "sla"
        ? db.tickets
        : periodTickets();
  let days =
    state.range === "Last 30 Days" ? 30 : state.range === "Today" ? 1 : 7;
  if (state.range === "Custom" && state.from && state.to)
    days = Math.max(
      1,
      Math.min(
        366,
        Math.ceil((new Date(state.to) - new Date(state.from)) / DAY) + 1,
      ),
    );
  let end =
    state.range === "Custom" && state.to
      ? new Date(state.to + "T12:00:00")
      : new Date();
  let dates = Array.from(
    { length: days },
    (_, i) => new Date(end - (days - 1 - i) * DAY),
  );
  let keys = dates.map((d) => d.toLocaleDateString("en-CA"));
  const same = (d, k) => d && new Date(d).toLocaleDateString("en-CA") === k;
  let labels = dates.map((d) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  );
  let line = (label, values, color) => ({
    label,
    data: values,
    borderColor: color,
    backgroundColor: color,
    borderWidth: 2.5,
    tension: 0.35,
    pointRadius: 3,
    pointBackgroundColor: "white",
    pointBorderWidth: 2,
  });
  chart("trend", "line", {
    labels,
    datasets: [
      line(
        "Created",
        keys.map((k) => t.filter((x) => same(x.created, k)).length),
        "#3978ed",
      ),
      line(
        "Resolved",
        keys.map((k) => t.filter((x) => same(x.resolved, k)).length),
        "#65c4af",
      ),
    ],
  });
  chart(
    "category-chart",
    "doughnut",
    {
      labels: ticketCategories(),
      datasets: [
        {
          data: ticketCategories().map(
            (c) => t.filter((x) => x.category === c).length,
          ),
          backgroundColor: colors,
          borderColor: "white",
          borderWidth: 4,
          borderRadius: 3,
        },
      ],
    },
    { cutout: "78%" },
  );
  chart(
    "channel-chart",
    "bar",
    {
      labels: ["Email", "Chat", "Web", "Phone"],
      datasets: [
        {
          label: "Tickets",
          data: ["Email", "Chat", "Web", "Phone"].map(
            (c) => t.filter((x) => x.channel === c).length,
          ),
          backgroundColor: ["#3978ed", "#80a7f6", "#65c4af", "#a7bef4"],
          borderRadius: 4,
          barThickness: 12,
        },
      ],
    },
    { indexAxis: "y" },
  );
  chart(
    "workload-chart",
    "bar",
    {
      labels: names,
      datasets: [
        {
          label: "Active tickets",
          data: names.map(
            (n) =>
              db.tickets.filter((t) => t.agent === n && t.status !== "Resolved")
                .length,
          ),
          backgroundColor: colors,
          borderRadius: 4,
          barThickness: 14,
        },
      ],
    },
    { indexAxis: "y" },
  );
  chart("sla-trend", "line", {
    labels,
    datasets: [
      line(
        "SLA compliance (%)",
        keys.map((k) => {
          let a = t.filter((x) => same(x.created, k));
          return a.length ? stats(a).sla : null;
        }),
        "#3978ed",
      ),
    ],
  });
  chart("breach-chart", "bar", {
    labels: ["Urgent", "High", "Medium", "Low"],
    datasets: [
      {
        label: "Breached tickets",
        data: ["Urgent", "High", "Medium", "Low"].map(
          (p) => db.tickets.filter((t) => t.priority === p && !t.slaMet).length,
        ),
        backgroundColor: ["#e98086", "#ecb05f", "#739aee", "#9aafcc"],
        borderRadius: 5,
        barThickness: 28,
      },
    ],
  });
  chart(
    "response-chart",
    "bar",
    {
      labels: names,
      datasets: [
        {
          label: "First response (hours)",
          data: names.map(
            (n) => stats(t.filter((x) => x.agent === n)).response / 60,
          ),
          backgroundColor: "#3978ed",
          borderRadius: 3,
        },
        {
          label: "Resolution (hours)",
          data: names.map(
            (n) => +stats(t.filter((x) => x.agent === n)).resolution,
          ),
          backgroundColor: "#65c4af",
          borderRadius: 3,
        },
      ],
    },
    {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: { boxWidth: 8, font: { size: 10 } },
        },
      },
    },
  );
  chart("csat-chart", "bar", {
    labels: names,
    datasets: [
      {
        label: "CSAT (%)",
        data: names.map((n) => stats(t.filter((x) => x.agent === n)).csat),
        backgroundColor: "#65c4af",
        borderRadius: 4,
        barThickness: 22,
      },
    ],
  });
}
function newTicketModal(prefill = {}) {
  showModal(
    "Create a new ticket",
    `<form id="new-ticket-form" class="hlp-dsk-form" data-chat="${prefill.chat || ""}">${field("Subject", "subject", prefill.subject || "")}${field("Customer name", "customer", prefill.customer || "")}${field("Customer email", "email", prefill.email || "", "email")}<div class="row"><div class="col-6">${selectField(
      "Priority",
      "priority",
      db.settings.priorities.split(",").map((s) => s.trim()),
      "Medium",
    )}</div><div class="col-6">${selectField("Assign to", "agent", ["Unassigned", ...names], prefill.agent || "Unassigned")}</div></div>${selectField(
      "Category",
      "category",
      db.settings.categories.split(",").map((s) => s.trim()),
      "Account Access",
    )}${selectField("Channel", "channel", ["Email", "Chat", "Web", "Phone"], prefill.chat ? "Chat" : "Email")}<label>Description<textarea name="description" rows="3" required>${esc(prefill.description || "")}</textarea></label><button class="hlp-dsk-btn hlp-dsk-primary">Create ticket</button></form>`,
  );
}
function articleModal(id) {
  let a = db.articles.find((a) => a.id === +id) || {};
  showModal(
    a.id ? "Edit article" : "Create an article",
    `<form class="hlp-dsk-form" id="article-form" data-id="${a.id || ""}">${field("Article title", "title", a.title || "")}${selectField("Category", "category", categories, a.category)}${field("Excerpt", "excerpt", a.excerpt || "")}<label>Article content<textarea name="body" rows="9" required>${esc(a.body || "")}</textarea></label>${selectField("Status", "status", ["Draft", "Published"], a.status || "Draft")}<div class="d-flex gap-2"><button type="button" class="hlp-dsk-btn" data-action="preview-article">Preview</button><button class="hlp-dsk-btn hlp-dsk-primary">Save article</button></div><div id="article-preview" class="hlp-dsk-message" hidden></div></form>`,
  );
}
function bulk(kind, all = false) {
  let ids = all
    ? db.tickets
        .filter((t) => t.agent === "Unassigned" && t.status !== "Resolved")
        .map((t) => t.id)
    : $$(".hlp-dsk-ticket-check:checked").map((c) => +c.value);
  if (!ids.length) {
    toast("Select at least one ticket first.");
    return;
  }
  showModal(
    `Update ${ids.length} ticket${ids.length === 1 ? "" : "s"}`,
    `<form id="bulk-form" class="hlp-dsk-form" data-kind="${kind}" data-ids="${ids.join(",")}">${selectField(kind === "agent" ? "Assign agent" : kind === "priority" ? "Priority" : "Status", "value", kind === "agent" ? ["Unassigned", ...names] : kind === "priority" ? ["Urgent", "High", "Medium", "Low"] : ["Open", "Pending", "Resolved"])}<button class="hlp-dsk-btn hlp-dsk-primary">Apply changes</button></form>`,
  );
}
function exportCSV() {
  let t = location.hash.startsWith("#reports")
    ? reportTickets()
    : ["#overview", ""].includes(location.hash)
      ? periodTickets()
      : filteredTickets();
  let columns = [
    "id",
    "subject",
    "customer",
    "priority",
    "status",
    "agent",
    "channel",
    "category",
    "created",
    "response",
    "resolution",
    "csat",
    "slaMet",
  ];
  let csv = [columns, ...t.map((x) => columns.map((c) => x[c]))]
    .map((r) =>
      r
        .map(
          (v) =>
            '"' +
            String(v ?? "")
              .replace(/^[=+@-]/, "'" + "$&")
              .replace(/"/g, '""') +
            '"',
        )
        .join(","),
    )
    .join("\r\n");
  let url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8;" }),
  );
  let a = document.createElement("a");
  a.href = url;
  a.download = "helpdesk-tickets.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  toast(`Exported ${t.length} tickets to CSV.`);
}
// Do business-hour arithmetic in the configured workspace timezone, including DST.
function businessDeadline(hours, from = new Date()) {
  const zone = db.settings.timezone;
  const wallTime = (instant) => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      })
        .formatToParts(instant)
        .map((p) => [p.type, p.value]),
    );
    return new Date(
      Date.UTC(
        +parts.year,
        +parts.month - 1,
        +parts.day,
        +parts.hour,
        +parts.minute,
        +parts.second,
      ),
    );
  };
  let current = wallTime(from),
    remaining = hours * 60,
    guard = 0;
  const [sh, sm] = db.settings.start.split(":").map(Number);
  const [eh, em] = db.settings.end.split(":").map(Number);
  while (remaining > 0 && guard++ < 5000) {
    const day = current.getUTCDay();
    const workingDay =
      db.settings.days === "Every day" ||
      (day !== 0 && (day !== 6 || db.settings.days === "Monday–Saturday"));
    const open = new Date(current),
      close = new Date(current);
    open.setUTCHours(sh, sm, 0, 0);
    close.setUTCHours(eh, em, 0, 0);
    if (!workingDay || current >= close) {
      current.setUTCDate(current.getUTCDate() + 1);
      current.setUTCHours(sh, sm, 0, 0);
      continue;
    }
    if (current < open) current = open;
    const take = Math.min((close - current) / 60000, remaining);
    current = new Date(current.getTime() + take * 60000);
    remaining -= take;
  }
  let instant = new Date(current);
  for (let i = 0; i < 4; i++)
    instant = new Date(+instant + (+current - +wallTime(instant)));
  return stamp(instant);
}
function setTicketStatus(ticket, status) {
  if (ticket.status === status) return;
  ticket.status = status;
  ticket.resolved = status === "Resolved" ? stamp(new Date()) : null;
  if (status === "Resolved") {
    ticket.resolution = (new Date() - new Date(ticket.created)) / 3600000;
    ticket.slaMet = new Date() <= new Date(ticket.deadline);
  }
}
document.addEventListener("click", (e) => {
  let b = e.target.closest("[data-action]");
  if (!b) return;
  let a = b.dataset.action,
    id = +b.dataset.id,
    v = b.dataset.value,
    t = db.tickets.find((t) => t.id === id);
  switch (a) {
    case "sidebar":
      document.body.classList.toggle("hlp-dsk-collapsed");
      b.setAttribute(
        "aria-expanded",
        String(!document.body.classList.contains("hlp-dsk-collapsed")),
      );
      break;
    case "close-modal":
      $("#modal").close();
      break;
    case "new-ticket":
      newTicketModal();
      break;
    case "range":
      if (v === "Custom") {
        showModal(
          "Choose a date range",
          `<form id="range-form" class="hlp-dsk-form">${field("From", "from", state.from || new Date(now - 7 * DAY).toISOString().slice(0, 10), "date")}${field("To", "to", state.to || stamp(now).slice(0, 10), "date")}<p id="range-error" class="hlp-dsk-danger" role="alert"></p><button class="hlp-dsk-btn hlp-dsk-primary">Apply date range</button></form>`,
        );
      } else {
        state.range = v;
        render();
      }
      break;
    case "notifications":
      showModal(
        "Notifications",
        `<p class="hlp-dsk-small">Simulated updates from your demo workspace</p>${activityRows(db.activity.slice(0, 8))}${btn("Simulate notification", "simulate-notification", "bell")}`,
      );
      break;
    case "simulate-notification":
      log("Ravi added a note to ticket HD-1044");
      $("#modal").close();
      toast("New notification: Ravi added an internal note.");
      render();
      break;
    case "profile":
      showModal(
        "Your profile",
        `<div class="d-flex gap-3 align-items-center mb-4">${avatar("Subbu")}<div><strong>Subbu Poluru</strong><p class="hlp-dsk-small mb-0">Workspace administrator · Demo account</p></div></div><a class="hlp-dsk-btn" href="#settings" onclick="document.querySelector('#modal').close()">Workspace settings</a> <a class="hlp-dsk-btn" href="#my-tickets" onclick="document.querySelector('#modal').close()">My tickets</a>`,
      );
      break;
    case "activity":
      showModal("Workspace activity", activityRows(db.activity));
      break;
    case "export":
      exportCSV();
      break;
    case "clear-filters":
      Object.assign(state, {
        query: "",
        status: "",
        priority: "",
        agent: "",
        channel: "",
        category: "",
        date: "",
        page: 1,
      });
      render();
      break;
    case "prev":
      state.page--;
      render();
      break;
    case "next":
      state.page++;
      render();
      break;
    case "sort":
      state.ascending = state.sort === v ? !state.ascending : true;
      state.sort = v;
      render();
      break;
    case "bulk-agent":
      bulk("agent");
      break;
    case "bulk-priority":
      bulk("priority");
      break;
    case "bulk-status":
      bulk("status");
      break;
    case "bulk-agent-all":
      bulk("agent", true);
      break;
    case "resolve":
      t.status = t.status === "Resolved" ? "Open" : "Resolved";
      t.resolved = t.status === "Resolved" ? stamp(new Date()) : null;
      if (t.status === "Resolved") {
        t.resolution = (new Date() - new Date(t.created)) / 3600000;
        t.slaMet = new Date() <= new Date(t.deadline);
      }
      t.history.push(
        `Subbu ${t.status === "Resolved" ? "resolved" : "reopened"} this ticket`,
      );
      log(`Subbu ${t.status.toLowerCase()} ticket HD-${id}`);
      render();
      toast("Ticket updated.");
      break;
    case "escalate":
      t.priority = "Urgent";
      t.agent = "Anu";
      t.history.push("Escalated to Anu · Technical Support");
      log(`Subbu escalated ticket HD-${id} to Anu`);
      render();
      toast("Ticket escalated to Anu.");
      break;
    case "agent-profile": {
      let ag = db.agents.find((x) => x.name === v);
      showModal(
        v + " · Agent profile",
        `<form id="agent-form" class="hlp-dsk-form" data-name="${v}">${selectField("Team", "team", ["Customer Support", "Technical Support"], ag.team)}${selectField("Availability", "availability", ["Online", "Away", "Offline"], ag.availability)}<p class="hlp-dsk-small">${db.tickets.filter((t) => t.agent === v && t.status !== "Resolved").length} active tickets</p><button class="hlp-dsk-btn hlp-dsk-primary">Save profile</button></form>`,
      );
      break;
    }
    case "policies":
      showModal(
        "SLA policies",
        `<form id="policies-form" class="hlp-dsk-form"><p class="hlp-dsk-small">Hours are counted within workspace business hours. Changes apply to newly created tickets.</p>${db.policies.map((p) => `<h3 class="mt-3">${p.priority}</h3><div class="row"><div class="col-6">${field("First response (hours)", p.priority + "Response", p.response, "number")}</div><div class="col-6">${field("Resolution (hours)", p.priority + "Resolution", p.resolution, "number")}</div></div>`).join("")}<button class="hlp-dsk-btn hlp-dsk-primary">Save policies</button></form>`,
      );
      break;
    case "new-article":
      articleModal();
      break;
    case "edit-article":
      articleModal(id);
      break;
    case "preview-article": {
      let f = new FormData($("#article-form"));
      $("#article-preview").hidden = false;
      $("#article-preview").innerHTML =
        `<h3>${esc(f.get("title"))}</h3><div style="white-space:pre-wrap">${esc(f.get("body"))}</div>`;
      break;
    }
    case "delete-article":
      showModal(
        "Delete this article?",
        `<p>This removes the article from your demo knowledge base. This cannot be undone.</p>${btn("Cancel", "close-modal")}${btn("Delete article", "confirm-delete", "trash", true, `data-id="${id}"`)}`,
      );
      break;
    case "confirm-delete":
      db.articles = db.articles.filter((a) => a.id !== id);
      save();
      $("#modal").close();
      location.hash = "knowledge";
      toast("Article deleted.");
      break;
    case "feedback": {
      let a = db.articles.find((a) => a.id === id);
      if (db.feedback[id]) break;
      a.helpful = Math.round(
        (((a.helpful * a.votes) / 100 + (v === "yes" ? 1 : 0)) /
          (a.votes + 1)) *
          100,
      );
      a.votes++;
      db.feedback[id] = v;
      save();
      render();
      toast("Thank you. Your feedback helps us improve.");
      break;
    }
    case "chat-view":
      state.chatView = v;
      render();
      break;
    case "chat-select":
      state.chat = id;
      render();
      break;
    case "chat-close": {
      let c = db.chats.find((c) => c.id === id);
      c.status = c.status === "Closed" ? "Active" : "Closed";
      state.chatView = c.status;
      save();
      render();
      toast("Conversation " + c.status.toLowerCase() + ".");
      break;
    }
    case "chat-ticket":
      location.hash = "ticket/" + db.chats.find((c) => c.id === id).ticket;
      break;
    case "convert-chat": {
      let c = db.chats.find((c) => c.id === id);
      newTicketModal({
        chat: id,
        customer: c.customer,
        email: c.customer.toLowerCase() + "@example.com",
        agent: c.agent,
        subject: "Chat support request — " + c.customer,
        description: c.messages.map((m) => m.author + ": " + m.text).join("\n"),
      });
      break;
    }
    case "simulate-chat": {
      let c = db.chats.find((c) => c.status === "Active");
      c.messages.push({
        author: c.customer,
        text: "Hi again! Is there an update on my request?",
        time: stamp(new Date()),
      });
      c.unread++;
      save();
      render();
      toast("A simulated customer message arrived.");
      break;
    }
    case "reset":
      showModal(
        "Reset this demo workspace?",
        `<p>Your ticket edits, messages, articles, and settings will be replaced with the original demo data.</p>${btn("Cancel", "close-modal")}${btn("Reset workspace", "confirm-reset", "arrow-counterclockwise", true)}`,
      );
      break;
    case "confirm-reset":
      db = seed();
      save();
      $("#modal").close();
      location.hash = "overview";
      render();
      toast("Demo workspace reset.");
      break;
  }
});
document.addEventListener("submit", (e) => {
  let f = e.target;
  if (!f.matches("form")) return;
  e.preventDefault();
  let data = Object.fromEntries(new FormData(f)),
    id = +f.dataset.id;
  switch (f.id) {
    case "new-ticket-form": {
      let policy =
          db.policies.find((p) => p.priority === data.priority) ||
          db.policies[2],
        id = Math.max(...db.tickets.map((t) => t.id), 1041) + 1;
      let t = {
        ...data,
        id,
        status: "Open",
        created: stamp(new Date()),
        deadline: businessDeadline(policy.resolution),
        firstDeadline: businessDeadline(policy.response),
        response: 0,
        resolution: 0,
        csat: 0,
        slaMet: true,
        resolved: null,
        messages: [
          {
            author: data.customer,
            text: data.description,
            type: "public",
            time: stamp(new Date()),
          },
        ],
        history: ["Ticket created by Subbu"],
      };
      delete t.description;
      db.tickets.unshift(t);
      if (f.dataset.chat)
        db.chats.find((c) => c.id === +f.dataset.chat).ticket = id;
      log(`Subbu created ticket HD-${id}`);
      $("#modal").close();
      location.hash = "ticket/" + id;
      toast("Ticket HD-" + id + " created.");
      break;
    }
    case "ticket-properties": {
      let t = db.tickets.find((t) => t.id === id);
      setTicketStatus(t, data.status);
      Object.assign(t, data);
      t.history.push("Ticket properties updated by Subbu");
      log(`Subbu updated ticket HD-${id}`);
      render();
      toast("Ticket properties saved.");
      break;
    }
    case "reply-form": {
      let t = db.tickets.find((t) => t.id === id);
      if (data.type === "Public reply" && !t.response)
        t.response = Math.max(
          1,
          Math.round((new Date() - new Date(t.created)) / 60000),
        );
      t.messages.push({
        author: "Subbu",
        text: data.message,
        type: data.type === "Internal note" ? "note" : "public",
        attachment: data.attachment?.name || "",
        time: stamp(new Date()),
      });
      t.history.push(data.type + " added by Subbu");
      log(`Subbu added a ${data.type.toLowerCase()} to HD-${id}`);
      render();
      toast(
        data.type === "Internal note"
          ? "Internal note saved."
          : "Public reply sent in this demo.",
      );
      break;
    }
    case "bulk-form": {
      let ids = f.dataset.ids.split(",").map(Number);
      db.tickets
        .filter((t) => ids.includes(t.id))
        .forEach((t) => {
          if (f.dataset.kind === "status") setTicketStatus(t, data.value);
          else t[f.dataset.kind] = data.value;
          t.history.push(
            f.dataset.kind + " changed to " + data.value + " by Subbu",
          );
        });
      log(`Subbu updated ${ids.length} tickets`);
      $("#modal").close();
      render();
      toast("Selected tickets updated.");
      break;
    }
    case "range-form":
      if (data.from > data.to) {
        $("#range-error").textContent =
          "The end date must be on or after the start date.";
        return;
      }
      if ((new Date(data.to) - new Date(data.from)) / DAY > 365) {
        $("#range-error").textContent = "Choose a range of up to one year.";
        return;
      }
      Object.assign(state, data, { range: "Custom" });
      $("#modal").close();
      render();
      break;
    case "agent-form":
      Object.assign(
        db.agents.find((a) => a.name === f.dataset.name),
        data,
      );
      save();
      $("#modal").close();
      render();
      toast("Agent profile saved.");
      break;
    case "policies-form":
      db.policies.forEach((p) => {
        p.response = +data[p.priority + "Response"];
        p.resolution = +data[p.priority + "Resolution"];
      });
      save();
      $("#modal").close();
      render();
      toast("SLA policies saved.");
      break;
    case "article-form": {
      let a = db.articles.find((a) => a.id === id);
      if (a) Object.assign(a, data, { updated: stamp(new Date()) });
      else {
        a = {
          ...data,
          id: Math.max(...db.articles.map((a) => a.id), 0) + 1,
          updated: stamp(new Date()),
          helpful: 100,
          votes: 0,
        };
        db.articles.unshift(a);
      }
      log(
        "Subbu " +
          (a.status === "Published" ? "published" : "saved a draft of") +
          " “" +
          a.title +
          "”",
      );
      $("#modal").close();
      location.hash = "article/" + a.id;
      render();
      toast(a.status === "Published" ? "Article published." : "Draft saved.");
      break;
    }
    case "chat-form": {
      let c = db.chats.find((c) => c.id === id);
      c.messages.push({
        author: "You",
        text: data.message,
        time: stamp(new Date()),
      });
      save();
      render();
      toast("Demo message sent.");
      setTimeout(() => {
        c.messages.push({
          author: c.customer,
          text: "Thank you for your help! I’ll take a look and let you know.",
          time: stamp(new Date()),
        });
        c.unread =
          location.hash === "#chat" && state.chat === id ? 0 : c.unread + 1;
        save();
        if (location.hash === "#chat") {
          let draft = $("#chat-message")?.value || "";
          render();
          if ($("#chat-message")) $("#chat-message").value = draft;
        } else if (db.settings.notify)
          toast(c.customer + " sent a demo reply.");
      }, 1600);
      break;
    }
    case "chat-assign":
      db.chats.find((c) => c.id === id).agent = data.agent;
      save();
      toast("Conversation assignment saved.");
      break;
    case "settings-form":
      if (data.start >= data.end) {
        $("#settings-error").textContent =
          "Closing time must be later than opening time.";
        return;
      }
      if (
        !data.categories.split(",").every((s) => s.trim()) ||
        !data.priorities.split(",").every((s) => s.trim())
      ) {
        $("#settings-error").textContent =
          "Remove empty categories or priorities.";
        return;
      }
      db.settings = { ...data, notify: !!data.notify };
      save();
      render();
      toast("Workspace settings saved.");
      break;
  }
});
document.addEventListener("change", (e) => {
  let el = e.target;
  if (el.dataset.filter) {
    state[el.dataset.filter] = el.value;
    state.page = 1;
    render();
  }
  if (el.id === "select-all")
    $$(".hlp-dsk-ticket-check").forEach((c) => (c.checked = el.checked));
  if (el.id === "canned")
    $("#reply").value =
      el.value === "article"
        ? "You can reset your password using our guide: " +
          location.href.split("#")[0] +
          "#article/3"
        : el.value === "default"
          ? db.settings.canned
          : "";
  if (el.id === "chat-quick") $("#chat-message").value = el.value;
  if (el.dataset.availability) {
    db.agents.find((a) => a.name === el.dataset.availability).availability =
      el.value;
    save();
    render();
    toast("Availability updated.");
  }
});
let searchTimer;
document.addEventListener("input", (e) => {
  let key = { "ticket-search": "query", "kb-search": "kbQuery" }[e.target.id];
  if (key) {
    let position = e.target.selectionStart,
      id = e.target.id;
    state[key] = e.target.value;
    state.page = 1;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      render();
      $("#" + id)?.focus();
      $("#" + id)?.setSelectionRange(position, position);
    }, 200);
  }
});
$("#global-search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    Object.assign(state, {
      query: e.target.value,
      status: "",
      priority: "",
      agent: "",
      channel: "",
      category: "",
      date: "",
      page: 1,
    });
    location.hash = "tickets";
    render();
    e.target.value = "";
  }
});
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    if (window.innerWidth < 620) {
      location.hash = "tickets";
      render();
      $("#ticket-search")?.focus();
    } else $("#global-search").focus();
  }
  if (e.key === "Escape") document.body.classList.remove("hlp-dsk-collapsed");
});
window.addEventListener("hashchange", () => {
  if (innerWidth < 900) document.body.classList.remove("hlp-dsk-collapsed");
  render();
  $("#main").focus({ preventScroll: true });
  window.scrollTo(0, 0);
});
render();
save();
