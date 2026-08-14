import { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Select,
  Switch,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import './pages.scss';

export function SettingsPage() {
  const { show } = useToast();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [autoAck, setAutoAck] = useState(false);

  const handleSave = () => {
    show({ title: 'Settings saved', variant: 'success' });
  };

  return (
    <div className="page">
      <p className="page-lead">
        Notification preferences and operational defaults for your data center workspace.
      </p>

      <div className="settings-grid stagger">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Organization</h2>
            </div>
          }
        >
          <div className="form-stack">
            <Input label="Workspace name" defaultValue="Poluru Data Centers" />
            <Select
              label="Primary region"
              defaultValue="us-central"
              options={[
                { label: 'US Central', value: 'us-central' },
                { label: 'US East', value: 'us-east' },
                { label: 'US West', value: 'us-west' },
                { label: 'US South', value: 'us-south' },
              ]}
            />
            <Input
              label="Ops contact email"
              type="email"
              defaultValue="ops@polurulabs.com"
            />
          </div>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Alerting</h2>
            </div>
          }
        >
          <div className="form-stack">
            <Switch
              label="Email critical alerts"
              checked={emailAlerts}
              onChange={(_e, checked) => setEmailAlerts(checked)}
            />
            <Switch
              label="SMS for P1 incidents"
              checked={smsAlerts}
              onChange={(_e, checked) => setSmsAlerts(checked)}
            />
            <Switch
              label="Auto-acknowledge info alerts"
              checked={autoAck}
              onChange={(_e, checked) => setAutoAck(checked)}
            />
          </div>
        </Card>
      </div>

      <div className="settings-actions">
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
        <Button variant="tertiary">Cancel</Button>
      </div>
    </div>
  );
}
