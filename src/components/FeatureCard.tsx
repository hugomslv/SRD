interface FeatureCardProps {
  index: number
  title: string
  description: string
}

export function FeatureCard({ index, title, description }: FeatureCardProps) {
  return (
    <article className="flex flex-col gap-5">
      <p
        className="font-body text-[11px] font-semibold text-gold tracking-[0.20em] uppercase select-none"
        aria-hidden="true"
      >
        0{index + 1}
      </p>
      <h3 className="font-display text-2xl font-light text-ink leading-[1.28] tracking-[-0.01em]">
        {title}
      </h3>
      <div className="h-px w-8 bg-gold/40" aria-hidden="true" />
      <p className="font-body text-sm text-muted leading-[1.75]">{description}</p>
    </article>
  )
}
