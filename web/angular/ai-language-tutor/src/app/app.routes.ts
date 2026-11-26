import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'lessons', loadComponent: () => import('./pages/lessons/lessons.component').then((m) => m.LessonsComponent), title: 'Lessons', data: { heading: 'Lessons' } },
  { path: 'learners', loadComponent: () => import('./pages/learners/learners.component').then((m) => m.LearnersComponent), title: 'Learners', data: { heading: 'Learners' } },
  { path: 'progress', loadComponent: () => import('./pages/progress/progress.component').then((m) => m.ProgressComponent), title: 'Progress', data: { heading: 'Progress' } },
  { path: '**', redirectTo: '' },
];
