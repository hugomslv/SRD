import Image from 'next/image'
import Link from 'next/link'
import { type Locale, type Messages } from '@/lib/i18n'
import { services, contactInfo, socials, BG } from '@/lib/siteData'
import { Icon } from '@/lib/icons'

interface FooterProps {
  locale: Locale
  t: Messages
  navItems: Array<{ label: string; href: string }>
  /** Couleur de fond de la section précédente (ContactBlock). Défaut : stone. */
  slantFill?: string
}

export function Footer({ locale, t, navItems, slantFill = BG.stone }: FooterProps) {
  const year = new Date().getFullYear()
  const addressLabels = [t.contact.mainOfficeLabel, t.contact.lausanneOfficeLabel]

  return (
    <footer className="relative bg-navy overflow-hidden">
      {/* Biseau supérieur — couleur = fond de la section précédente */}
      <div className="absolute top-0 left-[-2%] w-[104%] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-10 sm:h-14 md:h-20">
          <polygon points="0,0 0,80 1440,0" fill={slantFill} />
        </svg>
      </div>

      <div className="relative z-10 container-main pt-20 sm:pt-24 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          {/* Colonne 1 — Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-flex mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
              aria-label={t.brand.legal}
            >
              <div className="px-3 py-2 transition-opacity duration-200 group-hover:opacity-85">
                <Image
                  src="/logo.png"
                  alt={t.brand.legal}
                  width={900}
                  height={600}
                  className="h-10 w-auto"
                />
              </div>
            </Link>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
              {t.brand.baseline}
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded text-white/50 border border-white/10 hover:text-white hover:border-white/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon name="linkedin" size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <h3 className="font-body text-xs font-semibold text-white/30 tracking-[0.18em] uppercase mb-5">
              {t.footer.navigation}
            </h3>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Services */}
          <div>
            <h3 className="font-body text-xs font-semibold text-white/30 tracking-[0.18em] uppercase mb-5">
              {t.footer.services}
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={`/${locale}/services#${s.id}`}
                    className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {t.services.items[i].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h3 className="font-body text-xs font-semibold text-white/30 tracking-[0.18em] uppercase mb-5">
              {t.footer.contact}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Icon name="mail" size={15} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone" size={15} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </li>
              {contactInfo.addresses.map((addr, i) => (
                <li key={addr.id} className="flex items-start gap-3">
                  <Icon name="mappin" size={15} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-xs text-white/30 mb-0.5">{addressLabels[i]}</p>
                    <p className="font-body text-sm text-white/60">{addr.street}</p>
                    <p className="font-body text-sm text-white/60">{addr.city}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barre basse */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-body text-xs text-white/30">
            &copy; {year} {t.brand.legal}. {t.footer.rights}
          </p>
          <p className="font-body text-xs text-white/20">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
