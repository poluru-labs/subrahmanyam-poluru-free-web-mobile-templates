import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'New feedback', value: '186', trend: '+22', up: true },
    { label: 'Themes tracked', value: '34', trend: '+3', up: true },
    { label: 'Avg. sentiment score', value: '72', trend: '+4', up: true },
    { label: 'Escalated items', value: '5', trend: '+1', up: false },
  ]; }
