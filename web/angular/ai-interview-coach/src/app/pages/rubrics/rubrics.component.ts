import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-rubrics', templateUrl: './rubrics.component.html', styleUrl: './rubrics.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RubricsComponent {
  protected readonly rows: Array<{ dimension: string; weight: string; avgScore: string; owner: string }> = [
    { dimension: 'Communication', weight: '25%', avgScore: '8.1', owner: 'Sana Poluru' },
    { dimension: 'Problem solving', weight: '35%', avgScore: '7.4', owner: 'Ananya Poluru' },
  ];
}
