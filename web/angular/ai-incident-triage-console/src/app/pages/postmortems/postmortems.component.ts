import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-postmortems', templateUrl: './postmortems.component.html', styleUrl: './postmortems.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PostmortemsComponent {
  protected readonly rows: Array<{ incident: string; due: string; owner: string; state: string }> = [
    { incident: 'INC-420', due: 'Oct 28', owner: 'Rohan Poluru', state: 'Draft' },
    { incident: 'INC-401', due: 'Done', owner: 'Meera Poluru', state: 'Published' },
  ];
}
