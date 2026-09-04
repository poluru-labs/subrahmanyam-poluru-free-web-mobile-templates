import { children, parent } from '../data';
import { useApp } from '../context';
import { Avatar, Badge, Card, Icon, StatusDot } from '../components/ui';

export default function ChildrenPage() {
  const { selectedChildId, toggleChild } = useApp();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-ink">My children</h1>
        <p className="mt-1 text-sm text-muted">Profiles linked to {parent.name} for {parent.role.toLowerCase()} access.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {children.map((child) => (
          <Card key={child.id} bodyClassName="p-6">
            <div className="flex items-start gap-4">
              <Avatar initials={child.initials} className={child.avatarClass} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{child.name}</h2>
                  {selectedChildId === child.id && <Badge>Selected</Badge>}
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <StatusDot tone={child.status} />
                  {child.statusLabel}
                </p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Grade</dt>
                <dd className="mt-1 font-medium">{child.grade}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Class</dt>
                <dd className="mt-1 font-medium">
                  {child.homeroom} · {child.house}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Homeroom teacher</dt>
                <dd className="mt-1 font-medium">{child.teacher}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Attendance</dt>
                <dd className="mt-1 font-medium text-brand">{child.attendancePct}%</dd>
              </div>
            </dl>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              onClick={() => toggleChild(child.id)}
            >
              <Icon name="eye" />
              {selectedChildId === child.id ? 'Clear filter' : 'Show on dashboard'}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
