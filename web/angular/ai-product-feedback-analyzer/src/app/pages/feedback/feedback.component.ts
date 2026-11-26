import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-feedback', templateUrl: './feedback.component.html', styleUrl: './feedback.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class FeedbackComponent { protected readonly rows = [
    { source: 'Support ticket', theme: 'Onboarding', sentiment: 'Mixed', owner: 'Kiran Poluru' },
    { source: 'NPS comment', theme: 'Billing', sentiment: 'Positive', owner: 'Ananya Poluru' },
  ]; }
