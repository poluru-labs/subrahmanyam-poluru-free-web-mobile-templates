import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-questions', templateUrl: './questions.component.html', styleUrl: './questions.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class QuestionsComponent { protected readonly rows = [
    { question: 'MFA types', bank: 'Security', difficulty: 'Medium', author: 'Nila Poluru' },
    { question: 'Refund policy', bank: 'Support', difficulty: 'Easy', author: 'Rohan Poluru' },
  ]; }
