import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-speakers', templateUrl: './speakers.component.html', styleUrl: './speakers.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SpeakersComponent { protected readonly rows = [
    { speaker: 'Meera Poluru', segments: '42', confidence: 'High', taggedBy: 'Nila Poluru' },
    { speaker: 'Rohan Poluru', segments: '28', confidence: 'Medium', taggedBy: 'Ananya Poluru' },
  ]; }
