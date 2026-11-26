import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'episodes', loadComponent: () => import('./pages/episodes/episodes.component').then((m) => m.EpisodesComponent), title: 'Episodes', data: { heading: 'Episodes' } },
  { path: 'guests', loadComponent: () => import('./pages/guests/guests.component').then((m) => m.GuestsComponent), title: 'Guests', data: { heading: 'Guests' } },
  { path: 'publishing', loadComponent: () => import('./pages/publishing/publishing.component').then((m) => m.PublishingComponent), title: 'Publishing', data: { heading: 'Publishing' } },
  { path: '**', redirectTo: '' },
];
