import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-themes', templateUrl: './themes.component.html', styleUrl: './themes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ThemesComponent { protected readonly rows = [
    { theme: 'Onboarding', volume: '48', trend: '+12%', lead: 'Meera Poluru' },
    { theme: 'Performance', volume: '31', trend: '−4%', lead: 'Rohan Poluru' },
  ]; }
