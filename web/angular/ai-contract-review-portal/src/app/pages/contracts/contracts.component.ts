import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsComponent {
  protected readonly rows: Array<{ agreement: string; counterparty: string; stage: string; owner: string }> = [
    { agreement: 'MSA — Nord Supply', counterparty: 'Vendor', stage: 'Legal review', owner: 'Aarav Poluru' },
    { agreement: 'DPA — CloudHost', counterparty: 'Processor', stage: 'Negotiation', owner: 'Meera Poluru' },
    { agreement: 'SOW — BuildCo', counterparty: 'Customer', stage: 'Awaiting sign', owner: 'Ananya Poluru' },
  ];
}
