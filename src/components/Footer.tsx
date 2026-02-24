import Image from 'next/image'
import Link from 'next/link'
import { type Locale, type Messages } from '@/lib/i18n'
import { contactInfo, socials } from '@/lib/siteData'
import { Icon } from '@/lib/icons'

interface FooterProps {
  locale: Locale
  t: Messages
  /** Gardé pour compatibilité API — non rendu. */
  navItems?: Array<{ label: string; href: string }>
  /** Gardé pour compatibilité API — non rendu. */
  slantFill?: string
}

// ─────────────────────────────────────────────────────
// Sous-composant : ligne de contact
// align="end"   → texte à gauche, icône ronde à droite, ligne alignée à droite  (desktop)
// align="start" → même ordre, ligne alignée à gauche                             (mobile)
// ─────────────────────────────────────────────────────
type ContactIcon = 'mail' | 'phone' | 'mappin' | 'globe'

interface ContactRowProps {
  icon: ContactIcon
  text: string
  href?: string
  external?: boolean
  align?: 'start' | 'end'
}

function ContactRow({ icon, text, href, external, align = 'end' }: ContactRowProps) {
  const base = [
    'flex items-center gap-2.5 group',
    align === 'end' ? 'justify-end' : 'justify-start',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded',
  ].join(' ')

  const iconCircle = (
    <span
      className="w-[23px] h-[23px] rounded-full border border-ink/35 flex items-center justify-center flex-shrink-0 text-ink/50 group-hover:text-primary-500 group-hover:border-primary-500/50 transition-colors duration-200"
      aria-hidden="true"
    >
      <Icon name={icon} size={11} strokeWidth={1.5} />
    </span>
  )

  const label = (
    <span className="font-body text-[0.78rem] text-ink/80 group-hover:text-primary-500 transition-colors duration-200">
      {text}
    </span>
  )

  const inner = (
    <>
      {label}
      {iconCircle}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={base}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }
  return <div className={base}>{inner}</div>
}

// ─────────────────────────────────────────────────────
// Footer principal
// ─────────────────────────────────────────────────────
export function Footer({ locale, t }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer>

      {/* ── Trait cramoisi — haut (3 px, full-width) ─── */}
      <div className="h-[3px] bg-gold" aria-hidden="true" />

      {/* ── Carte de visite ──────────────────────────── */}
      {/*    Desktop : hauteur fixe 180 px, layout absolu */}
      {/*    Mobile  : flux normal, layout vertical       */}
      <div className="relative overflow-hidden bg-stone lg:h-[220px]">

        {/* Triangle violet — derrière (z-1)
            Angle droit bas-gauche : (0,0) → (0,100%) → (30%,100%) */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            clipPath: 'polygon(0 0, 0 100%, 30% 100%)',
            background: 'linear-gradient(to bottom right, #9040c0 0%, #3d0e65 100%)',
            filter: 'drop-shadow(8px 0px 12px rgba(0,0,0,0.50))',
          }}
          aria-hidden="true"
        />

        {/* Triangle gris — devant (z-2)
            Angle droit haut-gauche : (0,0) → (44%,0) → (0,100%) */}
        <div
          className="absolute inset-0 bg-[#c8c3d0] z-[2]"
          style={{
            clipPath: 'polygon(0 0, 44% 0, 0 100%)',
            filter: 'drop-shadow(6px 2px 10px rgba(0,0,0,0.40))',
          }}
          aria-hidden="true"
        />

        {/* ══ MOBILE — flux vertical (masqué sur lg) ══ */}
        <div className="relative z-[3] lg:hidden flex flex-col gap-5 px-6 py-8">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="inline-flex group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={t.brand.legal}
          >
            <Image
              src="/logo.png"
              alt={t.brand.legal}
              width={900}
              height={600}
              className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-75"
            />
          </Link>
          <p
            className="font-body text-[10px] text-ink/30 tracking-[0.22em] uppercase -mt-3 select-none"
            aria-hidden="true"
          >
            Partners Sàrl
          </p>

          {/* Identité */}
          <div className="flex flex-col gap-1">
            <p className="font-body text-[13px] font-semibold text-ink tracking-[0.12em] uppercase">
              {contactInfo.contact}
            </p>
            <p className="font-body text-[10px] text-muted tracking-[0.15em] uppercase">
              {contactInfo.role}
            </p>
            <div
              className="h-px w-20 mt-2 bg-gradient-to-r from-gold/70 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Contacts — left-aligned on mobile */}
          <div className="flex flex-col gap-[5px]">
            <ContactRow align="start" icon="mail"    text={contactInfo.email}                            href={`mailto:${contactInfo.email}`} />
            <ContactRow align="start" icon="phone"   text={contactInfo.phone}                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} />
            {contactInfo.addresses.map((addr) => (
              <ContactRow align="start" key={addr.id} icon="mappin" text={`${addr.street}, ${addr.city}`} />
            ))}
            <ContactRow align="start" icon="globe"   text={contactInfo.website.replace('https://', '')} href={contactInfo.website} external />
          </div>

          {/* Réseaux sociaux */}
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-black/[0.12] text-primary-500/50 hover:text-primary-500 hover:border-primary-500/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name={s.icon} size={14} strokeWidth={1.75} />
              </a>
            ))}
          </div>

        </div>

        {/* ══ DESKTOP — overlay absolu (masqué sur mobile) ══ */}
        <div className="hidden lg:block absolute inset-0 z-[3]">

          {/* Zone logo — haut-gauche */}
          <div className="absolute top-5 left-7 flex flex-col gap-1.5">
            <Link
              href={`/${locale}`}
              className="inline-flex group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              aria-label={t.brand.legal}
            >
              <Image
                src="/logo.png"
                alt={t.brand.legal}
                width={900}
                height={600}
                className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-75"
              />
            </Link>
            <p
              className="font-body text-[10px] text-ink/30 tracking-[0.22em] uppercase select-none"
              aria-hidden="true"
            >
              Partners Sàrl
            </p>
          </div>

          {/* Réseaux sociaux — bas-gauche (emplacement du QR code sur la carte) */}
          <div className="absolute bottom-5 left-7 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-black/[0.12] text-primary-500/50 hover:text-primary-500 hover:border-primary-500/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name={s.icon} size={13} strokeWidth={1.75} />
              </a>
            ))}
          </div>

          {/* Zone contacts — droite, centré verticalement */}
          {/*   left: 38% → la zone commence après la diagonale du triangle gris */}
          <div
            className="absolute inset-y-0 right-0 flex flex-col justify-center items-end pr-10 gap-[5px]"
            style={{ left: '38%' }}
          >
            <p className="font-body text-[1.1rem] font-semibold text-ink tracking-[0.12em] uppercase leading-none">
              {contactInfo.contact}
            </p>
            <p className="font-body text-[0.72rem] font-light text-muted tracking-[0.15em]">
              {contactInfo.role}
            </p>

            {/* Trait dégradé cramoisi — direction droite→gauche (right-aligned) */}
            <div
              className="w-full h-px mt-1 mb-1 bg-gradient-to-l from-gold/70 to-transparent"
              aria-hidden="true"
            />

            <ContactRow icon="mail"    text={contactInfo.email}                            href={`mailto:${contactInfo.email}`} />
            <ContactRow icon="phone"   text={contactInfo.phone}                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} />
            {contactInfo.addresses.map((addr) => (
              <ContactRow key={addr.id} icon="mappin" text={`${addr.street}, ${addr.city}`} />
            ))}
            <ContactRow icon="globe"   text={contactInfo.website.replace('https://', '')} href={contactInfo.website} external />
          </div>

        </div>
      </div>

      {/* ── Trait cramoisi — bas (3 px, full-width) ─── */}
      <div className="h-[3px] bg-gold" aria-hidden="true" />

      {/* ── Copyright ─────────────────────────────────── */}
      <div className="container-main py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-black/30">
            &copy; {year} {t.brand.legal}. {t.footer.rights}
          </p>
          <p className="font-body text-xs text-black/25">{t.footer.tagline}</p>
        </div>
      </div>

    </footer>
  )
}
