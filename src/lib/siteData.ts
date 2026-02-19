// Données structurelles non-traduites : icônes, IDs, liens, coordonnées.
// Les textes visibles sont dans src/messages/*.json

// Couleurs de fond des sections — utilisées pour les biseaux (slantFill).
// Centralisé ici pour éviter la duplication dans chaque page.
export const BG = {
  cream: '#F8F9FC',
  stone: '#EEF0F7',
  navy:  '#1A1028',
} as const

export type IconName =
  | 'shield'
  | 'handshake'
  | 'lock'
  | 'calculator'
  | 'trending'
  | 'search'
  | 'home'
  | 'rocket'
  | 'users'
  | 'linkedin'

export const services = [
  { id: 'comptabilite', icon: 'calculator' as IconName },
  { id: 'conseil',      icon: 'trending'    as IconName },
  { id: 'audit',        icon: 'search'      as IconName },
  { id: 'patrimoine',   icon: 'home'        as IconName },
  { id: 'creation',     icon: 'rocket'      as IconName },
  { id: 'rh',           icon: 'users'       as IconName },
] as const

export const featureIcons: IconName[] = ['shield', 'handshake', 'lock']

export const contactInfo = {
  email: 'info@srd-partners.ch',
  phone: '+41 22 000 00 00',
  addresses: [
    { id: 'main',     street: 'Route de Chêne 36',    city: '1208 Genève'   },
    { id: 'lausanne', street: 'Avenue de la Gare 10', city: '1003 Lausanne' },
  ],
} as const

export const socials = [
  { label: 'LinkedIn', href: '#', icon: 'linkedin' as IconName },
] as const
