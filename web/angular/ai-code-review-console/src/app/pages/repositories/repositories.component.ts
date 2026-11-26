import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {
  protected readonly rows: Array<{ repository: string; openPRs: string; coverage: string; lead: string }> = [
    { repository: 'platform-api', openPRs: '8', coverage: '87%', lead: 'Dev Poluru' },
    { repository: 'web-app', openPRs: '6', coverage: '92%', lead: 'Ananya Poluru' },
    { repository: 'data-pipeline', openPRs: '4', coverage: '81%', lead: 'Rohan Poluru' },
  ];
}
