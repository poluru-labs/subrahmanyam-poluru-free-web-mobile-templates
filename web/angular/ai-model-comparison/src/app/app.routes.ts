import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'models', loadComponent: () => import('./pages/models/models.component').then((m) => m.ModelsComponent), title: 'Models', data: { heading: 'Models' } },
  { path: 'benchmarks', loadComponent: () => import('./pages/benchmarks/benchmarks.component').then((m) => m.BenchmarksComponent), title: 'Benchmarks', data: { heading: 'Benchmarks' } },
  { path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then((m) => m.ReportsComponent), title: 'Reports', data: { heading: 'Reports' } },
  { path: '**', redirectTo: '' },
];
