import { attendanceDays, children } from '../data';
import { useApp } from '../context';
import { Card } from '../components/ui';

const labels = ['M', 'T', 'W', 'T', 'F', 'M', 'T', 'W', 'T', 'F', 'M', 'T', 'W', 'T', 'F'];
const key = { P: { label: 'Present', className: 'bg-brand text-white' }, A: { label: 'Absent', className: 'bg-warning text-white' }, L: { label: 'Late', className: 'bg-brand-soft text-brand' } };

export default function AttendancePage() {
  const { selectedChildId } = useApp();
  const list = selectedChildId === 'all' ? children : children.filter((child) => child.id === selectedChildId);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-ink">Attendance</h1>
        <p className="mt-1 text-sm text-muted">Last three school weeks · Fall Term 2026</p>
      </header>

      {list.map((child) => (
        <Card key={child.id} title={`${child.name} · ${child.attendancePct}%`} kicker={child.grade}>
          <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${child.firstName} daily attendance`}>
            {attendanceDays[child.id].map((code, index) => (
              <span
                key={`${child.id}-${index}`}
                role="listitem"
                title={`${labels[index]}: ${key[code].label}`}
                className={`grid h-9 w-9 place-items-center rounded-lg text-xs font-semibold ${key[code].className}`}
              >
                {labels[index]}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            {child.present} present · {child.absent} absent · {child.late} late
          </p>
        </Card>
      ))}
    </div>
  );
}
