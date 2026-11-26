import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'campaigns', loadComponent: () => import('./pages/campaigns/campaigns.component').then((m) => m.CampaignsComponent), title: 'Campaigns', data: { heading: 'Campaigns' } },
  { path: 'drafts', loadComponent: () => import('./pages/drafts/drafts.component').then((m) => m.DraftsComponent), title: 'Drafts', data: { heading: 'Drafts' } },
  { path: 'delivery', loadComponent: () => import('./pages/delivery/delivery.component').then((m) => m.DeliveryComponent), title: 'Delivery', data: { heading: 'Delivery' } },
  { path: '**', redirectTo: '' },
];
