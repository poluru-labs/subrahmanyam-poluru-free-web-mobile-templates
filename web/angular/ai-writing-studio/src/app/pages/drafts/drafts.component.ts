import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-drafts', templateUrl: './drafts.component.html', styleUrl: './drafts.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DraftsComponent { protected readonly rows = [
    { draft: 'Q4 launch blog', words: '1,240', status: 'Review', author: 'Mira Poluru' },
    { draft: 'Help center refresh', words: '880', status: 'Draft', author: 'Ananya Poluru' },
  ]; }
