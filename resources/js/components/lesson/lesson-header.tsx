"use client"

import { CheckCircle2 } from "lucide-react"
import { STEPS, type LessonStep } from "@/components/lesson/lesson-experience"

interface LessonHeaderProps {
  activeStep: LessonStep
  onStepClick: (step: LessonStep) => void
}

export function LessonHeader({ activeStep, onStepClick }: LessonHeaderProps) {
  const activeIndex = STEPS.findIndex((s) => s.id === activeStep)

  return (
    <div className="lam-glass rounded-2xl p-3 overflow-x-auto">
      <ol className="flex items-center gap-1.5 min-w-max">
        {STEPS.map((step, i) => {
          const isDone = i < activeIndex
          const isActive = i === activeIndex
          return (
            <li key={step.id} className="flex items-center gap-1.5">
              <button
                onClick={() => onStepClick(step.id)}
                className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-lam-orange/15 border-lam-orange/40 text-lam-orange lam-glow-orange"
                    : isDone
                    ? "bg-lam-green/10 border-lam-green/30 text-lam-green"
                    : "bg-secondary/40 border-border/60 text-lam-text-muted hover:text-lam-text-soft"
                }`}
              >
                <span
                  className={`size-5 rounded-md grid place-items-center text-[10px] font-bold ${
                    isActive
                      ? "bg-lam-orange/30 text-lam-orange"
                      : isDone
                      ? "bg-lam-green/20"
                      : "bg-secondary/80 text-lam-text-muted"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="size-3" /> : i + 1}
                </span>
                <span className="whitespace-nowrap">{step.label}</span>
                {isActive && (
                  <span
                    className="size-1.5 rounded-full bg-lam-orange lam-anim-pulse-orange"
                  />
                )}
              </button>
              {i < STEPS.length - 1 && (
                <div className="w-4 h-px bg-gradient-to-l from-transparent via-border to-transparent" />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
