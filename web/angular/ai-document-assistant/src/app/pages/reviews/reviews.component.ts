import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-reviews', templateUrl: './reviews.component.html', styleUrl: './reviews.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ReviewsComponent {
  protected readonly rows: Array<{ doc: string; reviewer: string; due: string; outcome: string }> = [
    { doc: 'Vendor MSA', reviewer: 'Ananya Poluru', due: 'Today', outcome: 'Pending' },
    { doc: 'Q4 handbook', reviewer: 'Aarav Poluru', due: 'Tomorrow', outcome: 'Changes' },
  ];
}
