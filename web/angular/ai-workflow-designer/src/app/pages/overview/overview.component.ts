import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Live workflows', value: '14', trend: '+2', up: true },
    { label: 'Steps completed', value: '842', trend: '+64', up: true },
    { label: 'Avg. cycle time', value: '2.1d', trend: '−4h', up: true },
    { label: 'Blocked steps', value: '5', trend: '+1', up: false },
  ]; }
