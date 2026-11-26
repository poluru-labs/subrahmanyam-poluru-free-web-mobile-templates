import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-articles', templateUrl: './articles.component.html', styleUrl: './articles.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ArticlesComponent { protected readonly rows = [
    { title: 'Reset password', category: 'Account', views: '1,204', owner: 'Meera Poluru' },
    { title: 'Billing FAQ', category: 'Billing', views: '892', owner: 'Ananya Poluru' },
  ]; }
