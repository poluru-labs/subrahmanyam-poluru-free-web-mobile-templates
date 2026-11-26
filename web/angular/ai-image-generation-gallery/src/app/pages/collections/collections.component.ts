import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-collections', templateUrl: './collections.component.html', styleUrl: './collections.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CollectionsComponent {
  protected readonly rows: Array<{ collection: string; assets: string; license: string; curator: string }> = [
    { collection: 'Brand pack Q4', assets: '48', license: 'Internal', curator: 'Mira Poluru' },
    { collection: 'Partner kit', assets: '22', license: 'Restricted', curator: 'Meera Poluru' },
  ];
}
