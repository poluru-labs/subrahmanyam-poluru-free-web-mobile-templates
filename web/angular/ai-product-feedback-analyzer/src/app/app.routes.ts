import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'feedback', loadComponent: () => import('./pages/feedback/feedback.component').then((m) => m.FeedbackComponent), title: 'Feedback', data: { heading: 'Feedback' } },
  { path: 'themes', loadComponent: () => import('./pages/themes/themes.component').then((m) => m.ThemesComponent), title: 'Themes', data: { heading: 'Themes' } },
  { path: 'roadmap', loadComponent: () => import('./pages/roadmap/roadmap.component').then((m) => m.RoadmapComponent), title: 'Roadmap', data: { heading: 'Roadmap' } },
  { path: '**', redirectTo: '' },
];
