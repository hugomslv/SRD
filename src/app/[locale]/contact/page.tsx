import type { Metadata } from 'next'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { contactInfo, BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { InfoCard } from '@/components/InfoCard'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    openGraph: { title: t.meta.contactTitle, description: t.meta.contactDescription },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  const navItems = [
    { label: t.nav.home,     href: `/${validLocale}` },
    { label: t.nav.services, href: `/${validLocale}/services` },
    { label: t.nav.about,    href: `/${validLocale}/a-propos` },
    { label: t.nav.contact,  href: `/${validLocale}/contact` },
  ]

  const addressLabels = [t.contact.mainOfficeLabel, t.contact.lausanneOfficeLabel]

  return (
    <>
      {/* ── Hero page ──────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true">
          <div
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div className="container-main relative z-10 text-center">
          <span className="section-label text-gold/70">{t.contact.overline}</span>
          <PremiumHeading as="h1" size="page" color="light" className="mt-2 mb-6">
            {t.contact.title1}{' '}
            <Accent>{t.contact.title2}</Accent>
          </PremiumHeading>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <p className="font-body text-white/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* ── InfoCards ────────────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.navy}>
        <div className="text-center mb-12">
          <span className="section-label">{t.contact.coordsOverline}</span>
          <h2 className="section-title">{t.contact.coordsTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            icon="mail"
            label={t.contact.emailLabel}
            lines={[contactInfo.email]}
            href={`mailto:${contactInfo.email}`}
          />
          <InfoCard
            icon="phone"
            label={t.contact.phoneLabel}
            lines={[contactInfo.phone, t.contact.hours]}
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
          />
          {contactInfo.addresses.map((addr, i) => (
            <InfoCard
              key={addr.id}
              icon="mappin"
              label={addressLabels[i]}
              lines={[addr.street, addr.city, t.contact.country]}
            />
          ))}
        </div>
      </Section>

      {/* ── Formulaire ───────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── Footer ───────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
