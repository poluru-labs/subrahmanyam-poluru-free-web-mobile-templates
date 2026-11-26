import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  protected readonly gallery = [
    { name: 'Revenue trend', type: 'Line', status: 'Published', owner: 'Rohan Poluru' },
    { name: 'Signup funnel', type: 'Bar', status: 'Published', owner: 'Ananya Poluru' },
    { name: 'Cohort heatmap', type: 'Matrix', status: 'Draft', owner: 'Meera Poluru' },
    { name: 'Latency bands', type: 'Area', status: 'Published', owner: 'Aarav Poluru' },
  ];
}