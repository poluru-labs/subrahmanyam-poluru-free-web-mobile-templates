import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-keywords', templateUrl: './keywords.component.html', styleUrl: './keywords.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class KeywordsComponent { protected readonly rows = [
    { keyword: 'workflow automation', position: '8', volume: '2.4k', trend: '+2' },
    { keyword: 'team templates', position: '14', volume: '1.1k', trend: '−1' },
  ]; }
