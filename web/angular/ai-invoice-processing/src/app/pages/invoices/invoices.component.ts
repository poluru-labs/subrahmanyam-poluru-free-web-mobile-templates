import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-invoices', templateUrl: './invoices.component.html', styleUrl: './invoices.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class InvoicesComponent {
  protected readonly rows: Array<{ invoice: string; vendor: string; amount: string; match: string }> = [
    { invoice: 'INV-8801', vendor: 'CloudHost', amount: '$1,240', match: 'Auto' },
    { invoice: 'INV-8794', vendor: 'TravelCo', amount: '$418', match: 'Manual' },
  ];
}
