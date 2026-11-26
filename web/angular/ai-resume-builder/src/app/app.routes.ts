import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'profiles', loadComponent: () => import('./pages/profiles/profiles.component').then((m) => m.ProfilesComponent), title: 'Profiles', data: { heading: 'Profiles' } },
  { path: 'templates', loadComponent: () => import('./pages/templates/templates.component').then((m) => m.TemplatesComponent), title: 'Templates', data: { heading: 'Templates' } },
  { path: 'exports', loadComponent: () => import('./pages/exports/exports.component').then((m) => m.ExportsComponent), title: 'Exports', data: { heading: 'Exports' } },
  { path: '**', redirectTo: '' },
];
