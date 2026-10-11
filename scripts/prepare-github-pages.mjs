// Build a static snapshot of the original GTA LORE Next.js interface.
// This is an isolated Pages build and never changes the production source.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const staging = path.join(root, '.pages-export');
const basePath = '/GTA7';
const site = 'https://pulsebreakpt.github.io/GTA7';
fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(staging, { recursive: true });

for (const name of ['app', 'components', 'hooks', 'lib', 'public', 'sources',
  'tailwind.config.js', 'postcss.config.js', 'jsconfig.json', 'package.json', 'site-version.json']) {
  const source = path.join(root, name);
  if (fs.existsSync(source)) fs.cpSync(source, path.join(staging, name), { recursive: true });
}

// Account and API endpoints require a server/database. Do not export them.
for (const name of ['api', 'account', 'admin', 'login', 'reset-password', 'verify-email', 'users']) {
  fs.rmSync(path.join(staging, 'app', name), { recursive: true, force: true });
}
for (const name of ['app/wiki/random/route.js', 'app/wiki/what-links-here/page.js']) {
  fs.rmSync(path.join(staging, name), { force: true });
}

// All source-backed article pages keep their original React page and CSS.
// Next.js output=export requires a finite parameter list at build time.
const slugSources = {
  'app/database/characters/[slug]/layout.js': ['@/lib/content', 'characters', 'slug'],
  'app/database/vehicles/[slug]/layout.js': ['@/lib/content', 'vehicles', 'slug'],
  'app/database/weapons/[slug]/layout.js': ['@/lib/content', 'weapons', 'slug'],
  'app/database/radio/[slug]/layout.js': ['@/lib/content', 'radioStations', 'slug'],
  'app/database/mechanics/[slug]/layout.js': ['@/lib/content', 'mechanics', 'slug'],
  'app/gangs-factions/[slug]/layout.js': ['@/lib/content', 'factions', 'slug'],
  'app/easter-eggs/[slug]/layout.js': ['@/lib/content', 'easterEggs', 'slug'],
  'app/guides/[slug]/layout.js': ['@/lib/content', 'guides', 'slug'],
  'app/news/[slug]/layout.js': ['@/lib/content', 'articles', 'slug'],
  'app/map/[slug]/layout.js': ['@/lib/content', 'regions', 'id'],
  'app/map/location/[slug]/layout.js': ['@/lib/content', 'locations', 'slug'],
  'app/categories/[slug]/layout.js': ['@/lib/content', 'encyclopediaCategories', 'slug'],
  'app/wiki/category/[slug]/layout.js': ['@/lib/wiki-graph', 'CATEGORIES', 'slug'],
};

for (const [relativePath, [moduleName, collection, field]] of Object.entries(slugSources)) {
  const file = path.join(staging, relativePath);
  let contents = fs.existsSync(file)
    ? fs.readFileSync(file, 'utf8')
    : 'export default function Layout({ children }) { return children }\n';
  if (!contents.includes('generateStaticParams')) {
    contents += '\n// Paths generated from the archive data for GitHub Pages.\n';
    contents += 'export async function generateStaticParams() {\n';
    contents += "  const { " + collection + " } = await import('" + moduleName + "')\n";
    contents += '  return ' + collection + '.map((item) => ({ slug: item.' + field + ' })).filter((item) => Boolean(item.slug))\n';
    contents += '}\n';
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

// Keep the interface usable without making failing requests to absent APIs.
fs.writeFileSync(path.join(staging, 'components/site/auth-provider.jsx'),
  "'use client'\n" +
  "import { createContext, useContext } from 'react'\n" +
  "const Context = createContext(null)\n" +
  "const unavailable = async () => { throw new Error('Accounts require a separate backend and are unavailable on GitHub Pages.') }\n" +
  "export function AuthProvider({ children }) { const value = { user: null, session: null, loading: false, capabilities: { emailDelivery: false }, refresh: async () => {}, request: unavailable, setUser: () => {} }; return <Context.Provider value={value}>{children}</Context.Provider> }\n" +
  "export function useAuth() { return useContext(Context) }\n"
);

// Absolute /media URLs bypass the Pages repository prefix; apply it to
// image data and CSS. Next.js Link handles its own basePath automatically.
const textExtensions = new Set(['.js', '.jsx', '.mjs', '.css', '.json']);
function patchDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const filename = path.join(dir, ent.name);
    if (ent.isDirectory()) { patchDirectory(filename); continue; }
    if (!ent.isFile() || !textExtensions.has(path.extname(filename))) continue;
    let source = fs.readFileSync(filename, 'utf8');
    source = source.replaceAll('https://lusorae.pt', site);
    source = source.replace(/(["'])\/(media|brand)\//g, '$1/GTA7/$2/');
    source = source.replace(/url\((["']?)\/(media|brand)\//g, 'url($1/GTA7/$2/');
    source = source.replace(/action=(["'])\/(?!GTA7\/)/g, 'action=$1/GTA7/');
    fs.writeFileSync(filename, source);
  }
}
for (const dir of ['app', 'components', 'lib', 'hooks']) patchDirectory(path.join(staging, dir));

// Avoid linking to the old domain in canonical metadata.
const layoutPath = path.join(staging, 'app/layout.js');
const layout = fs.readFileSync(layoutPath, 'utf8');
fs.writeFileSync(layoutPath, layout.replace("const SITE = 'https://pulsebreakpt.github.io/GTA7'",
  "const SITE = 'https://pulsebreakpt.github.io/GTA7'"));

fs.writeFileSync(path.join(staging, 'next.config.js'), [
  'module.exports = {',
  "  output: 'export',",
  "  basePath: '/GTA7',",
  "  assetPrefix: '/GTA7/',",
  '  trailingSlash: true,',
  '  reactStrictMode: true,',
  '  images: { unoptimized: true },',
  '  poweredByHeader: false,',
  '};', ''
].join('\n'));
console.log('Prepared isolated GTA LORE static build in .pages-export');
