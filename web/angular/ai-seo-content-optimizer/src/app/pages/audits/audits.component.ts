import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-audits', templateUrl: './audits.component.html', styleUrl: './audits.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class AuditsComponent { protected readonly rows = [
    { issue: 'Missing meta desc', pages: '12', severity: 'High', assignee: 'Ananya Poluru' },
    { issue: 'Slow LCP', pages: '4', severity: 'Medium', assignee: 'Aarav Poluru' },
  ]; }
