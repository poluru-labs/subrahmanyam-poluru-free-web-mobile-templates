import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  inventoryAlerts as seedAlerts,
  seedOrders,
  type InventoryAlert,
  type Order,
  type OrderStatus,
} from '../data/mock';

type CommerceContextValue = {
  orders: Order[];
  alerts: InventoryAlert[];
  dismissedAlertIds: Set<string>;
  openAlerts: InventoryAlert[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  dismissAlert: (id: string) => void;
  dismissAllAlerts: () => void;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState(seedOrders);
  const [alerts] = useState(seedAlerts);
  const [dismissedAlertIds, setDismissedAlertIds] = useState<Set<string>>(
    () => new Set(),
  );

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  const dismissAlert = (id: string) => {
    setDismissedAlertIds((prev) => new Set(prev).add(id));
  };

  const dismissAllAlerts = () => {
    setDismissedAlertIds(new Set(alerts.map((a) => a.id)));
  };

  const openAlerts = alerts.filter((a) => !dismissedAlertIds.has(a.id));

  return (
    <CommerceContext.Provider
      value={{
        orders,
        alerts,
        dismissedAlertIds,
        openAlerts,
        updateOrderStatus,
        dismissAlert,
        dismissAllAlerts,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const ctx = useContext(CommerceContext);
  if (!ctx) {
    throw new Error('useCommerce must be used within CommerceProvider');
  }
  return ctx;
}
