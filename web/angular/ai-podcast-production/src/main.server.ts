import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { config } from './app/app.config.server';

/**
 * Server entry point used by the Angular SSR builder.
 * `config` is the browser providers plus the server renderer.
 */
const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
