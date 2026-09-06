import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { avatarClass, badgeClass, members } from '../core/data';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-members-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './members.page.html'
})
export class MembersPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly query = signal('');
  protected readonly plan = signal('all');
  protected readonly status = signal('all');
  protected readonly avatarClass = avatarClass;
  protected readonly badgeClass = badgeClass;
  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const plan = this.plan();
    const status = this.status();
    return members.filter((member) => {
      const text = `${member.name} ${member.id} ${member.planLabel} ${member.note}`.toLowerCase();
      return (!q || text.includes(q)) && (plan === 'all' || member.plan === plan) && (status === 'all' || member.status === status);
    });
  });

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected onPlan(event: Event): void {
    this.plan.set((event.target as HTMLSelectElement).value);
  }

  protected onStatus(event: Event): void {
    this.status.set((event.target as HTMLSelectElement).value);
  }

  protected checkIn(name: string): void {
    this.toast.show(`Check-in started for ${name}`);
  }

  protected freeze(name: string): void {
    this.toast.show(`${name} membership frozen`);
  }
}
