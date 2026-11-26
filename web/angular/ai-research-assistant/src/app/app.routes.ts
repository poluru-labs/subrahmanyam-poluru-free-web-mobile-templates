import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'sources', loadComponent: () => import('./pages/sources/sources.component').then((m) => m.SourcesComponent), title: 'Sources', data: { heading: 'Sources' } },
  { path: 'notes', loadComponent: () => import('./pages/notes/notes.component').then((m) => m.NotesComponent), title: 'Notes', data: { heading: 'Notes' } },
  { path: 'exports', loadComponent: () => import('./pages/exports/exports.component').then((m) => m.ExportsComponent), title: 'Exports', data: { heading: 'Exports' } },
  { path: '**', redirectTo: '' },
];
