import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-inventory',
  templateUrl: './page-inventory.component.html',
  styleUrl: './page-inventory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageInventoryComponent {
  protected readonly pages = [
    { path: '/home', coverage: 100, findings: 2, owner: 'Tara Poluru' },
    { path: '/products', coverage: 94, findings: 5, owner: 'Kavita Poluru' },
    { path: '/checkout', coverage: 78, findings: 12, owner: 'Nila Poluru' },
    { path: '/support', coverage: 88, findings: 4, owner: 'Aarav Poluru' },
  ];
}