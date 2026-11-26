import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'templates', loadComponent: () => import('./pages/templates/templates.component').then((m) => m.TemplatesComponent), title: 'Templates', data: { heading: 'Templates' } },
  { path: 'runs', loadComponent: () => import('./pages/runs/runs.component').then((m) => m.RunsComponent), title: 'Runs', data: { heading: 'Runs' } },
  { path: 'history', loadComponent: () => import('./pages/history/history.component').then((m) => m.HistoryComponent), title: 'History', data: { heading: 'History' } },
  { path: '**', redirectTo: '' },
];
