import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-audits', templateUrl: './audits.component.html', styleUrl: './audits.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class AuditsComponent { protected readonly rows = [
    { audit: 'Q4 close', workbook: 'Budget FY26', findings: '3', run: 'Today' },
    { audit: 'HC refresh', workbook: 'Headcount plan', findings: '7', run: 'Yesterday' },
  ]; }
