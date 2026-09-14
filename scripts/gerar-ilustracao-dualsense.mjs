// Desenha os dois comandos anunciados — o branco e o preto — como
// ilustração do arquivo, e rasteriza para webp. Não é a fotografia da
// Sony: é um desenho nosso, e diz isso dentro da própria imagem, para que
// o aviso viaje com o ficheiro para onde a imagem for usada.
import sharp from 'sharp'
import fs from 'node:fs'

const W = 1600
const H = 900

// Um comando, desenhado a partir da silhueta do DualSense: corpo largo com
// dois punhos, painel táctil ao centro, dois analógicos, cruz direccional e
// os quatro botões. `tone` decide o esquema: dia (branco) ou noite (preto).
function pad(x, y, s, tone) {
  const body = tone === 'day' ? '#F4F1EC' : '#15171C'
  const shade = tone === 'day' ? '#DAD5CD' : '#0C0E12'
  const trim = tone === 'day' ? '#C9C2B8' : '#262A33'
  const face = tone === 'day' ? '#FFFFFF' : '#1E2129'
  const glowA = tone === 'day' ? '#F6C6A8' : '#C2185B'
  const glowB = tone === 'day' ? '#EBA9C8' : '#5B3FD6'
  const palm = tone === 'day' ? '#E4B7A0' : '#2B3242'
  const gid = 'g' + tone

  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${glowA}"/>
        <stop offset="100%" stop-color="${glowB}"/>
      </linearGradient>
      <clipPath id="clip${gid}">
        <path d="M-150,-70 C-120,-96 -60,-104 0,-104 C60,-104 120,-96 150,-70
                 C176,-50 186,-6 176,54 C168,104 150,140 118,146
                 C92,151 74,128 58,96 C46,72 30,62 0,62 C-30,62 -46,72 -58,96
                 C-74,128 -92,151 -118,146 C-150,140 -168,104 -176,54
                 C-186,-6 -176,-50 -150,-70 Z"/>
      </clipPath>
    </defs>

    <!-- sombra de contacto -->
    <ellipse cx="0" cy="152" rx="150" ry="16" fill="rgba(11,15,22,0.13)"/>

    <!-- corpo -->
    <path d="M-150,-70 C-120,-96 -60,-104 0,-104 C60,-104 120,-96 150,-70
             C176,-50 186,-6 176,54 C168,104 150,140 118,146
             C92,151 74,128 58,96 C46,72 30,62 0,62 C-30,62 -46,72 -58,96
             C-74,128 -92,151 -118,146 C-150,140 -168,104 -176,54
             C-186,-6 -176,-50 -150,-70 Z"
          fill="${body}" stroke="${trim}" stroke-width="3"/>

    <!-- acabamento de cor cambiante, só nos punhos -->
    <g clip-path="url(#clip${gid})">
      <rect x="-190" y="40" width="380" height="130" fill="url(#${gid})" opacity="${tone === 'day' ? 0.5 : 0.85}"/>
      <!-- palmeiras moldadas no punho -->
      ${[-118, -92, 96, 122].map((px, i) => `
      <g transform="translate(${px},${86 + (i % 2) * 10}) scale(${0.9 - (i % 2) * 0.15})">
        <path d="M0,26 C2,10 3,0 2,-14" stroke="${palm}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M2,-14 C-14,-24 -26,-20 -32,-10" stroke="${palm}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M2,-14 C18,-25 30,-21 36,-11" stroke="${palm}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M2,-14 C-8,-30 -4,-40 6,-45" stroke="${palm}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M2,-14 C14,-30 26,-34 34,-30" stroke="${palm}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      </g>`).join('')}
    </g>

    <!-- barra de luz em torno do painel táctil -->
    <rect x="-62" y="-74" width="124" height="86" rx="14" fill="none" stroke="url(#${gid})" stroke-width="5"/>
    <!-- painel táctil -->
    <rect x="-56" y="-68" width="112" height="74" rx="10" fill="${face}" stroke="${trim}" stroke-width="2"/>
    <!-- marca do jogo, em letra do arquivo -->
    <text x="0" y="-24" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif"
          font-size="30" font-weight="700" letter-spacing="4"
          fill="${tone === 'day' ? '#1B2028' : '#F2F3F5'}">VI</text>

    <!-- cruz direccional -->
    <g transform="translate(-104,-24)" fill="${face}" stroke="${trim}" stroke-width="2">
      <rect x="-9" y="-30" width="18" height="60" rx="5"/>
      <rect x="-30" y="-9" width="60" height="18" rx="5"/>
    </g>

    <!-- quatro botões -->
    <g transform="translate(104,-24)">
      ${[[0, -28], [28, 0], [0, 28], [-28, 0]].map(([bx, by]) => `<circle cx="${bx}" cy="${by}" r="12" fill="${face}" stroke="${trim}" stroke-width="2"/>`).join('')}
    </g>

    <!-- analógicos -->
    ${[[-52, 40], [52, 40]].map(([sx, sy]) => `
    <g transform="translate(${sx},${sy})">
      <circle r="27" fill="${shade}" stroke="${trim}" stroke-width="2"/>
      <circle r="19" fill="${face}" stroke="${trim}" stroke-width="2"/>
    </g>`).join('')}

    <!-- altifalante e botão central -->
    <circle cx="0" cy="34" r="6" fill="${shade}" stroke="${trim}" stroke-width="2"/>
  </g>`
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDF7F2"/>
      <stop offset="52%" stop-color="#F4EEF6"/>
      <stop offset="100%" stop-color="#EAF0F6"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>

  <!-- filete das três cores do arquivo -->
  <rect x="0" y="0" width="${W}" height="6" fill="#C2185B"/>
  <rect x="0" y="6" width="${W}" height="3" fill="#0E7C6B"/>
  <rect x="0" y="9" width="${W}" height="2" fill="#5B3FD6"/>

  ${pad(470, 430, 1.55, 'day')}
  ${pad(1130, 430, 1.55, 'night')}

  <text x="470" y="740" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif"
        font-size="34" font-weight="700" letter-spacing="6" fill="#0B0F16">WHITE LIMITED EDITION</text>
  <text x="1130" y="740" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif"
        font-size="34" font-weight="700" letter-spacing="6" fill="#0B0F16">BLACK LIMITED EDITION</text>

  <!-- O aviso vai ao topo à direita: o recorte 21:8 com que a ficha
       mostra a imagem corta as bandas de cima e de baixo, e o aviso tem
       de sobreviver ao recorte. Fica também em baixo, para quem vir a
       imagem inteira. -->
  <text x="${W - 60}" y="70" text-anchor="end" font-family="JetBrains Mono, DejaVu Sans Mono, monospace"
        font-size="20" letter-spacing="3" fill="#0E7C6B">ARCHIVE ILLUSTRATION — NOT AN OFFICIAL IMAGE</text>
  <text x="60" y="852" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="20"
        letter-spacing="3" fill="#0E7C6B">ARCHIVE ILLUSTRATION — NOT AN OFFICIAL IMAGE</text>
</svg>`

const out = new URL('../public/media/news/dualsense-gta-vi.webp', import.meta.url).pathname
fs.mkdirSync(new URL('../public/media/news/', import.meta.url).pathname, { recursive: true })
await sharp(Buffer.from(svg)).resize({ width: 1600 }).webp({ quality: 88 }).toFile(out)
console.log('escrito', out)
