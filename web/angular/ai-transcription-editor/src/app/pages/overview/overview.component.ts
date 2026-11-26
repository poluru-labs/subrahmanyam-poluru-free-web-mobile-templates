import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Files in edit', value: '24', trend: '+3', up: true },
    { label: 'Words proofed', value: '48k', trend: '+6k', up: true },
    { label: 'Avg. accuracy', value: '97.2%', trend: '+0.4%', up: true },
    { label: 'Due today', value: '6', trend: '+1', up: false },
  ]; }
