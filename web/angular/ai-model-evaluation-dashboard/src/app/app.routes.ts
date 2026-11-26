import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'evaluations', loadComponent: () => import('./pages/evaluations/evaluations.component').then((m) => m.EvaluationsComponent), title: 'Evaluations', data: { heading: 'Evaluations' } },
  { path: 'datasets', loadComponent: () => import('./pages/datasets/datasets.component').then((m) => m.DatasetsComponent), title: 'Datasets', data: { heading: 'Datasets' } },
  { path: 'leaderboard', loadComponent: () => import('./pages/leaderboard/leaderboard.component').then((m) => m.LeaderboardComponent), title: 'Leaderboard', data: { heading: 'Leaderboard' } },
  { path: '**', redirectTo: '' },
];
