import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Candidates in pipeline', value: '47', trend: '+6', up: true },
    { label: 'Roles open', value: '8', trend: '0', up: false },
    { label: 'Screened this week', value: '18', trend: '+4', up: true },
    { label: 'Offers extended', value: '3', trend: '+1', up: true },
  ]; }
