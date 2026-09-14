const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // Caminhos absolutos, a partir da pasta deste ficheiro: relativos, o
  // Tailwind resolvia-os pela pasta de onde o build corria, e um build lançado
  // de outra pasta gerava CSS sem utilitários — que a cache do Next depois
  // reaproveitava na publicação.
  content: ['pages', 'components', 'app', 'lib'].map((dir) => path.join(__dirname, dir, '**/*.{js,jsx}')),
  prefix: "",
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      // Paleta extraída da key art oficial de Jason e Lucia. Os tons mais
      // escuros são derivados acessíveis das mesmas cores, para texto e
      // controlos manterem contraste sobre o papel quente.
      colors: {
        ink: '#FFF5E8',
        raised: '#FFF9F2',
        surface2: '#F3EEE8',
        paper: '#2B2230',
        // #716872 = --gta6-muted-ink. O cinzento puro da paleta (#746B75) mede
        // 4.44 sobre concrete e 4.38 sobre véus coloridos: abaixo de AA. Fica
        // em HEX literal porque text-dim/70 precisa de HEX, não de var().
        dim: '#716872',
        line: 'rgba(43,34,48,0.16)',
        pink: '#C2185B',
        mint: '#22C7B7',
        violet: '#7B4DE3',
        warn: '#E8B84A',
        danger: '#E13535',
        border: 'rgba(43,34,48,0.16)',
        input: 'rgba(43,34,48,0.16)',
        ring: '#4FA3FF',
        background: '#FFF5E8',
        foreground: '#2B2230',
        primary: { DEFAULT: '#2B2230', foreground: '#FFF5E8' },
        secondary: { DEFAULT: '#F3EEE8', foreground: '#2B2230' },
        destructive: { DEFAULT: '#E13535', foreground: '#FFF5E8' },
        muted: { DEFAULT: '#F3EEE8', foreground: '#716872' },
        accent: { DEFAULT: '#C2185B', foreground: '#FFF5E8' },
        popover: { DEFAULT: '#FFF9F2', foreground: '#2B2230' },
        card: { DEFAULT: '#FFF9F2', foreground: '#2B2230' },
      },
      fontFamily: {
        cond: ['var(--font-cond)', 'Arial Narrow', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      // A escala de raios do Streamline Moderne. Os 2px do `sm` eram um
      // canto recto disfarçado — a 192 utilizações no projecto, era o
      // que mantinha botões, etiquetas e campos com ar de formulário
      // enquanto o resto do sítio curvava. Sobem os três, mantendo a
      // proporção entre eles: uma etiqueta de 20px de altura não pode
      // levar o mesmo raio de uma carta de 300px.
      borderRadius: { lg: '1.25rem', md: '0.75rem', sm: '0.375rem' },
      letterSpacing: { wide2: '0.08em', wide3: '0.14em' },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
