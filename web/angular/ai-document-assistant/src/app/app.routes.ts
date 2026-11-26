import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'documents', loadComponent: () => import('./pages/documents/documents.component').then((m) => m.DocumentsComponent), title: 'Documents', data: { heading: 'Documents' } },
  { path: 'reviews', loadComponent: () => import('./pages/reviews/reviews.component').then((m) => m.ReviewsComponent), title: 'Reviews', data: { heading: 'Reviews' } },
  { path: 'templates', loadComponent: () => import('./pages/templates/templates.component').then((m) => m.TemplatesComponent), title: 'Templates', data: { heading: 'Templates' } },
  { path: '**', redirectTo: '' },
];
