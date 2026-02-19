import { cn } from '@/lib/utils'

type BgVariant = 'cream' | 'stone' | 'navy' | 'white'

interface SectionProps {
  children: React.ReactNode
  /** Couleur de fond de la section */
  bg?: BgVariant
  /**
   * Direction du biseau supérieur.
   * 'left'  → la ligne diagonale monte vers la gauche (/)
   * 'right' → la ligne diagonale descend vers la droite (\)
   * false   → pas de biseau (première section)
   */
  slant?: 'left' | 'right' | false
  /**
   * Couleur de remplissage du triangle de biseau.
   * Doit correspondre à la couleur de fond de la section PRÉCÉDENTE.
   */
  slantFill?: string
  id?: string
  className?: string
  /** Supprime le padding vertical par défaut */
  noPadding?: boolean
}

const bgMap: Record<BgVariant, string> = {
  cream: 'bg-cream',
  stone: 'bg-stone',
  navy: 'bg-navy',
  white: 'bg-white',
}

// Points SVG pour le triangle de biseau (viewBox 0 0 1440 80)
// 'left'  → triangle en haut-droite → diagonal montant /
// 'right' → triangle en haut-gauche → diagonal descendant \
const slantPoints = {
  left: '0,0 1440,0 1440,80',
  right: '0,0 0,80 1440,0',
}

export function Section({
  children,
  bg = 'cream',
  slant = false,
  slantFill,
  id,
  className,
  noPadding = false,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative w-full overflow-hidden', bgMap[bg], className)}>
      {/* Biseau diagonal supérieur — décoratif, masqué aux lecteurs d'écran */}
      {slant && slantFill && (
        <div
          className="absolute top-0 left-[-2%] w-[104%] pointer-events-none z-10"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 md:h-20"
          >
            <polygon points={slantPoints[slant]} fill={slantFill} />
          </svg>
        </div>
      )}

      {/* Contenu — z-index au-dessus du biseau */}
      <div
        className={cn(
          'relative z-20 container-main',
          noPadding
            ? ''
            : slant
              ? 'pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20'
              : 'py-16 sm:py-20'
        )}
      >
        {children}
      </div>
    </section>
  )
}
