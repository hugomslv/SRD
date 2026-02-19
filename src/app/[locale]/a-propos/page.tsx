import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { TeamCard } from '@/components/TeamCard'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { Icon } from '@/lib/icons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    openGraph: { title: t.meta.aboutTitle, description: t.meta.aboutDescription },
  }
}

export default async function AProposPage({
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

  const stats = [
    { value: '15+',  label: t.about.stats.years   },
    { value: '200+', label: t.about.stats.clients  },
    { value: '4',    label: t.about.stats.experts  },
    { value: '2',    label: t.about.stats.offices  },
  ]

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
        <div
          className="absolute -top-24 right-0 w-96 h-96 rounded-full border border-gold/8 pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-main relative z-10 text-center">
          <span className="section-label text-gold/70">{t.about.overline}</span>
          <PremiumHeading as="h1" size="page" color="light" className="mt-2 mb-6">
            {t.about.title1}{' '}
            <Accent>{t.about.title2}</Accent>
          </PremiumHeading>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <p className="font-body text-white/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* ── Mission & Stats ───────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.navy}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">{t.about.missionOverline}</span>
            <h2 className="section-title mb-6">{t.about.missionTitle}</h2>
            <div className="space-y-4">
              <p className="font-body text-muted leading-relaxed">{t.about.missionP1}</p>
              <p className="font-body text-muted leading-relaxed">{t.about.missionP2}</p>
              <p className="font-body text-muted leading-relaxed">{t.about.missionP3}</p>
            </div>
            <div className="mt-8">
              <Link href={`/${validLocale}/contact`} className="btn-primary">
                {t.about.missionCta}
                <Icon name="arrow" size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg border border-black/[0.06] shadow-card p-8 text-center"
              >
                <p className="font-display text-4xl sm:text-5xl font-semibold text-navy mb-2">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-muted tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Valeurs ──────────────────────────── */}
      <Section bg="stone" slant="left" slantFill={BG.cream}>
        <div className="text-center mb-12">
          <span className="section-label">{t.about.valuesOverline}</span>
          <h2 className="section-title">{t.about.valuesTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.about.values.map((v, i) => (
            <div
              key={v.title}
              className={`bg-white rounded-lg border border-black/[0.06] shadow-card p-7 animate-fade-up delay-${(i + 1) * 100}`}
            >
              <p className="font-display text-5xl font-light text-gold/20 mb-4 leading-none">
                0{i + 1}
              </p>
              <h3 className="font-body text-xl font-semibold text-navy mb-3">{v.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Équipe ───────────────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.stone}>
        <div className="text-center mb-12">
          <span className="section-label">{t.team.overline}</span>
          <h2 className="section-title">{t.team.title}</h2>
          <p className="section-subtitle mx-auto text-center mt-4">{t.team.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.team.members.map((member, i) => (
            <div key={member.name} className={`animate-fade-up delay-${(i + 1) * 100}`}>
              <TeamCard
                name={member.name}
                role={member.role}
                bio={member.bio}
                initials={member.initials}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ──────────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── Footer ───────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
