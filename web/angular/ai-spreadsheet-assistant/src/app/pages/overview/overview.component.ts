import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Workbooks scanned', value: '64', trend: '+8', up: true },
    { label: 'Clean formulas', value: '94%', trend: '+2%', up: true },
    { label: 'Errors found', value: '18', trend: '−4', up: true },
    { label: 'Patterns shared', value: '26', trend: '+3', up: true },
  ]; }
