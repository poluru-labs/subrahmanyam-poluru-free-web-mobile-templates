import { documents } from '../data';
import { Card, Icon } from '../components/ui';

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-ink">Documents</h1>
        <p className="mt-1 text-sm text-muted">Handbooks, permission slips, and health forms.</p>
      </header>

      <Card bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {documents.map((doc) => (
            <li key={doc.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon name="file-earmark-text" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{doc.name}</p>
                <p className="text-xs text-muted">
                  {doc.category} · {doc.type} · {doc.size} · Updated {doc.updated}
                </p>
              </div>
              <button type="button" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <Icon name="download" />
                Download
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
