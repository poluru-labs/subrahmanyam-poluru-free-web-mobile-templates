import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Datasets connected', value: '28', trend: '+3', up: true },
    { label: 'Reports run', value: '156', trend: '+22', up: true },
    { label: 'Data quality score', value: '91.4%', trend: '+1.2%', up: true },
    { label: 'Failed jobs', value: '4', trend: '−2', up: true },
  ];
}
