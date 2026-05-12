import { useEffect, useState } from "react"
import {
  ChevronLeft,
  CheckCircle2,
  Target,
  Terminal,
  FolderTree,
  Cpu,
  Globe,
  Sparkles,
} from "lucide-react"
import { useXp } from "@/lib/xp-context"

const MISSIONS = [
  {
    id: "install",
    label: "تثبيت Laravel",
    icon: Terminal,
    desc: "تشغيل composer create-project",
    xp: 15,
  },
  {
    id: "serve",
    label: "تشغيل السيرفر المحلي",
    icon: Globe,
    desc: "تشغيل php artisan serve",
    xp: 15,
  },
  {
    id: "explore",
    label: "استكشاف هيكل المشروع",
    icon: FolderTree,
    desc: "فهم المجلدات الرئيسية",
    xp: 15,
  },
  {
    id: "lifecycle",
    label: "فهم دورة حياة الطلب",
    icon: Cpu,
    desc: "تتبّع رحلة الطلب في Laravel",
    xp: 15,
  },
  {
    id: "vite",
    label: "تشغيل Vite",
    icon: Terminal,
    desc: "npm run dev لبناء الموارد",
    xp: 15,
  },
]

export function MiniMissions({
  onNext,
  onMessageChange,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
}) {
  const { addXp } = useXp()
  const [completed, setCompleted] = useState<string[]>([])
  const [showHint, setShowHint] = useState<string | null>(null)

  useEffect(() => {
    onMessageChange("حان وقت إثبات فهمك! أكمل كل مهمة بضغط عليها. كل مهمة تمنحك XP.")
  }, [])

  const handleComplete = (id: string) => {
    if (completed.includes(id)) return
    setCompleted((prev) => [...prev, id])
    const mission = MISSIONS.find((m) => m.id === id)
    if (mission) {
      addXp(mission.xp)
      onMessageChange(`أحسنت! أكملت مهمة "${mission.label}" وحصلت على +${mission.xp} XP!`)
    }
  }

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-5">
            <Target className="size-3.5 text-lam-gold" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted">
              مهام تفاعلية
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-lam-text mb-2">
            مهام صغيرة
          </h2>
          <p className="text-sm text-lam-text-muted mb-6">
            أكمل كل مهمة بتأكيد فهمك. كل مهمة تمنح XP إضافي!
          </p>

          <div className="space-y-3 max-w-2xl">
            {MISSIONS.map((mission, i) => {
              const isDone = completed.includes(mission.id)
              const Icon = mission.icon
              return (
                <div
                  key={mission.id}
                  className={`rounded-2xl border p-4 transition-all ${
                    isDone
                      ? "bg-lam-green/10 border-lam-green/30"
                      : "bg-lam-bg-2/60 border-border/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-xl border grid place-items-center shrink-0 ${
                      isDone
                        ? "bg-lam-green/15 border-lam-green/30"
                        : "bg-secondary/60 border-border"
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="size-6 text-lam-green" />
                      ) : (
                        <Icon className="size-5 text-lam-text-muted" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-lam-text">{mission.label}</h3>
                      <p className="text-xs text-lam-text-muted">{mission.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {isDone ? (
                        <span className="text-xs font-bold text-lam-green">
                          +{mission.xp} XP ✓
                        </span>
                      ) : (
                        <span className="text-[10px] text-lam-gold font-mono">
                          +{mission.xp} XP
                        </span>
                      )}
                    </div>
                  </div>

                  {!isDone && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleComplete(mission.id)}
                        className="rounded-lg bg-gradient-to-l from-lam-gold to-lam-orange px-4 py-1.5 text-xs font-bold text-lam-bg-0"
                      >
                        إتمام المهمة
                      </button>
                      <button
                        onClick={() => setShowHint(showHint === mission.id ? null : mission.id)}
                        className="rounded-lg border border-lam-gold/30 px-3 py-1.5 text-xs text-lam-gold"
                      >
                        {showHint === mission.id ? "إخفاء" : "تلميح"}
                      </button>
                    </div>
                  )}

                  {showHint === mission.id && (
                    <div
                      className="overflow-hidden mt-2"
                    >
                      <div className="rounded-xl bg-black/40 border border-border/40 p-3 text-[11px] text-lam-text-soft leading-relaxed">
                        {mission.id === "install" && "استخدم الأمر: composer create-project laravel/laravel lam"}
                        {mission.id === "serve" && "استخدم الأمر: php artisan serve"}
                        {mission.id === "explore" && "راجع مجلدات: app, routes, config, database, resources"}
                        {mission.id === "lifecycle" && "ابدأ من المتصفح → index.php → Kernel → Middleware → Router → Controller → Response"}
                        {mission.id === "vite" && "استخدم الأمر: npm run dev"}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {completed.length >= MISSIONS.length && (
            <div
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl bg-lam-green/10 border border-lam-green/30 px-5 py-3 mb-4">
                <Sparkles className="size-5 text-lam-green" />
                <span className="text-sm font-bold text-lam-green">
                  +75 XP — أكملت جميع المهام!
                </span>
              </div>
              <button
                onClick={() => {
                  addXp(75)
                  onMessageChange("ممتاز! أنت جاهز للتجربة التفاعلية. دعنا نرى كيف يعمل Laravel مع متصفح.")
                  setTimeout(onNext, 600)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-6 py-3 text-sm font-bold text-lam-bg-0 lam-glow-gold"
              >
                التجربة التفاعلية
                <ChevronLeft className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
