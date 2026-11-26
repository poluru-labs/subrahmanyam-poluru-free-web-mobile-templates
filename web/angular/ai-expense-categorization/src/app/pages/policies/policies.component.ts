import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-policies', templateUrl: './policies.component.html', styleUrl: './policies.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PoliciesComponent {
  protected readonly rows: Array<{ exception: string; team: string; amount: string; status: string }> = [
    { exception: 'Late receipt', team: 'Sales', amount: '$240', status: 'Open' },
    { exception: 'Over limit', team: 'Eng', amount: '$1,200', status: 'Approved' },
  ];
}
