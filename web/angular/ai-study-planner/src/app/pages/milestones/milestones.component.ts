import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-milestones', templateUrl: './milestones.component.html', styleUrl: './milestones.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class MilestonesComponent { protected readonly rows = [
    { milestone: 'Lab report', due: 'Oct 28', status: 'Open', student: 'Rohan Poluru' },
    { milestone: 'Chapter 7 quiz', due: 'Oct 30', status: 'Ready', student: 'Meera Poluru' },
  ]; }
