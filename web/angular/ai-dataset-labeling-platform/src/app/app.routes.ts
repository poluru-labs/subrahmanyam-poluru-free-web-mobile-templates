import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'datasets', loadComponent: () => import('./pages/datasets/datasets.component').then((m) => m.DatasetsComponent), title: 'Datasets', data: { heading: 'Datasets' } },
  { path: 'queue', loadComponent: () => import('./pages/queue/queue.component').then((m) => m.QueueComponent), title: 'Queue', data: { heading: 'Queue' } },
  { path: 'quality', loadComponent: () => import('./pages/quality/quality.component').then((m) => m.QualityComponent), title: 'Quality', data: { heading: 'Quality' } },
  { path: '**', redirectTo: '' },
];
