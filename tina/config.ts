import { defineConfig } from 'tinacms';

const BRANCH    = process.env.GITHUB_BRANCH ?? process.env.HEAD ?? 'main';
const CLIENT_ID = process.env.TINA_PUBLIC_CLIENT_ID ?? null;
const TOKEN     = process.env.TINA_TOKEN ?? null;

export default defineConfig({
  branch:   BRANCH,
  clientId: CLIENT_ID,
  token:    TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot:   'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ── Live collections (deployed, managed via TinaCloud) ──────
      {
        name:   'testimonials',
        label:  'Testimonials',
        path:   'content',
        match:  { include: 'testimonials' },
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            name:  'items',
            label: 'Testimonials',
            type:  'object',
            list:  true,
            ui: {
              itemProps: (item: Record<string, unknown>) => ({
                label: (item.brandName as string) || 'New Testimonial',
              }),
            },
            fields: [
              {
                name:        'brandName',
                label:       'Brand / Client Name',
                type:        'string',
                required:    true,
                description: 'The name shown on the marquee card (e.g. "RYZE Performance").',
              },
              {
                name:        'name',
                label:       'Person Full Name',
                type:        'string',
                required:    true,
                description: 'Full name of the person giving the quote.',
              },
              {
                name:        'title',
                label:       'Person Title',
                type:        'string',
                required:    true,
                description: 'Their role or company (e.g. "Founder, RYZE Performance").',
              },
              {
                name:        'quote',
                label:       'Testimonial Quote',
                type:        'string',
                required:    true,
                ui:          { component: 'textarea' },
                description: 'The full quote. No quotation marks needed.',
              },
              {
                name:        'brandLogo',
                label:       'Brand Logo (optional)',
                type:        'image',
                description: 'SVG or PNG. Shown inside the marquee card when provided.',
              },
            ],
          },
        ],
      },

      {
        name:   'showcase',
        label:  'Work Showcase',
        path:   'content',
        match:  { include: 'showcase' },
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            name:  'items',
            label: 'Showcase Tiles',
            type:  'object',
            list:  true,
            ui: {
              itemProps: (item: Record<string, unknown>) => ({
                label: (item.alt as string) || 'New Tile',
              }),
            },
            fields: [
              {
                name:        'media',
                label:       'Photo, GIF, or Video file',
                type:        'image',
                required:    true,
                description: 'Upload a photo, GIF, or short muted video. Videos autoplay and loop.',
              },
              {
                name:        'alt',
                label:       'Description (for accessibility)',
                type:        'string',
                required:    true,
                description: 'Plain description read by screen readers (e.g. "Instagram reel for RYZE launch").',
              },
              {
                name:        'span',
                label:       'Tile size',
                type:        'string',
                options:     ['normal', 'wide', 'tall'],
                description: 'Normal = square. Wide = double width. Tall = double height.',
              },
            ],
          },
        ],
      },

      // ── Planned collections (not yet wired to components) ───────
      {
        name:   'heroOptions',
        label:  'Hero Headlines',
        path:   'src/content/hero-options',
        format: 'json',
        fields: [
          { type: 'string',  name: 'headline',   label: 'Headline',    required: true },
          { type: 'boolean', name: 'is_default', label: 'Is Default?' },
        ],
      },

      {
        name:   'siteSettings',
        label:  'Site Settings',
        path:   'src/content/site-settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'eyebrow',            label: 'Eyebrow (above hero)',    required: true },
          { type: 'string', name: 'ig_handle',          label: 'Instagram Handle',         required: true },
          { type: 'string', name: 'ig_behold_feed_id',  label: 'Behold.so Feed ID',        required: true },
          { type: 'string', name: 'footer_copy',        label: 'Footer Copy',               required: true },
          { type: 'string', name: 'notify_to_email',    label: 'Lead Notification Email',   required: true },
        ],
      },
    ],
  },
});
