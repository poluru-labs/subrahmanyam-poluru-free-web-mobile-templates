import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent), title: 'Gallery', data: { heading: 'Gallery' } },
  { path: 'collections', loadComponent: () => import('./pages/collections/collections.component').then((m) => m.CollectionsComponent), title: 'Collections', data: { heading: 'Collections' } },
  { path: 'usage', loadComponent: () => import('./pages/usage/usage.component').then((m) => m.UsageComponent), title: 'Usage', data: { heading: 'Usage' } },
  { path: '**', redirectTo: '' },
];
