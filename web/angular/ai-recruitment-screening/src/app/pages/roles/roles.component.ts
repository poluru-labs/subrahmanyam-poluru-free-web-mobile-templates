import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-roles', templateUrl: './roles.component.html', styleUrl: './roles.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RolesComponent { protected readonly rows = [
    { role: 'Platform engineer', openings: '2', applicants: '34', hiringMgr: 'Aarav Poluru' },
    { role: 'Support lead', openings: '1', applicants: '19', hiringMgr: 'Kiran Poluru' },
  ]; }
