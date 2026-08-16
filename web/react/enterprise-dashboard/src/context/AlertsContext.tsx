import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { alerts as seedAlerts, type AlertItem } from '../data/mock';

type AlertsContextValue = {
  alerts: AlertItem[];
  acknowledgedIds: Set<string>;
  openAlerts: AlertItem[];
  criticalCount: number;
  acknowledge: (id: string) => void;
  acknowledgeAll: () => void;
};

const AlertsContext = createContext<AlertsContextValue | null>(null);

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts] = useState(seedAlerts);
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(
    () => new Set(),
  );

  const acknowledge = (id: string) => {
    setAcknowledgedIds((prev) => new Set(prev).add(id));
  };

  const acknowledgeAll = () => {
    setAcknowledgedIds(new Set(alerts.map((a) => a.id)));
  };

  const openAlerts = alerts.filter((a) => !acknowledgedIds.has(a.id));
  const criticalCount = openAlerts.filter((a) => a.severity === 'critical').length;

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        acknowledgedIds,
        openAlerts,
        criticalCount,
        acknowledge,
        acknowledgeAll,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const ctx = useContext(AlertsContext);
  if (!ctx) {
    throw new Error('useAlerts must be used within AlertsProvider');
  }
  return ctx;
}
