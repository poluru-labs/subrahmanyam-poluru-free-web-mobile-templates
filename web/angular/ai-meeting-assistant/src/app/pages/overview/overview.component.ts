import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Meetings this week', value: '14', trend: '+2', up: true },
    { label: 'Open actions', value: '31', trend: '−4', up: true },
    { label: 'Decisions logged', value: '18', trend: '+5', up: true },
    { label: 'Overdue follow-ups', value: '6', trend: '+1', up: false },
  ]; }
