import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { featureIcons, services, BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { FeatureCard } from '@/components/FeatureCard'
import { ServiceCard } from '@/components/ServiceCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { TestimonialCard } from '@/components/TestimonialCard'
import { ProcessSection } from '@/components/ProcessSection'
import { FaqSection } from '@/components/FaqSection'
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
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    openGraph: { title: t.meta.homeTitle, description: t.meta.homeDescription },
  }
}

export default async function HomePage({
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

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient hero-grain overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full border border-gold/10 opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -right-16 w-[320px] h-[320px] rounded-full border border-gold/15 opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 container-main text-center">
          <div className="animate-fade-up">
            <p className="section-label text-gold/80 mb-6">{t.hero.overline}</p>

            <PremiumHeading as="h1" size="hero" color="light" className="mb-4">
              <span className="block">SRD</span>
              <Accent><span className="block">Partners</span></Accent>
            </PremiumHeading>

            <div className="flex justify-center mb-8">
              <div className="w-16 h-px bg-gold/50" />
            </div>

            <p className="font-body text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 animate-fade-up delay-200">
              {t.hero.baseline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
              <Link
                href={`/${validLocale}/contact`}
                className="btn-primary text-sm w-full sm:w-auto justify-center"
              >
                {t.nav.cta}
                <Icon name="arrow" size={16} strokeWidth={2} />
              </Link>
              <Link
                href={`/${validLocale}/services`}
                className="btn-outline-dark text-sm w-full sm:w-auto justify-center"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-500">
            <span className="font-body text-[10px] text-white/30 tracking-[0.2em] uppercase">
              {t.hero.scroll}
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Points forts ─────────────────────── */}
      <Section bg="cream" slant="left" slantFill={BG.navy}>
        <div className="text-center mb-14">
          <span className="section-label">{t.features.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark">
            {t.features.titleMain} <Accent>{t.features.titleAccent}</Accent>
          </PremiumHeading>
        </div>
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {t.features.items.map((f, i) => (
            <FeatureCard key={f.title} icon={featureIcons[i]} title={f.title} description={f.description} />
          ))}
        </ScrollReveal>
      </Section>

      {/* ── Services ─────────────────────────── */}
      <Section bg="stone" slant="right" slantFill={BG.cream}>
        <div className="text-center mb-14">
          <span className="section-label">{t.services.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark">
            {t.services.titleMain} <Accent>{t.services.titleAccent}</Accent>
          </PremiumHeading>
          <p className="section-subtitle mx-auto text-center">{t.services.subtitle}</p>
        </div>
        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-12">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              icon={s.icon}
              title={t.services.items[i].title}
              description={t.services.items[i].shortDesc}
              index={i}
            />
          ))}
        </ScrollReveal>
        <div className="text-center">
          <Link href={`/${validLocale}/services`} className="btn-outline">
            {t.services.cta}
            <Icon name="arrow" size={16} strokeWidth={2} />
          </Link>
        </div>
      </Section>

      {/* ── Process ──────────────────────────── */}
      <ProcessSection t={t.process} slantFill={BG.stone} />

      {/* ── Témoignages ──────────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.navy}>
        <div className="text-center mb-14">
          <span className="section-label">{t.testimonials.overline}</span>
          <h2 className="section-title">{t.testimonials.title}</h2>
        </div>
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {t.testimonials.items.map((item, i) => (
            <TestimonialCard
              key={item.author}
              quote={item.quote}
              author={item.author}
              role={item.role}
              initials={item.initials}
            />
          ))}
        </ScrollReveal>
      </Section>

      {/* ── FAQ ──────────────────────────────── */}
      <FaqSection t={t.faq} />

      {/* ── Contact ──────────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── Footer ───────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
