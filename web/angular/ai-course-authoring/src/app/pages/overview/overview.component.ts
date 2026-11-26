import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Courses in draft', value: '11', trend: '+2', up: false },
    { label: 'Modules ready', value: '84', trend: '+12', up: true },
    { label: 'Review cycles', value: '6', trend: '−1', up: true },
    { label: 'Scheduled launches', value: '3', trend: '+1', up: true },
  ];
}
