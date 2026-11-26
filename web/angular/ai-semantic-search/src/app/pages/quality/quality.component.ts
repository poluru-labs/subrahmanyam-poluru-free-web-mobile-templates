import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-quality', templateUrl: './quality.component.html', styleUrl: './quality.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class QualityComponent { protected readonly rows = [
    { query: 'legacy pricing', results: '0', issue: 'Zero results', reviewer: 'Nila Poluru' },
    { query: 'sso setup', results: '3', issue: 'Low CTR', reviewer: 'Aarav Poluru' },
  ]; }
