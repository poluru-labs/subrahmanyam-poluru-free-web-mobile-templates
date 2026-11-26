import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-sessions', templateUrl: './sessions.component.html', styleUrl: './sessions.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SessionsComponent {
  protected readonly rows: Array<{ candidate: string; role: string; coach: string; when: string }> = [
    { candidate: 'Alex Kim', role: 'PM', coach: 'Sana Poluru', when: 'Today 15:00' },
    { candidate: 'Jordan Lee', role: 'Eng', coach: 'Ananya Poluru', when: 'Tomorrow' },
  ];
}
