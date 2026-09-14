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
        ink: '#FFF9F4',
        raised: '#F9EEF0',
        surface2: '#EDDCE4',
        paper: '#38232E',
        dim: '#714958',
        line: 'rgba(56,35,46,0.16)',
        pink: '#C12E70',
        mint: '#445CC0',
        violet: '#6F3FC4',
        warn: '#8A533C',
        danger: '#A74444',
        border: 'rgba(56,35,46,0.16)',
        input: 'rgba(56,35,46,0.16)',
        ring: '#C12E70',
        background: '#FFF9F4',
        foreground: '#38232E',
        primary: { DEFAULT: '#38232E', foreground: '#FFF9F4' },
        secondary: { DEFAULT: '#EDDCE4', foreground: '#38232E' },
        destructive: { DEFAULT: '#A74444', foreground: '#FFF9F4' },
        muted: { DEFAULT: '#EDDCE4', foreground: '#714958' },
        accent: { DEFAULT: '#C12E70', foreground: '#FFF9F4' },
        popover: { DEFAULT: '#FFF9F4', foreground: '#38232E' },
        card: { DEFAULT: '#FFF9F4', foreground: '#38232E' },
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
