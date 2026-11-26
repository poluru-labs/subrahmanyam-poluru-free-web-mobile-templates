import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-shopping', templateUrl: './shopping.component.html', styleUrl: './shopping.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ShoppingComponent { protected readonly rows = [
    { item: 'Spinach', qty: '2 bags', aisle: 'Produce', store: 'Local Co' },
    { item: 'Brown rice', qty: '1 kg', aisle: 'Grains', store: 'Local Co' },
  ]; }
