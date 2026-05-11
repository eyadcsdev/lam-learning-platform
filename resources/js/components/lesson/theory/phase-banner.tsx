"use client"


interface PhaseBannerProps {
  phase: string
  title: string
  subtitle: string
  tone?: "gold" | "orange" | "green"
}

export function PhaseBanner({
  phase,
  title,
  subtitle,
  tone = "gold",
}: PhaseBannerProps) {
  const toneMap = {
    gold: {
      ring: "border-lam-gold/40",
      bg: "bg-lam-gold/10",
      text: "text-lam-gold",
      glow: "lam-glow-gold",
    },
    orange: {
      ring: "border-lam-orange/40",
      bg: "bg-lam-orange/10",
      text: "text-lam-orange",
      glow: "lam-glow-orange",
    },
    green: {
      ring: "border-lam-green/40",
      bg: "bg-lam-green/10",
      text: "text-lam-green",
      glow: "",
    },
  }
  const t = toneMap[tone]

  return (
    <div
      className="flex items-center gap-4 pt-2"
    >
      <div
        className={`shrink-0 rounded-2xl border-2 ${t.ring} ${t.bg} ${t.glow} px-4 py-2.5 font-mono text-xs font-black uppercase tracking-[0.2em] ${t.text}`}
      >
        {phase}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="font-serif text-lg sm:text-xl font-black text-lam-text truncate">
          {title}
        </h2>
        <p className="text-xs text-lam-text-muted truncate">{subtitle}</p>
      </div>
      <div className={`hidden sm:block flex-1 h-px ${t.bg.replace("bg-", "bg-")}`} />
    </div>
  )
}
