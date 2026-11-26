import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-vendors', templateUrl: './vendors.component.html', styleUrl: './vendors.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class VendorsComponent {
  protected readonly rows: Array<{ vendor: string; terms: string; open: string; owner: string }> = [
    { vendor: 'CloudHost', terms: 'Net 30', open: '$8,420', owner: 'Vikram Poluru' },
    { vendor: 'SupplyNet', terms: 'Net 45', open: '$2,100', owner: 'Ananya Poluru' },
  ];
}
