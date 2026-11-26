import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-vendors', templateUrl: './vendors.component.html', styleUrl: './vendors.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class VendorsComponent {
  protected readonly rows: Array<{ vendor: string; quote: string; eTA: string; status: string }> = [
    { vendor: 'Oakline', quote: '$4,200', eTA: 'Nov 12', status: 'Approved' },
    { vendor: 'Lumen Co', quote: '$890', eTA: 'Nov 08', status: 'Pending' },
  ];
}
