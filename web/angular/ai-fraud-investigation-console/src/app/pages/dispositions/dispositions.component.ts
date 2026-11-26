import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-dispositions', templateUrl: './dispositions.component.html', styleUrl: './dispositions.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DispositionsComponent {
  protected readonly rows: Array<{ case: string; outcome: string; loss: string; reviewer: string }> = [
    { case: 'CASE-801', outcome: 'Confirmed fraud', loss: '$12.4k', reviewer: 'Ananya Poluru' },
    { case: 'CASE-790', outcome: 'Benign', loss: '$0', reviewer: 'Riya Poluru' },
  ];
}
