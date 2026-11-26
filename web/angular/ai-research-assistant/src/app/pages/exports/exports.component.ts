import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-exports', templateUrl: './exports.component.html', styleUrl: './exports.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExportsComponent { protected readonly rows = [
    { export: 'Lit review bundle', format: 'PDF', pages: '42', exported: 'Meera Poluru' },
    { export: 'Citation map', format: 'CSV', pages: '—', exported: 'Kavita Poluru' },
  ]; }
