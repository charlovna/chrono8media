import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = await res.json() as { success: boolean };
  return data.success === true;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB, RESEND_API_KEY, TURNSTILE_SECRET_KEY, NOTIFY_TO_EMAIL } = locals.runtime.env;

  const contentType = request.headers.get('content-type') ?? '';
  let body: Record<string, string>;

  try {
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      body = Object.fromEntries([...form.entries()].map(([k, v]) => [k, String(v)]));
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported content type' }), { status: 400 });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  const name = body['name']?.trim() ?? '';
  const email = body['email']?.trim().toLowerCase() ?? '';
  const company = body['company']?.trim() ?? '';
  const message = body['message']?.trim() ?? '';
  const turnstileToken = body['cf-turnstile-response'] ?? '';

  if (!name || name.length > 100) {
    return new Response(JSON.stringify({ error: 'Name is required (max 100 chars)' }), { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email) || email.length > 200) {
    return new Response(JSON.stringify({ error: 'Please check your email address' }), { status: 400 });
  }
  if (company.length > 150 || message.length > 2000) {
    return new Response(JSON.stringify({ error: 'Field too long' }), { status: 400 });
  }
  if (!turnstileToken) {
    return new Response(JSON.stringify({ error: 'Could not verify you\'re human - please try again or refresh' }), { status: 400 });
  }

  const ip = request.headers.get('CF-Connecting-IP');
  const turnstileOk = await verifyTurnstile(turnstileToken, TURNSTILE_SECRET_KEY, ip);
  if (!turnstileOk) {
    return new Response(JSON.stringify({ error: 'Could not verify you\'re human - please try again or refresh' }), { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const sourcePath = new URL(request.url).searchParams.get('source') ?? '/';
  const userAgent = request.headers.get('user-agent') ?? '';
  const ipCountry = (request as any).cf?.country ?? '';

  try {
    await DB.prepare(
      `INSERT INTO leads (name, email, company, message, source_path, user_agent, ip_country, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(name, email, company || null, message || null, sourcePath, userAgent, ipCountry, submittedAt).run();
  } catch (err) {
    console.error('D1 insert failed:', err);
    return new Response(JSON.stringify({ error: 'Server error - please try again shortly' }), { status: 500 });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: 'Chrono8 Leads <no-reply@chrono8media.com>',
      to: NOTIFY_TO_EMAIL,
      subject: `New Chrono8 lead - ${name}${company ? ` from ${company}` : ''}`,
      html: `
        <h2>New lead via chrono8media.com</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p style="color:#888;font-size:12px">
          Submitted: ${submittedAt}<br>
          Page: ${sourcePath}<br>
          Country: ${ipCountry || 'unknown'}
        </p>
      `,
    });
  } catch (err) {
    console.warn('Resend email failed (lead still saved):', err);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
