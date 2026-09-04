import { useState } from 'react';
import { useApp } from '../context';
import { Badge, Card, EmptyState, Icon } from '../components/ui';

export default function MessagesPage() {
  const { messages, filterByChild, markMessageRead } = useApp();
  const list = messages.filter(filterByChild);
  const [activeId, setActiveId] = useState(list[0]?.id ?? null);
  const active = list.find((item) => item.id === activeId) ?? list[0];

  if (list.length === 0) {
    return (
      <Card>
        <EmptyState icon="inbox" title="Inbox is empty" body="Messages from teachers and the school office will land here." />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-ink">Messages</h1>
        <p className="mt-1 text-sm text-muted">Teachers, athletics, and the business office.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,18rem)_1fr]">
        <Card bodyClassName="p-0">
          <ul>
            {list.map((message) => (
              <li key={message.id} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  className={`flex w-full flex-col items-start px-4 py-3 text-left hover:bg-canvas ${active?.id === message.id ? 'bg-brand-soft/60' : ''}`}
                  onClick={() => {
                    setActiveId(message.id);
                    markMessageRead(message.id);
                  }}
                >
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{message.sender}</span>
                    {!message.read && <span className="h-2 w-2 rounded-full bg-brand" aria-label="Unread" />}
                  </span>
                  <span className="truncate text-sm text-ink">{message.subject}</span>
                  <span className="text-[11px] text-muted">{message.time}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {active && (
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold">{active.subject}</h2>
                <p className="text-sm text-muted">
                  {active.sender} · {active.role}
                </p>
              </div>
              <Badge tone={active.read ? 'muted' : 'brand'}>{active.time}</Badge>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink">{active.preview}</p>
            <button type="button" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              <Icon name="reply" />
              Reply
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}
