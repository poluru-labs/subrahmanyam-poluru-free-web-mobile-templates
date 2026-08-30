import { useState } from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  DescriptionList,
  FileUpload,
  Link,
  ProgressBar,
  Rating,
  Status,
  Tab,
  Tabs,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { candidates, findJob, statusTone, timeline } from '../data';

export default function JobDetail({ routeId }) {
  const job = findJob(routeId);
  const [rating, setRating] = useState(job.featured ? 5 : 3);
  const related = candidates.filter((item) => item.role === job.title).slice(0, 4);

  return (
    <>
      <Breadcrumb items={[{ label: 'Jobs', href: '#/jobs' }, { label: job.title }]} />
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Role</span>
          <h1>{job.title}</h1>
          <p>{job.owner} · {job.company} · {job.applicants} applicants</p>
        </div>
        <div className="row">
          <Status label={job.status} variant={statusTone(job.status)} pulse={job.status === 'Review'} />
          {job.featured ? <Badge label="Featured" variant="brand" pill /> : null}
        </div>
      </header>
      <div className="grid-2">
        <div className="stack">
          <Card header="Demand">
            <div className="row" style={{ alignItems: 'center' }}>
              <CircularProgress value={Math.min(100, job.applicants)} showValue />
              <ProgressBar label="Applicant load" value={Math.min(100, job.applicants)} showValue />
            </div>
            <DescriptionList
              compact
              items={[
                { term: 'Owner', description: job.owner },
                { term: 'Employer', description: job.company },
                { term: 'Department', description: job.dept },
                { term: 'Location', description: job.location },
                { term: 'Salary', description: job.salary },
              ]}
            />
            <div className="row" style={{ marginTop: '0.85rem' }}>
              <span className="muted">Hiring confidence</span>
              <Rating value={rating} onChange={setRating} />
            </div>
            <ButtonGroup size="sm" className="mt-3">
              <Button variant="secondary" icon="refresh" onClick={() => showToast({ title: 'Reopened', description: `${job.title} is back with ${job.owner}.`, variant: 'info' })}>Reopen</Button>
              <Button variant="tertiary" icon="star" onClick={() => showToast({ title: 'Featured', description: `${job.title} is pinned for Kavya Poluru.`, variant: 'success' })}>Feature</Button>
            </ButtonGroup>
          </Card>
          <Card header="Candidates">
            {related.length ? related.map((item) => (
              <a key={item.id} className="member" href="#/candidates">
                <strong>{item.name}</strong>
                <span className="muted">{item.stage} · {item.score}</span>
              </a>
            )) : <p className="note">No applicants yet. Ramesh Poluru’s draft is still quiet.</p>}
            <Link href="#/candidates">Open candidate pool</Link>
          </Card>
        </div>
        <Card header="Workspace">
          <Tabs className="raja-tabs">
            <Tab label="History">
              <Timeline items={timeline} />
            </Tab>
            <Tab label="Brief">
              <p className="note">{job.owner} is hiring {job.title} for {job.company}. Keep the loop on Poluru Cloud.</p>
              <div style={{ marginTop: '0.55rem' }}>
                <Tag label={job.dept} variant="brand" />
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <FileUpload label="Attach scorecard" hint="pdf or docx" />
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </>
  );
}
