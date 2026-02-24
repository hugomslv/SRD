import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { services, BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { FeatureCard } from '@/components/FeatureCard'
import { ServiceCard } from '@/components/ServiceCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ProcessSection } from '@/components/ProcessSection'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { HomeParallax } from '@/components/HomeParallax'
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
    { label: t.nav.whoWeAre, href: `/${validLocale}/qui-sommes-nous` },
    { label: t.nav.contact,  href: `/${validLocale}/contact` },
  ]

  return (
    <>
      {/* Client-side parallax effects — no DOM output */}
      <HomeParallax />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-primary-950 hero-grain"
      >
        {/* L1 — Dégradé violet profond */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #0E0816 0%, #150C21 60%, #1C102B 100%)' }}
          aria-hidden="true"
        />

        {/* L2 — Image bâtiment (target for GSAP hero parallax) */}
        <div
          data-parallax="hero-img"
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/hero-building.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* L3 — Overlay premium */}
        <div className="hero-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* L4 — Grille subtile */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        {/* L5 — Texture minérale (soft-light, quasi imperceptible) */}
        <div className="hero-mineral absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* L6 — Fondu bas */}
        <div className="hero-bottom-fade absolute bottom-0 inset-x-0 h-48 pointer-events-none" aria-hidden="true" />

        {/* Contenu */}
        <div className="relative z-10 container-main w-full py-36 lg:py-0 min-h-[90vh] md:min-h-screen flex items-center">
          <div className="w-full lg:max-w-[56%] text-center lg:text-left animate-fade-up">

            <p className="section-label text-gold/80 mb-6">{t.hero.overline}</p>

            <PremiumHeading as="h1" size="hero" color="light" className="mb-5">
              <span className="block">SRD</span>
              <Accent><span className="block">Partners</span></Accent>
            </PremiumHeading>

            <div className="flex justify-center lg:justify-start mb-8">
              <div className="w-16 h-px bg-gold/50" />
            </div>

            <p className="font-body text-white/60 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 animate-fade-up delay-200">
              {t.hero.baseline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up delay-300">
              <Link
                href={`/${validLocale}/contact`}
                className="btn-primary w-full sm:w-auto justify-center"
              >
                {t.nav.cta}
                <Icon name="arrow" size={16} strokeWidth={2} />
              </Link>
              <Link
                href={`/${validLocale}/services`}
                className="btn-outline-dark w-full sm:w-auto justify-center"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-500 z-10"
          aria-hidden="true"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* ── Features — Notre engagement ─────────────────────────────────── */}
      <Section bg="stone" slant="right" slantFill={BG.navy}>
        {/* Ligne de signature — haut */}
        <div className="h-px bg-gold/70 mb-14 sm:mb-20" aria-hidden="true" />

        <div className="text-center mb-14 sm:mb-20">
          <span className="section-label">{t.features.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark" className="mt-2">
            {t.features.titleMain} <Accent>{t.features.titleAccent}</Accent>
          </PremiumHeading>
        </div>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-20">
          {t.features.items.map((item, i) => (
            <FeatureCard
              key={item.title}
              index={i}
              title={item.title}
              description={item.description}
            />
          ))}
        </ScrollReveal>

        {/* Ligne de signature — bas */}
        <div className="h-px bg-gold/70 mt-14 sm:mt-20" aria-hidden="true" />
      </Section>

      {/* ── Services — Aperçu des domaines ──────────────────────────────── */}
      <Section bg="cream" slant="left" slantFill={BG.stone}>
        <div className="text-center mb-16 sm:mb-20">
          <span className="section-label">{t.services.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark" className="mt-2">
            {t.services.titleMain} <Accent>{t.services.titleAccent}</Accent>
          </PremiumHeading>
          <p className="section-subtitle mx-auto text-center">{t.services.subtitle}</p>
        </div>
        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
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
        <div className="text-center mt-14">
          <Link href={`/${validLocale}/services`} className="btn-outline">
            {t.services.cta}
            <Icon name="arrow" size={16} strokeWidth={2} />
          </Link>
        </div>
      </Section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <Section bg="mineral" slant="right" slantFill={BG.cream}>
        {/* En-tête */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="section-label">{t.testimonials.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark">
            {t.testimonials.titleMain} <Accent>{t.testimonials.titleAccent}</Accent>
          </PremiumHeading>
        </div>

        {/* Témoignage vedette — grand format éditorial */}
        <figure className="text-center max-w-3xl mx-auto">
          <span
            className="font-display block leading-[0.75] text-gold/[0.13] select-none pointer-events-none -mb-5"
            style={{ fontSize: 'clamp(5rem, 12vw, 8rem)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote>
            <p className="font-display font-light italic text-xl sm:text-[1.6rem] text-ink/80 leading-[1.62]">
              {t.testimonials.items[0].quote}
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center gap-1.5">
            <div className="w-8 h-px bg-gold/45 mb-3" aria-hidden="true" />
            <p className="font-body text-sm font-semibold text-navy">
              {t.testimonials.items[0].author}
            </p>
            <p className="font-body text-xs text-muted">
              {t.testimonials.items[0].role}
            </p>
          </figcaption>
        </figure>

        {/* Séparateur décoratif */}
        <div className="flex items-center gap-5 my-14 sm:my-16" aria-hidden="true">
          <div className="flex-1 h-px bg-black/[0.07]" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="flex-1 h-px bg-black/[0.07]" />
        </div>

        {/* Témoignages secondaires — typographie pure, sans boîtes */}
        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
          {t.testimonials.items.slice(1).map((item) => (
            <figure key={item.author} className="flex flex-col gap-5">
              <Icon name="quote" size={20} className="text-gold/35" />
              <blockquote>
                <p className="font-display font-light italic text-base sm:text-lg text-ink/70 leading-[1.76]">
                  {item.quote}
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-black/[0.07]">
                <div
                  className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-body text-[10px] font-semibold tracking-[0.08em] shrink-0"
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-navy leading-snug">
                    {item.author}
                  </p>
                  <p className="font-body text-xs text-muted mt-0.5">
                    {item.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>
      </Section>

      {/* ── Process (horizontal scroll on desktop) ─────────────────────── */}
      <ProcessSection t={t.process} slantFill={BG.mineral} />

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.navy} t={t.contact.form} />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
