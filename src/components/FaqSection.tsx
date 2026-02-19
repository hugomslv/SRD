'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { cn } from '@/lib/utils'

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  t: {
    overline: string
    titleMain: string
    titleAccent: string
    subtitle: string
    items: FaqItem[]
  }
}

export function FaqSection({ t }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative bg-cream py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="container-main">
        {/* Carte flottante — bg-white shadow-premium */}
        <div className="bg-white rounded-2xl shadow-premium overflow-hidden">

          {/* ── DESKTOP : 2 colonnes ─────────────────── */}
          <div className="hidden lg:grid lg:grid-cols-[45fr_55fr]">

            {/* Colonne image */}
            <div className="relative flex items-center justify-center bg-primary-50 p-6 xl:p-8 min-h-[480px]">
              {/* Blob décoratif haut-gauche */}
              <div
                className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-primary-100 blur-3xl opacity-50"
                aria-hidden="true"
              />
              {/* Blob décoratif bas-droite */}
              <div
                className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-accent-50 blur-3xl opacity-60"
                aria-hidden="true"
              />

              <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                <Image
                  src="/images/check-list.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-full object-contain drop-shadow-2xl scale-110"
                  aria-hidden="true"
                  priority={false}
                />
              </div>
            </div>

            {/* Colonne accordéon */}
            <div className="p-10 xl:p-14 flex flex-col justify-center">
              <span className="section-label">{t.overline}</span>
              <PremiumHeading as="h2" size="section" color="dark" className="mt-2 mb-3">
                {t.titleMain} <Accent>{t.titleAccent}</Accent>
              </PremiumHeading>
              <p className="section-subtitle mb-10">{t.subtitle}</p>

              <Accordion items={t.items} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            </div>
          </div>

          {/* ── MOBILE : empilé ──────────────────────── */}
          <div className="lg:hidden">
            {/* Image */}
            <div className="relative flex items-center justify-center bg-primary-50 py-12 px-8">
              <div
                className="absolute inset-0 bg-primary-50"
                aria-hidden="true"
              />
              <div className="relative z-10 w-52 h-52 flex items-center justify-center">
                <Image
                  src="/images/check-list.png"
                  alt=""
                  width={260}
                  height={260}
                  className="w-full h-full object-contain drop-shadow-xl"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Titre + accordéon */}
            <div className="p-7 sm:p-10">
              <div className="text-center mb-10">
                <span className="section-label">{t.overline}</span>
                <PremiumHeading as="h2" size="section" color="dark" className="mt-2 mb-3">
                  {t.titleMain} <Accent>{t.titleAccent}</Accent>
                </PremiumHeading>
                <p className="section-subtitle mx-auto text-center">{t.subtitle}</p>
              </div>

              <Accordion items={t.items} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   Sous-composant : liste accordéon
───────────────────────────────────────────────────────── */
function Accordion({
  items,
  openIndex,
  setOpenIndex,
}: {
  items: FaqItem[]
  openIndex: number | null
  setOpenIndex: (i: number | null) => void
}) {
  return (
    <div className="divide-y divide-gray-100">
      {items.map((item, i) => {
        const isOpen = openIndex === i

        return (
          <div key={i}>
            {/* Bouton question */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={cn(
                'w-full flex items-center justify-between gap-4 py-5 text-left',
                'font-body font-semibold text-[15px] leading-snug',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded',
                isOpen ? 'text-primary-600' : 'text-ink hover:text-primary-600',
              )}
            >
              <span>{item.question}</span>

              {/* Icône + → × (rotation 45°) */}
              <span
                className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center',
                  'transition-all duration-300 ease-smooth',
                  isOpen
                    ? 'border-primary-500 bg-primary-500 text-white rotate-45'
                    : 'border-gray-200 text-muted hover:border-primary-300',
                )}
                aria-hidden="true"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5.5 1v9M1 5.5h9"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            {/* Réponse — animation grid-template-rows */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-smooth"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    'font-body text-sm sm:text-[15px] text-muted leading-relaxed pb-5 pr-10',
                    'transition-opacity duration-200',
                    isOpen ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
