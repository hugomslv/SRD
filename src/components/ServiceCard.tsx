import { Icon } from '@/lib/icons'
import type { IconName } from '@/lib/siteData'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  icon: IconName
  title: string
  description: string
  /** Index 0-based pour le badge numéroté (01, 02…) */
  index?: number
  /** Mode long : page Services (description complète + padding augmenté) */
  long?: boolean
}

export function ServiceCard({
  icon,
  title,
  description,
  index,
  long = false,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        // Structure
        'group relative flex flex-col bg-white rounded-[28px]',
        // Spacing
        long ? 'p-10 sm:p-12 gap-7' : 'p-9 sm:p-10 gap-6',
        // Shadow multicouche — diffuse et profonde
        'shadow-premium',
        // Hover — translateY -6px + shadow plus profonde
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:shadow-premium-hover',
      )}
    >
      {/* Badge numéroté — discret, haut de gamme */}
      {index !== undefined && (
        <span
          className="absolute top-8 right-9 font-body text-[11px] font-medium tracking-[0.12em] text-black/[0.12] tabular-nums select-none"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}

      {/* Icône — fond doré très subtil */}
      <div className="w-12 h-12 rounded-2xl bg-gold/[0.08] text-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold/[0.14]">
        <Icon name={icon} size={22} strokeWidth={1.5} />
      </div>

      {/* Titre — Inter semibold, tracking serré */}
      <h3 className="font-body text-xl font-semibold text-ink leading-[1.25] tracking-[-0.015em] pr-8">
        {title}
      </h3>

      {/* Séparateur doré — s'étend au hover */}
      <div className="h-px w-8 bg-gold/40 rounded-full transition-all duration-500 ease-out group-hover:w-14 group-hover:bg-gold/65" />

      {/* Description */}
      <p
        className={cn(
          'font-body text-muted leading-[1.72]',
          long ? 'text-[15px]' : 'text-sm',
        )}
      >
        {description}
      </p>
    </article>
  )
}
