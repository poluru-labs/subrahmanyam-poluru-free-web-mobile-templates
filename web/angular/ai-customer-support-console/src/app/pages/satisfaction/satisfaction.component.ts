import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-satisfaction',
  templateUrl: './satisfaction.component.html',
  styleUrl: './satisfaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SatisfactionComponent {
  protected readonly rows: Array<{ survey: string; score: string; responses: string; period: string }> = [
    { survey: 'Post-resolve', score: '4.7', responses: '412', period: '30d' },
    { survey: 'NPS pulse', score: '42', responses: '188', period: 'Quarter' },
  ];
}
