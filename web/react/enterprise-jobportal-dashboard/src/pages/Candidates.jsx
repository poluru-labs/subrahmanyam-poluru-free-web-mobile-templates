import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  DataTable,
  DatePicker,
  Drawer,
  EmptyState,
  Pagination,
  RadioGroup,
  Rating,
  Search,
  Status,
  Switch,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { candidateColumns, candidates, statusTone } from '../data';

export default function Candidates({ query = '' }) {
  const [localQuery, setLocalQuery] = useState(query);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(candidates[0]);
  const [stage, setStage] = useState('interview');
  const [rating, setRating] = useState(4);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('2026-09-03');
  const [time, setTime] = useState('10:00');
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    return candidates.filter((item) => {
      const hay = `${item.name} ${item.role} ${item.skills}`.toLowerCase();
      const openOk = !onlyOpen || item.stage === 'Interview' || item.stage === 'Offer';
      return hay.includes(q) && openOk;
    });
  }, [localQuery, onlyOpen]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize).map((item) => ({
    name: item.name,
    role: item.role,
    experience: item.experience,
    location: item.location,
    stage: item.stage,
    score: item.score,
    id: item.id,
  }));

  function inspect(item) {
    const full = candidates.find((row) => row.id === item.id) || item;
    setActive(full);
    setStage(full.stage === 'Offer' ? 'offer' : full.stage === 'Interview' ? 'interview' : 'screen');
    setNote('');
    setOpen(true);
  }

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Talent</span>
          <h1>Candidates</h1>
          <p>{filtered.length} people · Sravani Poluru is in interview</p>
        </div>
        <Switch label="Active loops only" checked={onlyOpen} onChange={(_, checked) => { setOnlyOpen(checked); setPage(1); }} />
      </header>
      <Card>
        <div className="filters">
          <div>
            <Search value={localQuery} placeholder="Search candidates" onChange={(_, value) => { setLocalQuery(value); setPage(1); }} />
          </div>
          <Checkbox label="Compact rows" checked={compact} onChange={(_, checked) => setCompact(checked)} />
        </div>
        {!filtered.length ? (
          <EmptyState heading="No candidates match" description="Clear filters or wait for the next Poluru Labs inbound." />
        ) : (
          <>
            <DataTable columns={candidateColumns} rows={rows} sortable striped />
            <div className="row" style={{ justifyContent: 'space-between', marginTop: '0.85rem' }}>
              <span className="muted">{filtered.length} in this view</span>
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
            </div>
            <div className="stack" style={{ marginTop: '0.85rem' }}>
              {rows.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="run-card"
                  style={{ textAlign: 'left', cursor: 'pointer', padding: compact ? '0.55rem 0.75rem' : undefined }}
                  onClick={() => inspect(item)}
                >
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>{item.name}</strong>
                    <Status label={item.stage} variant={statusTone(item.stage)} />
                  </div>
                  <p className="note">{item.role} · {item.location} · score {item.score}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        heading={active.name}
        footer={(
          <Button onClick={() => {
            setOpen(false);
            showToast({ title: 'Loop updated', description: `${active.name} is filed under Kavya Poluru.`, variant: 'success' });
          }}
          >
            Save loop
          </Button>
        )}
      >
        <p className="note">{active.role} · {active.skills}</p>
        <Status label={active.stage} variant={statusTone(active.stage)} />
        <RadioGroup
          className="mt-3"
          label="Next stage"
          orientation="horizontal"
          value={stage}
          onChange={(_, value) => setStage(value)}
          options={[
            { value: 'screen', label: 'Screen' },
            { value: 'interview', label: 'Interview' },
            { value: 'offer', label: 'Offer' },
          ]}
        />
        <div className="stack" style={{ marginTop: '0.85rem' }}>
          <DatePicker label="Interview date" value={date} onChange={setDate} />
          <TimePicker label="Interview time" value={time} onChange={(_, value) => setTime(value)} />
        </div>
        <div className="row" style={{ marginTop: '0.85rem' }}>
          <span className="muted">Rater confidence</span>
          <Rating value={rating} onChange={setRating} />
        </div>
        <Textarea className="mt-3" label="Note" rows={4} value={note} placeholder="Why did Kavya Poluru advance this loop?" onChange={(event) => setNote(event.target.value)} />
      </Drawer>
    </>
  );
}
