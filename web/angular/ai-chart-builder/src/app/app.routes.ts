import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/overview/overview.component').then((m) => m.OverviewComponent),
    title: 'Overview',
    data: { heading: 'Overview' },
  },
  {
    path: 'charts',
    loadComponent: () => import('./pages/charts/charts.component').then((m) => m.ChartsComponent),
    title: 'Charts',
    data: { heading: 'Charts' },
  },
  {
    path: 'datasets',
    loadComponent: () =>
      import('./pages/datasets/datasets.component').then((m) => m.DatasetsComponent),
    title: 'Datasets',
    data: { heading: 'Datasets' },
  },
  {
    path: 'sharing',
    loadComponent: () => import('./pages/sharing/sharing.component').then((m) => m.SharingComponent),
    title: 'Sharing',
    data: { heading: 'Sharing' },
  },
  { path: '**', redirectTo: '' },
];