import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-calendar', templateUrl: './calendar.component.html', styleUrl: './calendar.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CalendarComponent { protected readonly rows = [
    { block: 'Morning focus', day: 'Mon', hours: '3h', subject: 'Chemistry' },
    { block: 'Review session', day: 'Thu', hours: '2h', subject: 'Calculus' },
  ]; }
