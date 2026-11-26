import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-approvals', templateUrl: './approvals.component.html', styleUrl: './approvals.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ApprovalsComponent { protected readonly rows = [
    { request: 'Austin hotels', amount: '$8.2k', status: 'Pending', approver: 'Aarav Poluru' },
    { request: 'Chicago flights', amount: '$2.4k', status: 'Approved', approver: 'Ananya Poluru' },
  ]; }
