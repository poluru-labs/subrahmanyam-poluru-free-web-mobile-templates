import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-workbooks', templateUrl: './workbooks.component.html', styleUrl: './workbooks.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class WorkbooksComponent { protected readonly rows = [
    { workbook: 'Budget FY26', health: '91%', errors: '2', owner: 'Vikram Poluru' },
    { workbook: 'Headcount plan', health: '84%', errors: '5', owner: 'Ananya Poluru' },
  ]; }
