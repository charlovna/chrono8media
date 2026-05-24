import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://chrono8media.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
