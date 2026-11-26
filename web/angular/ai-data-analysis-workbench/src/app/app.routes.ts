import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'datasets', loadComponent: () => import('./pages/datasets/datasets.component').then((m) => m.DatasetsComponent), title: 'Datasets', data: { heading: 'Datasets' } },
  { path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then((m) => m.ReportsComponent), title: 'Reports', data: { heading: 'Reports' } },
  { path: 'notebooks', loadComponent: () => import('./pages/notebooks/notebooks.component').then((m) => m.NotebooksComponent), title: 'Notebooks', data: { heading: 'Notebooks' } },
  { path: '**', redirectTo: '' },
];