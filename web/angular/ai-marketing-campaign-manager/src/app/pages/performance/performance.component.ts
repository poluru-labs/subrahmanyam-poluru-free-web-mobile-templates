import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-performance', templateUrl: './performance.component.html', styleUrl: './performance.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PerformanceComponent { protected readonly rows = [
    { campaign: 'Q4 launch', cTR: '4.2%', conv: '3.1%', period: '7d' },
    { campaign: 'Retarget web', cTR: '2.8%', conv: '2.4%', period: '7d' },
  ]; }
