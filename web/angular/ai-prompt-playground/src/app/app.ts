import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { environment } from '../environments/environment';
@Component({ selector: 'app-root', imports: [RouterOutlet, RouterLink, RouterLinkActive], templateUrl: './app.html', styleUrl: './app.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class App {
  private readonly router = inject(Router);
  protected readonly brand = environment.brand;
  protected readonly tagline = environment.tagline;
  protected readonly eyebrow = environment.eyebrow;
  protected readonly leadName = environment.leadName;
  protected readonly leadRole = environment.leadRole;
  protected readonly nav = [
    { path: '/', label: 'Overview', exact: true },
    { path: '/templates', label: 'Templates', exact: false },
    { path: '/runs', label: 'Runs', exact: false },
    { path: '/history', label: 'History', exact: false },
  ];
  protected readonly heading = toSignal(this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), map(() => this.resolveHeading()), startWith(this.resolveHeading())), { initialValue: 'Overview' });
  protected initials(n: string): string { return n.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(); }
  private resolveHeading(): string { let r = this.router.routerState.root; while (r.firstChild) r = r.firstChild; return (r.snapshot.data['heading'] as string) ?? 'Overview'; }
}
