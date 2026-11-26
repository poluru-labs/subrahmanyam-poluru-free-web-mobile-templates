import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-candidates', templateUrl: './candidates.component.html', styleUrl: './candidates.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CandidatesComponent { protected readonly rows = [
    { candidate: 'Rohan Poluru', role: 'Platform engineer', stage: 'Screen', recruiter: 'Ananya Poluru' },
    { candidate: 'Meera Poluru', role: 'Design lead', stage: 'Interview', recruiter: 'Tara Poluru' },
  ]; }
