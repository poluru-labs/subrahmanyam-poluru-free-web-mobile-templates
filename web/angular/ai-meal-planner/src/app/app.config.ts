import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

/**
 * Providers shared by the browser and the server.
 * Server-only providers are added in `app.config.server.ts`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Fetch works during server rendering; `HttpClient` from XHR does not.
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      // Binds route params and data onto component inputs (`input()` / `@Input`).
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    // Replays the browser events that happened before hydration finished.
    provideClientHydration(withEventReplay()),
  ],
};
