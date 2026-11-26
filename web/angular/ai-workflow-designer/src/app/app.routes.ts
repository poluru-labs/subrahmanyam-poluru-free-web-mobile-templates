import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'workflows', loadComponent: () => import('./pages/workflows/workflows.component').then((m) => m.WorkflowsComponent), title: 'Workflows', data: { heading: 'Workflows' } },
  { path: 'steps', loadComponent: () => import('./pages/steps/steps.component').then((m) => m.StepsComponent), title: 'Steps', data: { heading: 'Steps' } },
  { path: 'monitoring', loadComponent: () => import('./pages/monitoring/monitoring.component').then((m) => m.MonitoringComponent), title: 'Monitoring', data: { heading: 'Monitoring' } },
  { path: '**', redirectTo: '' },
];
