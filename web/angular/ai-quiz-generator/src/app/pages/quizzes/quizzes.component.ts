import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-quizzes', templateUrl: './quizzes.component.html', styleUrl: './quizzes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class QuizzesComponent { protected readonly rows = [
    { quiz: 'Security basics', questions: '20', attempts: '142', owner: 'Nila Poluru' },
    { quiz: 'Onboarding', questions: '12', attempts: '88', owner: 'Ananya Poluru' },
  ]; }
