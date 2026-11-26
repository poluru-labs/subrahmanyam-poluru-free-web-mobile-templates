import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-on-call', templateUrl: './on-call.component.html', styleUrl: './on-call.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OnCallComponent {
  protected readonly rows: Array<{ rotation: string; primary: string; backup: string; until: string }> = [
    { rotation: 'Platform', primary: 'Rohan Poluru', backup: 'Meera Poluru', until: 'Fri 18:00' },
    { rotation: 'Data', primary: 'Aarav Poluru', backup: 'Ananya Poluru', until: 'Sun 09:00' },
  ];
}
