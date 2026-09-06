import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { classes } from '../core/data';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-classes-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './classes.page.html'
})
export class ClassesPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly query = signal('');
  protected readonly studio = signal('all');
  protected readonly status = signal('all');
  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const studio = this.studio();
    const status = this.status();
    return classes.filter((row) => {
      const text = `${row.name} ${row.coach} ${row.studio}`.toLowerCase();
      return (!q || text.includes(q)) && (studio === 'all' || row.studioKey === studio) && (status === 'all' || row.status === status);
    });
  });

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected onStudio(event: Event): void {
    this.studio.set((event.target as HTMLSelectElement).value);
  }

  protected onStatus(event: Event): void {
    this.status.set((event.target as HTMLSelectElement).value);
  }

  protected act(action: 'book' | 'waitlist' | 'cancel', name: string): void {
    if (action === 'waitlist') this.toast.show(`${name} — added to waitlist`);
    else if (action === 'cancel') this.toast.show(`${name} cancelled for this member`);
    else this.toast.show(`${name} booked`);
  }
}
