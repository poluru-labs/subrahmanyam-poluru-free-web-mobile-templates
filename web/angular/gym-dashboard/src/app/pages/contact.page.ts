import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.page.html'
})
export class ContactPageComponent {
  private readonly toast = inject(ToastService);

  protected submit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    this.toast.show('Message sent to club operations');
    form.reset();
    form.classList.remove('was-validated');
  }
}
