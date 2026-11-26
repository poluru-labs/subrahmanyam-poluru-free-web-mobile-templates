import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-warehouses', templateUrl: './warehouses.component.html', styleUrl: './warehouses.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class WarehousesComponent {
  protected readonly rows: Array<{ site: string; utilization: string; sKUs: string; lead: string }> = [
    { site: 'West DC', utilization: '78%', sKUs: '1,402', lead: 'Nila Poluru' },
    { site: 'East DC', utilization: '64%', sKUs: '1,102', lead: 'Aarav Poluru' },
  ];
}
