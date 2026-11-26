import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-analytics', templateUrl: './analytics.component.html', styleUrl: './analytics.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class AnalyticsComponent { protected readonly rows = [
    { searchTerm: 'invoice export', hits: '412', trend: '+18%', period: '30d' },
    { searchTerm: 'SSO setup', hits: '288', trend: '+6%', period: '30d' },
  ]; }
