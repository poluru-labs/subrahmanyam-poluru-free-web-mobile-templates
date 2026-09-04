import { createContext, useContext, useState } from 'react';
import { notifications } from './data';

const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState(notifications);
  const unreadNotifications = notes.filter((item) => !item.read);
  const markAllNotificationsRead = () => setNotes((items) => items.map((item) => ({ ...item, read: true })));
  return <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, notifications: notes, unreadNotifications, markAllNotificationsRead }}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
