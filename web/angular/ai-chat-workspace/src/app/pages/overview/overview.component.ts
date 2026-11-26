import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Open threads', value: '47', trend: '−6', up: true },
    { label: 'Median first reply', value: '8m 12s', trend: '−1m', up: true },
    { label: 'Resolved today', value: '132', trend: '+18', up: true },
    { label: 'SLA at risk', value: '5', trend: '+1', up: false },
  ];
}
