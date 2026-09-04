import { events, formatShortDate } from '../data';
import { useApp } from '../context';
import { Badge, Card, EmptyState, Icon } from '../components/ui';

export default function CalendarPage() {
  const { filterByChild } = useApp();
  const list = events.filter(filterByChild);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-ink">Calendar</h1>
        <p className="mt-1 text-sm text-muted">Trips, athletics, conferences, and campus events.</p>
      </header>

      <Card bodyClassName="p-0">
        {list.length === 0 ? (
          <EmptyState icon="calendar-event" title="No events" body="The selected student has no upcoming events." />
        ) : (
          <ul className="divide-y divide-line">
            {list.map((event) => (
              <li key={event.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <span className="text-[10px] font-semibold uppercase">{formatShortDate(event.date).split(' ')[0]}</span>
                  <span className="text-lg font-semibold leading-none">{formatShortDate(event.date).split(' ')[1]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{event.title}</p>
                  <p className="text-sm text-muted">
                    <Icon name="clock" className="mr-1" />
                    {event.time}
                    <span className="mx-1.5">·</span>
                    <Icon name="geo-alt" className="mr-1" />
                    {event.location}
                  </p>
                </div>
                <Badge>{event.type}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
