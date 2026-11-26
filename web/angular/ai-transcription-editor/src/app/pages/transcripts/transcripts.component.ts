import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-transcripts', templateUrl: './transcripts.component.html', styleUrl: './transcripts.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class TranscriptsComponent { protected readonly rows = [
    { file: 'Town hall Oct', duration: '58m', status: 'Proofing', editor: 'Nila Poluru' },
    { file: 'Support call 884', duration: '22m', status: 'Queued', editor: 'Ananya Poluru' },
  ]; }
