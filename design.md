# SRD Partners — Design System

> Version 2.0 — Extraite du logo officiel SRD Partners Sàrl
> Direction visuelle : Swiss Corporate · Premium · Structuré · Sobre

---

## 1. Philosophie

| Principe | Description |
|----------|-------------|
| **Swiss corporate** | Rigoureux, structuré, sobre — pas de décoration superflue |
| **Typography-first** | La hiérarchie repose sur la fonte, pas la couleur |
| **Selective color** | La couleur primaire (violet) et l'accent (crimson) sont utilisés avec parcimonie |
| **Generous space** | Sections larges et aérées, padding généreux, respiration |
| **No startup vibes** | Zéro gradient coloré, zéro SaaS flashy, zéro cartoon |

**Inspiration structurelle :** figemax.ch / PwC / McKinsey

---

## 2. Couleurs — Extraites du logo

> Toutes les couleurs sont définies dans `tailwind.config.ts`.
> Utiliser exclusivement les tokens Tailwind — jamais de hex hardcodé dans les composants.

### Couleurs sémantiques (usage direct)

| Token Tailwind | Hex | Usage |
|----------------|-----|-------|
| `bg-cream` | `#F8F9FC` | Fond section principale (cool near-white) |
| `bg-stone` | `#D2C9D6` | Fond section alternée (cool light gray) |
| `bg-navy` / `bg-navy` | `#301B4A` | Fond sombre — hero, footer, sections nuit |
| `text-gold` / `bg-gold` | `#97144F` | Alias accent crimson — CTA, overlines, séparateurs |
| `text-gold-light` | `#E84272` | Hover CTA, version claire |
| `text-gold-pale` / `bg-gold-pale` | `#FFF0F4` | Fond très subtil teinté crimson |
| `text-ink` | `#1A0F2A` | Texte principal dark (violet nuit) |
| `text-muted` | `#5A6080` | Texte secondaire (cool muted) |

### Échelle Primary — Violet (lettres SRD du logo)

```
primary-50   #F5F4F6  — Fond teinté très clair
primary-100  #EBE9ED  — Fond léger
primary-200  #D6D2DB  — Hover état fond
primary-300  #B8B1C1  — Accents légers
primary-400  #8F839D  — Intermédiaire
primary-500  #301B4A  ← VALEUR LOGO — titles, liens, highlights
primary-600  #2A1841  — Hover texte
primary-700  #231436  — Active state
primary-800  #1C102B  — Très sombre
primary-900  #150C21  — Near-black violet
primary-950  #0E0816  — Fond alternatif sombre
```

**Usage primary :** titres, liens, btn-outline border/text, badges, highlights sur sections claires.

### Échelle Accent — Crimson (arrow du logo)

```
accent-50   #FFF0F4  — Fond teinté très clair
accent-100  #FFE1EC  — Fond léger
accent-200  #FFC3D9
accent-300  #FF95BB
accent-400  #FF5A8F
accent-500  #E01855  — Version usable (contraste AA white)
accent-600  #97144F  ← VALEUR LOGO EXACTE (= gold.DEFAULT)
accent-700  #A00E3A  — Hover (= gold.dark)
accent-800  #81092F
accent-900  #620624
accent-950  #3D0314
```

**Usage accent :** CTA buttons, overlines, séparateurs, focus ring (= gold en Tailwind).

### Nuancier Gris — Cool (aucun ton chaud)

```
gray-50   #F8F9FC  — Fond (= cream)
gray-100  #D2C9D6  — Fond alterné (= stone)
gray-200  #DDE1ED
gray-300  #C4CAD9
gray-400  #9BA4BB
gray-500  #6B7490  — Texte secondaire
gray-600  #515B75
gray-700  #3C445C  — Texte corps sur fond clair
gray-800  #272E44
gray-900  #161B2E
gray-950  #0C1020
```

---

## 3. Typographie

> Polices chargées via `next/font/google` dans `src/app/[locale]/layout.tsx`.

### Font Pairing

| Rôle | Police | Variable CSS | Tailwind |
|------|--------|-------------|---------|
| **Corps, UI, forms** | Manrope | `--font-body` | `font-body` |
| **Titres H1/H2, accents italiques** | Playfair Display | `--font-display` | `font-display` |

### Règles typographiques

| Niveau | Fonte | Poids | Usage |
|--------|-------|-------|-------|
| H1 Hero | Playfair Display | 400 light | Titre principal plein écran |
| H1 Page | Playfair Display | 400 light | Titres de sous-pages |
| H2 Section | Playfair Display | 400 light | Sections, `PremiumHeading size="section"` |
| H3 | Manrope | 600 semibold | Titres de cartes |
| H4 | Manrope | 600 semibold | Sous-sections |
| Body | Manrope | 400 regular | Texte courant |
| UI Labels | Manrope | 500–600 | Boutons, labels, overlines |

### Accent italique (Playfair Display italic)

```tsx
// Utiliser le composant Accent dans PremiumHeading — jamais inline
<PremiumHeading as="h2" size="section" color="dark">
  {t.section.titleMain} <Accent>{t.section.titleAccent}</Accent>
</PremiumHeading>
```

L'accent italique est en `text-gold` (crimson) — utilisé sur **un seul fragment** par titre.

### Échelle typographique

| Classe Tailwind | Valeur | Contexte |
|-----------------|--------|---------|
| `text-[11px] tracking-[0.22em]` | 11px + 22% tracking | Overlines (section-label) |
| `text-sm` | 14px | Description cartes courte |
| `text-base` | 16px | Corps standard |
| `text-lg` | 18px | Corps large |
| `text-xl` | 20px | Titre cartes (H3) |
| `text-3xl sm:text-4xl lg:text-5xl` | 30→48px | Section titles (H2) |
| `text-5xl sm:text-6xl md:text-7xl` | 48→72px | Page hero H1 |
| `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` | 48→96px | Home hero H1 |

---

## 4. Espacement & Layout

| Token | Valeur | Usage |
|-------|--------|-------|
| `.container-main` | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | Conteneur centré responsive |
| Section padding (avec biseau) | `pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20` | Sections avec slant |
| Section padding (sans biseau) | `py-16 sm:py-20` | Sections sans slant |
| Card padding standard | `p-9 sm:p-10` | ServiceCard, FeatureCard |
| Card padding long | `p-10 sm:p-12` | ServiceCard long (page services) |
| Hero padding | `pt-32 pb-20 sm:pt-40 sm:pb-24` | Hero sous-pages |

---

## 5. Système de cartes

### ServiceCard / FeatureCard (Premium)

```
background:    white
border-radius: rounded-[28px]   (28px — très arrondi, premium)
padding:       p-9 sm:p-10  /  p-10 sm:p-12 (long)
shadow:        shadow-premium (multicouche subtile)
hover:         -translate-y-1.5 + shadow-premium-hover
accent:        icône bg-gold/[0.08] → bg-gold/[0.14] au hover
séparateur:    h-px w-8 bg-gold/40 → w-14 bg-gold/65 au hover
badge:         numéro 01,02… top-right (text-black/[0.12])
```

### CardBase (simple)

```
background:    white
border-radius: rounded-xl (12px)
shadow:        shadow-card
hover:         -translate-y-1 + shadow-card-hover
```

---

## 6. Boutons

| Classe | Couleur | Forme | Usage |
|--------|---------|-------|-------|
| `.btn-primary` | bg-gold (#97144F) + white text | `rounded-full` (pill) | CTA principal |
| `.btn-outline` | border/text primary-500 (#301B4A) | `rounded-full` (pill) | Action secondaire sur fond clair |
| `.btn-outline-dark` | border/text white/40→white | `rounded-full` (pill) | Action secondaire sur fond sombre |

```css
/* Exemple btn-primary généré */
background: #97144F;
color: white;
border-radius: 9999px;
padding: 14px 28px;
font-family: Manrope;
font-weight: 600;
font-size: 13px;
letter-spacing: 0.04em;
box-shadow: 0 4px 20px rgb(151, 20, 79,0.30);
```

---

## 7. Ombres

| Token | Valeur CSS | Usage |
|-------|-----------|-------|
| `shadow-card` | `0 1px 3px rgba(26,10,40,0.06), 0 4px 16px rgba(26,10,40,0.06)` | Cartes standard |
| `shadow-card-hover` | `0 8px 32px rgba(26,10,40,0.14)` | Hover cartes standard |
| `shadow-gold` | `0 4px 20px rgb(151, 20, 79,0.30)` | Ombre CTA crimson |
| `shadow-premium` | Multicouche 4 niveaux subtils | Cartes premium ServiceCard |
| `shadow-premium-hover` | Multicouche amplifiée | Hover cartes premium |

---

## 8. Icônes

Style : **line icons** — Stroke fin (1.5px), monochrome, taille 20–24px.

Composant : `<Icon name="..." size={22} strokeWidth={1.5} />`

Icônes disponibles (`src/lib/icons.tsx`) :

| Nom | Contexte |
|-----|---------|
| `shield` | Expertise / sécurité |
| `handshake` | Partenariat |
| `lock` | Confidentialité |
| `calculator` | Comptabilité |
| `trending` | Conseil / croissance |
| `search` | Audit |
| `home` | Patrimoine |
| `rocket` | Création d'entreprise |
| `users` | RH |
| `linkedin` | Réseau social |
| `arrow` | CTA / navigation |
| `mail` / `phone` / `mappin` | Contact |
| `menu` / `close` | Navigation mobile |
| `chevron` | Liens menu |
| `globe` | Language switcher |

---

## 9. Sections biseaux

Le composant `<Section>` gère les séparateurs diagonaux via SVG inline `aria-hidden`.

```tsx
<Section bg="cream" slant="left" slantFill={BG.navy}>
  {/* content */}
</Section>
```

Alternance des directions : `left` → `right` → `left` → `right`

**Couleurs de section (`BG` de `siteData.ts`) :**

| Constante | Hex | Apparence |
|-----------|-----|-----------|
| `BG.cream` | `#F8F9FC` | Blanc cool — fond principal |
| `BG.stone` | `#D2C9D6` | Gris cool clair — fond alterné |
| `BG.navy` | `#301B4A` | Violet nuit profond — sombre |

---

## 10. Animations

| Classe | Description |
|--------|-------------|
| `.animate-fade-up` | Entrée fadeUp 0.6s ease |
| `ScrollReveal` | Stagger GSAP à l'entrée viewport (enfants directs) |
| `ProcessSection` | Scroll vertical → horizontal GSAP ScrollTrigger pinned |
| Hover cards | `transition-all duration-300 ease-smooth` |
| Séparateur cards | `transition-all duration-500 ease-out` |

---

## 11. CSS Custom Properties (runtime)

Définies dans `globals.css` :

```css
:root {
  --slant-h: 4rem;   /* hauteur biseau desktop */
}
@media (max-width: 640px) {
  :root { --slant-h: 2rem; }
}
```

---

## 12. Tokens CSS équivalents (référence non-Tailwind)

```css
/* ── Couleurs ─────────────────── */
--color-cream:          #F8F9FC;
--color-stone:          #D2C9D6;
--color-navy:           #301B4A;
--color-primary:        #301B4A;
--color-primary-dark:   #31104F;
--color-accent:         #97144F;
--color-accent-light:   #E84272;
--color-accent-pale:    #FFF0F4;
--color-accent-dark:    #A00E3A;
--color-ink:            #1A0F2A;
--color-muted:          #5A6080;

/* ── Typographie ──────────────── */
--font-display:  'Playfair Display', Georgia, serif;
--font-body:     'Manrope', system-ui, sans-serif;

/* ── Espacement ───────────────── */
--container-max:  80rem;          /* 1280px */
--section-py:     5rem;           /* 80px */
--card-radius:    1.75rem;        /* 28px — premium */
--card-radius-sm: 0.75rem;        /* 12px — standard */
--card-p:         2.25rem;        /* 36px */

/* ── Ombres ───────────────────── */
--shadow-card:    0 1px 3px rgba(26,10,40,0.06), 0 4px 16px rgba(26,10,40,0.06);
--shadow-cta:     0 4px 20px rgb(151, 20, 79,0.30);
```

---

## 13. Anti-patterns à éviter absolument

```
✗ hardcoder une couleur hex dans un composant ou une page
✗ utiliser text-yellow-*, bg-orange-* ou toute couleur hors système
✗ créer un bouton carré (border-radius 0) — toujours pill ou rounded-xl minimum
✗ gradient coloré sur toute une section (seulement le hero)
✗ plus d'un Accent italique par titre
✗ utiliser Playfair Display pour le corps de texte
✗ utiliser Manrope pour les grands titres H1/H2
✗ dupliquer les hex de BG.* dans les pages — toujours importer BG de siteData
✗ écrire <span className="italic text-gold"> directement — utiliser <Accent>
```



