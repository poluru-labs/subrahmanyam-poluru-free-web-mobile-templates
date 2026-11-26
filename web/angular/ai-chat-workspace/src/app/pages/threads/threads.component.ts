import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadsComponent {
  protected readonly rows: Array<{ channel: string; subject: string; unread: string; owner: string }> = [
    { channel: '#billing', subject: 'Refund policy question', unread: '4', owner: 'Ananya Poluru' },
    { channel: '#onboarding', subject: 'Seat limit change', unread: '2', owner: 'Rohan Poluru' },
    { channel: '#ops', subject: 'Webhook retries', unread: '7', owner: 'Meera Poluru' },
  ];
}
