import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-feedback', templateUrl: './feedback.component.html', styleUrl: './feedback.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class FeedbackComponent {
  protected readonly rows: Array<{ session: string; strength: string; gap: string; reviewer: string }> = [
    { session: 'PM-102', strength: 'Structure', gap: 'Metrics', reviewer: 'Rohan Poluru' },
    { session: 'ENG-88', strength: 'Depth', gap: 'Concision', reviewer: 'Meera Poluru' },
  ];
}
