import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'courses', loadComponent: () => import('./pages/courses/courses.component').then((m) => m.CoursesComponent), title: 'Courses', data: { heading: 'Courses' } },
  { path: 'modules', loadComponent: () => import('./pages/modules/modules.component').then((m) => m.ModulesComponent), title: 'Modules', data: { heading: 'Modules' } },
  { path: 'publish', loadComponent: () => import('./pages/publish/publish.component').then((m) => m.PublishComponent), title: 'Publish', data: { heading: 'Publish' } },
  { path: '**', redirectTo: '' },
];