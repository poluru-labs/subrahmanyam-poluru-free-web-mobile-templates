import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-gallery', templateUrl: './gallery.component.html', styleUrl: './gallery.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class GalleryComponent {
  protected readonly rows: Array<{ asset: string; format: string; author: string; status: string }> = [
    { asset: 'Hero spring', format: 'PNG', author: 'Ananya Poluru', status: 'Live' },
    { asset: 'Product set A', format: 'WebP', author: 'Rohan Poluru', status: 'Draft' },
  ];
}
