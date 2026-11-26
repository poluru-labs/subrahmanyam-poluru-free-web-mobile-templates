import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  protected readonly rows: Array<{ setting: string; value: string; owner: string }> = [
    { setting: 'Business hours', value: 'Mon–Fri 8–18 UTC', owner: 'Priya Poluru' },
    { setting: 'SLA target', value: '15 min first reply', owner: 'Meera Poluru' },
    { setting: 'Auto-assign rule', value: 'Round robin', owner: 'Ananya Poluru' },
  ];
}
