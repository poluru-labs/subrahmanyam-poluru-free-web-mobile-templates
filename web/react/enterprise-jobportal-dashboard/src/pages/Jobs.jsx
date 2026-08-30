import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  EmptyState,
  Pagination,
  Search,
  Select,
  Status,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { jobColumns, jobs, ownerOptions, statusTone } from '../data';

export default function Jobs({ query = '', onPost }) {
  const [localQuery, setLocalQuery] = useState(query);
  const [status, setStatus] = useState('all');
  const [owner, setOwner] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    return jobs.filter((job) => {
      const hay = `${job.title} ${job.company} ${job.owner}`.toLowerCase();
      const statusOk = status === 'all' || job.status === status;
      const ownerOk = owner === 'all' || job.owner.toLowerCase().includes(owner);
      return hay.includes(q) && statusOk && ownerOk;
    });
  }, [localQuery, status, owner]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize).map((job) => ({
    title: job.title,
    company: job.company,
    owner: job.owner,
    location: job.location,
    applicants: job.applicants,
    status: job.status,
    id: job.id,
  }));

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Marketplace</span>
          <h1>Jobs</h1>
          <p>{filtered.length} roles · Kavya Poluru’s queue first</p>
        </div>
        <Button icon="plus" onClick={onPost}>Post job</Button>
      </header>
      <Card>
        <div className="filters">
          <div>
            <Search value={localQuery} placeholder="Search roles" onChange={(_, value) => { setLocalQuery(value); setPage(1); }} />
          </div>
          <div style={{ minWidth: '11rem' }}>
            <Select
              value={status}
              onChange={(event) => { setStatus(event.target.value); setPage(1); }}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'Published', label: 'Published' },
                { value: 'Review', label: 'Review' },
                { value: 'Draft', label: 'Draft' },
                { value: 'Closed', label: 'Closed' },
              ]}
            />
          </div>
          <div style={{ minWidth: '11rem' }}>
            <Select
              value={owner}
              onChange={(event) => { setOwner(event.target.value); setPage(1); }}
              options={[{ value: 'all', label: 'All owners' }, ...ownerOptions]}
            />
          </div>
        </div>
        {!filtered.length ? (
          <EmptyState heading="No matching jobs" description="Clear filters or post a new role." actions={<Button size="sm" onClick={onPost}>Post job</Button>} />
        ) : (
          <>
            <DataTable columns={jobColumns} rows={rows} sortable striped />
            <div className="row" style={{ justifyContent: 'space-between', marginTop: '0.85rem' }}>
              <div className="row">
                {filtered.filter((job) => job.featured).map((job) => (
                  <Tag key={job.id} label={job.title} variant="brand" />
                ))}
              </div>
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
            </div>
            <div className="stack" style={{ marginTop: '0.85rem' }}>
              {rows.map((job) => (
                <a key={job.id} className="run-card" href={`#/job/${job.id}`}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>{job.title}</strong>
                    {jobs.find((item) => item.id === job.id)?.featured ? <Badge label="Featured" variant="brand" pill /> : null}
                  </div>
                  <span className="muted">{job.company} · {job.owner} · {job.applicants} applicants</span>
                  <Status label={job.status} variant={statusTone(job.status)} />
                </a>
              ))}
            </div>
          </>
        )}
      </Card>
    </>
  );
}
