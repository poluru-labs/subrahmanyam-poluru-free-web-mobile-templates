import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentsComponent {
  protected readonly agents = [
    {
      id: 'agt_8f2a',
      name: 'invoice-router',
      version: '3.2.0',
      owner: 'Nila Poluru',
      stage: 'Production',
      tools: 4,
    },
    {
      id: 'agt_71bc',
      name: 'support-triage',
      version: '1.8.1',
      owner: 'Aarav Poluru',
      stage: 'Validated',
      tools: 6,
    },
    {
      id: 'agt_3e19',
      name: 'crm-sync',
      version: '0.9.4',
      owner: 'Meera Poluru',
      stage: 'Draft',
      tools: 2,
    },
    {
      id: 'agt_55d0',
      name: 'onboarding-guide',
      version: '2.0.0',
      owner: 'Ananya Poluru',
      stage: 'Production',
      tools: 3,
    },
  ];
}