import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { alerts, avatarClass, badgeClass, classes, kpis, recentCheckins, zones } from '../core/data';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.page.html'
})
export class DashboardPageComponent {
  protected readonly clock = signal('');
  protected readonly kpis = kpis;
  protected readonly classes = classes;
  protected readonly zones = zones;
  protected readonly alerts = alerts;
  protected readonly checkins = recentCheckins;
  protected readonly avatarClass = avatarClass;
  protected readonly badgeClass = badgeClass;

  constructor() {
    const fmt = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    const tick = () => this.clock.set(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    inject(DestroyRef).onDestroy(() => window.clearInterval(id));
  }
}
