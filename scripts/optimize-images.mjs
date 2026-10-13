import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'node:fs';
import { join, extname } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

for (const f of walk('public/images')) {
  const ext = extname(f).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const isHero = /[\\/]hero[\\/]/.test(f);
  const max = isHero ? 1400 : 1000;
  const before = statSync(f).size;
  const meta = await sharp(f, { failOn: 'none' }).metadata();
  if (before < 120 * 1024 && (meta.width || 0) <= max) continue;

  let pipe = sharp(f, { failOn: 'none' }).rotate().resize({ width: max, withoutEnlargement: true });
  pipe = ext === '.png'
    ? pipe.png({ compressionLevel: 9, palette: true, quality: 80 })
    : pipe.jpeg({ quality: isHero ? 70 : 76, mozjpeg: true });

  const tmp = f + '.tmp';
  await pipe.toFile(tmp);
  const after = statSync(tmp).size;
  if (after < before) {
    unlinkSync(f);
    renameSync(tmp, f);
    console.log(f + ': ' + Math.round(before / 1024) + ' KB -> ' + Math.round(after / 1024) + ' KB');
  } else {
    unlinkSync(tmp);
  }
}