"use client"

import { Bot, CheckCircle2, Send, ShieldCheck, Sparkles, Terminal } from "lucide-react"

export function LessonPreview() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-lam-blue mb-4">
            <Sparkles className="size-4" />
            <span className="tracking-wider">معاينة درس تفاعلي</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-balance">
            <span className="lam-text-gradient-soft">شعور التعلم</span>{" "}
            <span className="lam-text-gradient">داخل لام</span>
          </h2>
          <p className="mt-4 text-lam-text-muted text-base sm:text-lg leading-relaxed text-pretty">
            نموذج مصغّر من تجربة درس Laravel Validation. كل عنصر هنا يتفاعل ويتحرك ويُحاكي رحلة الطلب الحقيقية.
          </p>
        </div>

        <div className="lam-glass-strong rounded-3xl p-4 sm:p-6 lam-glow-gold">
          <div className="grid lg:grid-cols-12 gap-4">
            {/* Mascot / story */}
            <div className="lg:col-span-3 lam-glass rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-xl bg-gradient-to-br from-lam-gold to-lam-orange grid place-items-center text-lam-bg-0 lam-anim-pulse-gold">
                  <Bot className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-lam-text-muted">المرشد</div>
                  <div className="text-sm font-bold text-lam-text">لومي</div>
                </div>
              </div>
              <div className="rounded-xl border border-border/60 bg-lam-bg-2/40 p-3 text-sm text-lam-text-soft leading-relaxed">
                قبل إطلاق الرحلة يجب التأكد من صحة بيانات رائد الفضاء.
                <span className="lam-anim-blink text-lam-gold">▍</span>
              </div>
              <div className="mt-1 grid grid-cols-3 gap-1.5 text-[10px] font-semibold text-center">
                {["بيانات", "إرسال", "تحقّق"].map((s, i) => (
                  <div
                    key={s}
                    className={`rounded-lg py-2 ${
                      i === 0
                        ? "bg-lam-green/15 text-lam-green border border-lam-green/30"
                        : i === 1
                        ? "bg-lam-orange/15 text-lam-orange border border-lam-orange/30 lam-anim-pulse-orange"
                        : "bg-secondary/60 text-lam-text-muted border border-border"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-4 lam-glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="size-4 text-lam-green" />
                <span className="text-sm font-semibold">نموذج رائد الفضاء</span>
              </div>
              <div className="space-y-3">
                <Field label="الاسم" value="لومي العتيبي" />
                <Field label="البريد الإلكتروني" value="loomi@lam.dev" />
                <Field label="العمر" value="19" error="يجب ألا يقل العمر عن 21" />
                <button
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange py-2.5 text-sm font-bold text-lam-bg-0 hover:opacity-95 lam-glow-orange"
                >
                  إرسال إلى السيرفر
                  <Send className="size-4" />
                </button>
              </div>
            </div>

            {/* Code editor */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-border/60 bg-lam-bg-2/60">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60">
                <span className="size-2.5 rounded-full bg-lam-red/80" />
                <span className="size-2.5 rounded-full bg-lam-gold/80" />
                <span className="size-2.5 rounded-full bg-lam-green/80" />
                <div className="flex-1" />
                <Terminal className="size-3.5 text-lam-text-muted" />
                <span className="text-[10px] font-mono text-lam-text-muted">
                  ValidationController.php
                </span>
              </div>
              <pre
                dir="ltr"
                className="font-mono text-[11.5px] leading-relaxed p-4 text-lam-text-soft/90"
              >
{`public function launch(Request $req)
{
  $validated = $req->validate([
    `}<span className="text-lam-blue">{`'name'`}</span>{`  => `}<span className="text-lam-green">{`'required|string|max:60'`}</span>{`,
    `}<span className="text-lam-blue">{`'email'`}</span>{` => `}<span className="text-lam-green">{`'required|email'`}</span>{`,
    `}<span className="text-lam-blue">{`'age'`}</span>{`   => `}<span className="bg-lam-orange/20 text-lam-orange rounded px-1 font-semibold">{`'required|integer|min:21'`}</span>{`,
  ]);

  `}<span className="text-lam-gold">{`return`}</span>{` Mission::launch($validated);
}`}<span className="lam-anim-blink text-lam-gold">▍</span>
              </pre>
              <div className="border-t border-border/60 px-3 py-2 flex items-center gap-2 text-[11px] text-lam-text-muted">
                <CheckCircle2 className="size-3.5 text-lam-green" />
                <span>فحص بيانات الإدخال يحمي السيرفر من البيانات غير الصالحة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, value, error }: { label: string; value: string; error?: string }) {
  return (
    <div>
      <label className="text-[11px] text-lam-text-muted block mb-1">{label}</label>
      <div
        className={`rounded-xl border px-3 py-2.5 bg-lam-bg-2/40 text-sm text-lam-text-soft ${
          error ? "border-lam-orange/50" : "border-border/60"
        }`}
      >
        {value}
      </div>
      {error && (
        <div className="mt-1 text-[11px] text-lam-orange flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-lam-orange" />
          {error}
        </div>
      )}
    </div>
  )
}
