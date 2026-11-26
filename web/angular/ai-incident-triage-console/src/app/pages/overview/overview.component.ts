import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Open incidents', value: '7', trend: '+1', up: false },
    { label: 'SEV1 count', value: '2', trend: '0', up: false },
    { label: 'Mean time to resolve', value: '3.8h', trend: '−22m', up: true },
    { label: 'On-call load', value: '4.2', trend: '+0.3', up: false },
  ];
}
