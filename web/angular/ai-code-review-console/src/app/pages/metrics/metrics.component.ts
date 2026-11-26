import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent {
  protected readonly rows: Array<{ metric: string; thisWeek: string; trend: string }> = [
    { metric: 'Comment threads / PR', thisWeek: '4.2', trend: '+0.3' },
    { metric: 'Time to first review', thisWeek: '52m', trend: '−8m' },
    { metric: 'Rework rate', thisWeek: '11%', trend: '−2%' },
  ];
}
