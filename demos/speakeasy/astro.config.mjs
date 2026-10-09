// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cristianjm.com',
  base: '/demos/speakeasy',
  outDir: '../../dist/cristian-jimenez/browser/demos/speakeasy',
  vite: {
    plugins: [tailwindcss()],
  },
});
