import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'transcripts', loadComponent: () => import('./pages/transcripts/transcripts.component').then((m) => m.TranscriptsComponent), title: 'Transcripts', data: { heading: 'Transcripts' } },
  { path: 'speakers', loadComponent: () => import('./pages/speakers/speakers.component').then((m) => m.SpeakersComponent), title: 'Speakers', data: { heading: 'Speakers' } },
  { path: 'exports', loadComponent: () => import('./pages/exports/exports.component').then((m) => m.ExportsComponent), title: 'Exports', data: { heading: 'Exports' } },
  { path: '**', redirectTo: '' },
];
