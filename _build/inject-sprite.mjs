import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const sprite = readFileSync('_build/sprite.html', 'utf8');

if (!html.includes('<!--SPRITE-->')) {
  console.error('ERROR: marker <!--SPRITE--> not found (already injected?).');
  process.exit(1);
}
const out = html.replace('<!--SPRITE-->', sprite);
writeFileSync('index.html', out);
console.log('Injected sprite (' + sprite.length + ' bytes). index.html is now ' + out.length + ' bytes.');
