"use client"

import { Link } from "@inertiajs/react"
import { ArrowLeft, Code2 } from "lucide-react"

interface RoadmapInfo {
  slug: string
  title: string
  subtitle: string
  icon: string
  color: string
}

export function TechnologySwitcher({ roadmaps, current }: { roadmaps: RoadmapInfo[]; current: string }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-mono text-lam-text-muted uppercase tracking-wider ml-2">
        المسارات:
      </span>
      {roadmaps.map((r) => {
        const isActive = r.slug === current
        return (
          <Link
            key={r.slug}
            href={`/roadmap/${r.slug}`}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
              isActive
                ? "border-lam-gold/40 bg-lam-gold/10 text-lam-gold lam-glow-orange"
                : "border-border/60 bg-lam-bg-2/40 text-lam-text-muted hover:text-lam-text-soft hover:border-lam-gold/30"
            }`}
          >
            <Code2 className="size-3" />
            {r.title}
          </Link>
        )
      })}
    </div>
  )
}
