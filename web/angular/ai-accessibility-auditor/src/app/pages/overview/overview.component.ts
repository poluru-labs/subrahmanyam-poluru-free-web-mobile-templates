import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Open findings', value: '122', trend: '−14%', up: false },
    { label: 'WCAG coverage', value: '91.6%', trend: '+4.8%', up: true },
    { label: 'Resolved issues', value: '357', trend: '+22%', up: true },
    { label: 'Critical blockers', value: '6', trend: '−2', up: false },
  ];

  protected readonly categories = [
    { name: 'Color contrast', count: 48, pct: 72 },
    { name: 'Form labels', count: 31, pct: 55 },
    { name: 'Keyboard focus', count: 24, pct: 44 },
    { name: 'Alt text & media', count: 19, pct: 36 },
  ];

  protected readonly priorityPages = [
    { route: '/checkout', issues: 12, owner: 'Nila Poluru', status: 'In progress' },
    { route: '/account/settings', issues: 8, owner: 'Aarav Poluru', status: 'Review' },
    { route: '/help/contact', issues: 5, owner: 'Meera Poluru', status: 'Ready to verify' },
  ];

  protected readonly activity = [
    { time: '11:04', title: 'Contrast fix merged', detail: 'Kavita Poluru · Checkout primary button' },
    { time: '10:37', title: 'Finding assigned', detail: 'Rohan Poluru · Date picker label' },
    { time: '09:52', title: 'Page verified', detail: 'Tara Poluru · Help contact form' },
  ];
}