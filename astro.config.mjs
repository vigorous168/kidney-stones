import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://vigorous168.github.io/kidney-stones',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      features: {
        gfm: {
          footnotes: {
            label: '參考資料',
            backLabel: '回到內文 {reference}',
            backContent: '↩',
          },
        },
      },
    }),
  },
});
