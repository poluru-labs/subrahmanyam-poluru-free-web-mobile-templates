import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-exceptions', templateUrl: './exceptions.component.html', styleUrl: './exceptions.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExceptionsComponent {
  protected readonly rows: Array<{ reason: string; invoice: string; assignee: string; status: string }> = [
    { reason: 'PO mismatch', invoice: 'INV-8770', assignee: 'Rohan Poluru', status: 'Open' },
    { reason: 'Tax variance', invoice: 'INV-8762', assignee: 'Meera Poluru', status: 'Review' },
  ];
}
