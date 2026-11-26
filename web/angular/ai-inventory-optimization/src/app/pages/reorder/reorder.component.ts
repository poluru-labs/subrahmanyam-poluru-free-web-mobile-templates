import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-reorder', templateUrl: './reorder.component.html', styleUrl: './reorder.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ReorderComponent {
  protected readonly rows: Array<{ sKU: string; rOP: string; suggestQty: string; planner: string }> = [
    { sKU: 'SKU-1180', rOP: '120', suggestQty: '400', planner: 'Rohan Poluru' },
    { sKU: 'SKU-3340', rOP: '60', suggestQty: '180', planner: 'Meera Poluru' },
  ];
}
