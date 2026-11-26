import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'plans', loadComponent: () => import('./pages/plans/plans.component').then((m) => m.PlansComponent), title: 'Plans', data: { heading: 'Plans' } },
  { path: 'milestones', loadComponent: () => import('./pages/milestones/milestones.component').then((m) => m.MilestonesComponent), title: 'Milestones', data: { heading: 'Milestones' } },
  { path: 'calendar', loadComponent: () => import('./pages/calendar/calendar.component').then((m) => m.CalendarComponent), title: 'Calendar', data: { heading: 'Calendar' } },
  { path: '**', redirectTo: '' },
];
