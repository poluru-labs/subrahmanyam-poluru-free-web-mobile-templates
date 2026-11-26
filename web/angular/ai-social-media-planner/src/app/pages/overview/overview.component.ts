import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Scheduled posts', value: '48', trend: '+6', up: true },
    { label: 'Engagement rate', value: '4.6%', trend: '+0.3%', up: true },
    { label: 'Channels active', value: '5', trend: '0', up: false },
    { label: 'Awaiting approval', value: '7', trend: '+2', up: false },
  ]; }
