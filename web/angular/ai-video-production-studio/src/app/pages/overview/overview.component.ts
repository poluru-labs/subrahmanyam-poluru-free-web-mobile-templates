import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Projects active', value: '5', trend: '+1', up: true },
    { label: 'Renders queued', value: '8', trend: '+2', up: false },
    { label: 'Avg. review time', value: '18h', trend: '−4h', up: true },
    { label: 'Deliverables due', value: '3', trend: '0', up: false },
  ]; }
