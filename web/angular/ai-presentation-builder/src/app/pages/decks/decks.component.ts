import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-decks', templateUrl: './decks.component.html', styleUrl: './decks.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DecksComponent { protected readonly rows = [
    { deck: 'Q4 roadmap', slides: '32', status: 'Review', owner: 'Meera Poluru' },
    { deck: 'Customer kickoff', slides: '18', status: 'Draft', owner: 'Ananya Poluru' },
  ]; }
