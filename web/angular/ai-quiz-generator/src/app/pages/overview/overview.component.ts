import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent { protected readonly stats = [
    { label: 'Published quizzes', value: '28', trend: '+3', up: true },
    { label: 'Attempts today', value: '412', trend: '+48', up: true },
    { label: 'Avg. score', value: '78%', trend: '+2%', up: true },
    { label: 'Items to review', value: '11', trend: '+2', up: false },
  ]; }
