import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-delivery', templateUrl: './delivery.component.html', styleUrl: './delivery.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DeliveryComponent {
  protected readonly rows: Array<{ campaign: string; sent: string; bounced: string; rate: string }> = [
    { campaign: 'Q4 renewal', sent: '11,842', bounced: '132', rate: '98.9%' },
    { campaign: 'Newsletter', sent: '4,201', bounced: '58', rate: '98.6%' },
  ];
}
