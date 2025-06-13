import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark, spectreLight } from './src/ec-theme';

const {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_MAPPING,
  GISCUS_STRICT,
  GISCUS_REACTIONS_ENABLED,
  GISCUS_EMIT_METADATA,
  GISCUS_LANG
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://quartzeast.github.io',
  output: 'static',  integrations: [
    expressiveCode({
      themes: [spectreDark, spectreLight],
      customizeTheme: (theme) => {
        if (theme.name === 'Spectre Dark') {
          theme.name = 'dark';
        } else if (theme.name === 'Spectre Light') {
          theme.name = 'light';
        }
      },
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'quartz',
      openGraph: {
        home: {
          title: 'quartz',
        },
        blog: {
          title: '文章',
        },
        projects: {
          title: '项目'
        }
      },
      // giscus: {
      //   repository: GISCUS_REPO,
      //   repositoryId: GISCUS_REPO_ID,
      //   category: GISCUS_CATEGORY,
      //   categoryId: GISCUS_CATEGORY_ID,
      //   mapping: GISCUS_MAPPING as any,
      //   strict: GISCUS_STRICT === "true",
      //   reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true",
      //   emitMetadata: GISCUS_EMIT_METADATA === "true",
      //   lang: GISCUS_LANG,
      // }
    })
  ]
});

export default config;