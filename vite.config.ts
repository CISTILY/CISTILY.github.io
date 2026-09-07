import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import path from 'node:path';
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [
    vinext(),
    {
      name: 'reload-markdown-content',
      configureServer(server) {
        const contentDirectory = path.resolve('content');
        server.watcher.add(contentDirectory);
        server.watcher.on('all', (event, file) => {
          const relative = path.relative(contentDirectory, file);
          if (
            ['add', 'change', 'unlink'].includes(event) &&
            !relative.startsWith('..') &&
            !path.isAbsolute(relative) &&
            file.endsWith('.md')
          ) {
            server.ws.send({ type: 'full-reload' });
          }
        });
      },
    },
  ],
});
