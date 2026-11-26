import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Assets published', value: '2,840', trend: '+124', up: true },
    { label: 'Collections', value: '38', trend: '+2', up: true },
    { label: 'Downloads', value: '18.2k', trend: '+9%', up: true },
    { label: 'Rights expiring', value: '6', trend: '+1', up: false },
  ];
}
