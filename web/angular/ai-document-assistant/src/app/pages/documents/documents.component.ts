import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-documents', templateUrl: './documents.component.html', styleUrl: './documents.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DocumentsComponent {
  protected readonly rows: Array<{ document: string; version: string; owner: string; status: string }> = [
    { document: 'Vendor MSA', version: 'v4', owner: 'Rohan Poluru', status: 'In review' },
    { document: 'Security policy', version: 'v2', owner: 'Meera Poluru', status: 'Approved' },
  ];
}
