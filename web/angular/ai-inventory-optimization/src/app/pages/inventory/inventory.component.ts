import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-inventory', templateUrl: './inventory.component.html', styleUrl: './inventory.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class InventoryComponent {
  protected readonly rows: Array<{ sKU: string; onHand: string; dOH: string; owner: string }> = [
    { sKU: 'SKU-9021', onHand: '820', dOH: '18', owner: 'Nila Poluru' },
    { sKU: 'SKU-4410', onHand: '2,400', dOH: '52', owner: 'Ananya Poluru' },
  ];
}
