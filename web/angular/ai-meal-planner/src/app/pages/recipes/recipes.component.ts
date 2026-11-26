import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-recipes', templateUrl: './recipes.component.html', styleUrl: './recipes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RecipesComponent { protected readonly rows = [
    { recipe: 'Lentil bowl', tags: 'Vegan', prep: '25m', author: 'Meera Poluru' },
    { recipe: 'Chicken curry', tags: 'GF', prep: '40m', author: 'Rohan Poluru' },
  ]; }
