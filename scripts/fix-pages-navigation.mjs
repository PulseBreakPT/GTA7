import fs from 'node:fs';
import path from 'node:path';

const stage = path.join(process.cwd(), '.pages-export');
function read(relative) { return fs.readFileSync(path.join(stage, relative), 'utf8'); }
function write(relative, content) { fs.writeFileSync(path.join(stage, relative), content); }
function replaceRequired(text, needle, replacement, label) {
  if (!text.includes(needle)) throw new Error('Pages navigation patch failed: ' + label);
  return text.replace(needle, replacement);
}
function removeBetween(text, start, end, label) {
  const a = text.indexOf(start);
  const b = text.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error('Pages navigation segment missing: ' + label);
  return text.slice(0, a) + text.slice(b + end.length);
}

for (const [source, target] of [
  ['scripts/pages/random-page.jsx', 'app/wiki/random/page.jsx'],
  ['scripts/pages/what-links-here.jsx', 'app/wiki/what-links-here/page.jsx'],
]) {
  const destination = path.join(stage, target);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(process.cwd(), source), destination);
}

let chrome = read('components/site/wiki-chrome.jsx');
chrome = replaceRequired(chrome, "  ['Atlas', '/map', 'place'],", "  ['Wiki', '/wiki', 'archive'],\n  ['Atlas', '/map', 'place'],", 'direct Wiki link');
chrome = replaceRequired(chrome,
  '              <header><span>Navigate the archive</span><strong>Choose your route</strong><kbd>⌘ K</kbd></header>',
  '              <header><span>Navigate the archive</span><strong>Choose your route</strong><kbd>⌘ K</kbd></header>\n' +
  '              <div className="grid grid-cols-2 gap-2 border-b border-line p-3 sm:grid-cols-4" aria-label="Quick destinations">\n' +
  '                <Link href="/wiki" onClick={() => setExploreOpen(false)} className="flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white/70 px-2 text-[12px] font-semibold hover:border-pink"><LoreIcon name="archive" size={15} /> Wiki</Link>\n' +
  '                <Link href="/wiki/random" onClick={() => setExploreOpen(false)} className="flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white/70 px-2 text-[12px] font-semibold hover:border-pink"><LoreIcon name="compass" size={15} /> Surprise me</Link>\n' +
  '                <Link href="/map" onClick={() => setExploreOpen(false)} className="flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white/70 px-2 text-[12px] font-semibold hover:border-pink"><LoreIcon name="place" size={15} /> Atlas</Link>\n' +
  '                <Link href="/wiki/changes" onClick={() => setExploreOpen(false)} className="flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white/70 px-2 text-[12px] font-semibold hover:border-pink"><LoreIcon name="changes" size={15} /> Latest</Link>\n' +
  '              </div>', 'quick destinations');
chrome = removeBetween(chrome,
  '          <div ref={accountRef}',
  '\n          </div>\n        </nav>', 'sign-in and account dropdown')
  .replace('\n      </header>', '\n      </header>');
// The matched end includes the original nav closing. Restore it.
chrome = replaceRequired(chrome, '\n\n      </header>', '\n        </nav>\n      </header>', 'header navigation closing');
write('components/site/wiki-chrome.jsx', chrome);

let tabbar = read('components/site/tabbar.jsx');
tabbar = replaceRequired(tabbar, "  { title: 'Account', tint: 'mint', items: [{ label: 'Account', href: '/account', icon: UserRound }] },\n", '', 'mobile account group');
write('components/site/tabbar.jsx', tabbar);

let directory = read('app/directory/page.js');
directory = replaceRequired(directory, ' + ACCOUNT_LINKS.length', '', 'directory totals');
directory = replaceRequired(directory, '        <a href="#account">Account</a>\n', '', 'account index');
directory = removeBetween(directory,
  '      <section id="account"',
  '\n      </section>', 'account directory section');
write('app/directory/page.js', directory);

let wiki = read('components/site/wiki.jsx');
const permalink = /await navigator\.clipboard\.writeText\([^\n]*entry\.href\)/;
if (!permalink.test(wiki)) throw new Error('Cannot locate article permalink');
wiki = wiki.replace(permalink, 'await navigator.clipboard.writeText(window.location.origin + "/GTA7" + entry.href)');
wiki = removeBetween(wiki,
  '      <nav className="wiki-user-actions" aria-label="Page actions">',
  '\n      </nav>', 'personal-only article controls');
write('components/site/wiki.jsx', wiki);

const manifestFile = path.join(stage, 'app/manifest.webmanifest');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
manifest.id = '/GTA7/';
manifest.start_url = '/GTA7/';
manifest.scope = '/GTA7/';
manifest.icons = manifest.icons.map((icon) => ({
  ...icon,
  src: icon.src.startsWith('/GTA7/') ? icon.src : '/GTA7' + icon.src,
}));
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
console.log('Pages-only navigation and manifest fixes applied');
