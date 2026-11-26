import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-skus', templateUrl: './skus.component.html', styleUrl: './skus.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SkusComponent {
  protected readonly rows: Array<{ sKU: string; variance: string; fC: string; risk: string }> = [
    { sKU: 'SKU-4410', variance: '+8%', fC: '2.4k', risk: 'Low' },
    { sKU: 'SKU-9021', variance: '−14%', fC: '890', risk: 'High' },
  ];
}
