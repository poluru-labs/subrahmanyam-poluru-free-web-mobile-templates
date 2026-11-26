import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-progress', templateUrl: './progress.component.html', styleUrl: './progress.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ProgressComponent { protected readonly rows = [
    { cohort: 'Evening B1', completion: '74%', quizAvg: '81%', week: 'W44' },
    { cohort: 'Morning A2', completion: '68%', quizAvg: '79%', week: 'W44' },
  ]; }
