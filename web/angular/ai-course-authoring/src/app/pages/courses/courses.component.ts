import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  protected readonly rows: Array<{ course: string; stage: string; owner: string; modules: string }> = [
    { course: 'Onboarding 101', stage: 'Draft', owner: 'Ananya Poluru', modules: '8/12' },
    { course: 'Security basics', stage: 'Review', owner: 'Rohan Poluru', modules: '10/10' },
    { course: 'Billing admin', stage: 'Ready', owner: 'Meera Poluru', modules: '6/6' },
  ];
}
