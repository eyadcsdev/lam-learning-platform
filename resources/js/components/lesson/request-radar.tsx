"use client"

import { Globe2, Server, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react"
import type {
  FormState,
  LessonStep,
  ValidationErrors,
} from "@/components/lesson/lesson-experience"

interface RequestRadarProps {
  activeStep: LessonStep
  form: FormState
  errors: ValidationErrors
  isSubmitting: boolean
}

const FLOW: {
  id: LessonStep
  label: string
  sub: string
  icon: typeof Globe2
  color: string
}[] = [
  {
    id: "send",
    label: "Frontend",
    sub: "React / Inertia",
    icon: Globe2,
    color: "lam-blue",
  },
  {
    id: "receive",
    label: "Laravel",
    sub: "HTTP Kernel",
    icon: Server,
    color: "lam-gold",
  },
  {
    id: "validate",
    label: "Validator",
    sub: "Validation Engine",
    icon: ShieldCheck,
    color: "lam-orange",
  },
  {
    id: "respond",
    label: "Response",
    sub: "JSON · 422 / 200",
    icon: Server,
    color: "lam-green",
  },
]

export function RequestRadar({
  activeStep,
  form,
  errors,
  isSubmitting,
}: RequestRadarProps) {
  const stepOrder: LessonStep[] = [
    "prepare",
    "send",
    "receive",
    "validate",
    "respond",
    "render",
  ]
  const idx = stepOrder.indexOf(activeStep)

  return (
    <div
      className="lam-glass-strong rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
        <div>
          <div className="text-xs text-lam-text-muted mb-1">رادار الطلب الحي</div>
          <h3 className="font-display text-lg sm:text-xl font-extrabold text-lam-text">
            رحلة البيانات بين الواجهة والسيرفر
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-lam-green lam-anim-pulse-gold" />
          <span className="text-[11px] font-mono text-lam-text-muted">
            {isSubmitting ? "in-flight" : "idle"}
          </span>
        </div>
      </div>

      {/* Flow track */}
      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* connecting line */}
        <div className="hidden sm:block absolute top-1/2 right-6 left-6 h-px bg-gradient-to-l from-lam-green/40 via-border to-lam-blue/40" />

        {FLOW.map((node, i) => {
          const isActive = stepOrder.indexOf(node.id) === idx
          const isPast = stepOrder.indexOf(node.id) < idx
          const Icon = node.icon

          const tone =
            node.color === "lam-blue"
              ? "bg-lam-blue/15 border-lam-blue/40 text-lam-blue"
              : node.color === "lam-gold"
              ? "bg-lam-gold/15 border-lam-gold/40 text-lam-gold"
              : node.color === "lam-orange"
              ? "bg-lam-orange/15 border-lam-orange/40 text-lam-orange"
              : "bg-lam-green/15 border-lam-green/40 text-lam-green"

          return (
            <div key={node.id} className="relative">
              <div
                className={`relative rounded-2xl border p-3 transition-all ${
                  isActive
                    ? `${tone} lam-glow-orange`
                    : isPast
                    ? "bg-lam-green/5 border-lam-green/20"
                    : "bg-lam-bg-2/40 border-border/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`size-9 rounded-xl grid place-items-center border ${
                      isActive ? tone : "bg-secondary/60 border-border text-lam-text-muted"
                    } ${isActive ? "lam-anim-pulse-orange" : ""}`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[10px] text-lam-text-muted">
                      مرحلة {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-sm font-bold text-lam-text">
                      {node.label}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-lam-text-muted">{node.sub}</div>
              </div>

              {/* Animated packet */}
              {isActive && (
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 rounded-full bg-lam-gold"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Direction arrows for narrative */}
      <div className="mt-4 hidden sm:flex items-center justify-center gap-2 text-[11px] text-lam-text-muted">
        <ArrowRight className="size-3.5 ltr-flip" />
        <span>طلب POST</span>
        <span className="size-1 rounded-full bg-lam-text-muted/40" />
        <ArrowLeft className="size-3.5 ltr-flip" />
        <span>JSON رد</span>
      </div>

      {/* Payload + Response */}
      <div className="mt-5 grid lg:grid-cols-2 gap-3">
        <PayloadCard
          title="Request Payload"
          subtitle="POST /mission · application/json"
          tone="blue"
          json={{
            name: form.name,
            email: form.email,
            age: form.age,
          }}
        />
        <PayloadCard
          title="Response"
          subtitle={
            Object.keys(errors).length
              ? "HTTP 422 · Unprocessable Entity"
              : activeStep === "render"
              ? "HTTP 200 · OK"
              : "في الانتظار…"
          }
          tone={
            Object.keys(errors).length
              ? "orange"
              : activeStep === "render"
              ? "green"
              : "neutral"
          }
          json={
            Object.keys(errors).length
              ? { errors }
              : activeStep === "render"
              ? { status: "launched", mission: "OK" }
              : { pending: true }
          }
        />
      </div>
    </div>
  )
}

function PayloadCard({
  title,
  subtitle,
  json,
  tone,
}: {
  title: string
  subtitle: string
  json: Record<string, unknown>
  tone: "blue" | "orange" | "green" | "neutral"
}) {
  const t =
    tone === "blue"
      ? "border-lam-blue/30"
      : tone === "orange"
      ? "border-lam-orange/40"
      : tone === "green"
      ? "border-lam-green/40"
      : "border-border/60"
  const dot =
    tone === "blue"
      ? "bg-lam-blue"
      : tone === "orange"
      ? "bg-lam-orange"
      : tone === "green"
      ? "bg-lam-green"
      : "bg-lam-text-muted"

  return (
      <div
        className={`rounded-2xl border ${t} bg-lam-bg-2/50 overflow-hidden`}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${dot}`} />
            <span className="text-xs font-bold text-lam-text">{title}</span>
          </div>
          <span className="text-[10px] font-mono text-lam-text-muted">
            {subtitle}
          </span>
        </div>
        <pre
          dir="ltr"
          className="font-mono text-[11px] leading-[1.7] p-3 text-lam-text-soft/95 overflow-auto max-h-44"
        >
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
  )
}
