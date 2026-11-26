import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Active plans', value: '12', trend: '+2', up: true },
    { label: 'Milestones due', value: '8', trend: '+1', up: false },
    { label: 'Hours logged', value: '34', trend: '+6', up: true },
    { label: 'Overdue tasks', value: '3', trend: '−1', up: true },
  ]; }
