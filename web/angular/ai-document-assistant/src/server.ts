import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * HTTP API for this app.
 * Register routes here, before static files and the Angular catch-all,
 * or those handlers will swallow the request.
 *
 * `GET /api/health` is the sample. Point new clients at `environment.apiBaseUrl`.
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Hashed build assets. `index: false` lets Angular render `/` itself.
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Every other URL is an Angular route.
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Listen only when this file is the process entry (or PM2 loaded it).
 * The CLI imports `reqHandler` instead of starting a second server.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/** Request handler used by `ng serve`, `ng build`, and some hosts. */
export const reqHandler = createNodeRequestHandler(app);
