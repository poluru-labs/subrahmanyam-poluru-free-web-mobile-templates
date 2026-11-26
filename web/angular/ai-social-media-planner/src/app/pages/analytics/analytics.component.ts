import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-analytics', templateUrl: './analytics.component.html', styleUrl: './analytics.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class AnalyticsComponent { protected readonly rows = [
    { post: 'Product tips', reach: '12k', clicks: '840', week: 'W44' },
    { post: 'Hiring spotlight', reach: '8k', clicks: '412', week: 'W44' },
  ]; }
