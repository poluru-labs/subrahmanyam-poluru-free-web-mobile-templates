import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-screening', templateUrl: './screening.component.html', styleUrl: './screening.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ScreeningComponent { protected readonly rows = [
    { rubric: 'Eng core', role: 'Platform engineer', score: '4.2', reviewer: 'Ananya Poluru' },
    { rubric: 'Leadership', role: 'Support lead', score: '3.8', reviewer: 'Dev Poluru' },
  ]; }
