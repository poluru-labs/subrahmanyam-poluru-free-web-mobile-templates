import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrl: './datasets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetsComponent {
  protected readonly rows: Array<{ dataset: string; source: string; rows: string; steward: string }> = [
    { dataset: 'orders_fact', source: 'Warehouse', rows: '4.2M', steward: 'Aarav Poluru' },
    { dataset: 'web_events', source: 'Stream', rows: '890M', steward: 'Meera Poluru' },
  ];
}
