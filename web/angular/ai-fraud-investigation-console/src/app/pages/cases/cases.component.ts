import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-cases', templateUrl: './cases.component.html', styleUrl: './cases.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CasesComponent {
  protected readonly rows: Array<{ case: string; priority: string; analyst: string; status: string }> = [
    { case: 'CASE-884', priority: 'P1', analyst: 'Ananya Poluru', status: 'Open' },
    { case: 'CASE-872', priority: 'P2', analyst: 'Rohan Poluru', status: 'Review' },
  ];
}
