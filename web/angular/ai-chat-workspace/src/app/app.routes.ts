import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent),
    title: 'Overview',
    data: { heading: 'Overview' },
  },
  {
    path: 'threads',
    loadComponent: () => import('./pages/threads/threads.component').then((m) => m.ThreadsComponent),
    title: 'Threads',
    data: { heading: 'Threads' },
  },
  {
    path: 'inbox',
    loadComponent: () => import('./pages/inbox/inbox.component').then((m) => m.InboxComponent),
    title: 'Inbox',
    data: { heading: 'Inbox' },
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
    title: 'Settings',
    data: { heading: 'Settings' },
  },
  { path: '**', redirectTo: '' },
];