import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent), title: 'Projects', data: { heading: 'Projects' } },
  { path: 'moodboards', loadComponent: () => import('./pages/moodboards/moodboards.component').then((m) => m.MoodboardsComponent), title: 'Moodboards', data: { heading: 'Moodboards' } },
  { path: 'vendors', loadComponent: () => import('./pages/vendors/vendors.component').then((m) => m.VendorsComponent), title: 'Vendors', data: { heading: 'Vendors' } },
  { path: '**', redirectTo: '' },
];
