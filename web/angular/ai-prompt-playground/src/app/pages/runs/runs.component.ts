import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-runs', templateUrl: './runs.component.html', styleUrl: './runs.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RunsComponent { protected readonly rows = [
    { run: 'run-884', template: 'Support reply', outcome: 'Pass', reviewer: 'Riya Poluru' },
    { run: 'run-881', template: 'Release notes', outcome: 'Revise', reviewer: 'Rohan Poluru' },
  ]; }
