import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrl: './guidelines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidelinesComponent {
  protected readonly sections = [
    { title: 'Logo usage', pages: 12, updated: 'Oct 24', owner: 'Kiran Poluru' },
    { title: 'Color system', pages: 8, updated: 'Oct 18', owner: 'Ananya Poluru' },
    { title: 'Voice & tone', pages: 6, updated: 'Oct 02', owner: 'Meera Poluru' },
    { title: 'Photography', pages: 10, updated: 'Sep 28', owner: 'Rohan Poluru' },
  ];
}