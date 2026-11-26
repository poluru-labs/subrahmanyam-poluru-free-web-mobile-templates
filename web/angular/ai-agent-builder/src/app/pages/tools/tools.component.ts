import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsComponent {
  protected readonly tools = [
    { name: 'slack-notify', type: 'HTTP', scope: 'Workspace', maintainer: 'Kavita Poluru', agents: 7 },
    { name: 'postgres-query', type: 'Data', scope: 'Read-only', maintainer: 'Rohan Poluru', agents: 5 },
    { name: 's3-export', type: 'Storage', scope: 'Bucket', maintainer: 'Tara Poluru', agents: 3 },
    { name: 'calendar-slot', type: 'API', scope: 'Org', maintainer: 'Priya Poluru', agents: 4 },
  ];
}