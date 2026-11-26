import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'invoices', loadComponent: () => import('./pages/invoices/invoices.component').then((m) => m.InvoicesComponent), title: 'Invoices', data: { heading: 'Invoices' } },
  { path: 'vendors', loadComponent: () => import('./pages/vendors/vendors.component').then((m) => m.VendorsComponent), title: 'Vendors', data: { heading: 'Vendors' } },
  { path: 'exceptions', loadComponent: () => import('./pages/exceptions/exceptions.component').then((m) => m.ExceptionsComponent), title: 'Exceptions', data: { heading: 'Exceptions' } },
  { path: '**', redirectTo: '' },
];
