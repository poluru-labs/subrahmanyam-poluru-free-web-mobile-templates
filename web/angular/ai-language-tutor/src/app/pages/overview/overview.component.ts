import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Active learners', value: '126', trend: '+14', up: true },
    { label: 'Lessons completed', value: '842', trend: '+9%', up: true },
    { label: 'Avg. quiz score', value: '82%', trend: '+3%', up: true },
    { label: 'At-risk learners', value: '9', trend: '+1', up: false },
  ]; }
