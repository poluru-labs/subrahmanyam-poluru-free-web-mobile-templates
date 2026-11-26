import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'incidents', loadComponent: () => import('./pages/incidents/incidents.component').then((m) => m.IncidentsComponent), title: 'Incidents', data: { heading: 'Incidents' } },
  { path: 'on-call', loadComponent: () => import('./pages/on-call/on-call.component').then((m) => m.OnCallComponent), title: 'On-call', data: { heading: 'On-call' } },
  { path: 'postmortems', loadComponent: () => import('./pages/postmortems/postmortems.component').then((m) => m.PostmortemsComponent), title: 'Postmortems', data: { heading: 'Postmortems' } },
  { path: '**', redirectTo: '' },
];
