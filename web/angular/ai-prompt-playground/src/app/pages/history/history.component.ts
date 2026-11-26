import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-history', templateUrl: './history.component.html', styleUrl: './history.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class HistoryComponent { protected readonly rows = [
    { change: 'Tighten tone', template: 'Support reply', author: 'Meera Poluru', when: 'Today' },
    { change: 'Add locale var', template: 'Release notes', author: 'Aarav Poluru', when: 'Yesterday' },
  ]; }
