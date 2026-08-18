import { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Select,
  Switch,
  useTheme,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import {
  clearSettings,
  defaultSettings,
  loadSettings,
  saveSettings,
  type WorkspaceSettings,
} from '../utils/settings';
import './pages.scss';

export function SettingsPage() {
  const { show } = useToast();
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<WorkspaceSettings>(() => loadSettings());

  const update = <K extends keyof WorkspaceSettings>(
    key: K,
    value: WorkspaceSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveSettings(settings);
    show({ title: 'Settings saved', variant: 'success' });
  };

  const handleReset = () => {
    clearSettings();
    setSettings({ ...defaultSettings });
    show({ title: 'Settings reset to defaults', variant: 'info' });
  };

  return (
    <div className="page">
      <p className="page-lead">
        Notification preferences and operational defaults for your data center workspace.
        Changes persist in this browser.
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
            <Input
              label="Workspace name"
              value={settings.workspaceName}
              onChange={(event) => update('workspaceName', event.target.value)}
            />
            <Select
              label="Primary region"
              value={settings.primaryRegion}
              onChange={(event) => update('primaryRegion', event.target.value)}
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
              value={settings.opsEmail}
              onChange={(event) => update('opsEmail', event.target.value)}
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
              checked={settings.emailAlerts}
              onChange={(_e, checked) => update('emailAlerts', checked)}
            />
            <Switch
              label="SMS for P1 incidents"
              checked={settings.smsAlerts}
              onChange={(_e, checked) => update('smsAlerts', checked)}
            />
            <Switch
              label="Auto-acknowledge info alerts"
              checked={settings.autoAck}
              onChange={(_e, checked) => update('autoAck', checked)}
            />
            <Switch
              label="Dark theme"
              checked={theme === 'dark'}
              onChange={(_e, checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </Card>
      </div>

      <div className="settings-actions">
        <Button variant="primary" icon="save" onClick={handleSave}>
          Save changes
        </Button>
        <Button variant="tertiary" onClick={handleReset}>
          Reset defaults
        </Button>
      </div>
    </div>
  );
}
