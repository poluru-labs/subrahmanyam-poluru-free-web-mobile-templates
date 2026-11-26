import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-categories', templateUrl: './categories.component.html', styleUrl: './categories.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CategoriesComponent {
  protected readonly rows: Array<{ rule: string; match: string; category: string; updated: string }> = [
    { rule: 'SaaS vendors', match: 'contains cloud', category: 'Software', updated: 'Oct 20' },
    { rule: 'Meals', match: 'MCC 5812', category: 'Meals', updated: 'Oct 12' },
  ];
}
