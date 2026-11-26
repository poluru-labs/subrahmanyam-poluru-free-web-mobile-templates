import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

// Browser entry point. The server uses `main.server.ts` instead.
bootstrapApplication(App, appConfig).catch((error: unknown) => {
  console.error(error);
});
