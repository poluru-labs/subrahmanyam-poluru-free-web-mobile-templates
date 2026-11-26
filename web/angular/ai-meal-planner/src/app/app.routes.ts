import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/overview/overview.component').then((m) => m.OverviewComponent), title: 'Overview', data: { heading: 'Overview' } },
  { path: 'menus', loadComponent: () => import('./pages/menus/menus.component').then((m) => m.MenusComponent), title: 'Menus', data: { heading: 'Menus' } },
  { path: 'recipes', loadComponent: () => import('./pages/recipes/recipes.component').then((m) => m.RecipesComponent), title: 'Recipes', data: { heading: 'Recipes' } },
  { path: 'shopping', loadComponent: () => import('./pages/shopping/shopping.component').then((m) => m.ShoppingComponent), title: 'Shopping', data: { heading: 'Shopping' } },
  { path: '**', redirectTo: '' },
];
