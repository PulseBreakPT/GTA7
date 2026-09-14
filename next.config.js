const production = process.env.NODE_ENV === 'production'
const contentSecurityPolicy = [
  "default-src 'self'",
  // Static App Router output contains Next's inline Flight bootstrap. A nonce
  // would force every one of the 345 routes to dynamic rendering, so inline
  // bootstrap code is allowed while script URLs stay same-origin and inline
  // event-handler attributes remain forbidden below.
  // Next's development runtime uses eval for source maps; never allow it in production.
  `script-src 'self' 'unsafe-inline'${production ? '' : " 'unsafe-eval'"}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  ...(production ? ['upgrade-insecure-requests'] : []),
].join('; ')

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  experimental: {
    // Add tamper-detection metadata to framework assets while retaining static
    // generation and CDN caching.
    sri: { algorithm: 'sha384' },
  },
  // Sem isto, o Next infere a raiz subindo à procura de lockfiles: quando o
  // checkout está numa subpasta (um worktree, por exemplo) o standalone sai
  // aninhado nesse caminho e o server.js deixa de estar onde se espera.
  // Fixá-la aqui faz o bundle sair igual venha o build de onde vier.
  outputFileTracingRoot: __dirname,
  images: {
    // All published media is stored locally from reviewed Rockstar material.
    // Keeping third-party image hosts out prevents accidental hotlinks.
    unoptimized: true,
  },
  // Renamed from experimental.serverComponentsExternalPackages in Next 15
  serverExternalPackages: ['mongodb'],
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async redirects() {
    // Registos fundidos: o endereço antigo leva ao registo que ficou.
    const merged = [
      { source: '/map/location/vcia', destination: '/map/location/vice-city-international-airport', permanent: true },
      // A refinaria tinha duas fichas para o mesmo edifício; ficou a que traz
      // fonte primária da Rockstar, e o endereço da outra leva lá.
      { source: '/map/location/allied-crystal-sugar-refinery', destination: '/map/location/allied-crystal-refinery', permanent: true },
    ]
    if (!production) return merged
    return [...merged, {
      source: '/:path*',
      has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
      destination: 'https://lusorae.pt/:path*',
      permanent: true,
    }]
  },
  async headers() {
    return [
      {
        // O template deixava `ALLOWALL` e `frame-ancestors *` para a
        // pré-visualização poder correr dentro de um iframe. Num site
        // público isso é um convite ao clickjacking: qualquer página passa
        // a poder embeber esta e recolher cliques por cima dela.
        source: "/(.*)",
        headers: [
          // HTML must be revalidated after a release. Fingerprinted Next.js
          // assets remain immutable at nginx, but route documents cannot be
          // allowed to survive a deployment in a browser/CDN cache.
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "accelerometer=(), autoplay=(), browsing-topics=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(self), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "Origin-Agent-Cluster", value: "?1" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
