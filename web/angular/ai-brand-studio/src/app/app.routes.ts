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
    path: 'assets',
    loadComponent: () => import('./pages/assets/assets.component').then((m) => m.AssetsComponent),
    title: 'Assets',
    data: { heading: 'Assets' },
  },
  {
    path: 'guidelines',
    loadComponent: () =>
      import('./pages/guidelines/guidelines.component').then((m) => m.GuidelinesComponent),
    title: 'Guidelines',
    data: { heading: 'Guidelines' },
  },
  {
    path: 'approvals',
    loadComponent: () =>
      import('./pages/approvals/approvals.component').then((m) => m.ApprovalsComponent),
    title: 'Approvals',
    data: { heading: 'Approvals' },
  },
  { path: '**', redirectTo: '' },
];