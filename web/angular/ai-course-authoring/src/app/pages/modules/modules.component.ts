import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModulesComponent {
  protected readonly rows: Array<{ module: string; course: string; completion: string; reviewer: string }> = [
    { module: 'Lesson 4 quiz', course: 'Onboarding 101', completion: '72%', reviewer: 'Kavita Poluru' },
    { module: 'Lab setup', course: 'Security basics', completion: '100%', reviewer: 'Ananya Poluru' },
  ];
}
