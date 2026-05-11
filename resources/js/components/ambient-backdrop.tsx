"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface AmbientBackdropProps {
  className?: string
  variant?: "default" | "subtle" | "intense"
  showGrid?: boolean
}

/**
 * Cinematic ambient backdrop — floating particles, soft auroras, and an optional grid.
 * Pure CSS / SVG; safe for SSR.
 */
export function AmbientBackdrop({
  className,
  variant = "default",
  showGrid = true,
}: AmbientBackdropProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${(i * 53) % 100}%`,
        top: `${(i * 37) % 100}%`,
        size: 2 + (i % 4),
        delay: (i % 7) * 0.6,
        duration: 6 + (i % 5) * 1.2,
        color: ["#fabd2f", "#fe8019", "#83a598", "#b8bb26"][i % 4],
      })),
    [],
  )

  const intensity =
    variant === "intense" ? 1 : variant === "subtle" ? 0.4 : 0.7

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Aurora blobs */}
      <div
        className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(250,189,47,${0.18 * intensity}), transparent 60%)`,
        }}
      />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(254,128,25,${0.14 * intensity}), transparent 60%)`,
        }}
      />
      <div
        className="absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(131,165,152,${0.1 * intensity}), transparent 60%)`,
        }}
      />

      {/* Grid */}
      {showGrid && (
        <div className="lam-grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      )}

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full lam-anim-float-slow"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            opacity: 0.55,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(29,32,33,0.6)_100%)]" />
    </div>
  )
}
