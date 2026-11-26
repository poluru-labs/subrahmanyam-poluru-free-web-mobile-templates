import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Decks in edit', value: '9', trend: '+2', up: true },
    { label: 'Slides total', value: '412', trend: '+38', up: true },
    { label: 'Shared this week', value: '14', trend: '+4', up: true },
    { label: 'Pending approval', value: '3', trend: '+1', up: false },
  ]; }
