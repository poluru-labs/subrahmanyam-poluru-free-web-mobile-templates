import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { badgeClass, dues, plans } from '../core/data';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-memberships-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memberships.page.html'
})
export class MembershipsPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly plans = plans;
  protected readonly dues = dues;
  protected readonly badgeClass = badgeClass;

  protected act(action: 'remind' | 'unfreeze' | 'freeze', name: string): void {
    if (action === 'remind') this.toast.show(`Reminder sent to ${name}`);
    else if (action === 'unfreeze') this.toast.show(`${name} membership unfrozen`);
    else this.toast.show(`${name} membership frozen`);
  }
}
