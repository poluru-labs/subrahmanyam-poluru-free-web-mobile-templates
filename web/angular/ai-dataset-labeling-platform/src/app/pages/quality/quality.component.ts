import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-quality', templateUrl: './quality.component.html', styleUrl: './quality.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class QualityComponent {
  protected readonly rows: Array<{ dispute: string; dataset: string; reviewers: string; status: string }> = [
    { dispute: 'Boundary mismatch', dataset: 'Retail images', reviewers: '2', status: 'Open' },
    { dispute: 'Class overlap', dataset: 'SKU tags', reviewers: '3', status: 'Resolved' },
  ];
}
