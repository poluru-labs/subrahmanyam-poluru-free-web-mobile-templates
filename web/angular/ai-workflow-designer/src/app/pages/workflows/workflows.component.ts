import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-workflows', templateUrl: './workflows.component.html', styleUrl: './workflows.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class WorkflowsComponent { protected readonly rows = [
    { workflow: 'Vendor onboarding', steps: '12', status: 'Live', owner: 'Rohan Poluru' },
    { workflow: 'Refund handling', steps: '8', status: 'Draft', owner: 'Meera Poluru' },
  ]; }
