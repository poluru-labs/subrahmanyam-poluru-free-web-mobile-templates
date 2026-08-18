const SETTINGS_KEY = 'poluru-dc-settings-v1';

export type WorkspaceSettings = {
  workspaceName: string;
  primaryRegion: string;
  opsEmail: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
  autoAck: boolean;
};

export const defaultSettings: WorkspaceSettings = {
  workspaceName: 'Poluru Data Centers',
  primaryRegion: 'us-central',
  opsEmail: 'ops@polurulabs.com',
  emailAlerts: true,
  smsAlerts: false,
  autoAck: false,
};

export function loadSettings(): WorkspaceSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...defaultSettings };
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings: WorkspaceSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function clearSettings() {
  localStorage.removeItem(SETTINGS_KEY);
}
