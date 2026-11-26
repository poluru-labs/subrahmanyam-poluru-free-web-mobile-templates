import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-pages', templateUrl: './pages.component.html', styleUrl: './pages.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PagesComponent { protected readonly rows = [
    { page: '/pricing', score: '88', rank: '4.2', owner: 'Rohan Poluru' },
    { page: '/docs/start', score: '76', rank: '6.1', owner: 'Meera Poluru' },
  ]; }
