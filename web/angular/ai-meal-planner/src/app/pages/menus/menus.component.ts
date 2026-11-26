import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-menus', templateUrl: './menus.component.html', styleUrl: './menus.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class MenusComponent { protected readonly rows = [
    { day: 'Mon', meals: '3', calories: '2,100', owner: 'Tara Poluru' },
    { day: 'Tue', meals: '3', calories: '1,950', owner: 'Ananya Poluru' },
  ]; }
