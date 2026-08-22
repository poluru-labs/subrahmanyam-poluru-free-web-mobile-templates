import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useToast } from '../context/ToastContext';
import {
  clearSettings,
  defaultSettings,
  loadSettings,
  saveSettings,
  type AppSettings,
} from '../utils/settings';
import './pages.scss';

export function SettingsPage() {
  const { show } = useToast();
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());

  const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="page">
      <PageHeader
        title="Settings"
        lead="Profile defaults and alert preferences. Saved to localStorage."
      />

      <div className="settings-grid">
        <article className="wt-card">
          <h2 className="card-title">Profile</h2>
          <div className="form-stack">
            <div>
              <label className="form-label fw-semibold" htmlFor="displayName">
                Display name
              </label>
              <input
                id="displayName"
                className="form-control"
                value={settings.displayName}
                onChange={(e) => update('displayName', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label fw-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={settings.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label fw-semibold" htmlFor="currency">
                Currency
              </label>
              <select
                id="currency"
                className="form-select"
                value={settings.currency}
                onChange={(e) => update('currency', e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </article>

        <article className="wt-card">
          <h2 className="card-title">Preferences</h2>
          <div className="form-stack">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="compactNumbers"
                checked={settings.compactNumbers}
                onChange={(e) => update('compactNumbers', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="compactNumbers">
                Compact number formatting
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="emailAlerts"
                checked={settings.emailAlerts}
                onChange={(e) => update('emailAlerts', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="emailAlerts">
                Email sync &amp; dividend alerts
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="budgetAlerts"
                checked={settings.budgetAlerts}
                onChange={(e) => update('budgetAlerts', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="budgetAlerts">
                Budget overrun alerts
              </label>
            </div>
          </div>
        </article>
      </div>

      <div className="page-actions mt-3">
        <button
          type="button"
          className="btn btn-wt-primary"
          onClick={() => {
            saveSettings(settings);
            show({ title: 'Settings saved', variant: 'success' });
          }}
        >
          Save changes
        </button>
        <button
          type="button"
          className="btn btn-wt-ghost"
          onClick={() => {
            clearSettings();
            setSettings({ ...defaultSettings });
            show({ title: 'Defaults restored', variant: 'info' });
          }}
        >
          Reset defaults
        </button>
      </div>
    </div>
  );
}
