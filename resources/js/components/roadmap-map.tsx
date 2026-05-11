"use client"

import { Link } from "@inertiajs/react"
import {
  CheckCircle2,
  Code2,
  Compass,
  KeyRound,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Node {
  id: number
  title: string
  subtitle: string
  icon: LucideIcon
  state: "completed" | "current" | "locked"
  difficulty: "مبتدئ" | "متوسط" | "متقدم"
  xp: number
  align: "right" | "center" | "left"
  href?: string
}

const nodes: Node[] = [
  {
    id: 0,
    title: "البداية",
    subtitle: "إعداد البيئة وأساسيات Laravel",
    icon: Compass,
    state: "completed",
    difficulty: "مبتدئ",
    xp: 80,
    align: "center",
  },
  {
    id: 1,
    title: "التحقق من البيانات",
    subtitle: "Validation",
    icon: ShieldCheck,
    state: "current",
    difficulty: "مبتدئ",
    xp: 120,
    align: "right",
    href: "/lessons/validation",
  },
  {
    id: 2,
    title: "التوجيه",
    subtitle: "Routing",
    icon: Network,
    state: "locked",
    difficulty: "مبتدئ",
    xp: 100,
    align: "left",
  },
  {
    id: 3,
    title: "المتحكمات",
    subtitle: "Controllers",
    icon: Layers,
    state: "locked",
    difficulty: "متوسط",
    xp: 140,
    align: "right",
  },
  {
    id: 4,
    title: "الوسطاء",
    subtitle: "Middleware",
    icon: Workflow,
    state: "locked",
    difficulty: "متوسط",
    xp: 160,
    align: "left",
  },
  {
    id: 5,
    title: "المصادقة",
    subtitle: "Authentication",
    icon: KeyRound,
    state: "locked",
    difficulty: "متوسط",
    xp: 200,
    align: "center",
  },
  {
    id: 6,
    title: "واجهات API",
    subtitle: "APIs",
    icon: Code2,
    state: "locked",
    difficulty: "متقدم",
    xp: 240,
    align: "right",
  },
  {
    id: 7,
    title: "الطوابير",
    subtitle: "Queues",
    icon: Zap,
    state: "locked",
    difficulty: "متقدم",
    xp: 280,
    align: "left",
  },
]

export function RoadmapMap() {
  return (
    <div className="relative lam-glass-strong rounded-3xl p-5 sm:p-8 overflow-hidden">
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => {
          const size = 2 + (i % 3)
          return (
            <span
              key={i}
              className="absolute rounded-full lam-anim-float-slow"
              style={{
                left: `${(i * 41) % 100}%`,
                top: `${(i * 67) % 100}%`,
                width: size,
                height: size,
                background: ["#fabd2f", "#fe8019", "#83a598", "#b8bb26"][i % 4],
                boxShadow: `0 0 ${size * 4}px currentColor`,
                color: ["#fabd2f", "#fe8019", "#83a598", "#b8bb26"][i % 4],
                opacity: 0.55,
                animationDelay: `${(i % 5) * 0.7}s`,
              }}
            />
          )
        })}
      </div>

      {/* Animated SVG path that connects all nodes */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 800"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="path-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8bb26" stopOpacity="0.6" />
            <stop offset="20%" stopColor="#fabd2f" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3c3836" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M 50 40 Q 75 110, 60 180 Q 30 240, 38 320 Q 75 380, 60 450 Q 25 520, 38 600 Q 70 670, 50 740"
          stroke="url(#path-grad)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="lam-anim-flow"
        />
      </svg>

      <div className="relative space-y-8">
        {nodes.map((node, idx) => (
          <RoadmapNode key={node.id} node={node} idx={idx} />
        ))}
      </div>
    </div>
  )
}

function RoadmapNode({ node, idx }: { node: Node; idx: number }) {
  const Icon = node.icon
  const align =
    node.align === "right"
      ? "justify-end"
      : node.align === "left"
      ? "justify-start"
      : "justify-center"

  const stateClasses =
    node.state === "completed"
      ? "bg-lam-green/15 border-lam-green/40 text-lam-green lam-glow-green"
      : node.state === "current"
      ? "bg-lam-orange/15 border-lam-orange/50 text-lam-orange lam-anim-pulse-orange"
      : "bg-lam-bg-2/60 border-border text-lam-text-muted"

  const cardClasses =
    node.state === "completed"
      ? "border-lam-green/30 bg-lam-green/5"
      : node.state === "current"
      ? "border-lam-orange/40 bg-lam-orange/5 lam-glow-orange"
      : "border-border/60 bg-lam-bg-2/40 opacity-80"

  const Inner = (
    <div className={`flex w-full ${align}`}>
      <div
        className={`relative max-w-md w-full sm:w-[88%] rounded-2xl border p-4 transition-all ${cardClasses} ${
          node.state !== "locked" ? "hover:-translate-y-0.5" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`shrink-0 size-14 rounded-2xl border-2 grid place-items-center ${stateClasses}`}
          >
            {node.state === "completed" ? (
              <CheckCircle2 className="size-6" />
            ) : node.state === "locked" ? (
              <Lock className="size-5" />
            ) : (
              <Icon className="size-6" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono text-lam-text-muted">
                المستوى {String(node.id).padStart(2, "0")}
              </span>
              <span className="size-1 rounded-full bg-lam-text-muted/50" />
              <span className="text-[10px] font-medium text-lam-text-muted">
                {node.difficulty}
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-lam-text leading-tight truncate">
              {node.title}
            </h3>
            <p className="text-xs text-lam-text-muted mt-0.5 truncate">
              {node.subtitle}
            </p>
          </div>
          <div className="shrink-0 text-left">
            <div className="text-[10px] text-lam-text-muted">مكافأة</div>
            <div className="font-display text-sm font-black lam-text-gradient">
              {node.xp} XP
            </div>
          </div>
        </div>

        {node.state === "current" && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-[11px] text-lam-orange font-semibold flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-lam-orange lam-anim-pulse-orange" />
              المستوى الحالي
            </div>
            <span className="rounded-lg bg-lam-orange/15 text-lam-orange text-[11px] font-bold px-2.5 py-1">
              ابدأ الآن
            </span>
          </div>
        )}
      </div>
    </div>
  )

  return node.href && node.state !== "locked" ? (
    <Link href={node.href} className="block">
      {Inner}
    </Link>
  ) : (
    Inner
  )
}
