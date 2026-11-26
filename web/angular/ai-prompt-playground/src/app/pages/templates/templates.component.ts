import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-templates', templateUrl: './templates.component.html', styleUrl: './templates.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class TemplatesComponent { protected readonly rows = [
    { template: 'Support reply', version: 'v6', variables: '8', owner: 'Riya Poluru' },
    { template: 'Release notes', version: 'v3', variables: '5', owner: 'Ananya Poluru' },
  ]; }
