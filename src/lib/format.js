// Helpers for rendering content from the data files.

export function paragraphs(text) {
  return text ? String(text).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : [];
}

// Only allow http(s) links so bad data cannot inject javascript: URLs.
export function safeUrl(value) {
  if (!value) return null;
  const v = String(value).trim();
  return /^https?:\/\//i.test(v) ? v : null;
}

export function telHref(value) {
  if (!value) return null;
  const cleaned = String(value).replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : null;
}

// wa.me needs international digits with no "+" or leading zero.
// ASSUMPTION: a 10-digit number starting with 0 is Kenyan (+254).
export function waHref(value) {
  if (!value) return null;
  let d = String(value).replace(/\D/g, '');
  if (!d) return null;
  if (d.length === 10 && d.startsWith('0')) d = '254' + d.slice(1);
  return `https://wa.me/${d}`;
}

export function mailHref(value) {
  return value ? `mailto:${String(value).trim()}` : null;
}

export function parseDate(iso) {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(iso) {
  const d = parseDate(iso);
  return d
    ? d.toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';
}

// Evaluated at BUILD time: the site must be rebuilt for past events to disappear.
export function upcoming(items) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (items ?? [])
    .filter((e) => {
      const d = parseDate(e.date);
      return d && d >= today;
    })
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));
}

export function newestFirst(items) {
  const t = (x) => parseDate(x.date)?.getTime() ?? -Infinity;
  return [...(items ?? [])].sort((a, b) => t(b) - t(a));
}

export function socialLinks(social) {
  const labels = { facebook: 'Facebook', youtube: 'YouTube', instagram: 'Instagram' };
  return Object.entries(social ?? {})
    .map(([key, url]) => ({ label: labels[key] ?? key, href: safeUrl(url) }))
    .filter((s) => s.href);
}

export function slugify(text) {
  return String(text ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Returns the 11-character YouTube video ID from common URL shapes, or null.
export function youtubeId(url) {
  const u = safeUrl(url);
  if (!u) return null;
  let parsed;
  try { parsed = new URL(u); } catch { return null; }
  const host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '');
  let id = null;
  if (host === 'youtu.be') {
    id = parsed.pathname.slice(1).split('/')[0];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (parsed.pathname === '/watch') {
      id = parsed.searchParams.get('v');
    } else {
      const m = parsed.pathname.match(/^\/(embed|live|shorts)\/([^/?]+)/);
      if (m) id = m[2];
    }
  }
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

// Image paths: site-relative (/images/...) or https only. Use filenames without spaces.
export function imgSrc(value) {
  if (!value) return null;
  const v = String(value).trim();
  if (!(/^\/(?!\/)/.test(v) || /^https?:\/\//i.test(v))) return null;
  return encodeURI(v).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
}