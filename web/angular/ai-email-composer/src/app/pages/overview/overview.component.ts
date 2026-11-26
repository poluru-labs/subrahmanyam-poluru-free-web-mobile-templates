import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Drafts ready', value: '22', trend: '+4', up: true },
    { label: 'Send rate', value: '98.6%', trend: '+0.4%', up: true },
    { label: 'Open rate', value: '41.2%', trend: '+2.8%', up: true },
    { label: 'Bounce rate', value: '1.1%', trend: '−0.2%', up: true },
  ];
}
