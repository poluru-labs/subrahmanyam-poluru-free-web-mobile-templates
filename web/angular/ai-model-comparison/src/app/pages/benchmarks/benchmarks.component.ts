import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-benchmarks', templateUrl: './benchmarks.component.html', styleUrl: './benchmarks.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class BenchmarksComponent { protected readonly rows = [
    { suite: 'QA set', runs: '28', best: '94.6%', updated: 'Today' },
    { suite: 'Routing set', runs: '19', best: '91.2%', updated: 'Yesterday' },
  ]; }
