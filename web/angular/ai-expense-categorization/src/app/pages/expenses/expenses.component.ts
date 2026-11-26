import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-expenses', templateUrl: './expenses.component.html', styleUrl: './expenses.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExpensesComponent {
  protected readonly rows: Array<{ merchant: string; amount: string; category: string; owner: string }> = [
    { merchant: 'CloudHost', amount: '$420', category: 'Infrastructure', owner: 'Aarav Poluru' },
    { merchant: 'TravelCo', amount: '$186', category: 'Travel', owner: 'Rohan Poluru' },
  ];
}
