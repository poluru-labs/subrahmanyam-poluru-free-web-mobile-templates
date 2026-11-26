import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'expenses', loadComponent: () => import('./pages/expenses/expenses.component').then((m) => m.ExpensesComponent), title: 'Expenses', data: { heading: 'Expenses' } },
  { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then((m) => m.CategoriesComponent), title: 'Categories', data: { heading: 'Categories' } },
  { path: 'policies', loadComponent: () => import('./pages/policies/policies.component').then((m) => m.PoliciesComponent), title: 'Policies', data: { heading: 'Policies' } },
  { path: '**', redirectTo: '' },
];
