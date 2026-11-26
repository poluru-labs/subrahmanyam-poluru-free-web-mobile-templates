import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Open tickets', value: '186', trend: '+14', up: false },
    { label: 'CSAT score', value: '4.6', trend: '+0.2', up: true },
    { label: 'First response time', value: '14m', trend: '−3m', up: true },
    { label: 'Backlog age', value: '2.4d', trend: '−0.3d', up: true },
  ];
}
