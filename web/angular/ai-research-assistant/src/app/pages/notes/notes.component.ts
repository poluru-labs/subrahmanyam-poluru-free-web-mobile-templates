import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-notes', templateUrl: './notes.component.html', styleUrl: './notes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class NotesComponent { protected readonly rows = [
    { note: 'Chapter 3 summary', source: 'Urban mobility review', theme: 'Transit', author: 'Kavita Poluru' },
    { note: 'Budget table', source: 'Policy brief 2024', theme: 'Funding', author: 'Rohan Poluru' },
  ]; }
