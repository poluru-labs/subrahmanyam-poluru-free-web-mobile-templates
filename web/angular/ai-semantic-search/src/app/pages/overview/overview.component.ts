import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Queries today', value: '12.4k', trend: '+8%', up: true },
    { label: 'Result click rate', value: '41%', trend: '+2%', up: true },
    { label: 'Indexed records', value: '1.8M', trend: '+24k', up: true },
    { label: 'Zero-result rate', value: '3.2%', trend: '−0.4%', up: true },
  ]; }
