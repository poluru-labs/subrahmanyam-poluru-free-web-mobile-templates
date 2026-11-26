import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-datasets', templateUrl: './datasets.component.html', styleUrl: './datasets.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DatasetsComponent { protected readonly rows = [
    { dataset: 'intent-gold', version: 'v5', rows: '12k', steward: 'Rohan Poluru' },
    { dataset: 'toxicity-holdout', version: 'v2', rows: '4k', steward: 'Meera Poluru' },
  ]; }
