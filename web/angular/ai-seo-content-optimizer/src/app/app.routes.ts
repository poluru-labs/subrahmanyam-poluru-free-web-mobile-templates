import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'pages', loadComponent: () => import('./pages/pages/pages.component').then((m) => m.PagesComponent), title: 'Pages', data: { heading: 'Pages' } },
  { path: 'keywords', loadComponent: () => import('./pages/keywords/keywords.component').then((m) => m.KeywordsComponent), title: 'Keywords', data: { heading: 'Keywords' } },
  { path: 'audits', loadComponent: () => import('./pages/audits/audits.component').then((m) => m.AuditsComponent), title: 'Audits', data: { heading: 'Audits' } },
  { path: '**', redirectTo: '' },
];
