import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'calendar', loadComponent: () => import('./pages/calendar/calendar.component').then((m) => m.CalendarComponent), title: 'Calendar', data: { heading: 'Calendar' } },
  { path: 'channels', loadComponent: () => import('./pages/channels/channels.component').then((m) => m.ChannelsComponent), title: 'Channels', data: { heading: 'Channels' } },
  { path: 'analytics', loadComponent: () => import('./pages/analytics/analytics.component').then((m) => m.AnalyticsComponent), title: 'Analytics', data: { heading: 'Analytics' } },
  { path: '**', redirectTo: '' },
];
