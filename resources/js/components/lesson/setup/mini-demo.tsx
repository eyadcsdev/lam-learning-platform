import { useEffect, useState, useRef } from "react"
import { ChevronLeft, Globe, Server, ArrowLeft, ArrowRight, CheckCircle2, Code } from "lucide-react"

export function MiniDemo({
  onNext,
  onMessageChange,
  onXpGain,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
  onXpGain: (amount: number) => void
}) {
  const [phase, setPhase] = useState<"idle" | "browser" | "routing" | "response">("idle")
  const [done, setDone] = useState(false)
  const [visited, setVisited] = useState(false)

  useEffect(() => {
    onMessageChange("حان وقت التجربة العملية! اضغط على زر 'زيارة الصفحة' لترى كيف يستجيب Laravel.")
  }, [])

  const handleVisit = () => {
    if (visited) return
    setVisited(true)
    setPhase("browser")
    onMessageChange("المتصفح يرسل طلب GET إلى السيرفر...")

    setTimeout(() => {
      setPhase("routing")
      onMessageChange("Laravel يستقبل الطلب، يمر عبر Kernel ← Middleware ← Router. الراوتر يطابق المسار '/' وينفّذ Closure.")

      setTimeout(() => {
        setPhase("response")
        onMessageChange("الـ Closure يُعيد view('welcome'). Laravel يحوّلها إلى استجابة HTML ويعيدها للمتصفح.")
        onXpGain(20)

        setTimeout(() => {
          setDone(true)
        }, 1200)
      }, 1800)
    }, 1800)
  }

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-20 left-1/2 size-[400px] rounded-full bg-lam-blue/10 blur-[100px]" />
        </div>

        <div className="relative p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-5">
            <Code className="size-3.5 text-lam-blue" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted">
              تجربة تفاعلية
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-lam-text mb-2">
            محاكاة طلب HTTP
          </h2>
          <p className="text-sm text-lam-text-muted mb-6">
            شاهد كيف يستجيب Laravel لطلب صفحة بسيط
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-lam-gold/30 bg-lam-gold/5 p-4">
                <div className="text-[10px] font-mono text-lam-text-muted mb-2">routes/web.php</div>
                <pre className="font-mono text-xs text-lam-text-soft leading-relaxed" dir="ltr">
                  {`Route::get('/', function () {
    return view('welcome');
});`}
                </pre>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleVisit}
                  disabled={visited}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-blue to-lam-gold px-6 py-3 text-sm font-bold text-lam-bg-0 hover:scale-105 transition-transform disabled:opacity-50 lam-glow-gold"
                >
                  <Globe className="size-4" />
                  {visited ? "تمت الزيارة ✓" : "زيارة الصفحة"}
                </button>
              </div>

              {done && (
                  <div
                    className="rounded-2xl bg-lam-green/10 border border-lam-green/30 p-4"
                  >
                    <div className="flex items-center gap-2 text-lam-green mb-1">
                      <CheckCircle2 className="size-4" />
                      <span className="text-xs font-bold">+20 XP — اكتملت المحاكاة!</span>
                    </div>
                    <p className="text-xs text-lam-text-soft leading-relaxed">
                      هذا هو نفس السيناريو الذي سيحدث عندما تزور أي صفحة في Laravel.
                      الطلب يمر عبر Kernel ← Middleware ← Router ← Controller ← View.
                    </p>
                  </div>
                )}
            </div>

            <div className="rounded-2xl border border-border/60 bg-lam-bg-2/60 overflow-hidden">
              <div className="px-4 py-2 border-b border-border/60 bg-lam-bg-1/40">
                <span className="text-[10px] font-mono text-lam-text-muted">
                  {phase === "idle" && "بانتظار التفاعل..."}
                  {phase === "browser" && "🌐 المتصفح يرسل الطلب"}
                  {phase === "routing" && "⚙️ Laravel يعالج الطلب"}
                  {phase === "response" && "✅ الاستجابة تعود"}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  phase === "browser" || phase === "routing" || phase === "response"
                    ? "bg-lam-blue/10 border-lam-blue/30"
                    : "bg-lam-bg-2/40 border-border/40"
                }`}>
                  <Globe className={`size-5 ${phase === "browser" ? "text-lam-blue" : "text-lam-text-muted"}`} />
                  <div>
                    <p className="text-xs font-bold text-lam-text">المتصفح</p>
                    <p className="text-[10px] text-lam-text-muted">GET / → HTTP Request</p>
                  </div>
                    {phase === "browser" && (
                      <span
                        className="size-2 rounded-full bg-lam-blue lam-anim-pulse-gold"
                      />
                    )}
                </div>

                <div className="flex justify-center">
                  <div>
                    <ArrowLeft className="size-4 text-lam-gold ltr-flip" />
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  phase === "routing" || phase === "response"
                    ? "bg-lam-gold/10 border-lam-gold/30"
                    : "bg-lam-bg-2/40 border-border/40"
                }`}>
                  <Server className={`size-5 ${phase === "routing" ? "text-lam-gold" : "text-lam-text-muted"}`} />
                  <div>
                    <p className="text-xs font-bold text-lam-text">سيرفر Laravel</p>
                    <p className="text-[10px] text-lam-text-muted">
                      {phase === "idle" && "بانتظار الطلب"}
                      {phase === "browser" && "يستقبل الطلب..."}
                      {phase === "routing" && "يطابق المسار → يعالج"}
                      {phase === "response" && "يُعيد الاستجابة"}
                    </p>
                  </div>
                    {phase === "routing" && (
                      <span
                        className="size-2 rounded-full bg-lam-gold lam-anim-pulse-gold"
                      />
                    )}
                </div>

                <div className="flex justify-center">
                  <div>
                    <ArrowRight className="size-4 text-lam-green ltr-flip" />
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  phase === "response"
                    ? "bg-lam-green/10 border-lam-green/30"
                    : "bg-lam-bg-2/40 border-border/40"
                }`}>
                  <Globe className={`size-5 ${phase === "response" ? "text-lam-green" : "text-lam-text-muted"}`} />
                  <div>
                    <p className="text-xs font-bold text-lam-text">المتصفح</p>
                    <p className="text-[10px] text-lam-text-muted">HTML → يعرض الصفحة</p>
                  </div>
                    {phase === "response" && (
                      <span
                        className="size-2 rounded-full bg-lam-green lam-anim-pulse-gold"
                      />
                    )}
                </div>
              </div>
            </div>
          </div>

          {done && (
            <div
              className="mt-6 text-center"
            >
              <button
                onClick={() => {
                  onMessageChange("الآن التحدي النهائي! هل تستطيع تشغيل سيرفر Laravel المحلي؟")
                  setTimeout(onNext, 600)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-6 py-3 text-sm font-bold text-lam-bg-0 lam-glow-gold"
              >
                التحدي النهائي
                <ChevronLeft className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
