import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Brand assets', value: '248', trend: '+18', up: true },
    { label: 'Guideline views', value: '3,412', trend: '+12%', up: true },
    { label: 'Pending approvals', value: '14', trend: '−3', up: false },
    { label: 'Off-brand flags', value: '5', trend: '−2', up: false },
  ];

  protected readonly tokens = [
    { name: 'Violet 600', hex: '#6D28D9', usage: 'Primary' },
    { name: 'Lilac 100', hex: '#EDE9FE', usage: 'Surface' },
    { name: 'Ink 900', hex: '#1E1B2E', usage: 'Text' },
  ];

  protected readonly typescale = [
    { role: 'Display', spec: 'Lato 32 / 900' },
    { role: 'Heading', spec: 'Lato 20 / 700' },
    { role: 'Body', spec: 'Roboto 15 / 400' },
  ];

  protected readonly assets = [
    { name: 'Logo lockup', type: 'SVG', owner: 'Ananya Poluru' },
    { name: 'Social templates', type: 'Figma', owner: 'Meera Poluru' },
    { name: 'Deck theme', type: 'Keynote', owner: 'Rohan Poluru' },
  ];

  protected readonly activity = [
    { time: '10:48', title: 'Color token updated', detail: 'Kiran Poluru · Primary violet' },
    { time: '09:55', title: 'Asset approved', detail: 'Ananya Poluru · Logo lockup v3' },
    { time: '09:12', title: 'Flag resolved', detail: 'Rohan Poluru · Partner one-pager' },
  ];
}