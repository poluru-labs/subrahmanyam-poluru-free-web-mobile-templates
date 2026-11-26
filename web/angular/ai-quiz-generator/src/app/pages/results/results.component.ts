import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-results', templateUrl: './results.component.html', styleUrl: './results.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ResultsComponent { protected readonly rows = [
    { cohort: 'New hires', avgScore: '81%', completion: '92%', week: 'W44' },
    { cohort: 'Partners', avgScore: '74%', completion: '88%', week: 'W44' },
  ]; }
