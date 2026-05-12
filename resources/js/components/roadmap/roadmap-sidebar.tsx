"use client"

import { Award, Crown, Flame, Lock, Rocket, ShieldCheck, Sparkles, Star, Target } from "lucide-react"

const achievements = [
  { icon: Star, label: "أول درس", earned: true, color: "text-lam-gold" },
  { icon: Flame, label: "سلسلة 7 أيام", earned: true, color: "text-lam-orange" },
  { icon: ShieldCheck, label: "محاكي بارع", earned: true, color: "text-lam-green" },
  { icon: Crown, label: "ملك Validation", earned: false, color: "text-lam-text-muted" },
  { icon: Award, label: "مهندس API", earned: false, color: "text-lam-text-muted" },
  { icon: Rocket, label: "مطلق المهام", earned: false, color: "text-lam-text-muted" },
]

export function RoadmapSidebar({ roadmap, technology, progression }: { roadmap?: any; technology?: string; progression?: any }) {
  const firstLesson = roadmap?.lessons?.[0]
  const currentLessonSlug = progression?.current_lesson || firstLesson?.slug || 'setup'
  const currentLesson = roadmap?.lessons?.find((l: any) => l.slug === currentLessonSlug)
  const currentLessonXp = currentLesson?.xp_reward || 120
  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      {/* Current mission */}
      <div className="lam-glass-strong rounded-2xl p-5 lam-glow-orange">
        <div className="flex items-center gap-2 text-xs font-medium text-lam-orange mb-3">
          <Target className="size-4" />
          <span className="tracking-wider">المهمة الحالية</span>
        </div>
        <h3 className="font-display text-xl font-extrabold text-lam-text leading-tight">
          {currentLesson?.title || 'التحقق من البيانات'}
        </h3>
        <p className="text-xs text-lam-text-muted mt-1.5 leading-relaxed">
          {currentLesson?.subtitle || 'مهمة فضائية لفحص بيانات رواد الفضاء قبل الإطلاق.'}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-l from-lam-gold to-lam-orange lam-shimmer-bg" />
          </div>
          <span className="text-[11px] font-mono text-lam-text-muted">33%</span>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px]">
          <span className="text-lam-text-muted">المكافأة</span>
          <span className="font-display text-base font-black lam-text-gradient">+{currentLessonXp} XP</span>
        </div>
      </div>

      {/* Streak */}
      <div className="lam-glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-lam-orange mb-3">
          <Flame className="size-4" />
          <span className="tracking-wider">السلسلة</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-display text-4xl font-black text-lam-orange">7</div>
          <div className="text-sm text-lam-text-muted leading-tight">
            أيام متواصلة
            <div className="text-[11px] mt-0.5">واصل لتفتح "نار البرمجة"</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-7 rounded-md ${
                i < 5
                  ? "bg-lam-orange/30 border border-lam-orange/50"
                  : i === 5
                  ? "bg-lam-orange/60 border border-lam-orange lam-anim-pulse-orange"
                  : "bg-secondary/60 border border-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="lam-glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-lam-gold mb-3">
          <Sparkles className="size-4" />
          <span className="tracking-wider">الإنجازات</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((a) => {
            const Icon = a.icon
            return (
              <div
                key={a.label}
                className={`relative aspect-square rounded-xl border grid place-items-center ${
                  a.earned
                    ? "bg-lam-bg-2/60 border-border/60"
                    : "bg-lam-bg-2/30 border-border/40 grayscale opacity-60"
                }`}
              >
                <Icon className={`size-5 ${a.color}`} />
                {!a.earned && (
                  <Lock className="absolute top-1 left-1 size-2.5 text-lam-text-muted" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Next unlock */}
      <div className="lam-glass rounded-2xl p-5 border-2 border-dashed border-border">
        <div className="flex items-center gap-2 text-xs font-medium text-lam-blue mb-3">
          <Lock className="size-4" />
          <span className="tracking-wider">القادم</span>
        </div>
        <div className="text-sm text-lam-text-soft leading-relaxed">
          أكمل التحقق من البيانات لتفتح
          <span className="font-bold text-lam-text"> Routing</span> ومحاكي
          الطلبات الكامل.
        </div>
      </div>
    </div>
  )
}
