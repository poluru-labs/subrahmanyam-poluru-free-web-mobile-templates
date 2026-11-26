import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Drafts in progress', value: '18', trend: '+3', up: true },
    { label: 'Published this month', value: '12', trend: '+4', up: true },
    { label: 'Avg. review cycles', value: '2.1', trend: '−0.2', up: true },
    { label: 'Overdue drafts', value: '4', trend: '+1', up: false },
  ]; }
