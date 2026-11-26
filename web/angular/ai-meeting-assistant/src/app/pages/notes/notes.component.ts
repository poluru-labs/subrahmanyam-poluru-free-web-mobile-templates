import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-notes', templateUrl: './notes.component.html', styleUrl: './notes.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class NotesComponent { protected readonly rows = [
    { decision: 'Ship v2 in Nov', meeting: 'Steering', loggedBy: 'Priya Poluru', date: 'Oct 24' },
    { decision: 'Defer mobile', meeting: 'Sprint review', loggedBy: 'Aarav Poluru', date: 'Oct 22' },
  ]; }
