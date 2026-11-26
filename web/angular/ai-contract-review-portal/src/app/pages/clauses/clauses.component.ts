import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrl: './clauses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClausesComponent {
  protected readonly rows: Array<{ clause: string; playbook: string; deviation: string; reviewer: string }> = [
    { clause: 'Liability cap', playbook: 'Standard v4', deviation: 'Higher cap requested', reviewer: 'Rohan Poluru' },
    { clause: 'Termination notice', playbook: 'Standard v4', deviation: 'Match', reviewer: 'Aarav Poluru' },
    { clause: 'Data residency', playbook: 'EU pack', deviation: 'Non-standard region', reviewer: 'Meera Poluru' },
  ];
}
