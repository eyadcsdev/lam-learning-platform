import { useEffect, useMemo, useState } from "react"
import { Link } from "@inertiajs/react"

import { ArrowLeft, Trophy, X } from "lucide-react"
import { LamLogo } from "@/components/lam-logo"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { Button } from "@/components/ui/button"
import { MascotPanel } from "@/components/lesson/mascot-panel"
import { Confetti } from "@/components/lesson/confetti"
import { CinematicIntro } from "@/components/lesson/setup/cinematic-intro"
import { TerminalSimulator } from "@/components/lesson/setup/terminal-simulator"
import { ProjectExplorer } from "@/components/lesson/setup/project-explorer"
import { RequestLifecycleViz } from "@/components/lesson/setup/request-lifecycle-viz"
import { ArtisanSection } from "@/components/lesson/setup/artisan-section"
import { MiniMissions } from "@/components/lesson/setup/mini-missions"
import { MiniDemo } from "@/components/lesson/setup/mini-demo"
import { FinalChallenge } from "@/components/lesson/setup/final-challenge"

export type SetupStep =
  | "intro"
  | "comparison"
  | "terminal"
  | "structure"
  | "lifecycle"
  | "artisan"
  | "missions"
  | "demo"
  | "challenge"

export const SETUP_STEPS: { id: SetupStep; label: string }[] = [
  { id: "intro", label: "المقدمة السينمائية" },
  { id: "comparison", label: "لماذا Laravel" },
  { id: "terminal", label: "محاكاة الطرفية" },
  { id: "structure", label: "مستكشف المشروع" },
  { id: "lifecycle", label: "دورة حياة الطلب" },
  { id: "artisan", label: "أدوات Artisan" },
  { id: "missions", label: "مهام صغيرة" },
  { id: "demo", label: "تجربة تفاعلية" },
  { id: "challenge", label: "التحدي النهائي" },
]

export function SetupExperience() {
  const [activeStep, setActiveStep] = useState<SetupStep>("intro")
  const [xp, setXp] = useState(0)
  const [challengeSolved, setChallengeSolved] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mascotMessage, setMascotMessage] = useState(
    "أهلاً بك في عالم Laravel! أنا لومي، مرشدك في هذه الرحلة. استعد لتعلم أساسيات أقوى إطار عمل PHP.",
  )

  const stepIndex = SETUP_STEPS.findIndex((s) => s.id === activeStep)
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / SETUP_STEPS.length) * 100),
    [stepIndex],
  )

  const handleXpGain = (amount: number) => {
    setXp((v) => v + amount)
  }

  const handleChallengeSolved = () => {
    if (challengeSolved) return
    setChallengeSolved(true)
    handleXpGain(100)
    setShowConfetti(true)
    setMascotMessage(
      "أحسنت! 🎉 أنت الآن جاهز للانتقال إلى درس التحقق من البيانات. لقد أتقنت أساسيات Laravel!",
    )
    window.setTimeout(() => setShowConfetti(false), 2400)
    fetch('/lessons/setup/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '' },
    })
  }

  const sections: SetupStep[] = [
    "intro", "comparison", "terminal", "structure",
    "lifecycle", "artisan", "missions", "demo", "challenge",
  ]

  const goNext = () => {
    const idx = sections.indexOf(activeStep)
    if (idx < sections.length - 1) setActiveStep(sections[idx + 1])
  }

  const goPrev = () => {
    const idx = sections.indexOf(activeStep)
    if (idx > 0) setActiveStep(sections[idx - 1])
  }

  return (
    <div className="relative min-h-svh overflow-hidden">
      <AmbientBackdrop variant="intense" />

      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-4 pt-3 sm:pt-4">
          <div className="lam-glass-strong rounded-2xl px-3 sm:px-4 py-2.5 flex items-center gap-3 border border-border/60">
            <Link href="/roadmap" className="shrink-0">
              <LamLogo size={28} showWordmark={false} />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-border" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-lam-text-muted uppercase tracking-wider">
                  Laravel · الأساسيات
                </span>
                <span className="size-1 rounded-full bg-lam-text-muted/50" />
                <span className="text-[10px] font-medium text-lam-green">
                  المستوى 00
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-lam-text truncate leading-tight">
                البداية — إعداد البيئة وأساسيات Laravel
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <div className="lam-glass rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                <Trophy className="size-3.5 text-lam-gold" />
                <span className="text-xs font-bold text-lam-gold">
                  {xp.toLocaleString("ar-EG")} XP
                </span>
              </div>
              <div className="lam-glass rounded-lg px-2.5 py-1.5">
                <span className="text-[11px] font-mono text-lam-text-muted">
                  القسم{" "}
                  <span className="text-lam-text font-bold">
                    {stepIndex + 1}
                  </span>{" "}
                  / {SETUP_STEPS.length}
                </span>
              </div>
            </div>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="shrink-0 text-lam-text-muted hover:text-lam-text"
              aria-label="خروج"
            >
              <Link href="/roadmap">
                <X className="size-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-2 h-1 rounded-full bg-secondary/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-lam-green via-lam-blue to-lam-gold-bright"
            />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1400px] px-3 sm:px-4 py-5 sm:py-7 space-y-5 sm:space-y-6">
        {activeStep === "intro" && (
          <CinematicIntro
            onNext={() => setActiveStep("comparison")}
            onMessageChange={setMascotMessage}
          />
        )}

        {activeStep === "comparison" && (
          <div className="grid xl:grid-cols-12 gap-4 sm:gap-5">
            <div className="xl:col-span-3 order-1">
              <MascotPanel
                message={mascotMessage}
                isThinking={false}
                activeStep="prepare"
                hasErrors={false}
              />
            </div>
            <div className="xl:col-span-9 order-2">
              <ComparisonSection
                onNext={goNext}
                onMessageChange={setMascotMessage}
                onXpGain={handleXpGain}
              />
            </div>
          </div>
        )}

        {activeStep === "terminal" && (
          <div className="grid xl:grid-cols-12 gap-4 sm:gap-5">
            <div className="xl:col-span-3 order-1">
              <MascotPanel
                message={mascotMessage}
                isThinking={false}
                activeStep="prepare"
                hasErrors={false}
              />
            </div>
            <div className="xl:col-span-9 order-2">
              <TerminalSimulator
                onNext={goNext}
                onMessageChange={setMascotMessage}
                onXpGain={handleXpGain}
              />
            </div>
          </div>
        )}

        {activeStep === "structure" && (
          <div className="grid xl:grid-cols-12 gap-4 sm:gap-5">
            <div className="xl:col-span-3 order-1">
              <MascotPanel
                message={mascotMessage}
                isThinking={false}
                activeStep="prepare"
                hasErrors={false}
              />
            </div>
            <div className="xl:col-span-9 order-2">
              <ProjectExplorer
                onNext={goNext}
                onMessageChange={setMascotMessage}
                onXpGain={handleXpGain}
              />
            </div>
          </div>
        )}

        {activeStep === "lifecycle" && (
          <RequestLifecycleViz
            onNext={goNext}
            onMessageChange={setMascotMessage}
            onXpGain={handleXpGain}
          />
        )}

        {activeStep === "artisan" && (
          <ArtisanSection
            onNext={goNext}
            onMessageChange={setMascotMessage}
            onXpGain={handleXpGain}
          />
        )}

        {activeStep === "missions" && (
          <MiniMissions
            onNext={goNext}
            onMessageChange={setMascotMessage}
            onXpGain={handleXpGain}
          />
        )}

        {activeStep === "demo" && (
          <MiniDemo
            onNext={() => setActiveStep("challenge")}
            onMessageChange={setMascotMessage}
            onXpGain={handleXpGain}
          />
        )}

        {activeStep === "challenge" && (
          <FinalChallenge
            solved={challengeSolved}
            onSolve={handleChallengeSolved}
            onMessageChange={setMascotMessage}
          />
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            {activeStep !== "intro" && (
              <Button
                variant="ghost"
                onClick={goPrev}
                className="text-lam-text-muted hover:text-lam-text"
              >
                <ArrowLeft className="size-4 ml-2 rotate-180" />
                السابق
              </Button>
            )}
          </div>
          <div className="text-xs text-lam-text-muted hidden sm:block">
            <span className="text-lam-text-soft">{SETUP_STEPS[stepIndex].label}</span>
            {" — "}خطوة {stepIndex + 1} من {SETUP_STEPS.length}
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-lam-text-muted hover:text-lam-text"
          >
            <Link href="/roadmap">
              <ArrowLeft className="size-4 ml-2 rotate-180" />
              العودة للمسار
            </Link>
          </Button>
        </div>
      </main>

      {showConfetti && <Confetti />}
    </div>
  )
}

import { CheckCircle2, Code, FileCode, Layers, Server, Shield } from "lucide-react"

function ComparisonSection({
  onNext,
  onMessageChange,
  onXpGain,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
  onXpGain: (amount: number) => void
}) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    onMessageChange("قبل Laravel، كان مطورو PHP يعيشون في فوضى حقيقية. كل مشروع له هيكله الخاص، ولا توجد معايير موحدة. دعني أريك الفرق.")
  }, [])

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[480px] rounded-full bg-lam-blue/15 blur-[120px]" />
        </div>

        <div className="relative p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-5">
            <span className="size-1.5 rounded-full bg-lam-blue lam-anim-pulse-gold" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted">
              لماذا Laravel؟
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black leading-[1.15] mb-6">
            <span className="text-lam-text">قبل وبعد</span>{" "}
            <span className="bg-gradient-to-l from-lam-gold-bright via-lam-blue to-lam-gold bg-clip-text text-transparent">
              الأطر البرمجية
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl border border-lam-red/30 bg-lam-red/5 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="size-10 rounded-xl bg-lam-red/15 border border-lam-red/30 grid place-items-center">
                  <Code className="size-5 text-lam-red" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-lam-red">PHP بدون إطار</h3>
                  <p className="text-[10px] text-lam-text-muted">فوضى عارمة</p>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  "ملفات PHP متشابكة ومبعثرة",
                  "تكرار نفس الكود في كل صفحة",
                  "توجيه يدوي مع if/else",
                  "لا هيكلة موحدة للمشروع",
                  "معالجة الطلبات يدوياً",
                  "صعوبة الصيانة والتطوير",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-lam-text-soft">
                    <span className="size-1.5 rounded-full bg-lam-red/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl border border-lam-green/30 bg-lam-green/5 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="size-10 rounded-xl bg-lam-green/15 border border-lam-green/30 grid place-items-center">
                  <Layers className="size-5 text-lam-green" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-lam-green">مع Laravel</h3>
                  <p className="text-[10px] text-lam-text-muted">هندسة منظمة</p>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  "هيكل MVC نظيف وموحد",
                  "توجيه أنيق مع Router",
                  "مكونات قابلة لإعادة الاستخدام",
                  "مجلدات منظمة حسب الوظيفة",
                  "معالجة الطلبات عبر Kernel",
                  "صيانة وتطوير سلسين",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-lam-text-soft">
                    <span className="size-1.5 rounded-full bg-lam-green/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-6 flex items-start gap-3 rounded-2xl border-r-4 border-lam-green bg-lam-green/5 p-4"
          >
            <Shield className="size-5 text-lam-green shrink-0 mt-0.5" />
            <p className="text-sm text-lam-text-soft leading-relaxed">
              <span className="font-bold text-lam-text">Laravel</span> يوفّر لك هيكلاً معمارياً متكاملاً،
              أدوات جاهزة مثل Artisan و Eloquent، ومجتمعاً ضخماً. ليس عليك إعادة اختراع العجلة.
            </p>
          </div>

          <button
            onClick={() => {
              if (!revealed) {
                setRevealed(true)
                onXpGain(15)
              }
              onMessageChange("رائع! الآن فهمت لماذا نحتاج Laravel. دعنا ننتقل إلى تهيئة البيئة.")
              setTimeout(onNext, 800)
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-blue to-lam-gold px-6 py-3 text-sm font-bold text-lam-bg-0 lam-glow-gold"
          >
            فهمت! لننتقل للتهيئة
            <CheckCircle2 className="size-4" />
          </button>
        </div>
      </section>
    </div>
  )
}
