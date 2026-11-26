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
    { path: '/incidents', label: 'Incidents', exact: false },
    { path: '/on-call', label: 'On-call', exact: false },
    { path: '/postmortems', label: 'Postmortems', exact: false },
  ];
  protected readonly heading = toSignal(this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), map(() => this.resolveHeading()), startWith(this.resolveHeading())), { initialValue: 'Overview' });
  protected initials(name: string): string { return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(); }
  private resolveHeading(): string { let route = this.router.routerState.root; while (route.firstChild) route = route.firstChild; return (route.snapshot.data['heading'] as string) ?? 'Overview'; }
}
