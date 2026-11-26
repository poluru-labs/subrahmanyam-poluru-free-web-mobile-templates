import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-calendar', templateUrl: './calendar.component.html', styleUrl: './calendar.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CalendarComponent { protected readonly rows = [
    { slot: 'Tue 09:00', channel: 'LinkedIn', status: 'Scheduled', owner: 'Riya Poluru' },
    { slot: 'Wed 14:00', channel: 'Instagram', status: 'Draft', owner: 'Ananya Poluru' },
  ]; }
