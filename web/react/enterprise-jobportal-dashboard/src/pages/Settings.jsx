import { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  Checkbox,
  CodeSnippet,
  Combobox,
  DateRangePicker,
  FileUpload,
  Input,
  PinInput,
  RadioGroup,
  Slider,
  Switch,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { currentUser, employerOptions, ownerOptions, team, webhookSnippet } from '../data';

export default function Settings() {
  const [digest, setDigest] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [compact, setCompact] = useState(false);
  const [density, setDensity] = useState('comfortable');
  const [pin, setPin] = useState('');
  const [sla, setSla] = useState(48);
  const [name, setName] = useState(currentUser.name);
  const [owner, setOwner] = useState('Kavya Poluru');
  const [employer, setEmployer] = useState('e1');
  const [digestAt, setDigestAt] = useState('09:00');
  const [start, setStart] = useState('2026-08-01');
  const [end, setEnd] = useState('2026-08-29');

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Workspace</span>
          <h1>Settings</h1>
          <p>Kavya Poluru’s Jobs Raja defaults</p>
        </div>
      </header>
      <div className="grid-2">
        <div className="stack">
          <Card header="Profile">
            <div className="stack">
              <Input label="Display name" value={name} onChange={(event) => setName(event.target.value)} />
              <Autocomplete label="Default owner" value={owner} suggestions={ownerOptions.map((item) => item.label)} onChange={setOwner} />
              <Combobox label="Home employer" value={employer} options={employerOptions} onChange={setEmployer} />
              <FileUpload label="Avatar" accept="image/*" hint="Square PNG" />
            </div>
          </Card>
          <Card header="Alerts">
            <div className="stack">
              <Switch label="Daily digest to kavya.poluru@polurulabs.example" checked={digest} onChange={(_, checked) => setDigest(checked)} />
              {digest ? <TimePicker label="Digest time" value={digestAt} onChange={(_, value) => setDigestAt(value)} /> : null}
              <Switch label="Auto-approve verified employers" checked={autoApprove} onChange={(_, checked) => setAutoApprove(checked)} />
              <Checkbox label="Compact tables on reports" checked={compact} onChange={(_, checked) => setCompact(checked)} />
              <RadioGroup
                label="Density"
                orientation="horizontal"
                value={density}
                onChange={(_, value) => setDensity(value)}
                options={[
                  { value: 'comfortable', label: 'Comfortable' },
                  { value: 'compact', label: 'Compact' },
                ]}
              />
              <DateRangePicker label="Reporting window" startValue={start} endValue={end} onChange={(nextStart, nextEnd) => { setStart(nextStart); setEnd(nextEnd); }} />
              <Button onClick={() => showToast({ title: 'Saved', description: `Workspace defaults update at ${digestAt}.`, variant: 'success' })}>Save changes</Button>
            </div>
          </Card>
        </div>
        <div className="stack">
          <Card header="Security">
            <PinInput label="Workspace PIN" length={4} type="password" value={pin} onChange={setPin} />
            <Slider className="mt-3" label="Review SLA (hours)" min={12} max={72} value={sla} showValue onChange={(_, value) => setSla(value)} />
          </Card>
          <Card header="Team">
            {team.map((member) => (
              <div key={member.name} className="member">
                <div className="row">
                  <Avatar name={member.name} size="sm" />
                  <strong>{member.name}</strong>
                </div>
                <span className="muted">{member.role}</span>
              </div>
            ))}
            <Button size="sm" variant="secondary" icon="user" onClick={() => showToast({ title: 'Invite sent', description: 'Rohan Poluru can join as viewer.', variant: 'info' })}>Invite</Button>
          </Card>
          <Card header="CLI ingest" footer={<span className="note">Use Kavya Poluru’s key in staging only.</span>}>
            <CodeSnippet code={webhookSnippet} language="bash" onCopy={() => showToast({ title: 'Copied', description: 'Jobs Raja post command is on the clipboard.', variant: 'info' })} />
          </Card>
        </div>
      </div>
    </>
  );
}
