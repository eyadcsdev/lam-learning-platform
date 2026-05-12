"use client"

import { Code2, Flame, Sparkles, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function RoadmapHeader({ roadmap }: { roadmap?: any }) {
  const tech = roadmap?.title || 'Laravel'
  const techSlug = roadmap?.slug || 'laravel'
  const description = roadmap?.description || `رحلة كاملة لإتقان ${tech} من الصفر حتى بناء تطبيقات احترافية، موزّعة على مستويات تفاعلية ومحاكيات حية.`
  const lessonCount = roadmap?.lessons?.length || 0
  return (
    <div className="lam-glass-strong rounded-3xl p-6 sm:p-8 lam-glow-gold">
      <div className="flex items-start justify-between flex-wrap gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-lam-orange mb-3">
            <Sparkles className="size-4" />
            <span className="tracking-wider">المسار النشط</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="size-12 rounded-2xl bg-lam-orange/15 border border-lam-orange/30 grid place-items-center">
              <Code2 className="size-6 text-lam-orange" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              <span className="lam-text-gradient">مسار</span>{" "}
              <span className="lam-text-gradient-soft">{tech}</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-lam-text-muted max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Stat
            icon={<Flame className="size-4 text-lam-orange" />}
            label="الدروس"
            value={`${lessonCount} دروس`}
          />
          <Stat
            icon={<Trophy className="size-4 text-lam-gold" />}
            label="المستوى"
            value={techSlug}
          />
        </div>
      </div>

      <div className="mt-7 grid sm:grid-cols-12 gap-6 items-center">
        <div className="sm:col-span-9">
          <div className="flex items-center justify-between mb-2.5 text-xs">
            <span className="font-semibold text-lam-text-soft">
              التقدم في المسار
            </span>
            <span className="font-mono text-lam-text-muted">{lessonCount} دروس</span>
          </div>
          <div className="relative h-2.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="absolute inset-y-0 right-0 bg-gradient-to-l from-lam-gold via-lam-orange to-lam-gold-bright lam-shimmer-bg"
              style={{ width: "14%" }}
            />
          </div>
          <Progress value={14} className="hidden" />
        </div>
        <div className="sm:col-span-3 flex sm:justify-end gap-2">
          <Pill label="المستوى" value="2" tone="gold" />
          <Pill label="الإنجازات" value="3" tone="green" />
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="lam-glass rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
      <div className="size-8 rounded-lg bg-secondary/60 grid place-items-center">
        {icon}
      </div>
      <div className="leading-tight">
        <div className="text-[10px] text-lam-text-muted">{label}</div>
        <div className="text-sm font-bold text-lam-text">{value}</div>
      </div>
    </div>
  )
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "gold" | "green"
}) {
  const c =
    tone === "gold"
      ? "bg-lam-gold/15 text-lam-gold border-lam-gold/30"
      : "bg-lam-green/15 text-lam-green border-lam-green/30"
  return (
    <div className={`rounded-xl border px-3 py-2 text-center ${c}`}>
      <div className="text-[10px] opacity-80">{label}</div>
      <div className="font-display text-lg font-black leading-none mt-0.5">
        {value}
      </div>
    </div>
  )
}
