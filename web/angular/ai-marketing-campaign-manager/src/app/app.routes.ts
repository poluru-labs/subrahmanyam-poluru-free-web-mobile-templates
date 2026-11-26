import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'campaigns', loadComponent: () => import('./pages/campaigns/campaigns.component').then((m) => m.CampaignsComponent), title: 'Campaigns', data: { heading: 'Campaigns' } },
  { path: 'audiences', loadComponent: () => import('./pages/audiences/audiences.component').then((m) => m.AudiencesComponent), title: 'Audiences', data: { heading: 'Audiences' } },
  { path: 'performance', loadComponent: () => import('./pages/performance/performance.component').then((m) => m.PerformanceComponent), title: 'Performance', data: { heading: 'Performance' } },
  { path: '**', redirectTo: '' },
];
