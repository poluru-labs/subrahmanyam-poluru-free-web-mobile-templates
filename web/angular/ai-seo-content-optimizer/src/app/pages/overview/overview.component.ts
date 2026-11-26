import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Pages optimized', value: '186', trend: '+12', up: true },
    { label: 'Avg. health score', value: '82', trend: '+3', up: true },
    { label: 'Keywords tracked', value: '420', trend: '+28', up: true },
    { label: 'Critical issues', value: '9', trend: '+2', up: false },
  ]; }
