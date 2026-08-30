import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  Card,
  CircularProgress,
  List,
  Meter,
  ProgressBar,
  SegmentedControl,
  Skeleton,
  Stat,
  Status,
  Tab,
  Tabs,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import {
  alerts,
  applySeries,
  candidates,
  channels,
  employers,
  funnel,
  interviews,
  kpis,
  notifications,
  recentApplications,
  recruiters,
  sla,
  sparkPoints,
  statusTone,
  timeline,
} from '../data';

export default function Overview({ onPost }) {
  const [range, setRange] = useState('week');
  const [refreshing, setRefreshing] = useState(false);
  const spark = sparkPoints(applySeries);
  const last = spark.split(' ').at(-1)?.split(',') || ['220', '8'];
  const hot = candidates.filter((item) => item.stage === 'Interview' || item.stage === 'Offer');

  function refresh() {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 420);
  }

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Workspace</span>
          <h1>Overview</h1>
          <p>FY26 Q3 · Kavya Poluru · 257 open roles</p>
        </div>
        <div className="row">
          <SegmentedControl
            value={range}
            onChange={setRange}
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
          />
          <Button variant="secondary" size="sm" icon="refresh" onClick={refresh}>Refresh</Button>
          <Button icon="plus" onClick={onPost}>Post job</Button>
        </div>
      </header>

      <Alert
        variant="warning"
        title="Northwind PM is pending review"
        message="Venkata Poluru requested a hiring-manager pass before the Senior Product Manager goes live."
      />

      {refreshing ? (
        <section className="metrics" aria-label="Loading metrics">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} elevated>
              <Skeleton lines={3} />
            </Card>
          ))}
        </section>
      ) : (
        <section className="metrics" aria-label="Key metrics">
          {kpis.map((item) => (
            <Card key={item.label} elevated>
              <Stat label={item.label} value={item.value} hint={item.hint} trend={item.trend} trendValue={item.trendValue} />
            </Card>
          ))}
        </section>
      )}

      <div className="grid-2">
        <div className="stack">
          <Card header={<div><h2 className="h6 mb-0">Inbound applications</h2><p className="note">Last 12 days · Jobs Raja marketplace</p></div>}>
            <svg className="spark" viewBox="0 0 220 56" aria-hidden="true">
              <polyline points={spark} />
              <circle cx={last[0]} cy={last[1]} r="3.5" />
            </svg>
            <ProgressBar label="Weekly target 2,000" value={93} showValue />
            <Meter className="mt-3" label="Interview show-up" value={92} showValue />
          </Card>
          <Card header={<div><h2 className="h6 mb-0">Recent applications</h2><p className="note">Newest inbound across Poluru Labs and partners</p></div>}>
            <div className="table-wrap">
              <table className="mini-table">
                <thead>
                  <tr><th>Candidate</th><th>Role</th><th>Stage</th><th>When</th></tr>
                </thead>
                <tbody>
                  {recentApplications.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.name}</strong>
                        <div className="muted">{item.company}</div>
                      </td>
                      <td>{item.role}</td>
                      <td><Status label={item.stage} variant={statusTone(item.stage)} /></td>
                      <td className="muted">{item.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card header="Needs attention">
            <div className="stack">
              {hot.map((item) => (
                <a key={item.id} className="run-card" href="#/candidates">
                  <strong>{item.name}</strong>
                  <span className="muted">{item.role} · {item.stage} · {item.score}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
        <div className="stack">
          <Card header="Hiring coach">
            <Tabs className="raja-tabs">
              <Tab label="Alerts">
                <Accordion>
                  {alerts.map((item) => (
                    <AccordionItem key={item.heading} heading={item.heading}>{item.children}</AccordionItem>
                  ))}
                </Accordion>
              </Tab>
              <Tab label="Motion">
                <Timeline items={timeline} />
              </Tab>
              <Tab label="Inbox">
                <List items={notifications} divided />
              </Tab>
            </Tabs>
          </Card>
          <Card header="Funnel">
            <div className="row" style={{ justifyContent: 'space-around', padding: '0.4rem 0' }}>
              {funnel.slice(0, 3).map((item) => (
                <div key={item.label} style={{ textAlign: 'center' }}>
                  <CircularProgress value={Math.round((item.value / funnel[0].value) * 100)} showValue />
                  <div className="muted">{item.label}</div>
                </div>
              ))}
            </div>
            {funnel.slice(3).map((item) => (
              <div key={item.label} className="score-row">
                <span className="muted">{item.label}</span>
                <ProgressBar value={item.value} max={funnel[0].value} />
                <span>{item.value}</span>
              </div>
            ))}
            <div style={{ marginTop: '0.85rem' }}>
              <Status label="Kavya Poluru watching Northwind" variant="warning" pulse />
            </div>
          </Card>
          <Card header="Upcoming interviews">
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
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '0.85rem' }}>
        <Card header="Source mix">
          {channels.map((item) => (
            <div key={item.label} className="channel-row">
              <span>{item.label}</span>
              <ProgressBar value={item.share} max={50} />
              <span>{item.share}%</span>
            </div>
          ))}
        </Card>
        <Card header="Recruiter load">
          {recruiters.map((item) => (
            <div key={item.name} className="member">
              <div>
                <strong>{item.name}</strong>
                <div className="muted">{item.specialty} · {item.reqs} reqs</div>
              </div>
              <Meter value={item.load} max={24} showValue />
            </div>
          ))}
        </Card>
      </div>

      <div className="grid-3" style={{ marginTop: '0.85rem' }}>
        {sla.map((item) => (
          <Card key={item.label} elevated>
            <Stat label={item.label} value={`${item.value}%`} hint="On-time this week" />
            <ProgressBar className="mt-3" value={item.value} showValue />
          </Card>
        ))}
        <Card header="Top employers">
          {employers.slice(0, 3).map((item) => (
            <a key={item.id} className="member" href="#/employers">
              <strong>{item.name}</strong>
              <span className="muted">{item.roles} roles · {item.owner}</span>
            </a>
          ))}
        </Card>
      </div>
    </>
  );
}
