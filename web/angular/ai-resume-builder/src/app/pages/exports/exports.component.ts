import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-exports', templateUrl: './exports.component.html', styleUrl: './exports.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExportsComponent { protected readonly rows = [
    { profile: 'Ananya Poluru', format: 'PDF', version: 'v4', when: 'Today' },
    { profile: 'Rohan Poluru', format: 'DOCX', version: 'v2', when: 'Yesterday' },
  ]; }
