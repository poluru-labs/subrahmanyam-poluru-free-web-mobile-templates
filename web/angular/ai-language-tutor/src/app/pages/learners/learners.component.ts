import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-learners', templateUrl: './learners.component.html', styleUrl: './learners.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class LearnersComponent { protected readonly rows = [
    { learner: 'Group A', level: 'B1', streak: '12d', coach: 'Rohan Poluru' },
    { learner: 'Group B', level: 'A2', streak: '8d', coach: 'Meera Poluru' },
  ]; }
