import { defineConfig } from 'vite';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

/** Serve .jsx as raw source for in-browser Babel Standalone (dev + build copy). */
function rawJsxPlugin() {
  return {
    name: 'raw-jsx',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent((req.url ?? '').split('?')[0]);
        if (!pathname.endsWith('.jsx')) return next();

        const filePath = resolve(root, pathname.replace(/^\//, ''));
        if (!existsSync(filePath)) return next();

        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        res.end(readFileSync(filePath));
      });
    },
    generateBundle() {
      for (const file of readdirSync(root)) {
        if (file.endsWith('.jsx')) {
          this.emitFile({
            type: 'asset',
            fileName: file,
            source: readFileSync(resolve(root, file)),
          });
        }
      }
      // Classic scripts referenced by absolute path from nested HTML pages
      for (const file of ['image-slot.js']) {
        const filePath = resolve(root, file);
        if (existsSync(filePath)) {
          this.emitFile({
            type: 'asset',
            fileName: file,
            source: readFileSync(filePath),
          });
        }
      }
    },

  };
}

const caseStudies = [
  'ai-meeting-brief',
  'event-management-saas',
  'healthcare-memory-care',
  'nudge',
  'rto-guard',
  'tanvish-wellness',
];

export default defineConfig({
  plugins: [rawJsxPlugin()],
  server: {
    open: '/index.html',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        portfolio: resolve(root, 'Portfolio.html'),
        creative: resolve(root, 'creative/index.html'),
        ...Object.fromEntries(
          caseStudies.map((name) => [
            name,
            resolve(root, `case-studies/${name}.html`),
          ])
        ),
      },
    },
  },
});

