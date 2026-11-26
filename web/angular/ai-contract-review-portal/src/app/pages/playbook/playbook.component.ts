import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-playbook',
  templateUrl: './playbook.component.html',
  styleUrl: './playbook.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaybookComponent {
  protected readonly rows: Array<{ section: string; coverage: string; lastUpdated: string }> = [
    { section: 'Indemnity', coverage: '98%', lastUpdated: 'Oct 20' },
    { section: 'Payment terms', coverage: '96%', lastUpdated: 'Oct 18' },
    { section: 'Confidentiality', coverage: '100%', lastUpdated: 'Oct 12' },
  ];
}
