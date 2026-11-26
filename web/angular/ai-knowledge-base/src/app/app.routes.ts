import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'articles', loadComponent: () => import('./pages/articles/articles.component').then((m) => m.ArticlesComponent), title: 'Articles', data: { heading: 'Articles' } },
  { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then((m) => m.CategoriesComponent), title: 'Categories', data: { heading: 'Categories' } },
  { path: 'analytics', loadComponent: () => import('./pages/analytics/analytics.component').then((m) => m.AnalyticsComponent), title: 'Analytics', data: { heading: 'Analytics' } },
  { path: '**', redirectTo: '' },
];
