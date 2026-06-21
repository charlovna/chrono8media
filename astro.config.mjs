import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

// CF_PAGES=1 is injected automatically by Cloudflare Pages CI.
// Locally on Windows + Node 24, the @cloudflare/vite-plugin workerd runner
// has a CJS interop bug that crashes builds. Use the Node adapter locally
// so SSR routes compile; use the Cloudflare adapter for actual deployment.
const isCloudflare = process.env.CF_PAGES === '1';

export default defineConfig({
  adapter: isCloudflare
    ? cloudflare({ platformProxy: { enabled: false } })
    : node({ mode: 'standalone' }),
  site: 'https://chrono8media.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
