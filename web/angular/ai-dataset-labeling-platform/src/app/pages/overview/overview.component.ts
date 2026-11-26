import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Items labeled', value: '12,480', trend: '+840', up: true },
    { label: 'Agreement %', value: '94.1%', trend: '+1.3%', up: true },
    { label: 'Queue depth', value: '318', trend: '−42', up: true },
    { label: 'Quality disputes', value: '7', trend: '+1', up: false },
  ];
}
