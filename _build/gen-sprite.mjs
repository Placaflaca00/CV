// Builds an inline SVG <symbol> sprite from the downloaded brand logos.
// Simple Icons ship as <svg viewBox="0 0 24 24"><title/><path/></svg> with no
// fill attribute, so the paths inherit `currentColor` -> tintable via CSS.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'assets/icons';
const files = readdirSync(dir).filter((f) => f.endsWith('.svg')).sort();
const symbols = [];
const slugs = [];

for (const f of files) {
  const slug = f.replace(/\.svg$/, '');
  const svg = readFileSync(join(dir, f), 'utf8');
  const vb = (svg.match(/viewBox="([^"]+)"/) || [, '0 0 24 24'])[1];
  let inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .trim();
  symbols.push(`  <symbol id="ti-${slug}" viewBox="${vb}">${inner}</symbol>`);
  slugs.push(slug);
}

const sprite =
  `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" aria-hidden="true" focusable="false">\n` +
  symbols.join('\n') +
  `\n</svg>`;

mkdirSync('_build', { recursive: true });
writeFileSync('_build/sprite.html', sprite);
writeFileSync('_build/slugs.json', JSON.stringify(slugs));
console.log('slugs (' + slugs.length + '):', slugs.join(' '));
console.log('sprite bytes:', sprite.length);
