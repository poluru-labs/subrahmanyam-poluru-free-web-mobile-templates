import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-meetings', templateUrl: './meetings.component.html', styleUrl: './meetings.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class MeetingsComponent { protected readonly rows = [
    { meeting: 'Sprint review', when: 'Thu 10:00', owner: 'Priya Poluru', status: 'Scheduled' },
    { meeting: 'Steering', when: 'Fri 14:00', owner: 'Ananya Poluru', status: 'Draft' },
  ]; }
