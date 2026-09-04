import { children, grades } from '../data';
import { useApp } from '../context';
import { Button, Card } from '../components/ui';

export default function GradesPage() {
  const { filterByChild } = useApp();
  const rows = grades.filter(filterByChild);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Grades</h1>
          <p className="mt-1 text-sm text-muted">Latest posted marks for the current term.</p>
        </div>
        <Button variant="secondary" onClick={() => window.alert('Report card PDF would download in production.')}>
          View Report Card
        </Button>
      </header>

      <Card bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas/70 text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Student</th>
                <th className="px-5 py-3 font-semibold">Subject</th>
                <th className="px-5 py-3 font-semibold">Grade</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => {
                const child = children.find((item) => item.id === row.childId);
                return (
                  <tr key={row.id}>
                    <td className="px-5 py-3 font-medium">{child?.firstName}</td>
                    <td className="px-5 py-3">
                      <p className="font-semibold">{row.subject}</p>
                      <p className="text-xs text-muted">{row.teacher}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex min-w-10 justify-center rounded-lg bg-brand-soft px-2 py-1 font-semibold text-brand">
                        {row.grade}
                      </span>
                    </td>
                    <td className="hidden px-5 py-3 text-muted md:table-cell">{row.feedback}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
