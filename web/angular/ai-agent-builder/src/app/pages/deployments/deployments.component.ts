import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrl: './deployments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeploymentsComponent {
  protected readonly deploys = [
    {
      env: 'production',
      agent: 'invoice-router',
      build: 'bld_9021',
      deployedBy: 'Nila Poluru',
      when: '2026-10-26 11:40',
      health: 'Healthy',
    },
    {
      env: 'staging',
      agent: 'support-triage',
      build: 'bld_9018',
      deployedBy: 'Aarav Poluru',
      when: '2026-10-26 09:12',
      health: 'Healthy',
    },
    {
      env: 'staging',
      agent: 'crm-sync',
      build: 'bld_9015',
      deployedBy: 'Meera Poluru',
      when: '2026-10-25 16:03',
      health: 'Degraded',
    },
  ];
}