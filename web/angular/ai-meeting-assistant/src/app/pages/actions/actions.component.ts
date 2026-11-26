import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-actions', templateUrl: './actions.component.html', styleUrl: './actions.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ActionsComponent { protected readonly rows = [
    { action: 'Publish roadmap', assignee: 'Rohan Poluru', due: 'Oct 28', status: 'Open' },
    { action: 'Finalize OKRs', assignee: 'Meera Poluru', due: 'Oct 30', status: 'Open' },
  ]; }
