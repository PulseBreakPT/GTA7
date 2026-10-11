import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.cwd(), '.pages-export/out');
const required = [
  'index.html', 'wiki/index.html', 'wiki/random/index.html',
  'wiki/what-links-here/index.html', 'directory/index.html',
  'database/characters/index.html', 'manifest.webmanifest',
  'brand/icon-192.png', 'brand/icon-512.png', 'brand/gta-lore-mark.svg',
];
for (const relative of required) {
  const target = path.join(out, relative);
  if (!fs.existsSync(target) || fs.statSync(target).size === 0) throw new Error('Missing Pages export: ' + relative);
}
const manifest = JSON.parse(fs.readFileSync(path.join(out, 'manifest.webmanifest'), 'utf8'));
for (const key of ['id', 'start_url', 'scope']) {
  if (manifest[key] !== '/GTA7/') throw new Error('Manifest ' + key + ' points outside GitHub Pages');
}
for (const icon of manifest.icons) {
  if (!icon.src.startsWith('/GTA7/')) throw new Error('Manifest icon missing Pages prefix: ' + icon.src);
  if (!fs.existsSync(path.join(out, icon.src.slice('/GTA7/'.length)))) throw new Error('Missing icon: ' + icon.src);
}
const home = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
const directory = fs.readFileSync(path.join(out, 'directory/index.html'), 'utf8');
if (!home.includes('Welcome to') || !home.includes('Surprise me')) throw new Error('Homepage shortcuts missing');
for (const content of [home, directory]) {
  if (content.includes('href="/GTA7/login') || content.includes('href="/GTA7/account')) throw new Error('Broken account navigation still published');
}
if (directory.includes('Your account</h2>')) throw new Error('Directory still advertises unavailable accounts');
console.log('Pages navigation validated: random, backlinks, account cleanup, base-path manifest and icons.');
