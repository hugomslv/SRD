import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  /** Variant de fond */
  variant?: 'white' | 'cream' | 'navy' | 'gold'
  /** Désactive l'effet hover */
  noHover?: boolean
}

export function Card({ children, className, variant = 'white', noHover = false }: CardProps) {
  const variantClasses = {
    white: 'bg-white border border-black/[0.06]',
    cream: 'bg-cream border border-black/[0.06]',
    navy: 'bg-navy border border-white/10 text-white',
    gold: 'bg-gold border border-gold-dark text-white',
  }

  return (
    <div
      className={cn(
        'rounded-lg shadow-card',
        variantClasses[variant],
        !noHover && 'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </div>
  )
}
