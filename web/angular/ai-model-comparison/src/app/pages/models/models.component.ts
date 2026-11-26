import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-models', templateUrl: './models.component.html', styleUrl: './models.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ModelsComponent { protected readonly rows = [
    { variant: 'text-v3', latency: '420ms', accuracy: '92.1%', owner: 'Aarav Poluru' },
    { variant: 'text-v2', latency: '380ms', accuracy: '90.4%', owner: 'Rohan Poluru' },
  ]; }
