import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-drafts', templateUrl: './drafts.component.html', styleUrl: './drafts.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DraftsComponent {
  protected readonly rows: Array<{ subject: string; author: string; review: string; updated: string }> = [
    { subject: 'Your invoice is ready', author: 'Meera Poluru', review: 'Pending', updated: 'Today' },
    { subject: 'Welcome sequence', author: 'Aarav Poluru', review: 'Approved', updated: 'Yesterday' },
  ];
}
