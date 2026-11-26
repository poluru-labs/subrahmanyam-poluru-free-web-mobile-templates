import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-moodboards', templateUrl: './moodboards.component.html', styleUrl: './moodboards.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class MoodboardsComponent {
  protected readonly rows: Array<{ board: string; palette: string; items: string; owner: string }> = [
    { board: 'Living warm', palette: 'Terracotta', items: '24', owner: 'Rohan Poluru' },
    { board: 'Kitchen minimal', palette: 'Slate', items: '18', owner: 'Meera Poluru' },
  ];
}
