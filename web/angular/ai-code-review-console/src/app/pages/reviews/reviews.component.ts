import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
  protected readonly rows: Array<{ pr: string; repo: string; author: string; status: string }> = [
    { pr: '#842 auth middleware', repo: 'platform-api', author: 'Ananya Poluru', status: 'In review' },
    { pr: '#839 cache bust', repo: 'web-app', author: 'Rohan Poluru', status: 'Changes' },
    { pr: '#835 metric export', repo: 'data-pipeline', author: 'Meera Poluru', status: 'Approved' },
  ];
}
