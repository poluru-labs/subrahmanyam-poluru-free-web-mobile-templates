import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-sources', templateUrl: './sources.component.html', styleUrl: './sources.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SourcesComponent { protected readonly rows = [
    { source: 'Urban mobility review', type: 'Journal', citations: '18', owner: 'Kavita Poluru' },
    { source: 'Policy brief 2024', type: 'Report', citations: '9', owner: 'Ananya Poluru' },
  ]; }
