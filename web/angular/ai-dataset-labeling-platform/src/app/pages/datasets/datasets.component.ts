import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-datasets', templateUrl: './datasets.component.html', styleUrl: './datasets.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DatasetsComponent {
  protected readonly rows: Array<{ dataset: string; items: string; lead: string; status: string }> = [
    { dataset: 'Retail images', items: '4,200', lead: 'Ananya Poluru', status: 'Active' },
    { dataset: 'Support transcripts', items: '2,100', lead: 'Rohan Poluru', status: 'Paused' },
  ];
}
