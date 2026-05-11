"use client"

import { Bot, Sparkles, ChevronDown } from "lucide-react"

export function PracticalTransition() {
  return (
    <section className="relative">
      <div className="lam-glass-strong rounded-3xl border border-lam-gold/30 overflow-hidden">
        <div className="relative p-6 sm:p-10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 size-64 rounded-full bg-lam-gold/15 blur-[100px]" />
            <div className="absolute bottom-0 left-1/4 size-64 rounded-full bg-lam-orange/10 blur-[100px]" />
          </div>

          <div className="relative grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-7 items-center">
            {/* Loomi avatar */}
            <div
              className="relative mx-auto sm:mx-0"
            >
              <div className="absolute inset-0 rounded-full bg-lam-gold/20 blur-2xl scale-110" />
              <div className="relative size-24 sm:size-28 rounded-3xl bg-gradient-to-br from-lam-gold via-lam-orange to-lam-gold-bright border-2 border-lam-gold/50 grid place-items-center lam-glow-gold">
                <Bot className="size-12 sm:size-14 text-lam-bg-0" />
              </div>
              <div
                className="absolute -top-2 -right-2 size-8 rounded-full bg-lam-bg-1/90 border border-lam-gold/50 grid place-items-center"
              >
                <Sparkles className="size-4 text-lam-gold" />
              </div>
            </div>

            {/* Message */}
            <div>
              <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1 mb-3">
                <span className="size-1.5 rounded-full bg-lam-green lam-anim-pulse-orange" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-lam-text-muted">
                  Loomi · المرشد
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-black text-lam-text leading-snug text-balance">
                {"الآن بعد أن فهمت "}
                <span className="text-lam-gold">لماذا</span>
                {" يوجد Validation و"}
                <span className="text-lam-gold">كيف يعمل</span>
                {" داخلياً داخل Laravel،"}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-lam-text-soft leading-relaxed text-pretty">
                حان وقت التطبيق العملي. سننتقل إلى{" "}
                <span className="text-lam-orange font-bold">
                  مركز التحكم الفضائي
                </span>{" "}
                حيث ستُجرّب كل ما تعلّمته في محاكاة حيّة لإطلاق رائد فضاء.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Tag>نموذج رواد الفضاء</Tag>
                <Tag>محرر كود حي</Tag>
                <Tag>رادار طلبات</Tag>
                <Tag>تحدّي عملي</Tag>
              </div>
            </div>
          </div>

          <div
            className="relative mt-8 flex flex-col items-center gap-1"
          >
            <p className="text-[11px] font-mono text-lam-text-muted">
              نزّل لبدء المحاكاة العملية
            </p>
            <div>
              <ChevronDown className="size-5 text-lam-gold" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-lam-bg-2/60 border border-border/60 px-2.5 py-1 text-[11px] text-lam-text-soft">
      <span className="size-1 rounded-full bg-lam-gold" />
      {children}
    </span>
  )
}
