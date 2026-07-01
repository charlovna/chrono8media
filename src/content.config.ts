import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    client: z.string(),
    year: z.number(),
    summary: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })),
    hero_image: image(),
    order: z.number(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: ({ image }) => z.object({
    quote: z.string(),
    author_name: z.string(),
    author_role: z.string(),
    author_company: z.string(),
    headshot: image().optional(),
    order: z.number(),
  }),
});

const heroOptions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hero-options' }),
  schema: z.object({
    headline: z.string(),
    is_default: z.boolean(),
  }),
});

const siteSettings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/site-settings' }),
  schema: z.object({
    eyebrow: z.string(),
    ig_handle: z.string(),
    ig_behold_feed_id: z.string(),
    footer_copy: z.string(),
    notify_to_email: z.string().email(),
  }),
});

export const collections = {
  'case-studies': caseStudies,
  testimonials,
  'hero-options': heroOptions,
  'site-settings': siteSettings,
};
