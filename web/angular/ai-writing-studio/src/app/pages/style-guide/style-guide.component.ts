import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-style-guide', templateUrl: './style-guide.component.html', styleUrl: './style-guide.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class StyleGuideComponent { protected readonly rows = [
    { rule: 'Oxford comma', section: 'Punctuation', updated: 'Today', curator: 'Mira Poluru' },
    { rule: 'Product naming', section: 'Voice', updated: 'Oct 24', curator: 'Meera Poluru' },
  ]; }
