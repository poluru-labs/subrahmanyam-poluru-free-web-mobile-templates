import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'sessions', loadComponent: () => import('./pages/sessions/sessions.component').then((m) => m.SessionsComponent), title: 'Sessions', data: { heading: 'Sessions' } },
  { path: 'feedback', loadComponent: () => import('./pages/feedback/feedback.component').then((m) => m.FeedbackComponent), title: 'Feedback', data: { heading: 'Feedback' } },
  { path: 'rubrics', loadComponent: () => import('./pages/rubrics/rubrics.component').then((m) => m.RubricsComponent), title: 'Rubrics', data: { heading: 'Rubrics' } },
  { path: '**', redirectTo: '' },
];
