import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Sources saved', value: '248', trend: '+18', up: true },
    { label: 'Notes linked', value: '412', trend: '+32', up: true },
    { label: 'Themes tagged', value: '34', trend: '+4', up: true },
    { label: 'Open questions', value: '12', trend: '+2', up: false },
  ]; }
