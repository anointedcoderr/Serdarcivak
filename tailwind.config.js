/** Obsidian Imperial theme for Serdarcivak. Tokens live in src/index.css as CSS variables. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: 'var(--bg-0)',
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
        },
        gold: {
          champagne: 'var(--gold-champagne)',
          light: 'var(--gold-light)',
          DEFAULT: 'var(--gold)',
          antique: 'var(--gold-antique)',
          deep: 'var(--gold-deep)',
        },
        ink: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
        emerald: 'var(--emerald)',
        ruby: 'var(--ruby)',
        cyan: 'var(--cyan)',
        line: 'var(--border)',
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        sans: ['"General Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Gambetta"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(212,175,55,0.25)',
        'glow-lg': '0 0 60px rgba(212,175,55,0.30)',
        card: '0 18px 50px rgba(0,0,0,0.55)',
        'inset-gold': 'inset 0 1px 0 rgba(247,231,182,0.25)',
      },
      backgroundImage: {
        'gold-foil': 'linear-gradient(135deg, var(--gold-champagne) 0%, var(--gold) 45%, var(--gold-antique) 100%)',
        'gold-sheen': 'linear-gradient(90deg, transparent, rgba(247,231,182,0.55), transparent)',
        'radial-gold': 'radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.16), transparent 70%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ember: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '15%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-180px) scale(0.3)', opacity: '0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        ember: 'ember linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.8s ease both',
        marquee: 'marquee 30s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
      },
    },
  },
  plugins: [],
}
