import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrl: './datasets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetsComponent {
  protected readonly datasets = [
    { id: 'finance_q4', source: 'Warehouse', charts: 5, steward: 'Meera Poluru', refreshed: '2h ago' },
    { id: 'growth_weekly', source: 'Product API', charts: 3, steward: 'Ananya Poluru', refreshed: '6h ago' },
    { id: 'ops_metrics', source: 'Time series', charts: 4, steward: 'Aarav Poluru', refreshed: '1d ago' },
  ];
}