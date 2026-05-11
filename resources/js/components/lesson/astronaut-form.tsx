"use client"

import { AlertCircle, Loader2, Rocket, Send, ShieldCheck } from "lucide-react"
import type {
  FormState,
  LessonStep,
  ValidationErrors,
} from "@/components/lesson/lesson-experience"

interface AstronautFormProps {
  form: FormState
  setForm: (f: FormState) => void
  errors: ValidationErrors
  isSubmitting: boolean
  onSubmit: () => void
  activeStep: LessonStep
}

export function AstronautForm({
  form,
  setForm,
  errors,
  isSubmitting,
  onSubmit,
  activeStep,
}: AstronautFormProps) {
  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value })

  const fields: {
    key: keyof FormState
    label: string
    placeholder: string
    type: string
    inputMode?: "text" | "email" | "numeric"
  }[] = [
    {
      key: "name",
      label: "الاسم",
      placeholder: "اسم رائد الفضاء",
      type: "text",
    },
    {
      key: "email",
      label: "البريد الإلكتروني",
      placeholder: "you@galaxy.dev",
      type: "email",
      inputMode: "email",
    },
    {
      key: "age",
      label: "العمر",
      placeholder: "21",
      type: "text",
      inputMode: "numeric",
    },
  ]

  return (
    <div
      className="lam-glass-strong rounded-2xl p-4 sm:p-5 h-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="size-9 rounded-xl bg-lam-blue/15 border border-lam-blue/30 grid place-items-center">
          <ShieldCheck className="size-4 text-lam-blue" />
        </div>
        <div>
          <div className="text-xs text-lam-text-muted">واجهة Inertia / React</div>
          <div className="text-sm font-bold text-lam-text">
            تسجيل رائد الفضاء
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="space-y-3.5"
      >
        {fields.map((f) => {
          const err = errors[f.key]
          return (
            <div key={f.key}>
              <label
                htmlFor={`field-${f.key}`}
                className="text-xs font-medium text-lam-text-soft block mb-1.5"
              >
                {f.label}
              </label>
              <div className="relative">
                <input
                  id={`field-${f.key}`}
                  type={f.type}
                  inputMode={f.inputMode}
                  value={form[f.key]}
                  onChange={update(f.key)}
                  placeholder={f.placeholder}
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border bg-lam-bg-2/50 px-3.5 py-3 text-sm text-lam-text-soft placeholder:text-lam-text-muted/50 focus:outline-none focus:ring-2 transition-colors disabled:opacity-70 ${
                    err
                      ? "border-lam-orange/60 focus:ring-lam-orange/40"
                      : "border-border/60 focus:border-primary/50 focus:ring-primary/30"
                  }`}
                />
                {err && (
                  <AlertCircle className="absolute top-1/2 -translate-y-1/2 left-3 size-4 text-lam-orange" />
                )}
              </div>
              {err && (
                <div
                  className="mt-1.5 flex items-center gap-1.5 text-[11px] text-lam-orange font-medium"
                >
                  <span className="size-1.5 rounded-full bg-lam-orange" />
                  {err}
                </div>
              )}
            </div>
          )
        })}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold via-lam-gold-bright to-lam-orange py-3 text-sm font-bold text-lam-bg-0 disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden lam-glow-orange"
        >
          {/* shimmer */}
          <span className="absolute inset-0 lam-shimmer-bg pointer-events-none" />
          <span className="relative inline-flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                جارٍ الإرسال…
              </>
            ) : (
              <>
                إرسال إلى السيرفر
                <Send className="size-4 rotate-180 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </span>
        </button>

        <div className="rounded-xl border border-dashed border-border/60 p-3 flex items-start gap-2.5">
          <Rocket className="size-4 text-lam-orange shrink-0 mt-0.5" />
          <p className="text-[11px] text-lam-text-muted leading-relaxed">
            بعد الضغط ستُحاكَى رحلة الطلب كاملة: من الواجهة إلى Laravel، ثم محرك
            التحقق، ثم العودة بالنتيجة. راقب اللوحات الأخرى!
          </p>
        </div>

        {activeStep === "render" && Object.keys(errors).length === 0 && (
          <div
            className="rounded-xl border border-lam-green/40 bg-lam-green/10 p-3 text-xs text-lam-green flex items-center gap-2"
          >
            <ShieldCheck className="size-4" />
            تم قبول البيانات. الإطلاق ناجح!
    </div>
        )}
      </form>
    </div>
  )
}
