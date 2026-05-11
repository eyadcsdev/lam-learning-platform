"use client"

import { useEffect, useState } from "react"
import { Bot, Sparkles } from "lucide-react"
import type { LessonStep } from "@/components/lesson/lesson-experience"

interface MascotPanelProps {
  message: string
  isThinking: boolean
  activeStep: LessonStep
  hasErrors: boolean
}

const STORY_BEATS: { id: LessonStep; title: string; body: string }[] = [
  {
    id: "prepare",
    title: "تحضير المهمة",
    body: "نختار رائد فضاء ونملأ بياناته في النموذج.",
  },
  {
    id: "send",
    title: "الإطلاق",
    body: "نُرسل البيانات إلى Laravel عبر طلب POST.",
  },
  {
    id: "validate",
    title: "محرك الفحص",
    body: "Laravel يفحص كل قاعدة قبل قبول الدخول.",
  },
  {
    id: "render",
    title: "العودة سالمة",
    body: "إذا كانت البيانات سليمة، تنطلق المهمة!",
  },
]

export function MascotPanel({
  message,
  isThinking,
  activeStep,
  hasErrors,
}: MascotPanelProps) {
  const [typed, setTyped] = useState("")

  // Typing effect
  useEffect(() => {
    setTyped("")
    let i = 0
    const id = window.setInterval(() => {
      i++
      setTyped(message.slice(0, i))
      if (i >= message.length) window.clearInterval(id)
    }, 22)
    return () => window.clearInterval(id)
  }, [message])

  const mood = hasErrors ? "alert" : isThinking ? "focus" : "happy"

  return (
    <div
      className="lam-glass-strong rounded-2xl p-4 sm:p-5 h-full"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-lam-gold mb-4">
        <Sparkles className="size-4" />
        <span className="tracking-wider">المرشد</span>
      </div>

      {/* Robot avatar */}
      <div className="relative grid place-items-center py-3">
        <div className="absolute size-32 rounded-full bg-[radial-gradient(circle,rgba(250,189,47,0.25),transparent_70%)] blur-xl" />
        <div
          className="relative"
        >
          <RobotAvatar mood={mood} />
    </div>
      </div>

      <div className="mt-2">
        <div className="text-[11px] text-lam-text-muted mb-1">لومي</div>
        <div className="rounded-xl border border-border/60 bg-lam-bg-2/50 p-3 text-sm text-lam-text-soft leading-relaxed min-h-[64px]">
          {typed}
          <span className="lam-anim-blink text-lam-gold ml-0.5">▍</span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="text-[11px] font-semibold text-lam-text-muted tracking-wider uppercase">
          فصول القصة
        </div>
        {STORY_BEATS.map((beat, i) => {
          const beatIndex = ["prepare", "send", "validate", "render"].indexOf(beat.id)
          const activeIdx = ["prepare", "send", "receive", "validate", "respond", "render"].indexOf(activeStep)
          const mappedActive =
            activeIdx <= 0 ? 0 : activeIdx <= 2 ? 1 : activeIdx <= 4 ? 2 : 3

          const isActive = i === mappedActive
          const isDone = i < mappedActive

          return (
            <div
              key={beat.id}
              className={`rounded-xl border p-3 text-xs transition-colors ${
                isActive
                  ? "bg-lam-orange/10 border-lam-orange/30"
                  : isDone
                  ? "bg-lam-green/5 border-lam-green/20"
                  : "bg-lam-bg-2/30 border-border/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={`text-[10px] font-mono ${
                    isActive
                      ? "text-lam-orange"
                      : isDone
                      ? "text-lam-green"
                      : "text-lam-text-muted"
                  }`}
                >
                  فصل {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`size-1.5 rounded-full ${
                    isActive
                      ? "bg-lam-orange lam-anim-pulse-orange"
                      : isDone
                      ? "bg-lam-green"
                      : "bg-lam-text-muted/40"
                  }`}
                />
              </div>
              <div
                className={`font-semibold ${
                  isActive || isDone ? "text-lam-text" : "text-lam-text-muted"
                }`}
              >
                {beat.title}
              </div>
              <div className="text-lam-text-muted text-[11px] mt-0.5 leading-relaxed">
                {beat.body}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RobotAvatar({ mood }: { mood: "happy" | "focus" | "alert" }) {
  const eyeColor =
    mood === "alert" ? "#fb4934" : mood === "focus" ? "#83a598" : "#fabd2f"
  return (
    <svg width="118" height="128" viewBox="0 0 118 128" fill="none" aria-hidden>
      <defs>
        <linearGradient id="bot-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3c3836" />
          <stop offset="100%" stopColor="#1d2021" />
        </linearGradient>
        <linearGradient id="bot-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#32302f" />
          <stop offset="100%" stopColor="#1d2021" />
        </linearGradient>
      </defs>
      {/* antenna */}
      <line x1="59" y1="6" x2="59" y2="20" stroke="#a89984" strokeWidth="2" />
      <circle cx="59" cy="6" r="4" fill="#fabd2f" />
      {/* head */}
      <rect
        x="20"
        y="20"
        width="78"
        height="64"
        rx="20"
        fill="url(#bot-body)"
        stroke="#fabd2f"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      {/* face screen */}
      <rect x="28" y="32" width="62" height="40" rx="12" fill="url(#bot-screen)" />
      {/* eyes */}
      <Eye cx={44} cy={52} color={eyeColor} mood={mood} />
      <Eye cx={74} cy={52} color={eyeColor} mood={mood} />
      {/* mouth */}
      {mood === "alert" ? (
        <path
          d="M 48 64 Q 59 58 70 64"
          stroke="#fb4934"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      ) : mood === "focus" ? (
        <line
          x1="50"
          y1="64"
          x2="68"
          y2="64"
          stroke="#83a598"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M 48 62 Q 59 70 70 62"
          stroke="#fabd2f"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {/* body */}
      <rect
        x="28"
        y="86"
        width="62"
        height="36"
        rx="14"
        fill="url(#bot-body)"
        stroke="#fabd2f"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      {/* heart light */}
      <circle cx="59" cy="104" r="5" fill="#fabd2f">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
      {/* arms */}
      <rect x="10" y="92" width="10" height="20" rx="5" fill="#3c3836" />
      <rect x="98" y="92" width="10" height="20" rx="5" fill="#3c3836" />
    </svg>
  )
}

function Eye({
  cx,
  cy,
  color,
  mood,
}: {
  cx: number
  cy: number
  color: string
  mood: "happy" | "focus" | "alert"
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="6" fill={color}>
        <animate
          attributeName="r"
          values={mood === "focus" ? "6;5.5;6" : "6;0.5;6"}
          dur={mood === "focus" ? "2s" : "4.5s"}
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={cx + 1} cy={cy - 1.5} r="1.5" fill="#fbf1c7" opacity="0.9" />
    </g>
  )
}
