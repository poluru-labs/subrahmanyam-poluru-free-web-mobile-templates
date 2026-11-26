import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-timeline', templateUrl: './timeline.component.html', styleUrl: './timeline.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class TimelineComponent { protected readonly rows = [
    { milestone: 'Rough cut', project: 'Product launch', due: 'Oct 28', status: 'On track' },
    { milestone: 'Color pass', project: 'Customer story', due: 'Oct 30', status: 'At risk' },
  ]; }
