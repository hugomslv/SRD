import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────
      // TYPOGRAPHIE
      // Primary : Manrope (sans-serif, corporate moderne)
      // Display : Playfair Display (serif, accentuation italique éditoriale)
      // ─────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Manrope', 'system-ui', 'sans-serif'],
      },

      // ─────────────────────────────────────────
      // COULEURS — extraites du logo SRD Partners
      //
      // Sections claires :
      //   cream  → fond principal (cool near-white)
      //   stone  → fond alterné  (cool light gray)
      // Sections sombres :
      //   navy   → fond sombre / hero / footer (dark violet)
      // Accents :
      //   gold   → alias sémantique crimson (CTA, labels, micro-accents)
      //   primary → échelle complète violet (titres, liens, highlights)
      //   accent → échelle complète crimson (miroir de gold)
      // Texte :
      //   ink    → texte principal dark
      //   muted  → texte secondaire cool gray
      // ─────────────────────────────────────────
      colors: {
        // Fonds de sections (cool, pas de tons chauds)
        cream:    '#F8F9FC',
        stone:    '#D2C9D6',
        // Fond minéral — lavande grise subtile, sections premium
        mineral:  '#D2C9D6',

        // Fond sombre — violet nuit profond (du logo)
        navy: {
          DEFAULT: '#301B4A',
          800:     '#1C102B',
          700:     '#231436',
        },

        // Alias sémantique accent/crimson → utilisé pour CTA, overlines, séparateurs
        // (préserve les classes bg-gold, text-gold, etc. déjà en place)
        gold: {
          DEFAULT: '#97144F',
          light:   '#E84272',
          pale:    '#FFF0F4',
          dark:    '#A00E3A',
        },

        // Texte principal — violet nuit très sombre
        ink: '#1A0F2A',

        // Texte secondaire — cool muted
        muted: '#5A6080',

        // ── Échelle primaire complète (violet logo SRD)
        primary: {
          50:  '#F5F4F6',
          100: '#EBE9ED',
          200: '#D6D2DB',
          300: '#B8B1C1',
          400: '#8F839D',
          500: '#301B4A', // rgb(48, 27, 74)
          600: '#2A1841',
          700: '#231436',
          800: '#1C102B',
          900: '#150C21',
          950: '#0E0816',
        },

        // ── Échelle accent complète (crimson arrow du logo)
        accent: {
          50:  '#FFF0F4',
          100: '#FFE1EC',
          200: '#FFC3D9',
          300: '#FF95BB',
          400: '#FF5A8F',
          500: '#E01855',
          600: '#97144F',
          700: '#A00E3A',
          800: '#81092F',
          900: '#620624',
          950: '#3D0314',
        },

        // ── Nuancier gris cool (zéro ton chaud/beige)
        gray: {
          50:  '#F8F9FC',
          100: '#D2C9D6',
          200: '#DDE1ED',
          300: '#C4CAD9',
          400: '#9BA4BB',
          500: '#6B7490',
          600: '#515B75',
          700: '#3C445C',
          800: '#272E44',
          900: '#161B2E',
          950: '#0C1020',
        },
      },

      // ─────────────────────────────────────────
      // OMBRES
      // ─────────────────────────────────────────
      boxShadow: {
        card: '0 1px 3px rgba(26,10,40,0.06), 0 4px 16px rgba(26,10,40,0.06)',
        'card-hover': '0 8px 32px rgba(26,10,40,0.14)',
        // Ombre teintée crimson pour les CTA
        gold: '0 4px 20px rgb(151, 20, 79,0.30)',
        // Ombres multicouches premium (légèrement violet-tintées)
        premium: [
          '0 0 0 1px rgba(26,10,40,0.05)',
          '0 2px 4px rgba(26,10,40,0.04)',
          '0 8px 16px rgba(26,10,40,0.05)',
          '0 20px 40px rgba(26,10,40,0.04)',
        ].join(', '),
        'premium-hover': [
          '0 0 0 1px rgba(26,10,40,0.07)',
          '0 4px 8px rgba(26,10,40,0.05)',
          '0 16px 32px rgba(26,10,40,0.08)',
          '0 40px 64px rgba(26,10,40,0.07)',
        ].join(', '),
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config



