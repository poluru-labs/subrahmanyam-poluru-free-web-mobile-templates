import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Models evaluated', value: '24', trend: '+3', up: true },
    { label: 'Best F1 score', value: '0.912', trend: '+0.018', up: true },
    { label: 'Regression tests', value: '6', trend: '0', up: false },
    { label: 'Runs this week', value: '47', trend: '+8', up: true },
  ]; }
