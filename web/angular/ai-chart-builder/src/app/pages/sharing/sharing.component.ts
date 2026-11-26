import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrl: './sharing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharingComponent {
  protected readonly log = [
    { chart: 'revenue-trend', embedId: 'emb_7k2m', domain: 'docs.poluru-demo.com', views: 4201, lastSeen: 'Today 13:40' },
    { chart: 'latency-bands', embedId: 'emb_9p1x', domain: 'status.poluru-demo.com', views: 1882, lastSeen: 'Today 11:02' },
    { chart: 'signup-funnel', embedId: 'emb_3a8q', domain: 'intranet.poluru-demo.com', views: 612, lastSeen: 'Yesterday' },
  ];
}