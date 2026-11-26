import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'queries', loadComponent: () => import('./pages/queries/queries.component').then((m) => m.QueriesComponent), title: 'Queries', data: { heading: 'Queries' } },
  { path: 'indexes', loadComponent: () => import('./pages/indexes/indexes.component').then((m) => m.IndexesComponent), title: 'Indexes', data: { heading: 'Indexes' } },
  { path: 'quality', loadComponent: () => import('./pages/quality/quality.component').then((m) => m.QualityComponent), title: 'Quality', data: { heading: 'Quality' } },
  { path: '**', redirectTo: '' },
];
