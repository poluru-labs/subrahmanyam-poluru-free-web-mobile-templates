import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-adjustments', templateUrl: './adjustments.component.html', styleUrl: './adjustments.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class AdjustmentsComponent {
  protected readonly rows: Array<{ sKU: string; planner: string; delta: string; reason: string }> = [
    { sKU: 'SKU-9021', planner: 'Rohan Poluru', delta: '+12%', reason: 'Promo lift' },
    { sKU: 'SKU-1180', planner: 'Meera Poluru', delta: '−6%', reason: 'Season end' },
  ];
}
