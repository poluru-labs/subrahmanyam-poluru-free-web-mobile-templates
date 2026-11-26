import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-presets', templateUrl: './presets.component.html', styleUrl: './presets.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PresetsComponent { protected readonly rows = [
    { preset: 'Warm skin', uses: '412', lastUsed: 'Today', owner: 'Dev Poluru' },
    { preset: 'Catalog flat', uses: '288', lastUsed: 'Yesterday', owner: 'Rohan Poluru' },
  ]; }
