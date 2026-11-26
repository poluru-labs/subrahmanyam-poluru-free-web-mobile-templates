import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'queue', loadComponent: () => import('./pages/queue/queue.component').then((m) => m.QueueComponent), title: 'Queue', data: { heading: 'Queue' } },
  { path: 'presets', loadComponent: () => import('./pages/presets/presets.component').then((m) => m.PresetsComponent), title: 'Presets', data: { heading: 'Presets' } },
  { path: 'exports', loadComponent: () => import('./pages/exports/exports.component').then((m) => m.ExportsComponent), title: 'Exports', data: { heading: 'Exports' } },
  { path: '**', redirectTo: '' },
];
