import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'cases', loadComponent: () => import('./pages/cases/cases.component').then((m) => m.CasesComponent), title: 'Cases', data: { heading: 'Cases' } },
  { path: 'signals', loadComponent: () => import('./pages/signals/signals.component').then((m) => m.SignalsComponent), title: 'Signals', data: { heading: 'Signals' } },
  { path: 'dispositions', loadComponent: () => import('./pages/dispositions/dispositions.component').then((m) => m.DispositionsComponent), title: 'Dispositions', data: { heading: 'Dispositions' } },
  { path: '**', redirectTo: '' },
];
