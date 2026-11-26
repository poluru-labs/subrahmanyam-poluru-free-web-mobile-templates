import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-reports', templateUrl: './reports.component.html', styleUrl: './reports.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ReportsComponent { protected readonly rows = [
    { report: 'Weekly compare', winner: 'text-v3', delta: '+1.7%', author: 'Ananya Poluru' },
    { report: 'Cost study', winner: 'text-v2', delta: '−12% cost', author: 'Meera Poluru' },
  ]; }
