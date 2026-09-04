import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  announcements,
  children as allChildren,
  events,
  feeAccount,
  formatLongDate,
  formatShortDate,
  grades,
  greeting,
  parent,
} from '../data';
import { useApp } from '../context';
import {
  Avatar,
  Badge,
  Button,
  Card,
  DashboardSkeleton,
  EmptyState,
  Icon,
  Modal,
  StatusDot,
  TextLink,
} from '../components/ui';

export default function DashboardPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{formatLongDate()}</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2rem]">
            {greeting()}, {parent.firstName}
          </h1>
          <p className="mt-1 text-sm text-muted">A quiet scan of attendance, fees, messages, and what’s next this week.</p>
        </div>
      </header>

      <StudentSelector />
      <SummaryCards />

      <div className="grid gap-6 xl:grid-cols-2">
        <AttendanceOverview />
        <UpcomingEvents />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentMessages />
        <FeesCard />
      </div>

      <GradesTable />
      <Announcements />
    </div>
  );
}

function StudentSelector() {
  const { selectedChildId, toggleChild } = useApp();

  return (
    <section aria-label="Your children">
      <div className="grid gap-4 sm:grid-cols-2">
        {allChildren.map((child) => {
          const selected = selectedChildId === child.id;
          return (
            <button
              type="button"
              key={child.id}
              onClick={() => toggleChild(child.id)}
              aria-pressed={selected}
              className={`flex items-center gap-4 rounded-2xl border bg-white p-4 text-left shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition hover:border-brand/30 ${
                selected ? 'border-brand ring-2 ring-brand/20' : 'border-line'
              }`}
            >
              <Avatar initials={child.initials} className={child.avatarClass} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold text-ink">{child.name}</p>
                  {selected && <Badge>Viewing</Badge>}
                </div>
                <p className="text-sm text-muted">
                  {child.grade} · {child.homeroom} · {child.house}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink">
                  <StatusDot tone={child.status} />
                  {child.statusLabel}
                </p>
              </div>
              <Icon name="chevron-right" className="text-muted" />
            </button>
          );
        })}
      </div>
      {selectedChildId !== 'all' && (
        <p className="mt-3 text-xs text-muted">
          Showing {allChildren.find((child) => child.id === selectedChildId)?.firstName} only.{' '}
          <button type="button" className="font-semibold text-brand hover:underline" onClick={() => toggleChild(selectedChildId)}>
            View both children
          </button>
        </p>
      )}
    </section>
  );
}

function SummaryCards() {
  const { attendancePct, unreadMessages, outstanding, filterByChild, selectedChild } = useApp();
  const upcoming = events.filter(filterByChild).length;
  const label = selectedChild ? selectedChild.firstName : 'Family';

  const items = [
    { icon: 'calendar-check', label: 'Attendance', value: `${attendancePct}%`, hint: label, to: '/attendance' },
    { icon: 'credit-card', label: 'Upcoming fees', value: outstanding ? `$${outstanding.toLocaleString()}` : 'Paid', hint: outstanding ? 'Due Sep 15' : 'All current', to: '/fees' },
    { icon: 'chat-dots', label: 'Unread messages', value: String(unreadMessages.length), hint: unreadMessages.length ? 'Needs a look' : 'You’re caught up', to: '/messages' },
    { icon: 'calendar-event', label: 'Upcoming events', value: String(upcoming), hint: 'This term', to: '/calendar' },
  ];

  return (
    <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition hover:border-brand/25"
        >
          <div className="flex items-start justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Icon name={item.icon} />
            </span>
            <Icon name="arrow-up-right" className="text-sm text-muted" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{item.label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">{item.value}</p>
          <p className="text-xs text-muted">{item.hint}</p>
        </Link>
      ))}
    </section>
  );
}

function AttendanceOverview() {
  const { attendancePct, visibleChildren } = useApp();
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (attendancePct / 100) * circumference;
  const present = visibleChildren.reduce((sum, child) => sum + child.present, 0);
  const absent = visibleChildren.reduce((sum, child) => sum + child.absent, 0);
  const late = visibleChildren.reduce((sum, child) => sum + child.late, 0);

  return (
    <Card kicker="This term" title="Attendance overview" action={<TextLink to="/attendance">Full record</TextLink>}>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative">
          <svg viewBox="0 0 140 140" className="h-36 w-36" role="img" aria-label={`Attendance ${attendancePct} percent`}>
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#efe8de" strokeWidth="12" />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#760031"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 70 70)"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <p className="text-2xl font-semibold text-ink">{attendancePct}%</p>
          </div>
        </div>
        <ul className="grid w-full flex-1 grid-cols-3 gap-3 text-center sm:text-left">
          <li>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Present</p>
            <p className="mt-1 text-xl font-semibold">{present}</p>
          </li>
          <li>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Absent</p>
            <p className="mt-1 text-xl font-semibold">{absent}</p>
          </li>
          <li>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Late</p>
            <p className="mt-1 text-xl font-semibold">{late}</p>
          </li>
        </ul>
      </div>
    </Card>
  );
}

function UpcomingEvents() {
  const { filterByChild } = useApp();
  const list = events.filter(filterByChild).slice(0, 4);

  return (
    <Card kicker="Coming up" title="Upcoming events" action={<TextLink to="/calendar">View Calendar</TextLink>}>
      {list.length === 0 ? (
        <EmptyState icon="calendar-event" title="No events" body="Nothing is scheduled for this child in the next few weeks." />
      ) : (
        <ul className="divide-y divide-line">
          {list.map((event) => (
            <li key={event.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
              <div className="flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-soft text-brand">
                <span className="text-[10px] font-semibold uppercase">{formatShortDate(event.date).split(' ')[0]}</span>
                <span className="text-lg font-semibold leading-none">{formatShortDate(event.date).split(' ')[1]}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{event.title}</p>
                <p className="text-xs text-muted">
                  <Icon name="clock" className="mr-1" />
                  {event.time}
                  <span className="mx-1.5">·</span>
                  <Icon name="geo-alt" className="mr-1" />
                  {event.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function RecentMessages() {
  const { messages, filterByChild, markMessageRead } = useApp();
  const list = messages.filter(filterByChild).slice(0, 4);

  return (
    <Card kicker="Inbox" title="Recent messages" action={<TextLink to="/messages">View All Messages</TextLink>}>
      {list.length === 0 ? (
        <EmptyState icon="chat-dots" title="No messages" body="School messages for this child will appear here." />
      ) : (
        <ul className="divide-y divide-line">
          {list.map((message) => (
            <li key={message.id}>
              <button
                type="button"
                className="flex w-full gap-3 py-3 text-left first:pt-0 hover:bg-canvas/60"
                onClick={() => markMessageRead(message.id)}
              >
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${message.read ? 'bg-line' : 'bg-brand'}`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className={`truncate text-sm ${message.read ? 'font-medium text-ink' : 'font-semibold text-ink'}`}>{message.sender}</p>
                    <time className="shrink-0 text-[11px] text-muted">{message.time}</time>
                  </div>
                  <p className="truncate text-sm text-ink">{message.subject}</p>
                  <p className="truncate text-xs text-muted">{message.preview}</p>
                </div>
                {!message.read && <span className="sr-only">Unread</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function FeesCard() {
  const { outstanding, paid, setPaid } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card kicker="Business office" title="Fees & payments">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Outstanding balance</p>
            <p className="mt-1 font-display text-3xl font-semibold text-brand">{paid ? '$0' : `$${outstanding.toLocaleString()}`}</p>
            <p className="mt-1 text-sm text-muted">Next due {feeAccount.nextDue}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={paid ? 'success' : 'warning'}>{paid ? 'Paid in full' : feeAccount.status}</Badge>
            <span className="text-xs text-muted">{feeAccount.method}</span>
          </div>
          <Button className="w-full sm:w-auto" disabled={paid} onClick={() => setOpen(true)}>
            <Icon name="lock" />
            {paid ? 'Payment received' : 'Make Payment'}
          </Button>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Pay fall installment">
        <p className="text-sm text-muted">Charge {feeAccount.method} for the September tuition installment.</p>
        <p className="my-4 font-display text-3xl font-semibold text-brand">$1,850.00</p>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              setPaid(true);
              setOpen(false);
            }}
          >
            Confirm payment
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

function GradesTable() {
  const { filterByChild, selectedChild, selectedChildId } = useApp();
  const rows = useMemo(() => grades.filter(filterByChild).slice(0, 5), [filterByChild]);

  return (
    <Card
      kicker="Academics"
      title={selectedChild ? `${selectedChild.firstName}’s latest grades` : 'Recent grades'}
      action={<TextLink to="/grades">View Report Card</TextLink>}
    >
      <div className="-mx-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-y border-line bg-canvas/70 text-xs font-semibold uppercase tracking-wide text-muted">
            <tr>
              {selectedChildId === 'all' && <th className="px-5 py-2.5 font-semibold">Student</th>}
              <th className="px-5 py-2.5 font-semibold">Subject</th>
              <th className="px-5 py-2.5 font-semibold">Grade</th>
              <th className="hidden px-5 py-2.5 font-semibold sm:table-cell">Teacher feedback</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => {
              const child = allChildren.find((item) => item.id === row.childId);
              return (
                <tr key={row.id} className="align-top">
                  {selectedChildId === 'all' && <td className="px-5 py-3 font-medium text-ink">{child?.firstName}</td>}
                  <td className="px-5 py-3">
                    <p className="font-semibold text-ink">{row.subject}</p>
                    <p className="text-xs text-muted">{row.teacher}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex min-w-10 justify-center rounded-lg bg-brand-soft px-2 py-1 text-sm font-semibold text-brand">
                      {row.grade}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3 text-muted sm:table-cell">{row.feedback}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Announcements() {
  const toneIcon = { alert: 'exclamation-triangle', info: 'info-circle', notice: 'megaphone' };
  const toneClass = { alert: 'text-warning bg-amber-50', info: 'text-brand bg-brand-soft', notice: 'text-ink bg-canvas' };

  return (
    <Card kicker="School notices" title="Announcements">
      <ul className="space-y-3">
        {announcements.map((item) => (
          <li key={item.id} className="flex gap-3 rounded-xl border border-line p-3">
            <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${toneClass[item.tone]}`}>
              <Icon name={toneIcon[item.tone]} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-0.5 text-sm text-muted">{item.body}</p>
              <p className="mt-1 text-[11px] text-muted">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
