import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-plans', templateUrl: './plans.component.html', styleUrl: './plans.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PlansComponent { protected readonly rows = [
    { plan: 'Chem midterm', subject: 'Chemistry', progress: '68%', owner: 'Tara Poluru' },
    { plan: 'Calc problem set', subject: 'Calculus', progress: '54%', owner: 'Ananya Poluru' },
  ]; }
