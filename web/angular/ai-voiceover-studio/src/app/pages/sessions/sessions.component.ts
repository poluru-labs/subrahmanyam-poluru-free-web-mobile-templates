import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-sessions', templateUrl: './sessions.component.html', styleUrl: './sessions.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SessionsComponent { protected readonly rows = [
    { session: 'Explainer VO', talent: 'Meera Poluru', when: 'Nov 4', producer: 'Priya Poluru' },
    { session: 'IVR refresh', talent: 'Rohan Poluru', when: 'Nov 5', producer: 'Ananya Poluru' },
  ]; }
