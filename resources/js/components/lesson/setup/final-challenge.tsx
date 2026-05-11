import { useEffect, useState } from "react"
import {
  CheckCircle2,
  ChevronLeft,
  Terminal,
  Sparkles,
  Target,
  Lightbulb,
  X,
  Trophy,
  
} from "lucide-react"
import { Link } from "@inertiajs/react"

export function FinalChallenge({
  solved,
  onSolve,
  onMessageChange,
}: {
  solved: boolean
  onSolve: () => void
  onMessageChange: (msg: string) => void
}) {
  const [value, setValue] = useState("")
  const [feedback, setFeedback] = useState<"idle" | "wrong">("idle")
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    onMessageChange(
      "التحدي الأخير! اكتب الأمر الذي يُشغّل سيرفر Laravel المحلي. أنت تعرفه بالفعل.",
    )
  }, [])

  const checkAnswer = () => {
    const v = value.trim().toLowerCase().replace(/['"`\s]/g, "")
    if (v.includes("artisanserve") || v.includes("artisan:serve") || v.includes("phpartisanserve")) {
      onSolve()
      setFeedback("idle")
    } else {
      setFeedback("wrong")
    }
  }

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-lam-gold/20 blur-[140px]" />
          <div className="absolute bottom-0 right-0 size-[300px] rounded-full bg-lam-orange/15 blur-[100px]" />
        </div>

        <div className="relative p-6 sm:p-10 lg:p-14 text-center">
          <div>
            <div className="inline-flex items-center gap-2 lam-glass rounded-full px-4 py-2 mb-6">
              <Target className="size-4 text-lam-gold" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-gold">
                التحدي النهائي
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-lam-gold/10 to-lam-orange/10 border border-lam-gold/30 px-5 py-2 mb-6">
              <Trophy className="size-5 text-lam-gold" />
              <span className="text-sm font-bold lam-text-gradient">+100 XP</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4">
              <span className="text-lam-text">مهمة</span>{" "}
              <span className="bg-gradient-to-l from-lam-gold-bright via-lam-orange to-lam-gold bg-clip-text text-transparent">
                البداية
              </span>
            </h2>

            <p className="text-base sm:text-lg text-lam-text-soft/80 max-w-2xl mx-auto leading-relaxed mb-8">
              الآن حان دورك! قم بتشغيل سيرفر Laravel المحلي. اكتب الأمر الصحيح في
              الطرفية الافتراضية أدناه.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div
              className={`rounded-2xl border overflow-hidden transition-all ${
                solved
                  ? "border-lam-green/40 bg-lam-green/5"
                  : feedback === "wrong"
                    ? "border-lam-red/40 bg-lam-red/5"
                    : "border-border/60 bg-lam-bg-2/60"
              }`}
            >
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/60 bg-black/40">
                <span className="size-2.5 rounded-full bg-lam-red/70" />
                <span className="size-2.5 rounded-full bg-lam-gold/70" />
                <span className="size-2.5 rounded-full bg-lam-green/70" />
                <span className="mr-2 text-[10px] font-mono text-lam-text-muted">
                  terminal — lam@dev:~/lam
                </span>
              </div>

              <div className="p-4">
                {!solved && (
                  <>
                    <div className="text-lam-green text-xs font-mono mb-2">$</div>
                    <input
                      id="challenge-input"
                      dir="ltr"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value)
                        if (feedback !== "idle") setFeedback("idle")
                      }}
                      placeholder="اكتب الأمر هنا..."
                      className="w-full bg-transparent font-mono text-sm text-lam-text-soft placeholder:text-lam-text-muted/40 focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") checkAnswer()
                      }}
                    />
                  </>
                )}
                {solved && (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-lam-green shrink-0" />
                    <span className="font-mono text-sm text-lam-green">
                      php artisan serve
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
              {!solved && (
                <>
                  <button
                    onClick={checkAnswer}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-6 py-3 text-sm font-bold text-lam-bg-0 lam-glow-gold hover:scale-105 transition-transform"
                  >
                    تحقق من الحل
                  </button>
                  <button
                    onClick={() => setShowHint((s) => !s)}
                    className="inline-flex items-center gap-1.5 rounded-xl lam-glass border border-lam-gold/30 px-4 py-3 text-xs font-bold text-lam-gold hover:bg-lam-gold/10 transition-all"
                  >
                    <Lightbulb className="size-3.5" />
                    {showHint ? "إخفاء التلميح" : "تلميح"}
                  </button>
                </>
              )}
            </div>

              {showHint && !solved && (
                <div
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-2xl border border-lam-gold/30 bg-lam-gold/5 p-4 text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="size-4 text-lam-gold" />
                      <span className="text-xs font-bold text-lam-gold">تلميح</span>
                    </div>
                    <p className="text-xs text-lam-text-soft leading-relaxed">
                      الأمر يبدأ بـ <code className="font-mono text-lam-gold">php</code> متبوعاً
                      باسم أداة Laravel CLI ثم كلمة
                      <code className="font-mono text-lam-gold"> serve</code>.
                    </p>
                  </div>
                </div>
              )}

              {!solved && feedback === "wrong" && (
                <div
                  key="wrong"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-lam-red/15 border border-lam-red/40 px-4 py-2"
                >
                  <X className="size-4 text-lam-red" />
                  <span className="text-xs font-bold text-lam-red">
                    ليس هذا الأمر. جرّب أمر Artisan لتشغيل السيرفر المحلي.
                  </span>
                </div>
              )}
          </div>

          {solved && (
            <div
              className="mt-8"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl bg-lam-green/10 border border-lam-green/30 px-6 py-3 mb-4">
                <Sparkles className="size-5 text-lam-green" />
                <span className="text-sm font-bold text-lam-green">
                  🎉 أحسنت! +100 XP — أنت الآن جاهز لدرس التحقق من البيانات!
                </span>
              </div>
              <p className="text-sm text-lam-text-soft/70 max-w-lg mx-auto mb-6 leading-relaxed">
                لقد أكملت الدرس التأسيسي. الآن تفهم ما هو Laravel، لماذا وُجدت أُطر العمل،
                كيف تُهيّئ البيئة، وكيف تتدفق الطلبات داخل التطبيق. أنت مستعد للخطوة التالية.
              </p>
              <Link
                href="/lessons/validation-docs"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-8 py-3.5 text-base font-bold text-lam-bg-0 lam-glow-gold hover:scale-105 transition-transform"
              >
                اذهب إلى درس التحقق
                <ChevronLeft className="size-5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
