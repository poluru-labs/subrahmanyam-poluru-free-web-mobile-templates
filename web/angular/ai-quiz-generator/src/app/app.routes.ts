import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'quizzes', loadComponent: () => import('./pages/quizzes/quizzes.component').then((m) => m.QuizzesComponent), title: 'Quizzes', data: { heading: 'Quizzes' } },
  { path: 'questions', loadComponent: () => import('./pages/questions/questions.component').then((m) => m.QuestionsComponent), title: 'Questions', data: { heading: 'Questions' } },
  { path: 'results', loadComponent: () => import('./pages/results/results.component').then((m) => m.ResultsComponent), title: 'Results', data: { heading: 'Results' } },
  { path: '**', redirectTo: '' },
];
