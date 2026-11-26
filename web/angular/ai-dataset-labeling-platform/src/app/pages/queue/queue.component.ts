import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-queue', templateUrl: './queue.component.html', styleUrl: './queue.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class QueueComponent {
  protected readonly rows: Array<{ batch: string; priority: string; assignee: string; remaining: string }> = [
    { batch: 'IMG-204', priority: 'High', assignee: 'Meera Poluru', remaining: '86' },
    { batch: 'TXT-118', priority: 'Medium', assignee: 'Mira Poluru', remaining: '42' },
  ];
}
