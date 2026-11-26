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
    path: 'agents',
    loadComponent: () => import('./pages/agents/agents.component').then((m) => m.AgentsComponent),
    title: 'Agents',
    data: { heading: 'Agents' },
  },
  {
    path: 'tools',
    loadComponent: () => import('./pages/tools/tools.component').then((m) => m.ToolsComponent),
    title: 'Tools',
    data: { heading: 'Tools' },
  },
  {
    path: 'deployments',
    loadComponent: () =>
      import('./pages/deployments/deployments.component').then((m) => m.DeploymentsComponent),
    title: 'Deployments',
    data: { heading: 'Deployments' },
  },
  { path: '**', redirectTo: '' },
];