import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Live campaigns', value: '8', trend: '+1', up: true },
    { label: 'Spend to date', value: '$42k', trend: '+$6k', up: false },
    { label: 'Conversion rate', value: '3.8%', trend: '+0.4%', up: true },
    { label: 'A/B tests running', value: '4', trend: '+1', up: true },
  ]; }
