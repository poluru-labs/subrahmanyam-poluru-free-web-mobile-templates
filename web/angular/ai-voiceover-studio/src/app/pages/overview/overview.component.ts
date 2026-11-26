import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Sessions booked', value: '12', trend: '+2', up: true },
    { label: 'Scripts approved', value: '9', trend: '+1', up: true },
    { label: 'Avg. pickup time', value: '2.4h', trend: '−20m', up: true },
    { label: 'Pending masters', value: '4', trend: '+1', up: false },
  ]; }
