import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Open reviews', value: '23', trend: '+4', up: false },
    { label: 'Median review time', value: '3.2h', trend: '−28m', up: true },
    { label: 'Merged this week', value: '41', trend: '+9', up: true },
    { label: 'Changes requested', value: '12', trend: '−3', up: true },
  ];
}
