const KEY = 'wealthtrack-settings-v1';

export type AppSettings = {
  displayName: string;
  email: string;
  currency: string;
  compactNumbers: boolean;
  emailAlerts: boolean;
  budgetAlerts: boolean;
};

export const defaultSettings: AppSettings = {
  displayName: 'Arjun Poluru',
  email: 'mail.polurus@gmail.com',
  currency: 'USD',
  compactNumbers: false,
  emailAlerts: true,
  budgetAlerts: true,
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultSettings };
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(KEY, JSON.stringify(settings));
}

export function clearSettings() {
  localStorage.removeItem(KEY);
}
