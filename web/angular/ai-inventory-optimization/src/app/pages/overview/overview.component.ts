import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'SKUs monitored', value: '3,204', trend: '+48', up: true },
    { label: 'Days on hand', value: '41', trend: '−3', up: true },
    { label: 'Reorder alerts', value: '27', trend: '+4', up: false },
    { label: 'Excess stock value', value: '$182k', trend: '−$12k', up: true },
  ];
}
