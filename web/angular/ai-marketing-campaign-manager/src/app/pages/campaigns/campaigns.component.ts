import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-campaigns', templateUrl: './campaigns.component.html', styleUrl: './campaigns.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CampaignsComponent { protected readonly rows = [
    { campaign: 'Q4 launch', channel: 'Email', budget: '$12k', owner: 'Ananya Poluru' },
    { campaign: 'Retarget web', channel: 'Paid', budget: '$8k', owner: 'Rohan Poluru' },
  ]; }
