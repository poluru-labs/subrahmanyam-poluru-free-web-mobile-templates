import { Button, Card, Meter, Status, Stepper, showToast } from '@poluru-labs/enterprise-design-system-react';
import { hireSteps, interviews, pipeline, sla, statusTone } from '../data';

export default function Pipeline() {
  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Flow</span>
          <h1>Pipeline</h1>
          <p>Applied through offer · Kavya Poluru’s board</p>
        </div>
        <Button variant="secondary" size="sm" icon="download" onClick={() => showToast({ title: 'Export started', description: 'CSV will land with Kavya Poluru.', variant: 'info' })}>Export board</Button>
      </header>
      <Stepper steps={hireSteps} current={2} />
      <div className="kanban" style={{ marginTop: '1rem' }}>
        {pipeline.map((column) => (
          <Card key={column.stage} header={column.stage}>
            <Status label={`${column.items.length} people`} variant={statusTone(column.stage)} />
            <div className="stack" style={{ marginTop: '0.75rem' }}>
              {column.items.map((item) => (
                <a key={item.name} className="run-card" href="#/candidates">
                  <strong>{item.name}</strong>
                  <span className="muted">{item.role}</span>
                </a>
              ))}
            </div>
            <Meter className="mt-3" label="Load" value={column.items.length * 28} showValue />
          </Card>
        ))}
      </div>
      <div className="grid-2" style={{ marginTop: '0.85rem' }}>
        <Card header="This week’s interviews">
          {interviews.map((item) => (
            <div key={item.name} className="member">
              <div>
                <strong>{item.name}</strong>
                <div className="muted">{item.role} · {item.with}</div>
              </div>
              <span className="muted">{item.when}</span>
            </div>
          ))}
        </Card>
        <Card header="Stage SLAs">
          {sla.map((item) => (
            <div key={item.label} className="score-row">
              <span className="muted">{item.label}</span>
              <Meter value={item.value} showValue />
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
