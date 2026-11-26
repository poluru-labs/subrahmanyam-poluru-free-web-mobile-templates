import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'decks', loadComponent: () => import('./pages/decks/decks.component').then((m) => m.DecksComponent), title: 'Decks', data: { heading: 'Decks' } },
  { path: 'themes', loadComponent: () => import('./pages/themes/themes.component').then((m) => m.ThemesComponent), title: 'Themes', data: { heading: 'Themes' } },
  { path: 'sharing', loadComponent: () => import('./pages/sharing/sharing.component').then((m) => m.SharingComponent), title: 'Sharing', data: { heading: 'Sharing' } },
  { path: '**', redirectTo: '' },
];
