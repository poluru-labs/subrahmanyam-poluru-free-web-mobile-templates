import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Saved templates', value: '42', trend: '+5', up: true },
    { label: 'Runs this week', value: '128', trend: '+18', up: true },
    { label: 'Passing checks', value: '94%', trend: '+2%', up: true },
    { label: 'Needs revision', value: '8', trend: '+1', up: false },
  ]; }
