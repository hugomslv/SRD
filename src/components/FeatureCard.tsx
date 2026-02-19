import { Icon } from '@/lib/icons'
import type { IconName } from '@/lib/siteData'

interface FeatureCardProps {
  icon: IconName
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article
      className="group flex flex-col gap-6 bg-white rounded-[28px] p-9 sm:p-10
                 shadow-premium transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:shadow-premium-hover"
    >
      {/* Icône */}
      <div className="w-12 h-12 rounded-2xl bg-gold/[0.08] text-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold/[0.14]">
        <Icon name={icon} size={22} strokeWidth={1.5} />
      </div>

      {/* Texte */}
      <div className="flex flex-col gap-3">
        <h3 className="font-body text-xl font-semibold text-ink leading-[1.25] tracking-[-0.015em]">
          {title}
        </h3>
        {/* Trait doré — raccourci, non animé sur FeatureCard */}
        <div className="h-px w-7 bg-gold/40 rounded-full transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-gold/65" />
        <p className="font-body text-sm text-muted leading-[1.72]">{description}</p>
      </div>
    </article>
  )
}
