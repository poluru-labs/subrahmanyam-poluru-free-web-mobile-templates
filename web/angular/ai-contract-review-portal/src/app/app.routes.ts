import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent),
    title: 'Overview',
    data: { heading: 'Overview' },
  },
  {
    path: 'contracts',
    loadComponent: () => import('./pages/contracts/contracts.component').then((m) => m.ContractsComponent),
    title: 'Contracts',
    data: { heading: 'Contracts' },
  },
  {
    path: 'clauses',
    loadComponent: () => import('./pages/clauses/clauses.component').then((m) => m.ClausesComponent),
    title: 'Clauses',
    data: { heading: 'Clauses' },
  },
  {
    path: 'playbook',
    loadComponent: () => import('./pages/playbook/playbook.component').then((m) => m.PlaybookComponent),
    title: 'Playbook',
    data: { heading: 'Playbook' },
  },
  { path: '**', redirectTo: '' },
];