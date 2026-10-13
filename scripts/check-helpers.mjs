import * as f from '../src/lib/format.js';

let fails = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : `  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`}`);
}

eq('youtu.be link',            f.youtubeId('https://youtu.be/AAAAAAAAAAA'), 'AAAAAAAAAAA');
eq('watch?v= link',            f.youtubeId('https://www.youtube.com/watch?v=BBBBBBBBBBB&t=5'), 'BBBBBBBBBBB');
eq('/live/ link',              f.youtubeId('https://www.youtube.com/live/CCCCCCCCCCC'), 'CCCCCCCCCCC');
eq('/shorts/ link',            f.youtubeId('https://youtube.com/shorts/DDDDDDDDDDD'), 'DDDDDDDDDDD');
eq('non-youtube url',          f.youtubeId('https://example.com/x'), null);
eq('javascript: url',          f.youtubeId('javascript:alert(1)'), null);
eq('bad id length',            f.youtubeId('https://youtu.be/short'), null);
eq('slugify apostrophe',       f.slugify("Women's Guild"), 'women-s-guild');
eq('slugify spaces',           f.slugify('  Youth  Ministry '), 'youth-ministry');
eq('waHref local 07..',        f.waHref('0700000000'), 'https://wa.me/254700000000');
eq('waHref international',     f.waHref('+254 700 000 000'), 'https://wa.me/254700000000');
eq('telHref',                  f.telHref('0700 000 000'), 'tel:0700000000');
eq('safeUrl blocks javascript',f.safeUrl('javascript:alert(1)'), null);
eq('safeUrl allows https',     f.safeUrl('https://example.com'), 'https://example.com');
eq('imgSrc relative',          f.imgSrc('/images/a.jpg'), '/images/a.jpg');
eq('imgSrc space encoded',     f.imgSrc('/images/a b.jpg'), '/images/a%20b.jpg');
eq('imgSrc blocks javascript', f.imgSrc('javascript:x'), null);
eq('imgSrc blocks //host',     f.imgSrc('//evil.com/x.jpg'), null);
eq('paragraphs split',         f.paragraphs('a\n\nb'), ['a', 'b']);
eq('upcoming filters',         f.upcoming([{ date: '2030-01-01' }, { date: '2020-01-01' }, { date: null }]).length, 1);
eq('newestFirst order',        f.newestFirst([{ date: '2025-01-01' }, { date: '2026-01-01' }, {}]).map((x) => x.date ?? null), ['2026-01-01', '2025-01-01', null]);
eq('socialLinks drops bad',    f.socialLinks({ facebook: 'https://example.com/fb', youtube: 'javascript:alert(1)', instagram: null }).length, 1);
eq('formatDate has year',      f.formatDate('2030-01-01').includes('2030'), true);

console.log(fails === 0 ? '\nALL HELPER CHECKS PASSED' : `\n${fails} FAILED`);
process.exitCode = fails ? 1 : 0;