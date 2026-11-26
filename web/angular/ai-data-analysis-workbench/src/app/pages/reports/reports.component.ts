import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  protected readonly rows: Array<{ report: string; schedule: string; lastRun: string; owner: string }> = [
    { report: 'Revenue daily', schedule: 'Daily 06:00', lastRun: 'OK', owner: 'Ananya Poluru' },
    { report: 'Churn cohort', schedule: 'Weekly', lastRun: 'OK', owner: 'Rohan Poluru' },
  ];
}
