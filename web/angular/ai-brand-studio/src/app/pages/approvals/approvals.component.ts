import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprovalsComponent {
  protected readonly queue = [
    { item: 'Partner one-pager', requester: 'Rohan Poluru', reviewer: 'Kiran Poluru', status: 'Pending', due: 'Oct 28' },
    { item: 'Event booth banner', requester: 'Meera Poluru', reviewer: 'Ananya Poluru', status: 'Changes', due: 'Oct 27' },
    { item: 'Email header Q4', requester: 'Ananya Poluru', reviewer: 'Kiran Poluru', status: 'Approved', due: 'Oct 26' },
  ];
}