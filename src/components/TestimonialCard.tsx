import { Card } from './Card'
import { Icon } from '@/lib/icons'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  initials: string
}

export function TestimonialCard({ quote, author, role, initials }: TestimonialCardProps) {
  return (
    <Card className="p-8 flex flex-col gap-6">
      {/* Guillemet décoratif */}
      <div className="text-gold/30">
        <Icon name="quote" size={32} />
      </div>

      {/* Citation */}
      <blockquote>
        <p className="font-body text-[0.95rem] text-ink/80 leading-relaxed italic">{quote}</p>
      </blockquote>

      {/* Auteur */}
      <footer className="flex items-center gap-4 mt-auto pt-4 border-t border-black/[0.06]">
        {/* Avatar initiales */}
        <div
          className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-body text-xs font-semibold tracking-wide flex-shrink-0"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="font-body text-sm font-medium text-navy">{author}</p>
          <p className="font-body text-xs text-muted">{role}</p>
        </div>
      </footer>
    </Card>
  )
}
