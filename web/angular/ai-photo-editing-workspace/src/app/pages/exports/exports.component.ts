import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-exports', templateUrl: './exports.component.html', styleUrl: './exports.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExportsComponent { protected readonly rows = [
    { batch: 'EXP-884', count: '24', format: 'TIFF', logged: 'Meera Poluru' },
    { batch: 'EXP-881', count: '18', format: 'PNG', logged: 'Ananya Poluru' },
  ]; }
