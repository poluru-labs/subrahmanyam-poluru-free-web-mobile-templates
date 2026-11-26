import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  protected readonly reports = [
    { name: 'September WCAG sweep', author: 'Kavita Poluru', date: 'Sep 26, 2026', status: 'Published' },
    { name: 'Checkout regression', author: 'Rohan Poluru', date: 'Sep 18, 2026', status: 'Draft' },
    { name: 'Marketing pages audit', author: 'Ananya Poluru', date: 'Sep 10, 2026', status: 'Published' },
  ];
}