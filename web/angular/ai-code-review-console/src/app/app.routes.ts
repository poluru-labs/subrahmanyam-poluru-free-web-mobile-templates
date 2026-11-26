import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent),
    title: 'Overview',
    data: { heading: 'Overview' },
  },
  {
    path: 'reviews',
    loadComponent: () => import('./pages/reviews/reviews.component').then((m) => m.ReviewsComponent),
    title: 'Reviews',
    data: { heading: 'Reviews' },
  },
  {
    path: 'repositories',
    loadComponent: () =>
      import('./pages/repositories/repositories.component').then((m) => m.RepositoriesComponent),
    title: 'Repositories',
    data: { heading: 'Repositories' },
  },
  {
    path: 'metrics',
    loadComponent: () => import('./pages/metrics/metrics.component').then((m) => m.MetricsComponent),
    title: 'Metrics',
    data: { heading: 'Metrics' },
  },
  { path: '**', redirectTo: '' },
];