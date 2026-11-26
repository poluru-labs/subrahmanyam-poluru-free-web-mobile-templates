import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-templates', templateUrl: './templates.component.html', styleUrl: './templates.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class TemplatesComponent { protected readonly rows = [
    { template: 'Executive', sections: '8', uses: '42', steward: 'Vikram Poluru' },
    { template: 'Technical', sections: '7', uses: '36', steward: 'Ananya Poluru' },
  ]; }
