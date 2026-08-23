import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = dirname(fileURLToPath(import.meta.url));

const pages = [
  'index',
  'about',
  'listings',
  'listing-detail',
  'post-classified',
  'categories',
  'jobs',
  'clinics',
  'equipment',
  'cme-events',
  'pricing',
  'blog',
  'contact',
  'login',
  'register',
  'dashboard',
  'faq',
  'terms',
  'privacy',
];

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((name) => [
          name,
          resolve(rootDir, `${name}.html`),
        ]),
      ),
    },
  },
  server: {
    port: 5174,
    open: '/index.html',
  },
});
