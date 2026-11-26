import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Active projects', value: '14', trend: '+2', up: true },
    { label: 'Selections approved', value: '68%', trend: '+5%', up: true },
    { label: 'Vendor quotes', value: '22', trend: '+4', up: true },
    { label: 'Install dates', value: '5', trend: '+1', up: true },
  ];
}
