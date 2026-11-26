import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-findings',
  templateUrl: './findings.component.html',
  styleUrl: './findings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingsComponent {
  protected readonly rows = [
    { id: 'A11Y-102', rule: '1.4.3 Contrast', page: '/checkout', owner: 'Nila Poluru', severity: 'Critical' },
    { id: 'A11Y-098', rule: '2.4.6 Headings', page: '/pricing', owner: 'Ananya Poluru', severity: 'Serious' },
    { id: 'A11Y-091', rule: '1.1.1 Alt text', page: '/blog/launch', owner: 'Rohan Poluru', severity: 'Moderate' },
    { id: 'A11Y-087', rule: '3.3.2 Labels', page: '/signup', owner: 'Meera Poluru', severity: 'Serious' },
  ];
}