import { defineConfig } from 'tinacms';

// TINA_PUBLIC_CLIENT_ID and TINA_TOKEN are set in Cloudflare Pages
// environment variables (and locally in .env) after connecting to Tina Cloud.
export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images/cms',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'caseStudies',
        label: 'Case Studies',
        path: 'src/content/case-studies',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', required: true },
          { type: 'string', name: 'client', label: 'Client', required: true },
          { type: 'number', name: 'year', label: 'Year', required: true },
          { type: 'string', name: 'summary', label: 'One-line Summary', required: true },
          {
            type: 'object',
            name: 'metrics',
            label: 'Metrics',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: 'Label', required: true },
              { type: 'string', name: 'value', label: 'Value', required: true },
            ],
          },
          { type: 'image', name: 'hero_image', label: 'Hero Image', required: true },
          { type: 'number', name: 'order', label: 'Display Order', required: true },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },

      {
        name: 'testimonials',
        label: 'Testimonials',
        path: 'src/content/testimonials',
        format: 'json',
        fields: [
          { type: 'string', name: 'quote', label: 'Quote', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'author_name', label: 'Author Name', required: true },
          { type: 'string', name: 'author_role', label: 'Author Role', required: true },
          { type: 'string', name: 'author_company', label: 'Author Company', required: true },
          { type: 'image', name: 'headshot', label: 'Headshot (optional)' },
          { type: 'number', name: 'order', label: 'Display Order', required: true },
        ],
      },

      {
        name: 'pillars',
        label: 'Pillars',
        path: 'src/content/pillars',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'number',
            label: 'Number',
            required: true,
            options: ['01', '02', '03', '04'],
          },
          { type: 'string', name: 'name', label: 'Name', required: true },
          { type: 'string', name: 'supporting_copy', label: 'Supporting Copy', required: true },
          { type: 'rich-text', name: 'body', label: 'Body Copy', isBody: true },
        ],
      },

      {
        name: 'heroOptions',
        label: 'Hero Headlines',
        path: 'src/content/hero-options',
        format: 'json',
        fields: [
          { type: 'string', name: 'headline', label: 'Headline', required: true },
          { type: 'boolean', name: 'is_default', label: 'Is Default?' },
        ],
      },

      {
        name: 'siteSettings',
        label: 'Site Settings',
        path: 'src/content/site-settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'eyebrow', label: 'Eyebrow (above hero)', required: true },
          { type: 'string', name: 'ig_handle', label: 'Instagram Handle', required: true },
          { type: 'string', name: 'ig_behold_feed_id', label: 'Behold.so Feed ID', required: true },
          { type: 'string', name: 'footer_copy', label: 'Footer Copy', required: true },
          { type: 'string', name: 'notify_to_email', label: 'Lead Notification Email', required: true },
        ],
      },
    ],
  },
});
