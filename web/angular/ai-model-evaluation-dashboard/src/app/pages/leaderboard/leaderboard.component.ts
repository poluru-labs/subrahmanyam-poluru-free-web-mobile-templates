import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-leaderboard', templateUrl: './leaderboard.component.html', styleUrl: './leaderboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class LeaderboardComponent { protected readonly rows = [
    { rank: '1', variant: 'router-a', score: '0.912', delta: '+0.02' },
    { rank: '2', variant: 'router-c', score: '0.904', delta: '+0.01' },
  ]; }
