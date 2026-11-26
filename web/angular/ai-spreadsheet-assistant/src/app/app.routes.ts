import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'workbooks', loadComponent: () => import('./pages/workbooks/workbooks.component').then((m) => m.WorkbooksComponent), title: 'Workbooks', data: { heading: 'Workbooks' } },
  { path: 'formulas', loadComponent: () => import('./pages/formulas/formulas.component').then((m) => m.FormulasComponent), title: 'Formulas', data: { heading: 'Formulas' } },
  { path: 'audits', loadComponent: () => import('./pages/audits/audits.component').then((m) => m.AuditsComponent), title: 'Audits', data: { heading: 'Audits' } },
  { path: '**', redirectTo: '' },
];
