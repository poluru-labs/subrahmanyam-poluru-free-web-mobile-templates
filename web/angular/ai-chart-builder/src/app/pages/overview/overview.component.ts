import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Charts published', value: '86', trend: '+9', up: true },
    { label: 'Dataset links', value: '34', trend: '+4', up: true },
    { label: 'Embed views', value: '12.4k', trend: '+18%', up: true },
    { label: 'Draft visuals', value: '7', trend: '−2', up: false },
  ];

  protected readonly types = [
    { name: 'Line', count: 28, pct: 62 },
    { name: 'Bar', count: 22, pct: 48 },
    { name: 'Area', count: 18, pct: 40 },
    { name: 'Scatter', count: 11, pct: 28 },
  ];

  protected readonly previews = [
    { title: 'Revenue trend', type: 'Line', dataset: 'finance_q4' },
    { title: 'Signup funnel', type: 'Bar', dataset: 'growth_weekly' },
    { title: 'Latency bands', type: 'Area', dataset: 'ops_metrics' },
  ];

  protected readonly embeds = [
    { host: 'docs.poluru-demo.com', chart: 'revenue-trend', views: 4201, owner: 'Meera Poluru' },
    { host: 'status.poluru-demo.com', chart: 'latency-bands', views: 1882, owner: 'Aarav Poluru' },
  ];

  protected readonly activity = [
    { time: '14:05', title: 'Dataset linked', detail: 'Rohan Poluru · growth_weekly' },
    { time: '13:40', title: 'Embed refreshed', detail: 'Ananya Poluru · revenue-trend' },
    { time: '12:58', title: 'Draft saved', detail: 'Meera Poluru · cohort-heatmap' },
  ];
}