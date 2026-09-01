const nextConfig = {
  output: 'standalone',
  // Sem isto, o Next infere a raiz subindo à procura de lockfiles: quando o
  // checkout está numa subpasta (um worktree, por exemplo) o standalone sai
  // aninhado nesse caminho e o server.js deixa de estar onde se espera.
  // Fixá-la aqui faz o bundle sair igual venha o build de onde vier.
  outputFileTracingRoot: __dirname,
  images: {
    // Todas as imagens são agora ficheiros locais em public/media, já
    // redimensionados e em WebP por scripts/gerar-media.js. Não há origens
    // remotas para autorizar, e o optimizador não teria nada a acrescentar.
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
  async headers() {
    return [
      {
        // O template deixava `ALLOWALL` e `frame-ancestors *` para a
        // pré-visualização poder correr dentro de um iframe. Num site
        // público isso é um convite ao clickjacking: qualquer página passa
        // a poder embeber esta e recolher cliques por cima dela.
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self';" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // O CORS só faz sentido na API; aplicá-lo ao HTML não servia nada.
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
