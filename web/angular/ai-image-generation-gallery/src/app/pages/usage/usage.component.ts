import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-usage', templateUrl: './usage.component.html', styleUrl: './usage.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class UsageComponent {
  protected readonly rows: Array<{ channel: string; downloads: string; period: string; owner: string }> = [
    { channel: 'Marketing site', downloads: '4,201', period: '30d', owner: 'Ananya Poluru' },
    { channel: 'Partner portal', downloads: '892', period: '30d', owner: 'Rohan Poluru' },
  ];
}
