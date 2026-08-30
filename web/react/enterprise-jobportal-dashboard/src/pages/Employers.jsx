import { Badge, Card, CircularProgress, Meter, ProgressBar, Status, TreeView } from '@poluru-labs/enterprise-design-system-react';
import { departmentTree, employers, recruiters } from '../data';

export default function Employers() {
  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Companies</span>
          <h1>Employers</h1>
          <p>Verified seats stay with Kavya Poluru</p>
        </div>
      </header>
      <div className="grid-2">
        <div className="stack">
          {employers.map((item) => (
            <Card key={item.id} header={item.name}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <Status label={item.verified ? 'Verified' : 'Review'} variant={item.verified ? 'success' : 'warning'} />
                <Badge label={item.plan} variant="brand" pill />
              </div>
              <p className="note">{item.roles} open roles · {item.owner}</p>
              <div className="row" style={{ marginTop: '0.65rem', alignItems: 'center' }}>
                <CircularProgress value={item.fill} size={48} showValue />
                <ProgressBar label="Fill rate" value={item.fill} showValue />
              </div>
              <Meter className="mt-3" label="Seat health" value={item.fill} showValue />
            </Card>
          ))}
        </div>
        <div className="stack">
          <Card header="Departments">
            <TreeView items={departmentTree} />
            <p className="note">Holdout reqs stay with Kavya Poluru. Recruiters never post to gold packs.</p>
          </Card>
          <Card header="Assigned recruiters">
            {recruiters.map((item) => (
              <div key={item.name} className="member">
                <div>
                  <strong>{item.name}</strong>
                  <div className="muted">{item.specialty} · {item.reqs} open reqs</div>
                </div>
                <Meter value={item.load} max={24} showValue />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}
