"use client"

import { useState } from "react"
import { CheckCircle2, Lightbulb, Target, X } from "lucide-react"

interface ChallengeCardProps {
  solved: boolean
  onSolve: () => void
}

export function ChallengeCard({ solved, onSolve }: ChallengeCardProps) {
  const [value, setValue] = useState("")
  const [feedback, setFeedback] = useState<"idle" | "wrong">("idle")
  const [showHint, setShowHint] = useState(false)

  const checkAnswer = () => {
    const v = value.trim().toLowerCase().replace(/['"`\s]/g, "")
    // Accept variations: min:21, "min:21", required|integer|min:21
    if (v.includes("min:21")) {
      onSolve()
      setFeedback("idle")
    } else {
      setFeedback("wrong")
    }
  }

  return (
    <div
      className={`relative rounded-2xl border-2 p-5 sm:p-6 overflow-hidden ${
        solved
          ? "border-lam-green/40 bg-lam-green/5 lam-glow-green"
          : "border-lam-orange/30 bg-lam-orange/5"
      }`}
    >
      {/* glow accents */}
      <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-[radial-gradient(circle,rgba(254,128,25,0.18),transparent_70%)] blur-2xl" />

      <div className="relative grid lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-xs font-medium text-lam-orange mb-3">
            <Target className="size-4" />
            <span className="tracking-wider">التحدي</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-lam-text leading-snug">
            أضف شرطاً يمنع قبول الأعمار أقل من 21
          </h3>
          <p className="mt-2 text-sm text-lam-text-muted leading-relaxed">
            اكتب القاعدة المناسبة في Laravel Validation داخل المربع. كافأة عند
            النجاح:{" "}
            <span className="font-display font-black lam-text-gradient">
              +80 XP
            </span>
            .
          </p>

          <button
            onClick={() => setShowHint((s) => !s)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-lam-gold hover:text-lam-gold-bright"
          >
            <Lightbulb className="size-3.5" />
            {showHint ? "إخفاء التلميح" : "اعرض تلميحاً"}
          </button>
          {showHint && (
            <div
              className="overflow-hidden"
            >
                <div className="mt-2 rounded-lg border border-lam-gold/30 bg-lam-gold/5 p-2.5 text-[11px] text-lam-text-soft leading-relaxed">
                  استخدم القاعدة <code className="font-mono text-lam-gold">min:N</code> مع{" "}
                  <code className="font-mono text-lam-gold">integer</code> لضمان أن العمر رقم صحيح
                  ولا يقل عن 21.
                </div>
              </div>
            )}
        </div>

        <div className="lg:col-span-7">
          <label
            htmlFor="challenge-input"
            className="text-[11px] text-lam-text-muted block mb-2 font-mono"
          >
            // اكتب القاعدة هنا
          </label>
          <div
            className={`rounded-xl border bg-lam-bg-2/60 overflow-hidden transition-colors ${
              solved
                ? "border-lam-green/40"
                : feedback === "wrong"
                ? "border-lam-red/50"
                : "border-border/60"
            }`}
          >
            <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-border/60 bg-lam-bg-1/40">
              <span className="text-[10px] font-mono text-lam-text-muted">
                'age' =&gt; '...'
              </span>
              <span className="text-[10px] font-mono text-lam-green">PHP</span>
            </div>
            <input
              id="challenge-input"
              dir="ltr"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                if (feedback !== "idle") setFeedback("idle")
              }}
              placeholder="required|integer|min:21"
              disabled={solved}
              className="w-full bg-transparent px-4 py-3.5 font-mono text-sm text-lam-text-soft placeholder:text-lam-text-muted/50 focus:outline-none disabled:opacity-70"
              onKeyDown={(e) => {
                if (e.key === "Enter") checkAnswer()
              }}
            />
          </div>

          <div className="mt-3 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={checkAnswer}
              disabled={solved}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-5 py-2.5 text-sm font-bold text-lam-bg-0 disabled:opacity-70 disabled:cursor-not-allowed lam-glow-orange"
            >
              تحقق من الحل
            </button>

              {solved && (
                <div
                  className="inline-flex items-center gap-1.5 rounded-lg bg-lam-green/15 border border-lam-green/40 px-2.5 py-1.5 text-xs font-bold text-lam-green"
                >
                  <CheckCircle2 className="size-3.5" />
                  حلٌّ صحيح! +80 XP
                </div>
              )}
              {!solved && feedback === "wrong" && (
                <div
                  className="inline-flex items-center gap-1.5 rounded-lg bg-lam-red/15 border border-lam-red/40 px-2.5 py-1.5 text-xs font-bold text-lam-red"
                >
                  <X className="size-3.5" />
                  لم تتطابق القاعدة، حاول مرة أخرى
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
