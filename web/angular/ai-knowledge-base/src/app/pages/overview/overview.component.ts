import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Published articles', value: '384', trend: '+18', up: true },
    { label: 'Helpful votes', value: '2,841', trend: '+12%', up: true },
    { label: 'Monthly views', value: '48k', trend: '+8%', up: true },
    { label: 'Articles to refresh', value: '22', trend: '+3', up: false },
  ]; }
