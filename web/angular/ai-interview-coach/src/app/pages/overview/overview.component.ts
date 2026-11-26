import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Sessions booked', value: '36', trend: '+8', up: true },
    { label: 'Avg. rubric score', value: '7.8', trend: '+0.4', up: true },
    { label: 'Completed feedback', value: '29', trend: '+5', up: true },
    { label: 'Candidates waiting', value: '11', trend: '+2', up: false },
  ];
}
