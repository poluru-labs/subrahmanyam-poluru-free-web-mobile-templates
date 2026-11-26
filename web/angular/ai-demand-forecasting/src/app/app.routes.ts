import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'forecasts', loadComponent: () => import('./pages/forecasts/forecasts.component').then((m) => m.ForecastsComponent), title: 'Forecasts', data: { heading: 'Forecasts' } },
  { path: 'skus', loadComponent: () => import('./pages/skus/skus.component').then((m) => m.SkusComponent), title: 'SKUs', data: { heading: 'SKUs' } },
  { path: 'adjustments', loadComponent: () => import('./pages/adjustments/adjustments.component').then((m) => m.AdjustmentsComponent), title: 'Adjustments', data: { heading: 'Adjustments' } },
  { path: '**', redirectTo: '' },
];
