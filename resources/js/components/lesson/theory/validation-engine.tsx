"use client"

import {
  Inbox,
  ListChecks,
  Cpu,
  AlertTriangle,
  Save,
  Send,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Stage = {
  icon: LucideIcon
  title: string
  code: string
  desc: string
}

const STAGES: Stage[] = [
  {
    icon: Inbox,
    title: "استخراج المدخلات",
    code: "$request->all()",
    desc: "Laravel يجمع كل البيانات القادمة من الـ Request: form-data و query و JSON.",
  },
  {
    icon: ListChecks,
    title: "تحليل القواعد",
    code: "'age' => 'required|integer|min:21'",
    desc: "السلسلة تُقطَّع إلى Rule objects: Required, Integer, Min(21).",
  },
  {
    icon: Cpu,
    title: "تشغيل المحرّك",
    code: "Validator::make($data, $rules)",
    desc: "المحرّك يمرّ على كل حقل ويُنفّذ كل قاعدة تباعاً ضد قيمته.",
  },
  {
    icon: AlertTriangle,
    title: "توليد الاستثناء",
    code: "throw new ValidationException(...)",
    desc: "عند فشل أي قاعدة، يُرفع استثناء يحمل MessageBag بكل الأخطاء.",
  },
  {
    icon: Save,
    title: "تخزين الأخطاء",
    code: "session()->flash('errors', $bag)",
    desc: "الأخطاء تُحفظ في الجلسة مع البيانات القديمة (old input).",
  },
  {
    icon: Send,
    title: "إرسال إلى الواجهة",
    code: "Inertia::share('errors', ...)",
    desc: "Inertia يلتقط الأخطاء ويمرّرها كـ prop لمكوّن React مباشرة.",
  },
]

export function ValidationEngine() {
  return (
    <section className="space-y-5">
      <div className="max-w-2xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted mb-2">
          داخل المحرّك
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-lam-text text-balance">
          ماذا يحدث فعلياً عند استدعاء{" "}
          <code className="font-mono text-lam-gold-bright">$request-&gt;validate()</code>؟
        </h3>
        <p className="mt-3 text-sm sm:text-base text-lam-text-soft leading-relaxed text-pretty">
          خلف هذا السطر البسيط، يدور محرّك متكامل من ست مراحل. كل مرحلة لها وظيفة
          محددة ومسؤولية واضحة.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon
          return (
            <article
              key={stage.title}
              className="relative rounded-2xl border border-border/60 bg-lam-bg-2/60 p-4 hover:border-lam-gold/40 transition-colors group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="size-10 rounded-xl bg-lam-gold/10 border border-lam-gold/30 grid place-items-center shrink-0 group-hover:lam-glow-gold transition-shadow">
                  <Icon className="size-5 text-lam-gold" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-lam-text-muted mb-0.5">
                    Stage 0{i + 1}
                  </div>
                  <h4 className="font-bold text-sm text-lam-text leading-tight">
                    {stage.title}
                  </h4>
                </div>
              </div>

              <pre
                dir="ltr"
                className="font-mono text-[10.5px] leading-relaxed bg-lam-bg-1/80 border border-border/50 rounded-lg px-3 py-2 mb-2.5 text-lam-orange overflow-x-auto"
              >
                {stage.code}
              </pre>

              <p className="text-xs text-lam-text-muted leading-relaxed">
                {stage.desc}
              </p>

              <div className="absolute top-3 left-3 text-[10px] font-mono text-lam-text-muted/40">
                0{i + 1}/06
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
