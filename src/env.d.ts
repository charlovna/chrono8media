/// <reference types="astro/client" />

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  NOTIFY_TO_EMAIL: string;
  PUBLIC_TURNSTILE_SITE_KEY: string;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
