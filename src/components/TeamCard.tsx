import { Card } from './Card'

interface TeamCardProps {
  name: string
  role: string
  bio: string
  initials: string
}

export function TeamCard({ name, role, bio, initials }: TeamCardProps) {
  return (
    <Card className="p-8 flex flex-col gap-5">
      {/* Avatar initiales */}
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full bg-navy text-cream flex items-center justify-center font-body text-xl font-bold flex-shrink-0"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <h3 className="font-body text-xl font-semibold text-navy leading-snug">{name}</h3>
          <p className="font-body text-xs text-gold font-medium tracking-wide mt-0.5">{role}</p>
        </div>
      </div>

      {/* Séparateur */}
      <div className="w-full h-px bg-black/[0.06]" />

      {/* Biographie */}
      <p className="font-body text-sm text-muted leading-relaxed">{bio}</p>
    </Card>
  )
}
