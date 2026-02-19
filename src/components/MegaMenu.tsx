import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Icon } from '@/lib/icons'

export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface NavColumn {
  title: string
  links: NavLink[]
}

export interface NavFeatured {
  title: string
  description: string
  href: string
  ctaLabel: string
}

interface MegaMenuProps {
  isOpen: boolean
  columns: NavColumn[]
  featured?: NavFeatured
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function MegaMenu({
  isOpen,
  columns,
  featured,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  return (
    <div
      className={cn(
        'absolute left-0 right-0 top-full bg-white',
        'border-t border-black/[0.05] shadow-[0_8px_30px_rgba(26,10,40,0.10)]',
        'transition-all duration-[180ms] ease-smooth',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          'container-main py-8 grid gap-8',
          featured ? 'grid-cols-[1fr_1fr_260px]' : 'grid-cols-2'
        )}
      >
        {/* ── Colonnes de liens ─────────────── */}
        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-body text-[10px] font-semibold text-muted tracking-[0.14em] uppercase mb-4 px-3">
              {col.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'group flex flex-col px-3 py-2.5 rounded-lg',
                      'hover:bg-primary-50 transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold'
                    )}
                  >
                    <span className="font-body text-[13.5px] font-medium text-ink group-hover:text-gold transition-colors duration-150">
                      {link.label}
                    </span>
                    {link.description && (
                      <span className="font-body text-xs text-muted mt-0.5 leading-relaxed">
                        {link.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* ── Carte featured ────────────────── */}
        {featured && (
          <div className="bg-primary-50 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
            <div>
              <p className="font-display text-[17px] font-semibold text-navy mb-2.5 leading-snug">
                {featured.title}
              </p>
              <p className="font-body text-sm text-muted leading-relaxed">
                {featured.description}
              </p>
            </div>
            <Link
              href={featured.href}
              className="mt-5 inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-gold hover:gap-2.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              {featured.ctaLabel}
              <Icon name="arrow" size={13} strokeWidth={2} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
