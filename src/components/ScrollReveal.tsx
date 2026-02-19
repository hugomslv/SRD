'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Délai entre chaque enfant (secondes). Défaut : 0.08 */
  stagger?: number
  /** Distance de départ verticale (px). Défaut : 24 */
  distance?: number
  /** Durée de l'animation (secondes). Défaut : 0.75 */
  duration?: number
}

/**
 * Révèle les enfants directs au scroll avec un stagger GSAP.
 * Utilise autoAlpha (opacity + visibility) pour éviter les flash SSR.
 */
export function ScrollReveal({
  children,
  className,
  stagger = 0.08,
  distance = 24,
  duration = 0.75,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const items = Array.from(container.children) as HTMLElement[]

    // État initial — caché avant l'animation
    gsap.set(items, { autoAlpha: 0, y: distance })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power2.out',
          clearProps: 'transform',
        })

        observer.disconnect()
      },
      { threshold: 0.08 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [stagger, distance, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
