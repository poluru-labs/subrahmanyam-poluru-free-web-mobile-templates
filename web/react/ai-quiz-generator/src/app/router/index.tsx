import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { ChatPage } from '@/features/chat'
import { DashboardPage } from '@/features/dashboard'
import { SettingsPage } from '@/features/settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
