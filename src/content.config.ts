import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/articles',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200), // Required field for the article description
      tags: z.array(z.string()).default([]), // Required field for tags
      related: z.array(z.string()).default([]), // Required field for related articles
      date: z.coerce.date(), // Required field for the publication date
      updated: z.coerce.date().optional(), // Optional field for the last updated date
      cover: image().optional(),
    }),
});

export const collections = { articles };
