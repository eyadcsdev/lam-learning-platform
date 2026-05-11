"use client"

import { Bot, CheckCircle2, Code2, Radio, Server, Sparkles } from "lucide-react"

/**
 * Cinematic hero illustration:
 * - Floating code editor card
 * - Mascot assistant card
 * - Animated request line connecting to a "server" pulse
 * - Level progression nodes
 * - Mini radar
 * - Laravel glow badge
 */
export function HeroVisual() {
  return (
    <div className="relative h-[520px] sm:h-[560px] w-full">
      {/* Backdrop glow */}
      <div className="absolute inset-0 -z-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(250,189,47,0.16),transparent_60%)]" />

      {/* Soft grid frame */}
      <div className="absolute inset-6 rounded-[1.75rem] border border-border/60 lam-grid-bg [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Animated SVG connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 560"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fabd2f" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fe8019" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="line-grad-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#83a598" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b8bb26" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M 100 120 C 220 100, 300 240, 470 220"
          stroke="url(#line-grad)"
          strokeWidth="1.5"
          className="lam-anim-flow"
        />
        <path
          d="M 130 420 C 240 380, 360 460, 480 400"
          stroke="url(#line-grad-2)"
          strokeWidth="1.5"
          className="lam-anim-flow"
        />
        <path
          d="M 470 220 C 510 280, 480 360, 480 400"
          stroke="url(#line-grad)"
          strokeWidth="1.2"
          className="lam-anim-flow"
        />
      </svg>

      {/* Floating code editor card */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 w-[78%] max-w-md lam-glass-strong rounded-2xl overflow-hidden lam-glow-gold lam-anim-float">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 bg-lam-bg-2/60">
          <span className="size-2.5 rounded-full bg-lam-red/80" />
          <span className="size-2.5 rounded-full bg-lam-gold/80" />
          <span className="size-2.5 rounded-full bg-lam-green/80" />
          <div className="flex-1" />
          <span className="text-[10px] font-mono text-lam-text-muted tracking-wide">
            ValidationController.php
          </span>
        </div>
        <pre
          dir="ltr"
          className="font-mono text-[11.5px] leading-relaxed p-4 text-lam-text-soft/90 overflow-hidden"
        >
{`$validated = $request->validate([
  `}<span className="text-lam-blue">{`'name'`}</span>{`  => `}<span className="text-lam-green">{`'required|string|max:60'`}</span>{`,
  `}<span className="text-lam-blue">{`'email'`}</span>{` => `}<span className="text-lam-green">{`'required|email'`}</span>{`,
  `}<span className="text-lam-blue">{`'age'`}</span>{`   => `}<span className="text-lam-orange font-semibold bg-lam-orange/10 rounded px-1">{`'required|integer|min:21'`}</span>{`,
]);
 
`}<span className="text-lam-text-muted">{`// `}</span><span className="text-lam-text-muted">{`launch the mission`}</span>{`
`}<span className="text-lam-gold">{`return`}</span>{` Mission::launch($validated);`}<span className="lam-anim-blink text-lam-gold">▍</span>
        </pre>
      </div>

      {/* Mascot assistant */}
      <div className="absolute top-44 sm:top-48 left-4 sm:left-8 w-56 lam-glass rounded-2xl p-3.5 lam-anim-float-slow">
        <div className="flex items-start gap-2.5">
          <div className="shrink-0 size-10 rounded-xl bg-gradient-to-br from-lam-gold to-lam-orange grid place-items-center text-lam-bg-0 lam-anim-pulse-gold">
            <Bot className="size-5" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-lam-text-muted mb-0.5">المرشد لومي</div>
            <p className="text-xs text-lam-text-soft leading-relaxed">
              مرحباً! لنرسل بيانات رائد الفضاء إلى السيرفر
              <span className="lam-anim-blink">…</span>
            </p>
          </div>
        </div>
      </div>

      {/* Server / request pulse */}
      <div className="absolute top-[300px] right-12 w-44 lam-glass rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <Server className="size-4 text-lam-blue" />
          <span className="text-xs font-semibold text-lam-text-soft">Laravel Server</span>
          <span className="ml-auto size-2 rounded-full bg-lam-green lam-anim-pulse-gold" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-lam-gold to-lam-orange lam-shimmer-bg" />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-lam-text-muted">
            <span>POST /mission</span>
            <span className="text-lam-green">200 OK</span>
          </div>
        </div>
      </div>

      {/* Level progression nodes */}
      <div className="absolute bottom-20 right-8 flex items-center gap-3">
        {[
          { state: "done", label: "1" },
          { state: "current", label: "2" },
          { state: "locked", label: "3" },
          { state: "locked", label: "4" },
        ].map((node, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={
                "size-9 rounded-xl grid place-items-center text-xs font-bold border " +
                (node.state === "done"
                  ? "bg-lam-green/15 border-lam-green/40 text-lam-green lam-glow-green"
                  : node.state === "current"
                  ? "bg-lam-orange/15 border-lam-orange/50 text-lam-orange lam-anim-pulse-orange"
                  : "bg-secondary/60 border-border text-lam-text-muted")
              }
            >
              {node.state === "done" ? (
                <CheckCircle2 className="size-4" />
              ) : (
                node.label
              )}
            </div>
            {i < 3 && (
              <div className="w-6 h-px bg-gradient-to-l from-transparent via-border to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Laravel glow badge */}
      <div className="absolute bottom-32 left-6 lam-glass rounded-2xl px-4 py-2.5 flex items-center gap-2 lam-anim-float">
        <div className="size-7 rounded-lg bg-lam-red/15 grid place-items-center">
          <Code2 className="size-4 text-lam-red" />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] text-lam-text-muted">تقنية فعّالة</div>
          <div className="text-sm font-bold text-lam-text">Laravel 11</div>
        </div>
      </div>

      {/* Radar */}
      <div className="absolute bottom-6 left-8 size-24 rounded-full lam-glass grid place-items-center">
        <div className="relative size-20 rounded-full border border-lam-green/30 grid place-items-center">
          <div className="absolute inset-2 rounded-full border border-lam-green/20" />
          <div className="absolute inset-5 rounded-full border border-lam-green/10" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(184,187,38,0.45), transparent 30%)",
              animation: "spin 3.5s linear infinite",
            }}
          />
          <Radio className="size-5 text-lam-green relative z-10" />
        </div>
      </div>

      {/* Sparkle accent */}
      <div className="absolute top-[60%] right-[42%]">
        <Sparkles className="size-5 text-lam-gold lam-anim-blink" />
      </div>
    </div>
  )
}
