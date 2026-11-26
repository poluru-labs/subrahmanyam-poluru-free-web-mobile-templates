import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-queries', templateUrl: './queries.component.html', styleUrl: './queries.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class QueriesComponent { protected readonly rows = [
    { query: 'refund policy', volume: '842', cTR: '52%', owner: 'Nila Poluru' },
    { query: 'api limits', volume: '612', cTR: '38%', owner: 'Rohan Poluru' },
  ]; }
