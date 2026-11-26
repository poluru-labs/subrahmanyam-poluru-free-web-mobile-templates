import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-audiences', templateUrl: './audiences.component.html', styleUrl: './audiences.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class AudiencesComponent { protected readonly rows = [
    { segment: 'Trial users', size: '14k', match: '92%', lead: 'Meera Poluru' },
    { segment: 'Churn risk', size: '3.2k', match: '88%', lead: 'Aarav Poluru' },
  ]; }
