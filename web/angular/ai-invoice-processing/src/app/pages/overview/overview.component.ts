import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Invoices received', value: '412', trend: '+34', up: true },
    { label: 'Auto-matched %', value: '91.8%', trend: '+1.4%', up: true },
    { label: 'Exceptions open', value: '19', trend: '−4', up: true },
    { label: 'Due this week', value: '$284k', trend: '+$18k', up: false },
  ];
}
