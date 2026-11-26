import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-formulas', templateUrl: './formulas.component.html', styleUrl: './formulas.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class FormulasComponent { protected readonly rows = [
    { pattern: 'SUMIF region', uses: '48', risk: 'Low', author: 'Vikram Poluru' },
    { pattern: 'VLOOKUP legacy', uses: '12', risk: 'Medium', author: 'Rohan Poluru' },
  ]; }
