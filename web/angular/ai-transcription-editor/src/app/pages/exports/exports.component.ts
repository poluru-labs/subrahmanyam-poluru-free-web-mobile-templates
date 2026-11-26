import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-exports', templateUrl: './exports.component.html', styleUrl: './exports.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExportsComponent { protected readonly rows = [
    { export: 'Town hall v2', format: 'SRT', words: '8.4k', sent: 'Today' },
    { export: 'Support 884', format: 'DOCX', words: '3.1k', sent: 'Yesterday' },
  ]; }
