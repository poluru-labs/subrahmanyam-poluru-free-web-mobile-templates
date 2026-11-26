import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-guests', templateUrl: './guests.component.html', styleUrl: './guests.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class GuestsComponent { protected readonly rows = [
    { guest: 'Meera Poluru', slot: 'Nov 4', status: 'Confirmed', bookedBy: 'Tara Poluru' },
    { guest: 'Aarav Poluru', slot: 'Nov 8', status: 'Pending', bookedBy: 'Ananya Poluru' },
  ]; }
