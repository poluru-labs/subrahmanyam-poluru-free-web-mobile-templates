import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'drafts', loadComponent: () => import('./pages/drafts/drafts.component').then((m) => m.DraftsComponent), title: 'Drafts', data: { heading: 'Drafts' } },
  { path: 'calendar', loadComponent: () => import('./pages/calendar/calendar.component').then((m) => m.CalendarComponent), title: 'Calendar', data: { heading: 'Calendar' } },
  { path: 'style-guide', loadComponent: () => import('./pages/style-guide/style-guide.component').then((m) => m.StyleGuideComponent), title: 'Style guide', data: { heading: 'Style guide' } },
  { path: '**', redirectTo: '' },
];
