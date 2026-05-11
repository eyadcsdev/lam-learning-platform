"use client"

import { AlertTriangle, Database, Lock, ShieldOff, Bug } from "lucide-react"

const RISKS = [
  {
    icon: ShieldOff,
    title: "بيانات غير موثوقة",
    desc: "كل طلب قادم من المتصفح يجب اعتباره مدخلاً معادياً حتى يُثبت العكس.",
  },
  {
    icon: Database,
    title: "فساد قواعد البيانات",
    desc: "حفظ بيانات غير صالحة يُلوّث الجداول ويصعّب الاستعلام مستقبلاً.",
  },
  {
    icon: Lock,
    title: "ثغرات أمنية",
    desc: "غياب التحقق يفتح الباب لـ SQL Injection و XSS وتجاوز الصلاحيات.",
  },
  {
    icon: Bug,
    title: "انهيار التطبيق",
    desc: "بيانات مشوّهة قد تُسقط معالجات الخلفية وتُوقف الخدمة.",
  },
]

export function TheoryIntro() {
  return (
    <section className="relative lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[480px] rounded-full bg-lam-orange/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 size-[300px] rounded-full bg-lam-gold/10 blur-[100px]" />
      </div>

      <div className="relative p-6 sm:p-10 lg:p-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-5">
            <span className="size-1.5 rounded-full bg-lam-orange lam-anim-pulse-orange" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted">
              Phase 01 · المفهوم النظري
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.15] text-balance">
            <span className="text-lam-text">لماذا نحتاج إلى</span>{" "}
            <span className="bg-gradient-to-l from-lam-gold-bright via-lam-gold to-lam-orange bg-clip-text text-transparent">
              التحقق من البيانات؟
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-lam-text-soft text-pretty">
            في عالم الويب، كل طلب يصل لخادمك هو وعد قابل للكسر. المستخدمون قد يرسلون
            حقولاً فارغة، أرقاماً عوضاً عن نصوص، أو حتى محاولات اختراق صريحة. مهمتنا
            كمهندسي Laravel أن نضع طبقة دفاع صلبة بين التطبيق وأي مدخل خارجي، قبل أن
            يُلامس قاعدة البيانات أو منطق العمل.
          </p>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-lam-text-muted text-pretty">
            في هذا الفصل سنفكّك مفهوم{" "}
            <span className="text-lam-gold font-semibold">Validation</span> طبقة طبقة:
            لماذا وُجد، كيف كانت الحياة قبله، وكيف يعمل محرّكه الداخلي داخل Laravel
            خطوة بخطوة.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RISKS.map((risk, i) => {
            const Icon = risk.icon
            return (
              <article
                key={risk.title}
                className="group relative rounded-2xl border border-border/60 bg-lam-bg-2/60 p-5 hover:border-lam-orange/40 transition-all"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lam-orange/0 via-transparent to-lam-orange/0 group-hover:from-lam-orange/5 group-hover:to-lam-red/5 transition-all" />
                <div className="relative">
                  <div className="size-10 rounded-xl bg-lam-orange/15 border border-lam-orange/30 grid place-items-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="size-5 text-lam-orange" />
                  </div>
                  <h3 className="font-bold text-sm text-lam-text mb-1.5">
                    {risk.title}
                  </h3>
                  <p className="text-xs text-lam-text-muted leading-relaxed">
                    {risk.desc}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className="mt-10 flex items-start gap-3 rounded-2xl border-r-4 border-lam-orange bg-lam-orange/5 p-4"
        >
          <AlertTriangle className="size-5 text-lam-orange shrink-0 mt-0.5" />
          <p className="text-sm text-lam-text-soft leading-relaxed">
            <span className="font-bold text-lam-text">قاعدة ذهبية:</span> لا تثق
            أبداً بأي بيانات قادمة من العميل. حتى لو وضعت تحققاً في الواجهة، الخادم
            هو الحَكَم الأخير والوحيد.
          </p>
        </div>
      </div>
    </section>
  )
}
