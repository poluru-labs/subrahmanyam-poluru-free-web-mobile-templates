export const ROUTES = {
  home: '/',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Product snapshot' },
  { label: 'Tutor chat', to: ROUTES.chat, description: 'Primary workspace' },
  { label: 'Tutors', to: ROUTES.agents, description: 'Specialized agents' },
  { label: 'Settings', to: ROUTES.settings, description: 'Theme and workspace' },
] as const
