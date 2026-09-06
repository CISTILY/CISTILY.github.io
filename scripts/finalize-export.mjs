import fs from 'node:fs';
import path from 'node:path';

// Vinext exports dynamic paths without trailing slashes. Supply directory indexes
// too, so direct links and refreshes work on both GitHub Pages and static hosts.
const output = path.resolve('dist/client');
const manifest = JSON.parse(fs.readFileSync('dist/server/vinext-prerender.json', 'utf8'));
const routes = manifest.routes.filter(route => route.status === 'rendered').map(route => route.path || route.route);
const withinOutput = (name) => {
  const resolved = path.resolve(output, name);
  if (resolved !== output && !resolved.startsWith(output + path.sep)) throw new Error('Invalid export path: ' + name);
  return resolved;
};
for (const route of routes) {
  if (route === '/' || route === '/404') continue;
  const relative = route.replace(/^\//, '');
  const directory = withinOutput(relative);
  fs.mkdirSync(directory, { recursive: true });
  fs.copyFileSync(withinOutput(relative + '.html'), path.join(directory, 'index.html'));
  if (fs.existsSync(withinOutput(relative + '.rsc'))) fs.copyFileSync(withinOutput(relative + '.rsc'), path.join(directory, 'index.rsc'));
}

// Catch missing uploaded images, PDFs and broken local Markdown links before publish.
for (const route of routes) {
  const source = route === '/' ? 'index.html' : route.slice(1) + '.html';
  const html = fs.readFileSync(withinOutput(source), 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href || href.startsWith('#')) continue;
    const url = new URL(href, 'https://local.invalid' + (route.endsWith('/') ? route : route + '/'));
    if (url.origin !== 'https://local.invalid') continue;
    const relative = decodeURIComponent(url.pathname).replace(/^\//, '');
    const file = withinOutput(relative);
    const exists = fs.existsSync(file) && (fs.statSync(file).isFile() || fs.existsSync(path.join(file, 'index.html')));
    if (!exists && !fs.existsSync(file + '.html')) throw new Error(`[content] ${route}: không tìm thấy tài nguyên/đường dẫn ${href}. Kiểm tra file trong public hoặc đường dẫn Markdown.`);
  }
}
console.log(`Static export ready: ${routes.length} pages. Directory URLs and local links/assets verified.`);
