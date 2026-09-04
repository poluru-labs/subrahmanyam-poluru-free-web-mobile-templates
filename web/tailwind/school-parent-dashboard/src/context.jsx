import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { children as allChildren, feeAccount, seedMessages, seedNotifications } from './data';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [selectedChildId, setSelectedChildId] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(seedMessages);
  const [notifications, setNotifications] = useState(seedNotifications);
  const [paid, setPaid] = useState(false);

  const selectedChild = allChildren.find((child) => child.id === selectedChildId) ?? null;

  const visibleChildren = selectedChild ? [selectedChild] : allChildren;

  const filterByChild = useCallback(
    (item) => selectedChildId === 'all' || !item.childId || item.childId === selectedChildId,
    [selectedChildId],
  );

  const unreadMessages = useMemo(
    () => messages.filter((message) => !message.read && filterByChild(message)),
    [messages, filterByChild],
  );

  const unreadNotifications = notifications.filter((item) => !item.read);

  const attendancePct = useMemo(() => {
    const list = visibleChildren;
    const sum = list.reduce((total, child) => total + child.attendancePct, 0);
    return Number((sum / list.length).toFixed(1));
  }, [visibleChildren]);

  const toggleChild = (id) => {
    setSelectedChildId((current) => (current === id ? 'all' : id));
  };

  const markMessageRead = (id) => {
    setMessages((list) => list.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((list) => list.map((item) => ({ ...item, read: true })));
  };

  const value = {
    selectedChildId,
    setSelectedChildId,
    selectedChild,
    visibleChildren,
    toggleChild,
    filterByChild,
    sidebarOpen,
    setSidebarOpen,
    messages,
    unreadMessages,
    markMessageRead,
    notifications,
    unreadNotifications,
    markAllNotificationsRead,
    paid,
    setPaid,
    outstanding: paid ? 0 : feeAccount.outstanding,
    attendancePct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
