import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Models tracked', value: '12', trend: '+2', up: true },
    { label: 'Benchmark runs', value: '84', trend: '+11', up: true },
    { label: 'Best accuracy', value: '94.6%', trend: '+0.8%', up: true },
    { label: 'Regression alerts', value: '2', trend: '−1', up: true },
  ]; }
