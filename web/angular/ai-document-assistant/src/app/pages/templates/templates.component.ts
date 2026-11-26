import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-templates', templateUrl: './templates.component.html', styleUrl: './templates.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class TemplatesComponent {
  protected readonly rows: Array<{ template: string; category: string; uses: string; maintainer: string }> = [
    { template: 'NDA standard', category: 'Legal', uses: '84', maintainer: 'Ananya Poluru' },
    { template: 'SOW brief', category: 'Sales', uses: '41', maintainer: 'Meera Poluru' },
  ];
}
