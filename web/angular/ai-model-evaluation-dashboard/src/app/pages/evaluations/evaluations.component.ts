import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-evaluations', templateUrl: './evaluations.component.html', styleUrl: './evaluations.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class EvaluationsComponent { protected readonly rows = [
    { run: 'eval-884', variant: 'router-a', f1: '0.908', owner: 'Dev Poluru' },
    { run: 'eval-881', variant: 'router-b', f1: '0.891', owner: 'Ananya Poluru' },
  ]; }
