import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'trips', loadComponent: () => import('./pages/trips/trips.component').then((m) => m.TripsComponent), title: 'Trips', data: { heading: 'Trips' } },
  { path: 'itineraries', loadComponent: () => import('./pages/itineraries/itineraries.component').then((m) => m.ItinerariesComponent), title: 'Itineraries', data: { heading: 'Itineraries' } },
  { path: 'approvals', loadComponent: () => import('./pages/approvals/approvals.component').then((m) => m.ApprovalsComponent), title: 'Approvals', data: { heading: 'Approvals' } },
  { path: '**', redirectTo: '' },
];
