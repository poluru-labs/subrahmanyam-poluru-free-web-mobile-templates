import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-scripts', templateUrl: './scripts.component.html', styleUrl: './scripts.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ScriptsComponent { protected readonly rows = [
    { script: 'Launch read', words: '420', status: 'Approved', author: 'Priya Poluru' },
    { script: 'Safety line', words: '88', status: 'Review', author: 'Sana Poluru' },
  ]; }
