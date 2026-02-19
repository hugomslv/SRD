# SRD Partners — Site multilingue

Site vitrine de SRD Partners Sàrl, cabinet fiduciaire à Genève et Lausanne.

**Stack :** Next.js 15 · TypeScript · Tailwind CSS · i18n custom léger (sans dépendance externe)

---

## Langues disponibles

| Locale | URL     | Statut            |
|--------|---------|-------------------|
| 🇫🇷 Français  | `/fr`   | Langue par défaut |
| 🇬🇧 Anglais   | `/en`   | ✅ Actif          |
| 🇵🇹 Portugais | `/pt`   | ✅ Actif          |

La langue choisie est mémorisée dans un cookie `preferred-locale` (durée : 1 an).
Un visiteur arrivant sur `/` est automatiquement redirigé vers sa langue mémorisée ou `/fr`.

---

## Architecture i18n

### Routing

Toutes les pages sont sous le segment dynamique `[locale]` :

```
/fr              → Accueil
/fr/services     → Services
/fr/a-propos     → À propos
/fr/contact      → Contact

/en              → Home
/en/services     → Services
...
```

Le middleware (`src/middleware.ts`) gère la redirection automatique depuis `/`.

### Fichiers de traduction

```
src/messages/
├── fr.json   ← Français (langue source)
├── en.json   ← Anglais
└── pt.json   ← Portugais
```

Chaque fichier contient **exactement les mêmes clés**. Structure :

```json
{
  "nav":          { "home", "services", "about", "contact", "cta" },
  "header":       { "tagline", "closeMenu", "openMenu", "mainNav", "mobileNav" },
  "hero":         { "overline", "baseline", "ctaSecondary", "scroll" },
  "features":     { "overline", "title", "items": [{ "title", "description" }] },
  "services":     { "overline", "title", "subtitle", "cta", "pageTitle1/2",
                    "promiseOverline/Title/Text/Cta1/Cta2",
                    "items": [{ "title", "shortDesc", "longDesc" }] },
  "testimonials": { "overline", "title", "items": [{ "quote", "author", "role", "initials" }] },
  "about":        { "overline", "title1/2", "subtitle", "missionOverline/Title/P1/P2/P3/Cta",
                    "stats": { "years", "clients", "experts", "offices" },
                    "valuesOverline/Title", "values": [{ "title", "description" }] },
  "team":         { "overline", "title", "subtitle", "members": [{ "name", "role", "bio", "initials" }] },
  "contact":      { "overline", "title1/2", "subtitle", "coordsOverline/Title",
                    "emailLabel", "phoneLabel", "mainOfficeLabel", "lausanneOfficeLabel",
                    "hours", "country",
                    "form": { labels, placeholders, subjects, errors, success... } },
  "footer":       { "navigation", "services", "contact", "tagline", "rights" },
  "meta":         { "homeTitle/Description", "servicesTitle/Description",
                    "aboutTitle/Description", "contactTitle/Description", "titleTemplate" },
  "brand":        { "name", "legal", "baseline" }
}
```

### Utilitaires

| Fichier | Rôle |
|---------|------|
| `src/lib/i18n.ts` | Types (`Locale`, `Messages`) + `getMessages(locale)` + `isValidLocale()` |
| `src/lib/siteData.ts` | Données non-traduites : IDs services, icônes, coordonnées, réseaux sociaux |
| `src/middleware.ts` | Redirection `/` → locale préférée + propagation |
| `src/components/LanguageSwitcher.tsx` | Sélecteur FR / EN / PT (mémorise le choix en cookie) |

---

## Ajouter une nouvelle langue (ex. Allemand)

### 1. Créer le fichier de traduction

Copier `src/messages/fr.json` → `src/messages/de.json` et traduire toutes les valeurs.
⚠️ Toutes les clés doivent être présentes.

### 2. Enregistrer la locale dans `src/lib/i18n.ts`

```ts
import deMessages from '@/messages/de.json'

export type Locale = 'fr' | 'en' | 'pt' | 'de'        // ← ajouter 'de'
export const locales: Locale[] = ['fr', 'en', 'pt', 'de']  // ← ajouter

const allMessages: Record<Locale, Messages> = {
  fr: frMessages,
  en: enMessages as Messages,
  pt: ptMessages as Messages,
  de: deMessages as Messages,  // ← ajouter
}
```

### 3. Mettre à jour `src/middleware.ts`

```ts
const locales = ['fr', 'en', 'pt', 'de']  // ← ajouter 'de'
```

### 4. Mettre à jour `src/components/LanguageSwitcher.tsx`

```ts
const LABELS: Record<Locale, string> = { fr: 'FR', en: 'EN', pt: 'PT', de: 'DE' }
```

C'est tout ! La nouvelle langue est accessible sur `/de`, `/de/services`, etc.

---

## Modifier les traductions existantes

Ouvrir directement le fichier JSON correspondant :

```
src/messages/fr.json   ← contenu français
src/messages/en.json   ← contenu anglais
src/messages/pt.json   ← contenu portugais
```

## Modifier les données structurelles (icônes, coordonnées, email, téléphone)

```
src/lib/siteData.ts
```

---

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx              ← Layout racine (passthrough)
│   ├── globals.css             ← Styles globaux Tailwind
│   └── [locale]/               ← Routes localisées
│       ├── layout.tsx          ← <html lang>, fonts, Header (SEO hreflang)
│       ├── page.tsx            ← Accueil
│       ├── services/page.tsx   ← Services
│       ├── a-propos/page.tsx   ← À propos
│       └── contact/page.tsx    ← Contact
│
├── messages/
│   ├── fr.json                 ← Toutes les traductions françaises
│   ├── en.json                 ← Toutes les traductions anglaises
│   └── pt.json                 ← Toutes les traductions portugaises
│
├── components/
│   ├── Header.tsx              ← Navigation (reçoit les traductions en props)
│   ├── Footer.tsx              ← Pied de page
│   ├── ContactBlock.tsx        ← Formulaire de contact
│   ├── LanguageSwitcher.tsx    ← Sélecteur de langue FR/EN/PT
│   └── ...autres composants
│
├── lib/
│   ├── i18n.ts                 ← Système de traductions (types + getMessages)
│   ├── siteData.ts             ← Données structurelles non-traduites
│   ├── icons.tsx               ← Icônes SVG inline
│   └── utils.ts                ← cn() utilitaire
│
└── middleware.ts               ← Redirection / → /fr (ou locale mémorisée)
```

---

## SEO multilingue

Le layout `[locale]/layout.tsx` génère automatiquement :
- `<html lang="fr|en|pt">`
- `<link rel="alternate" hreflang="fr" href="/fr" />`
- `<link rel="alternate" hreflang="en" href="/en" />`
- `<link rel="alternate" hreflang="pt" href="/pt" />`
- `<link rel="alternate" hreflang="x-default" href="/fr" />`
- `<meta name="description">` dynamique par langue et par page

---

## Développement

```bash
npm install
npm run dev     # http://localhost:3000 → redirige vers /fr
npm run build
npm run start
```
