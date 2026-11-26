import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent), title: 'Projects', data: { heading: 'Projects' } },
  { path: 'timeline', loadComponent: () => import('./pages/timeline/timeline.component').then((m) => m.TimelineComponent), title: 'Timeline', data: { heading: 'Timeline' } },
  { path: 'renders', loadComponent: () => import('./pages/renders/renders.component').then((m) => m.RendersComponent), title: 'Renders', data: { heading: 'Renders' } },
  { path: '**', redirectTo: '' },
];
