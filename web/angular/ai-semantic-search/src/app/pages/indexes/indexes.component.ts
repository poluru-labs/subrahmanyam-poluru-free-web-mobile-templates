import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-indexes', templateUrl: './indexes.component.html', styleUrl: './indexes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class IndexesComponent { protected readonly rows = [
    { index: 'docs-prod', records: '840k', freshness: '2h ago', steward: 'Ananya Poluru' },
    { index: 'help-center', records: '120k', freshness: '6h ago', steward: 'Meera Poluru' },
  ]; }
