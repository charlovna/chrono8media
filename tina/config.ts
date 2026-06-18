import { defineConfig } from 'tinacms';

// TinaCloud credentials - set these in .env or Cloudflare Pages env vars.
// Leave null for local-only mode (admin only works locally).
const BRANCH   = process.env.GITHUB_BRANCH ?? process.env.HEAD ?? 'main';
const CLIENT_ID = process.env.TINA_PUBLIC_CLIENT_ID ?? null;
const TOKEN     = process.env.TINA_TOKEN ?? null;

export default defineConfig({
  branch: BRANCH,
  clientId: CLIENT_ID,
  token: TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      // Browse/upload across all of public/images (testimonial logos AND the
      // showcase media subfolder). Editors navigate into images/showcase/ when
      // adding work tiles, images/testimonials/ for logos.
      mediaRoot:   'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name:   'testimonials',
        label:  'Testimonials',
        path:   'content',
        match:  { include: 'testimonials' },
        format: 'json',
        ui: {
          global: true,
          // Prevent creating or deleting the single JSON file from the UI.
          // Team members add/remove items inside the file, not the file itself.
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
                description: 'The full quote. No quotation marks needed - they are added by the design.',
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
          // Singleton like testimonials: add/remove tiles inside the file,
          // never create or delete the file itself from the UI.
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
                description: 'Upload a photo (JPG/PNG/WEBP), GIF, or short muted video (MP4/WEBM). Videos play automatically and loop.',
              },
              {
                name:        'alt',
                label:       'Description (for accessibility)',
                type:        'string',
                required:    true,
                description: 'A short plain description of what is shown (e.g. "Instagram reel for RYZE launch"). Read by screen readers.',
              },
              {
                name:        'span',
                label:       'Tile size',
                type:        'string',
                options:     ['normal', 'wide', 'tall'],
                description: 'How big this tile is on desktop. Normal = square. Wide = double width. Tall = double height. Mix sizes for an interesting layout.',
              },
            ],
          },
        ],
      },
    ],
  },
});
