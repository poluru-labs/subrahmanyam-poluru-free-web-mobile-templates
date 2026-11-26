import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'sessions', loadComponent: () => import('./pages/sessions/sessions.component').then((m) => m.SessionsComponent), title: 'Sessions', data: { heading: 'Sessions' } },
  { path: 'scripts', loadComponent: () => import('./pages/scripts/scripts.component').then((m) => m.ScriptsComponent), title: 'Scripts', data: { heading: 'Scripts' } },
  { path: 'delivery', loadComponent: () => import('./pages/delivery/delivery.component').then((m) => m.DeliveryComponent), title: 'Delivery', data: { heading: 'Delivery' } },
  { path: '**', redirectTo: '' },
];
