// Usage: node scripts/add-base.mjs /Nthambo-church [folder]
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.argv[2] || '').replace(/\/+$/, '');
const dir = process.argv[3] || 'dist';
if (!base) { console.error('Usage: node scripts/add-base.mjs /base [folder]'); process.exit(1); }

const name = base.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const attr = new RegExp('(\\s(?:href|src|action|poster|content|data-src)=")\\/(?!\\/|' + name + '(?:\\/|"))', 'g');
const cssUrl = new RegExp('(url\\(\\s*[\'"]?)\\/(?!\\/|' + name + '\\/)', 'g');

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

let changed = 0;
for (const f of walk(dir)) {
  if (!/\.(html|css)$/.test(f)) continue;
  const before = readFileSync(f, 'utf8');
  let after = before.replace(cssUrl, '$1' + base + '/');
  if (f.endsWith('.html')) after = after.replace(attr, '$1' + base + '/');
  if (after !== before) { writeFileSync(f, after); changed++; }
}
console.log('Added ' + base + ' to links and images in ' + changed + ' files in ' + dir);