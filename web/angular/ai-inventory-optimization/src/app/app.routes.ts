import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory.component').then((m) => m.InventoryComponent), title: 'Inventory', data: { heading: 'Inventory' } },
  { path: 'reorder', loadComponent: () => import('./pages/reorder/reorder.component').then((m) => m.ReorderComponent), title: 'Reorder', data: { heading: 'Reorder' } },
  { path: 'warehouses', loadComponent: () => import('./pages/warehouses/warehouses.component').then((m) => m.WarehousesComponent), title: 'Warehouses', data: { heading: 'Warehouses' } },
  { path: '**', redirectTo: '' },
];
