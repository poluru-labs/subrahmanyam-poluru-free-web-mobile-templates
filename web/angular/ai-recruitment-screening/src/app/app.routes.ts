import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'candidates', loadComponent: () => import('./pages/candidates/candidates.component').then((m) => m.CandidatesComponent), title: 'Candidates', data: { heading: 'Candidates' } },
  { path: 'roles', loadComponent: () => import('./pages/roles/roles.component').then((m) => m.RolesComponent), title: 'Roles', data: { heading: 'Roles' } },
  { path: 'screening', loadComponent: () => import('./pages/screening/screening.component').then((m) => m.ScreeningComponent), title: 'Screening', data: { heading: 'Screening' } },
  { path: '**', redirectTo: '' },
];
