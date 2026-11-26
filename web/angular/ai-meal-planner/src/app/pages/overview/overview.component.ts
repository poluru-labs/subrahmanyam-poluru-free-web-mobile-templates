import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Menus planned', value: '6', trend: '+1', up: true },
    { label: 'Recipes used', value: '24', trend: '+3', up: true },
    { label: 'Shopping items', value: '47', trend: '−8', up: true },
    { label: 'Dietary flags', value: '5', trend: '0', up: false },
  ]; }
