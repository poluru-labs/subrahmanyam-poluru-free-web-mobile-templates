import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-incidents', templateUrl: './incidents.component.html', styleUrl: './incidents.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class IncidentsComponent {
  protected readonly rows: Array<{ incident: string; severity: string; commander: string; status: string }> = [
    { incident: 'INC-441', severity: 'SEV1', commander: 'Rohan Poluru', status: 'Mitigating' },
    { incident: 'INC-438', severity: 'SEV2', commander: 'Ananya Poluru', status: 'Monitoring' },
  ];
}
