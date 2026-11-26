import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-episodes', templateUrl: './episodes.component.html', styleUrl: './episodes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class EpisodesComponent { protected readonly rows = [
    { episode: 'Ep. 48 Growth', stage: 'Edit', due: 'Oct 28', producer: 'Tara Poluru' },
    { episode: 'Ep. 49 Ops', stage: 'Mix', due: 'Oct 30', producer: 'Rohan Poluru' },
  ]; }
