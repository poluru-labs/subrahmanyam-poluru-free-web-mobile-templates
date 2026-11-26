import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsComponent {
  protected readonly items = [
    { name: 'Logo lockup', format: 'SVG', version: '3.2', owner: 'Ananya Poluru', status: 'Approved' },
    { name: 'App icon set', format: 'PNG', version: '2.0', owner: 'Meera Poluru', status: 'In review' },
    { name: 'Partner lockup', format: 'PDF', version: '1.4', owner: 'Rohan Poluru', status: 'Draft' },
    { name: 'Illustration pack', format: 'Figma', version: '4.1', owner: 'Ananya Poluru', status: 'Approved' },
  ];
}