import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { checkinLog, gates, memberNames } from '../core/data';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-checkins-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkins.page.html'
})
export class CheckinsPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly names = memberNames;
  protected readonly gates = gates;
  protected readonly log = signal(checkinLog);

  protected submit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const data = new FormData(form);
    const name = String(data.get('member') || 'Member');
    const gate = String(data.get('gate') || 'Gate A');
    const now = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date());
    this.log.update((rows) => [{ time: now, member: name, gate, plan: 'Walk-up' }, ...rows]);
    this.toast.show(`${name} checked in at ${gate}`);
    form.reset();
    form.classList.remove('was-validated');
  }
}
