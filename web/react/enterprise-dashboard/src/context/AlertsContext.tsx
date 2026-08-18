import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { alerts as seedAlerts, type AlertItem } from '../data/mock';

const ACK_KEY = 'poluru-dc-ack-alerts-v1';

type AlertsContextValue = {
  alerts: AlertItem[];
  acknowledgedIds: Set<string>;
  openAlerts: AlertItem[];
  criticalCount: number;
  acknowledge: (id: string) => void;
  acknowledgeAll: () => void;
  resetAcknowledgements: () => void;
};

const AlertsContext = createContext<AlertsContextValue | null>(null);

function readAckIds(): Set<string> {
  try {
    const raw = localStorage.getItem(ACK_KEY);
    if (!raw) return new Set();
    const ids = JSON.parse(raw) as string[];
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
}

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts] = useState(seedAlerts);
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(readAckIds);

  useEffect(() => {
    localStorage.setItem(ACK_KEY, JSON.stringify([...acknowledgedIds]));
  }, [acknowledgedIds]);

  const acknowledge = (id: string) => {
    setAcknowledgedIds((prev) => new Set(prev).add(id));
  };

  const acknowledgeAll = () => {
    setAcknowledgedIds(new Set(alerts.map((a) => a.id)));
  };

  const resetAcknowledgements = () => {
    setAcknowledgedIds(new Set());
    localStorage.removeItem(ACK_KEY);
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
        resetAcknowledgements,
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
