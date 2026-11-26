import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-themes', templateUrl: './themes.component.html', styleUrl: './themes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ThemesComponent { protected readonly rows = [
    { theme: 'Coral executive', tokens: '24', decks: '6', steward: 'Meera Poluru' },
    { theme: 'Dark grid', tokens: '18', decks: '3', steward: 'Rohan Poluru' },
  ]; }
