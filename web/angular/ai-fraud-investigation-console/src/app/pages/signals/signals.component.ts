import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-signals', templateUrl: './signals.component.html', styleUrl: './signals.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SignalsComponent {
  protected readonly rows: Array<{ signal: string; source: string; score: string; owner: string }> = [
    { signal: 'Velocity spike', source: 'Payments', score: '92', owner: 'Riya Poluru' },
    { signal: 'Device mismatch', source: 'Login', score: '78', owner: 'Meera Poluru' },
  ];
}
