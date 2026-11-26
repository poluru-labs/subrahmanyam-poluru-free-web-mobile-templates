import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Images in queue', value: '128', trend: '+12', up: false },
    { label: 'Turnaround time', value: '4.2h', trend: '−18m', up: true },
    { label: 'Exports today', value: '86', trend: '+9', up: true },
    { label: 'Rework requests', value: '7', trend: '+2', up: false },
  ]; }
