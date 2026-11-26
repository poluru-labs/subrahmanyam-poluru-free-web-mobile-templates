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
    path: 'findings',
    loadComponent: () =>
      import('./pages/findings/findings.component').then((m) => m.FindingsComponent),
    title: 'Findings',
    data: { heading: 'Findings' },
  },
  {
    path: 'pages',
    loadComponent: () =>
      import('./pages/page-inventory/page-inventory.component').then((m) => m.PageInventoryComponent),
    title: 'Pages',
    data: { heading: 'Pages' },
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.component').then((m) => m.ReportsComponent),
    title: 'Reports',
    data: { heading: 'Reports' },
  },
  { path: '**', redirectTo: '' },
];