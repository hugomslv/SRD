import { Card } from './Card'
import { Icon } from '@/lib/icons'

type InfoIcon = 'phone' | 'mail' | 'mappin' | 'clock'

interface InfoCardProps {
  icon: InfoIcon
  label: string
  lines: string[]
  /** Rend les lignes cliquables si href fourni */
  href?: string
}

export function InfoCard({ icon, label, lines, href }: InfoCardProps) {
  return (
    <Card className="p-7 flex gap-5 items-start">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-gold/10 text-gold flex-shrink-0 mt-0.5">
        <Icon name={icon} size={20} strokeWidth={1.5} />
      </div>

      <div>
        <p className="font-body text-xs text-gold font-medium tracking-widest uppercase mb-2">
          {label}
        </p>
        {lines.map((line, i) =>
          href && i === 0 ? (
            <a
              key={i}
              href={href}
              className="block font-body text-sm text-navy font-medium hover:text-gold transition-colors duration-200"
            >
              {line}
            </a>
          ) : (
            <p key={i} className="font-body text-sm text-ink leading-relaxed">
              {line}
            </p>
          )
        )}
      </div>
    </Card>
  )
}
