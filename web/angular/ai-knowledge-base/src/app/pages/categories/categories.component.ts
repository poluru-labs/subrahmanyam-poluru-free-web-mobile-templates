import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-categories', templateUrl: './categories.component.html', styleUrl: './categories.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CategoriesComponent { protected readonly rows = [
    { category: 'Account', articles: '42', coverage: '96%', lead: 'Meera Poluru' },
    { category: 'Integrations', articles: '28', coverage: '88%', lead: 'Rohan Poluru' },
  ]; }
