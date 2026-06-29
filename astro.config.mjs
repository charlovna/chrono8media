import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

// Pick the Cloudflare adapter for any deploy build, the Node adapter locally.
//   - CF_PAGES=1 is injected automatically by classic Cloudflare Pages CI.
//   - DEPLOY_TARGET=cloudflare is set explicitly by the `cf:build` script, so
//     the Cloudflare adapter is used even in build environments that do NOT
//     inject CF_PAGES (e.g. the Workers/wrangler build runner we hit).
// Locally on Windows + Node 24, the @cloudflare/vite-plugin workerd runner has
// a CJS interop bug that crashes builds, so local `dev`/`build` stay on Node.
const isCloudflare =
  process.env.CF_PAGES === '1' || process.env.DEPLOY_TARGET === 'cloudflare';

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
