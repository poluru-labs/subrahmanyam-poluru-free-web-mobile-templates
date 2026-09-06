import { ChangeDetectionStrategy, Component, HostListener, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { navClub, navTemplate, staff } from './core/data';
import { ToastService } from './core/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  protected readonly toast = inject(ToastService);
  protected readonly staff = staff;
  protected readonly navClub = navClub;
  protected readonly navTemplate = navTemplate;
  protected readonly sidebarOpen = signal(false);
  protected readonly query = signal('');
  protected readonly crumb = signal('Dashboard');
  protected readonly section = signal('Home');

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => {
        this.sidebarOpen.set(false);
        const item = [...navClub, ...navTemplate].find((entry) =>
          entry.exact ? event.urlAfterRedirects === '/' : event.urlAfterRedirects.startsWith(entry.path)
        );
        this.crumb.set(item?.label ?? 'Dashboard');
        this.section.set(item?.group ?? 'Home');
        this.title.setTitle(`${item?.label ?? 'Dashboard'} — Forge Athletic`);
      });

    effect(() => {
      const open = this.sidebarOpen();
      document.body.style.overflow = open && window.innerWidth < 992 ? 'hidden' : '';
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.sidebarOpen.set(false);
  }

  protected setSidebar(open: boolean): void {
    this.sidebarOpen.set(open);
  }

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected search(): void {
    const q = this.query().trim();
    if (q) this.toast.show(`Search for “${q}” — open Members or Classes`);
  }
}
