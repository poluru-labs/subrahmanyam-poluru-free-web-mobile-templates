import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Episodes in edit', value: '6', trend: '+1', up: true },
    { label: 'Scheduled releases', value: '4', trend: '+1', up: true },
    { label: 'Guest confirmations', value: '3', trend: '0', up: false },
    { label: 'QC failures', value: '2', trend: '−1', up: true },
  ]; }
