import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Profiles in edit', value: '38', trend: '+5', up: true },
    { label: 'Completion rate', value: '86%', trend: '+4%', up: true },
    { label: 'Exports this week', value: '22', trend: '+6', up: true },
    { label: 'Pending reviews', value: '4', trend: '+1', up: false },
  ]; }
