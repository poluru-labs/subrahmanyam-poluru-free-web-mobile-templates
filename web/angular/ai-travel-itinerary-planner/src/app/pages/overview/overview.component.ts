import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Trips in planning', value: '7', trend: '+1', up: true },
    { label: 'Approved spend', value: '$42k', trend: '+$8k', up: true },
    { label: 'Departures this week', value: '4', trend: '+1', up: true },
    { label: 'Pending approvals', value: '3', trend: '+1', up: false },
  ]; }
