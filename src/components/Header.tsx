'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale } from '@/lib/i18n'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MegaMenu, type NavColumn, type NavFeatured } from './MegaMenu'

export interface NavItemData {
  label: string
  href?: string
  columns?: NavColumn[]
  featured?: NavFeatured
}

interface HeaderProps {
  locale: Locale
  items: NavItemData[]
  ctaLink: { label: string; href: string }
  brandLegal: string
  aria: {
    closeMenu: string
    openMenu: string
    mainNav: string
    mobileNav: string
  }
}

const CLOSE_DELAY_MS = 200

export function Header({ locale, items, ctaLink, brandLegal, aria }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const homeHref = `/${locale}`

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setActiveMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const openMenu = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(key)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY_MS)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200',
        scrolled || activeMenu
          ? 'shadow-[0_1px_16px_rgba(26,10,40,0.10)]'
          : 'border-b border-black/[0.06]'
      )}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">

          {/* ── Logo ─────────────────────────────── */}
          <Link
            href={homeHref}
            className="flex items-center shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={brandLegal}
          >
            <div className="px-2 py-1 transition-opacity duration-200 group-hover:opacity-75">
              <Image
                src="/logo.png"
                alt={brandLegal}
                width={900}
                height={600}
                className="h-7 w-auto"
                priority
              />
            </div>
          </Link>

          {/* ── Navigation desktop ───────────────── */}
          <nav aria-label={aria.mainNav} className="hidden md:flex items-center">
            <ul className="flex items-center gap-0.5">
              {items.map((item) => {
                const hasMega = !!item.columns?.length
                const key = item.href ?? item.label
                const isActive = item.href
                  ? item.href === homeHref
                    ? pathname === homeHref
                    : pathname.startsWith(item.href)
                  : false
                const isMenuOpen = activeMenu === key

                return (
                  <li
                    key={key}
                    onMouseEnter={() => (hasMega ? openMenu(key) : setActiveMenu(null))}
                    onMouseLeave={() => (hasMega ? scheduleClose() : undefined)}
                  >
                    {hasMega ? (
                      <button
                        type="button"
                        onClick={() => setActiveMenu(isMenuOpen ? null : key)}
                        aria-haspopup="true"
                        aria-expanded={isMenuOpen}
                        className={cn(
                          'flex items-center gap-1.5 px-4 py-2.5 font-body text-sm rounded',
                          'transition-colors duration-200',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                          isActive || isMenuOpen ? 'text-gold' : 'text-ink hover:text-gold'
                        )}
                      >
                        {item.label}
                        <Icon
                          name="chevron"
                          size={13}
                          strokeWidth={2.5}
                          className={cn(
                            'transition-transform duration-200',
                            isMenuOpen ? '-rotate-90' : 'rotate-90'
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href!}
                        className={cn(
                          'relative flex items-center px-4 py-2.5 font-body text-sm rounded',
                          'transition-colors duration-200',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                          isActive ? 'text-gold' : 'text-ink hover:text-gold'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-4 right-4 h-px bg-gold/40 rounded-full" />
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ── Droite : langue + CTA + burger ───── */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} variant="light" />
            <Link
              href={ctaLink.href}
              className="hidden sm:inline-flex btn-primary text-xs py-2.5 px-5"
            >
              {ctaLink.label}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                'md:hidden inline-flex items-center justify-center w-9 h-9 rounded',
                'text-ink hover:text-gold transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold'
              )}
              aria-label={mobileOpen ? aria.closeMenu : aria.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <Icon name="close" size={20} /> : <Icon name="menu" size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mega-menus ─────────────────────────── */}
      {items.map((item) => {
        if (!item.columns?.length) return null
        const key = item.href ?? item.label
        return (
          <MegaMenu
            key={key}
            isOpen={activeMenu === key}
            columns={item.columns}
            featured={item.featured}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          />
        )
      })}

      {/* ── Drawer mobile ──────────────────────── */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden absolute left-0 right-0 top-full bg-white border-t border-black/[0.06]',
          'transition-all duration-300 overflow-hidden',
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label={aria.mobileNav}>
          <ul className="container-main pt-3 pb-6 flex flex-col">
            {items.map((item) => {
              const key = item.href ?? item.label
              return <MobileItem key={key} item={item} locale={locale} />
            })}
            <li className="flex items-center justify-between gap-4 mt-3 pt-4 border-t border-black/[0.06] px-1">
              <LanguageSwitcher currentLocale={locale} variant="light" />
              <Link href={ctaLink.href} className="btn-primary text-xs py-2 px-4">
                {ctaLink.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────
// Sous-composant : item mobile (lien simple ou accordéon)
// ─────────────────────────────────────────────────────────
function MobileItem({ item, locale }: { item: NavItemData; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const hasMega = !!item.columns?.length

  if (hasMega) {
    return (
      <li className="border-b border-black/[0.05] last:border-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={cn(
            'w-full flex items-center justify-between gap-3 px-1 py-3.5',
            'font-body text-sm font-medium text-ink',
            'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded'
          )}
        >
          {item.label}
          <Icon
            name="chevron"
            size={14}
            strokeWidth={2}
            className={cn(
              'transition-transform duration-200 text-muted/50',
              open ? '-rotate-90' : 'rotate-90'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="pb-3 space-y-4">
            {item.columns!.map((col) => (
              <div key={col.title}>
                <p className="font-body text-[10px] font-semibold text-muted tracking-[0.14em] uppercase mb-1.5 px-1">
                  {col.title}
                </p>
                <ul className="flex flex-col">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-3 py-2.5 font-body text-sm text-ink hover:text-gold transition-colors duration-150 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </li>
    )
  }

  const isActive = item.href
    ? item.href === `/${locale}`
      ? pathname === `/${locale}`
      : pathname.startsWith(item.href)
    : false

  return (
    <li className="border-b border-black/[0.05] last:border-0">
      <Link
        href={item.href!}
        className={cn(
          'flex items-center px-1 py-3.5 font-body text-sm font-medium rounded',
          'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          isActive ? 'text-gold' : 'text-ink hover:text-gold'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </Link>
    </li>
  )
}
