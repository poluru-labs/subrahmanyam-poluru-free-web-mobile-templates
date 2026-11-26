import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent {
  protected readonly rows: Array<{ ticket: string; priority: string; assignee: string; status: string }> = [
    { ticket: '#4821 Login loop', priority: 'High', assignee: 'Ananya Poluru', status: 'Open' },
    { ticket: '#4810 Invoice PDF', priority: 'Medium', assignee: 'Rohan Poluru', status: 'Waiting' },
    { ticket: '#4802 API timeout', priority: 'High', assignee: 'Meera Poluru', status: 'Escalated' },
  ];
}
