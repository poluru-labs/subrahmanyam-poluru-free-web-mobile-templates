import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrl: './notebooks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotebooksComponent {
  protected readonly rows: Array<{ notebook: string; runtime: string; updated: string; author: string }> = [
    { notebook: 'funnel_explore', runtime: 'Python', updated: 'Today', author: 'Aarav Poluru' },
    { notebook: 'pricing_sim', runtime: 'SQL', updated: 'Yesterday', author: 'Meera Poluru' },
  ];
}
