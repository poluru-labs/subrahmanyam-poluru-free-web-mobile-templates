import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'In review', value: '19', trend: '+2', up: false },
    { label: 'Standard match %', value: '94.2%', trend: '+1.1%', up: true },
    { label: 'Deviations', value: '27', trend: '−4', up: true },
    { label: 'Awaiting counsel', value: '6', trend: '−1', up: true },
  ];
}
