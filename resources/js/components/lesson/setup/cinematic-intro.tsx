import { useEffect } from "react"
import { Sparkles, Code, Cpu, Zap, ChevronLeft } from "lucide-react"

const HIGHLIGHTS = [
  {
    icon: Zap,
    title: "أُطر العمل البرمجية",
    desc: "مجموعة من الأدوات والمكتبات التي تنظّم طريقة بناء التطبيقات، وتوفّر حلولاً جاهزة لمشاكل شائعة.",
  },
  {
    icon: Cpu,
    title: "لماذا Laravel؟",
    desc: "أشهر إطار عمل PHP في العالم. يوفّر هيكل MVC نظيف، أدوات سطر أوامر قوية، ونظاماً بيئياً متكاملاً.",
  },
  {
    icon: Code,
    title: "تطوير واجهة الخلفية",
    desc: "Backend Development هو قلب التطبيق. Laravel يهتم بإدارة قواعد البيانات، المصادقة، التوجيه، والمعالجة.",
  },
]

export function CinematicIntro({
  onNext,
  onMessageChange,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
}) {
  useEffect(() => {
    onMessageChange("أهلاً بك في أولى رحلاتنا! أنا لومي، مرشدك الآلي. في هذا الدرس سنبني أساساً متيناً لفهم Laravel. استعد!")
  }, [])

  return (
    <div className="space-y-5">
      <section className="relative lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-lam-gold/10 blur-[140px]" />
          <div className="absolute top-0 right-0 size-[400px] rounded-full bg-lam-blue/8 blur-[100px]" />
        </div>

        <div className="relative p-6 sm:p-14 lg:p-20 text-center">
          <div>
            <div className="inline-flex items-center gap-2 lam-glass rounded-full px-4 py-2 mb-6">
              <Sparkles className="size-4 text-lam-gold" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-lam-gold">
                الدخول إلى مركز التحكم البرمجي
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-4">
              <span className="text-lam-text">مرحباً بك في عالم</span>{" "}
              <span className="bg-gradient-to-l from-lam-gold-bright via-lam-orange to-lam-gold bg-clip-text text-transparent">
                Laravel
              </span>
            </h1>

            <p className="text-base sm:text-lg text-lam-text-soft/80 max-w-3xl mx-auto leading-relaxed">
              قبل أن نبدأ رحلة التطوير، يجب أن نفهم لماذا وُجدت أُطر العمل البرمجية أصلاً،
              وما المشاكل التي تحلها. لومي هنا ليشرح لك كل شيء.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {HIGHLIGHTS.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border/60 bg-lam-bg-2/60 p-5 hover:border-lam-gold/40 transition-all"
                >
                  <div className="size-10 rounded-xl bg-lam-gold/10 border border-lam-gold/20 grid place-items-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="size-5 text-lam-gold" />
                  </div>
                  <h3 className="text-sm font-bold text-lam-text mb-1.5">{item.title}</h3>
                  <p className="text-xs text-lam-text-muted leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>

          <div
            className="mt-10"
          >
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-8 py-3.5 text-base font-bold text-lam-bg-0 lam-glow-gold hover:scale-105 transition-transform"
            >
              ابدأ الرحلة
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="lam-glass-strong rounded-3xl border border-border/60 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-xl bg-gradient-to-br from-lam-gold/20 to-lam-orange/20 border border-lam-gold/30 grid place-items-center">
            <span className="text-lam-gold font-bold text-sm">ل</span>
          </div>
          <div>
            <p className="text-sm font-bold text-lam-text">لومي</p>
            <p className="text-[10px] text-lam-text-muted">المرشد الآلي</p>
          </div>
        </div>
        <p className="text-sm text-lam-text-soft leading-relaxed">
          في هذا الدرس سنغطّس في عالم Laravel — من الصفر. سنفهم لماذا نحتاج أُطر العمل،
          كيف نُهيّئ البيئة، كيف يعمل الإطار من الداخل، وكيف نُشغل أول مشروع لنا.
          استعد لرحلة شيقة!
        </p>
      </div>
    </div>
  )
}
