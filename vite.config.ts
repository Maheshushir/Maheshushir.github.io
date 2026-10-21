import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { FEATURED, SITE_URL } from './lib/content';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The app is a single page, but crawlers and link previews read raw HTML.
// After the build, write one index.html per case study with its own title,
// description, canonical URL and preview image, plus a sitemap.
function staticRoutes(): Plugin {
  return {
    name: 'static-routes',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

      for (const p of FEATURED) {
        const url = `${SITE_URL}/work/${p.slug}`;
        const title = escape(`${p.title} — Case study | Mahesh Ushir`);
        const desc = escape(p.problem);
        // og.png stays as the preview image: some networks (LinkedIn) ignore WebP.
        const html = shell
          .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${desc}"`)
          .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
          .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`)
          .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`)
          .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${desc}"`)
          .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${desc}"`)
          .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
          .replace(/(<meta property="og:type" content=")[^"]*"/, `$1article"`);
        const dir = path.join(dist, 'work', p.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }

      const today = new Date().toISOString().slice(0, 10);
      const urls = [SITE_URL + '/', ...FEATURED.map((p) => `${SITE_URL}/work/${p.slug}`)];
      fs.writeFileSync(
        path.join(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`)
          .join('\n')}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), tailwindcss(), staticRoutes()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
