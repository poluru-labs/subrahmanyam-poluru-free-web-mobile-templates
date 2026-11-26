import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-calendar', templateUrl: './calendar.component.html', styleUrl: './calendar.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CalendarComponent { protected readonly rows = [
    { slot: 'Oct 28', piece: 'Launch blog', channel: 'Web', editor: 'Mira Poluru' },
    { slot: 'Oct 30', piece: 'Newsletter', channel: 'Email', editor: 'Rohan Poluru' },
  ]; }
