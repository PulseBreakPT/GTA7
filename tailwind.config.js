/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      // Tema claro. Os nomes mantêm-se — `ink` é o fundo e `paper` o
      // texto, tal como antes — porque são centenas de utilizações no
      // projecto: trocar o significado de dois tokens vira o site todo
      // sem tocar numa única classe. O que muda de verdade são os
      // acentos: os pastéis do tema escuro davam menos de 2:1 sobre
      // branco, ou seja, texto ilegível. Aqui cada um tem a versão
      // escura da mesma cor, acima de 4.5:1.
      colors: {
        ink: '#FFFFFF',
        raised: '#F7F8FA',
        surface2: '#EDEFF3',
        paper: '#0B0F16',
        dim: '#5A6270',
        line: 'rgba(11,15,22,0.14)',
        pink: '#C2185B',
        mint: '#0E7C6B',
        violet: '#5B3FD6',
        warn: '#8A6A00',
        danger: '#B3202A',
        border: 'rgba(11,15,22,0.14)',
        input: 'rgba(11,15,22,0.14)',
        ring: '#C2185B',
        background: '#FFFFFF',
        foreground: '#0B0F16',
        primary: { DEFAULT: '#0B0F16', foreground: '#FFFFFF' },
        secondary: { DEFAULT: '#EDEFF3', foreground: '#0B0F16' },
        destructive: { DEFAULT: '#B3202A', foreground: '#FFFFFF' },
        muted: { DEFAULT: '#EDEFF3', foreground: '#5A6270' },
        accent: { DEFAULT: '#C2185B', foreground: '#FFFFFF' },
        popover: { DEFAULT: '#FFFFFF', foreground: '#0B0F16' },
        card: { DEFAULT: '#FFFFFF', foreground: '#0B0F16' },
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
