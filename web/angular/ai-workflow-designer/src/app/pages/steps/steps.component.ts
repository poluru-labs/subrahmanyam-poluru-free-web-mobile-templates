import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-steps', templateUrl: './steps.component.html', styleUrl: './steps.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class StepsComponent { protected readonly rows = [
    { step: 'KYC verify', sLA: '24h', avgTime: '18h', steward: 'Ananya Poluru' },
    { step: 'Manager sign-off', sLA: '8h', avgTime: '6h', steward: 'Aarav Poluru' },
  ]; }
