"use client"

import { AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react"
import type {
  LessonStep,
  ValidationErrors,
} from "@/components/lesson/lesson-experience"

interface FailureExplainerProps {
  activeStep: LessonStep
  errors: ValidationErrors
}

const RULE_EXPLAIN: Record<keyof ValidationErrors, { rule: string; why: string }> = {
  name: {
    rule: "required|string|max:60",
    why: "محرّك التحقق كشف أن قيمة الاسم لا تستوفي قواعد التواجد أو الطول، فأطلق ValidationException قبل الوصول إلى منطق العمل.",
  },
  email: {
    rule: "required|email",
    why: "EmailValidator فحص الصيغة باستخدام نمط RFC وفشل في إيجاد بنية بريد صحيحة، فاعتبر القيمة غير مقبولة وأوقف الطلب.",
  },
  age: {
    rule: "required|integer|min:21",
    why: "Laravel حاول تحويل القيمة لعدد صحيح ثم فحص قاعدة min(21). عند الفشل، أنشأ خطأً في MessageBag وأعاد استجابة 422.",
  },
}

export function FailureExplainer({
  activeStep,
  errors,
}: FailureExplainerProps) {
  const failedFields = (Object.keys(errors) as (keyof ValidationErrors)[]).filter(
    (k) => errors[k],
  )
  const isSuccess =
    activeStep === "render" && failedFields.length === 0

  return (
      {isSuccess ? (
        <div
          className="rounded-2xl border-2 border-lam-green/30 bg-lam-green/5 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-lam-green/15 border border-lam-green/40 grid place-items-center shrink-0">
              <CheckCircle2 className="size-5 text-lam-green" />
            </div>
            <div>
              <h4 className="font-bold text-lam-text text-base mb-1">
                نجح التحقق · Validation Passed
              </h4>
              <p className="text-sm text-lam-text-soft leading-relaxed">
                كل القواعد اجتازت الفحص. Laravel أعاد مصفوفة{" "}
                <code className="font-mono text-lam-green bg-lam-bg-1/60 px-1.5 py-0.5 rounded">
                  $validated
                </code>{" "}
                نظيفة، وتم تمرير البيانات بأمان إلى منطق العمل وقاعدة البيانات.
              </p>
            </div>
          </div>
        </div>
      ) : failedFields.length > 0 ? (
        <div
          className="rounded-2xl border-2 border-lam-orange/30 bg-lam-orange/5 p-5 space-y-4"
        >
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-lam-orange/15 border border-lam-orange/40 grid place-items-center shrink-0">
              <AlertTriangle className="size-5 text-lam-orange" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lam-text text-base mb-1">
                لماذا فشل التحقق؟ · Failure breakdown
              </h4>
              <p className="text-sm text-lam-text-muted leading-relaxed">
                Laravel فحص كل حقل ضد قواعده، ثم جمع كل الانتهاكات في{" "}
                <code className="font-mono text-lam-orange bg-lam-bg-1/60 px-1.5 py-0.5 rounded">
                  MessageBag
                </code>{" "}
                وأعادها كاستجابة 422 إلى الواجهة.
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {failedFields.map((field) => {
              const info = RULE_EXPLAIN[field]
              return (
                <li
                  key={field}
                  className="rounded-xl border border-border/60 bg-lam-bg-2/60 p-3.5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-xs font-bold text-lam-orange bg-lam-orange/10 border border-lam-orange/30 rounded px-2 py-0.5">
                      {field}
                    </code>
                    <ArrowLeft className="size-3.5 text-lam-text-muted" />
                    <code
                      dir="ltr"
                      className="font-mono text-[11px] text-lam-text-soft truncate"
                    >
                      {info.rule}
                    </code>
                  </div>
                  <p className="text-xs text-lam-text-soft leading-relaxed mb-1.5">
                    {info.why}
                  </p>
                  <p className="text-[11px] text-lam-red font-mono">
                    {errors[field]}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
  )
}
