import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent {
  protected readonly rows: Array<{ thread: string; priority: string; assignee: string; status: string }> = [
    { thread: 'Enterprise renewal', priority: 'High', assignee: 'Priya Poluru', status: 'Open' },
    { thread: 'SSO configuration', priority: 'Medium', assignee: 'Ananya Poluru', status: 'Waiting' },
    { thread: 'Invoice export', priority: 'Low', assignee: 'Rohan Poluru', status: 'Open' },
  ];
}
