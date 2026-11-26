import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-campaigns', templateUrl: './campaigns.component.html', styleUrl: './campaigns.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CampaignsComponent {
  protected readonly rows: Array<{ campaign: string; audience: string; status: string; owner: string }> = [
    { campaign: 'Q4 renewal', audience: '12k', status: 'Scheduled', owner: 'Ananya Poluru' },
    { campaign: 'Product launch', audience: '8k', status: 'Draft', owner: 'Rohan Poluru' },
  ];
}
