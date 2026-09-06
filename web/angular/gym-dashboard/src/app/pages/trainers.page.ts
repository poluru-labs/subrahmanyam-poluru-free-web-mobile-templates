import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { avatarClass, badgeClass, trainers } from '../core/data';

@Component({
  selector: 'app-trainers-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trainers.page.html'
})
export class TrainersPageComponent {
  protected readonly query = signal('');
  protected readonly focus = signal('all');
  protected readonly status = signal('all');
  protected readonly avatarClass = avatarClass;
  protected readonly badgeClass = badgeClass;
  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const focus = this.focus();
    const status = this.status();
    return trainers.filter((trainer) => {
      const text = `${trainer.name} ${trainer.role} ${trainer.note}`.toLowerCase();
      return (!q || text.includes(q)) && (focus === 'all' || trainer.focus === focus) && (status === 'all' || trainer.status === status);
    });
  });

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected onFocus(event: Event): void {
    this.focus.set((event.target as HTMLSelectElement).value);
  }

  protected onStatus(event: Event): void {
    this.status.set((event.target as HTMLSelectElement).value);
  }
}
