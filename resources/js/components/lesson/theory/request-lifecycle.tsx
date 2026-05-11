"use client"

import {
  Globe,
  ArrowDown,
  Route as RouteIcon,
  Layers,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Monitor,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Node = {
  id: string
  icon: LucideIcon
  label: string
  sub: string
  tone: "blue" | "gold" | "orange" | "green" | "red" | "neutral"
}

const NODES: Node[] = [
  {
    id: "browser",
    icon: Globe,
    label: "المتصفح",
    sub: "Browser sends form data",
    tone: "blue",
  },
  {
    id: "http",
    icon: Layers,
    label: "HTTP Request",
    sub: "POST /mission · payload",
    tone: "neutral",
  },
  {
    id: "router",
    icon: RouteIcon,
    label: "Laravel Router",
    sub: "match route + middleware",
    tone: "gold",
  },
  {
    id: "controller",
    icon: Layers,
    label: "Controller",
    sub: "ValidationController@launch",
    tone: "orange",
  },
  {
    id: "validation",
    icon: ShieldCheck,
    label: "Validation Engine",
    sub: "$request->validate([...])",
    tone: "orange",
  },
]

const TONE_MAP: Record<Node["tone"], string> = {
  blue: "border-lam-blue/40 bg-lam-blue/10 text-lam-blue",
  gold: "border-lam-gold/40 bg-lam-gold/10 text-lam-gold",
  orange: "border-lam-orange/40 bg-lam-orange/10 text-lam-orange",
  green: "border-lam-green/40 bg-lam-green/10 text-lam-green",
  red: "border-lam-red/40 bg-lam-red/10 text-lam-red",
  neutral: "border-border bg-lam-bg-2/60 text-lam-text-soft",
}

export function RequestLifecycle() {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted mb-2">
          المعمارية الداخلية
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-lam-text text-balance">
          كيف يعمل Validation داخل Laravel؟
        </h3>
        <p className="mt-3 text-sm sm:text-base text-lam-text-soft leading-relaxed text-pretty">
          عندما يصل الطلب إلى Laravel، يمرّ في خط أنابيب دقيق قبل أن يصل إلى منطقك.
          هذه هي الرحلة الكاملة، خطوة بخطوة.
        </p>
      </div>

      <div className="lam-glass rounded-3xl border border-border/60 p-5 sm:p-8">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* Left rail: linear flow */}
          <div className="space-y-3">
            {NODES.map((node, i) => {
              const Icon = node.icon
              return (
                <div
                  key={node.id}
                  className="space-y-2"
                >
                  <div
                    className={`rounded-xl border ${TONE_MAP[node.tone]} p-3.5 flex items-center gap-3`}
                  >
                    <div className="size-9 rounded-lg bg-lam-bg-1/60 border border-border/50 grid place-items-center shrink-0">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-lam-text leading-tight">
                        {node.label}
                      </div>
                      <div className="text-[11px] font-mono text-lam-text-muted truncate">
                        {node.sub}
                      </div>
                    </div>
                    <span className="ml-auto text-[10px] font-mono text-lam-text-muted/70">
                      0{i + 1}
                    </span>
                  </div>
                  {i < NODES.length - 1 && (
                    <div className="flex justify-center">
                      <div>
                        <ArrowDown className="size-4 text-lam-text-muted/60" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Divider with animated packet */}
          <div className="hidden lg:flex flex-col items-center justify-center px-2">
            <div className="relative h-full w-px bg-gradient-to-b from-transparent via-border to-transparent">
              <span
                className="absolute -left-1.5 size-3 rounded-full bg-lam-orange shadow-[0_0_18px_rgba(254,128,25,0.9)]"
              />
            </div>
            <p className="mt-3 text-[10px] font-mono text-lam-text-muted whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
              REQUEST FLOW
            </p>
          </div>

          {/* Right rail: validation outcome split */}
          <div className="flex flex-col gap-4 justify-center">
            <div
              className="rounded-2xl border-2 border-lam-red/30 bg-lam-red/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="size-5 text-lam-red" />
                <h4 className="font-bold text-lam-text text-sm">
                  مسار الفشل (Fail path)
                </h4>
              </div>
              <ol className="text-xs text-lam-text-soft space-y-1.5 list-decimal pr-5">
                <li>
                  محرّك التحقق يكتشف قاعدة منتهكة
                </li>
                <li>
                  ValidationException ترتفع تلقائياً
                </li>
                <li>
                  Laravel يحوّلها إلى استجابة 422 مع الأخطاء
                </li>
                <li>
                  الأخطاء تُحفظ في الجلسة وتمرّ إلى Inertia
                </li>
              </ol>
            </div>

            <div
              className="rounded-2xl border-2 border-lam-green/30 bg-lam-green/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="size-5 text-lam-green" />
                <h4 className="font-bold text-lam-text text-sm">
                  مسار النجاح (Success path)
                </h4>
              </div>
              <ol className="text-xs text-lam-text-soft space-y-1.5 list-decimal pr-5">
                <li>كل القواعد تجتاز الفحص</li>
                <li>Laravel يُعيد مصفوفة $validated نظيفة</li>
                <li>المنطق يكمل: حفظ، إشعار، توجيه</li>
                <li>
                  استجابة 200 + تحديث الواجهة
                </li>
              </ol>
            </div>

            <div
              className="rounded-xl border border-border/60 bg-lam-bg-2/60 p-3 flex items-center gap-3"
            >
              <div className="size-9 rounded-lg bg-lam-blue/15 border border-lam-blue/30 grid place-items-center">
                <Monitor className="size-4 text-lam-blue" />
              </div>
              <div className="text-xs text-lam-text-soft">
                <span className="font-bold text-lam-text">المتصفح</span> يستلم
                النتيجة ويعيد الرسم مباشرة
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
