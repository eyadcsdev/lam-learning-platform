import { useEffect, useState, useRef } from "react"
import {
  ChevronLeft,
  Globe,
  FileCode,
  Cpu,
  Shield,
  Map,
  Server,
  CheckCircle2,
} from "lucide-react"
import { useXp } from "@/lib/xp-context"

const STAGES = [
  {
    id: "browser",
    label: "المتصفح",
    icon: Globe,
    color: "text-lam-blue",
    border: "border-lam-blue/40",
    bg: "bg-lam-blue/10",
    desc: "يكتب المستخدم URL ويضغط Enter",
    detail: "عندما يكتب المستخدم https://lam.dev في المتصفح، يرسل المتصفح طلب HTTP GET إلى السيرفر. هذا الطلب يحتوي على headers (مثل User-Agent, Cookies) وبيانات إضافية.",
    x: 5,
  },
  {
    id: "index",
    label: "public/index.php",
    icon: FileCode,
    color: "text-lam-text-muted",
    border: "border-lam-text-muted/30",
    bg: "bg-lam-bg-2/60",
    desc: "نقطة الدخول لكل الطلبات",
    detail: "كل طلب يمر عبر index.php. هذا الملف يقوم بتحميل Composer autoloader ثم يحصل على instance من Laravel Application. هو بوابة الدخول الوحيدة للتطبيق.",
    x: 20,
  },
  {
    id: "kernel",
    label: "HTTP Kernel",
    icon: Cpu,
    color: "text-lam-gold",
    border: "border-lam-gold/40",
    bg: "bg-lam-gold/10",
    desc: "معالجة الطلب الأساسية",
    detail: "HTTP Kernel هو قلب معالجة الطلب. يقوم بتحميل مزودي الخدمات (Service Providers)، وتشغيل الـ Bootstrappers (مثل معالجة الأخطاء، تسجيل الـ Providers). كل هذا يحدث قبل وصول الطلب إلى التوجيه.",
    x: 35,
  },
  {
    id: "middleware",
    label: "Middleware",
    icon: Shield,
    color: "text-lam-orange",
    border: "border-lam-orange/40",
    bg: "bg-lam-orange/10",
    desc: "فحص الطلب قبل التوجيه",
    detail: "Middleware هي طبقات وسيطة تفحص الطلب قبل وصوله إلى الراوتر. مثل:\n• VerifyCsrfToken — حماية من CSRF\n• Authenticate — التحقق من تسجيل الدخول\n• TrimStrings — تنظيف المدخلات\nإذا فشل أي Middleware، يُرفض الطلب فوراً.",
    x: 50,
  },
  {
    id: "router",
    label: "Router (التوجيه)",
    icon: Map,
    color: "text-lam-green",
    border: "border-lam-green/40",
    bg: "bg-lam-green/10",
    desc: "مطابقة المسار وتوجيهه",
    detail: "الـ Router يبحث في ملفات routes/web.php عن مسار يطابق URL المطلوب. يطابق:\n• الـ URI (مثل /roadmap)\n• طريقة الطلب (GET, POST)\nإذا وُجد تطابق، يُنفّذ الـ Controller أو Closure المناسب.",
    x: 65,
  },
  {
    id: "controller",
    label: "Controller",
    icon: Server,
    color: "text-lam-gold-bright",
    border: "border-lam-gold-bright/40",
    bg: "bg-lam-gold-bright/10",
    desc: "معالجة الطلب وإعداد الرد",
    detail: "الـ Controller ينفّذ منطق العمل. قد:\n• يستعلم من قاعدة البيانات\n• يتفاعل مع خدمات أخرى\n• يُعدّ البيانات للعرض\nبعد الانتهاء، يُعيد استجابة (Response) قد تكون view أو JSON أو redirect.",
    x: 80,
  },
  {
    id: "response",
    label: "الاستجابة",
    icon: CheckCircle2,
    color: "text-lam-green",
    border: "border-lam-green/40",
    bg: "bg-lam-green/10",
    desc: "عودة الاستجابة للمتصفح",
    detail: "الاستجابة ترجع عبر نفس الطبقات. Laravel يُحوّلها إلى HTTP Response منسق مع headers مناسبة. المتصفح يستقبلها ويعرض الصفحة للمستخدم.",
    x: 95,
  },
]

export function RequestLifecycleViz({
  onNext,
  onMessageChange,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
}) {
  const { addXp } = useXp()
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const [autoPlay, setAutoPlay] = useState(false)
  const [autoIdx, setAutoIdx] = useState(0)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<number>()

  useEffect(() => {
    onMessageChange("هذا هو القلب النابض لـ Laravel — دورة حياة الطلب. اضغط على كل مرحلة أو شاهد العرض التلقائي.")
  }, [])

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = window.setInterval(() => {
        setAutoIdx((prev) => {
          if (prev >= STAGES.length - 1) {
            setAutoPlay(false)
            setActiveStage(null)
            return 0
          }
          const next = prev + 1
          setActiveStage(STAGES[next].id)
          return next
        })
      }, 2000)
    }
    return () => window.clearInterval(intervalRef.current)
  }, [autoPlay])

  const handleStageClick = (id: string) => {
    setActiveStage(id)
    const stage = STAGES.find((s) => s.id === id)
    if (stage) {
      onMessageChange(`مرحلة ${stage.label}: ${stage.desc}`)
    }
  }

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-lam-gold/10 blur-[120px]" />
        </div>

        <div className="relative p-5 sm:p-8">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <div>
              <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-3">
                <span className="size-1.5 rounded-full bg-lam-gold lam-anim-pulse-gold" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted">
                  كيف يعمل Laravel داخلياً
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-lam-text">
                دورة حياة الطلب
              </h2>
              <p className="text-sm text-lam-text-muted mt-1">
                تتبّع رحلة الطلب من المتصفح إلى الرد
              </p>
            </div>
            <button
              onClick={() => {
                setAutoPlay(true)
                setAutoIdx(0)
                setActiveStage(STAGES[0].id)
              }}
              disabled={autoPlay}
              className="inline-flex items-center gap-2 rounded-xl lam-glass border border-lam-gold/30 px-4 py-2 text-xs font-bold text-lam-gold hover:bg-lam-gold/10 disabled:opacity-50"
            >
              <Cpu className="size-3.5" />
              {autoPlay ? "جارٍ التشغيل..." : "تشغيل تلقائي"}
            </button>
          </div>

          <div className="relative overflow-x-auto pb-4">
            <div className="flex items-center gap-2 min-w-max px-2">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon
                const isActive = activeStage === stage.id
                const isPast = STAGES.findIndex((s) => s.id === activeStage) > i
                return (
                  <div key={stage.id} className="flex items-center gap-2">
                    <button
                      onClick={() => handleStageClick(stage.id)}
                      className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 sm:p-4 w-28 sm:w-32 transition-all ${
                        isActive
                          ? `${stage.border} ${stage.bg} lam-glow-gold`
                          : isPast
                          ? "border-lam-green/30 bg-lam-green/5"
                          : "border-border/40 bg-lam-bg-2/40"
                      }`}
                    >
                      <div className={`size-10 rounded-xl border grid place-items-center ${
                        isActive ? `${stage.border} ${stage.bg}` : "bg-secondary/60 border-border"
                      }`}>
                        <Icon className={`size-5 ${isActive ? stage.color : "text-lam-text-muted"}`} />
                      </div>
                      <div className="text-center">
                        <div className={`text-[10px] font-mono ${isActive ? stage.color : "text-lam-text-muted"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className={`text-[11px] font-bold mt-0.5 leading-tight ${isActive ? "text-lam-text" : "text-lam-text-soft"}`}>
                          {stage.label}
                        </div>
                      </div>
                      {isActive && (
                        <span
                          className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-lam-gold"
                        />
                      )}
                    </button>
                    {i < STAGES.length - 1 && (
                      <div className="w-4 sm:w-6 h-px bg-gradient-to-l from-transparent via-lam-gold/30 to-transparent" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {activeStage && (
              <div
                key={activeStage}
                className="mt-5 rounded-2xl border border-border/60 bg-lam-bg-2/60 p-5"
              >
                {(() => {
                  const stage = STAGES.find((s) => s.id === activeStage)
                  if (!stage) return null
                  const Icon = stage.icon
                  return (
                    <div className="flex gap-4">
                      <div className={`size-12 rounded-2xl border ${stage.border} ${stage.bg} grid place-items-center shrink-0`}>
                        <Icon className={`size-6 ${stage.color}`} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-lam-text mb-1">
                          {stage.label}
                        </h3>
                        <p className="text-xs text-lam-text-muted mb-2">
                          {stage.desc}
                        </p>
                        <pre className="text-[11px] text-lam-text-soft/80 leading-relaxed whitespace-pre-wrap font-sans">
                          {stage.detail}
                        </pre>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

          {!done && (
            <div
              className="mt-6 text-center"
            >
              <button
                onClick={() => {
                  setDone(true)
                  addXp(30)
                  onMessageChange("فهمت! الآن تعرف كيف تتدفق الطلبات في Laravel. دعنا نتعرف على أداة Artisan السحرية.")
                  setTimeout(onNext, 600)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-6 py-3 text-sm font-bold text-lam-bg-0 lam-glow-gold"
              >
                فهمت! لننتقل إلى Artisan
                <ChevronLeft className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
