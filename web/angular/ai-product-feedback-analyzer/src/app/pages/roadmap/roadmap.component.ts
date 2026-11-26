import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-roadmap', templateUrl: './roadmap.component.html', styleUrl: './roadmap.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RoadmapComponent { protected readonly rows = [
    { initiative: 'Guided setup', theme: 'Onboarding', quarter: 'Q1', dRI: 'Kiran Poluru' },
    { initiative: 'Invoice export', theme: 'Billing', quarter: 'Q1', dRI: 'Aarav Poluru' },
  ]; }
