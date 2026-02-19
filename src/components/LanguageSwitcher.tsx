'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const LABELS: Record<Locale, string> = { fr: 'FR', en: 'EN', pt: 'PT' }

interface LanguageSwitcherProps {
  currentLocale: Locale
  /** 'light' = sur fond blanc / 'dark' = sur fond navy */
  variant?: 'light' | 'dark'
}

export function LanguageSwitcher({
  currentLocale,
  variant = 'dark',
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/')
    document.cookie = `preferred-locale=${locale};path=/;max-age=31536000;SameSite=Lax`
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1" aria-label="Language selector">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          <button
            type="button"
            onClick={() => handleSwitch(locale)}
            className={cn(
              'font-body text-[11px] font-semibold tracking-wider transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-0.5',
              variant === 'light'
                ? locale === currentLocale
                  ? 'text-gold'
                  : 'text-ink/35 hover:text-ink'
                : locale === currentLocale
                  ? 'text-gold'
                  : 'text-white/40 hover:text-white/70'
            )}
            aria-pressed={locale === currentLocale}
          >
            {LABELS[locale]}
          </button>
          {i < locales.length - 1 && (
            <span
              className={cn(
                'mx-1 text-[11px]',
                variant === 'light' ? 'text-black/15' : 'text-white/20'
              )}
              aria-hidden="true"
            >
              |
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
