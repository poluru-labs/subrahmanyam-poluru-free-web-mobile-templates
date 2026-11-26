import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'tickets', loadComponent: () => import('./pages/tickets/tickets.component').then((m) => m.TicketsComponent), title: 'Tickets', data: { heading: 'Tickets' } },
  { path: 'teams', loadComponent: () => import('./pages/teams/teams.component').then((m) => m.TeamsComponent), title: 'Teams', data: { heading: 'Teams' } },
  { path: 'satisfaction', loadComponent: () => import('./pages/satisfaction/satisfaction.component').then((m) => m.SatisfactionComponent), title: 'Satisfaction', data: { heading: 'Satisfaction' } },
  { path: '**', redirectTo: '' },
];