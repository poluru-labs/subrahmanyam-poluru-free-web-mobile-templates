import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'meetings', loadComponent: () => import('./pages/meetings/meetings.component').then((m) => m.MeetingsComponent), title: 'Meetings', data: { heading: 'Meetings' } },
  { path: 'actions', loadComponent: () => import('./pages/actions/actions.component').then((m) => m.ActionsComponent), title: 'Actions', data: { heading: 'Actions' } },
  { path: 'notes', loadComponent: () => import('./pages/notes/notes.component').then((m) => m.NotesComponent), title: 'Notes', data: { heading: 'Notes' } },
  { path: '**', redirectTo: '' },
];
