import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "@inertiajs/react"
import { ArrowLeft, Compass, Trophy, X } from "lucide-react"
import { LamLogo } from "@/components/lam-logo"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { Button } from "@/components/ui/button"
import { LessonHeader } from "@/components/lesson/lesson-header"
import { MascotPanel } from "@/components/lesson/mascot-panel"
import { AstronautForm } from "@/components/lesson/astronaut-form"
import { CodeEditor } from "@/components/lesson/code-editor"
import { RequestRadar } from "@/components/lesson/request-radar"
import { ChallengeCard } from "@/components/lesson/challenge-card"
import { Confetti } from "@/components/lesson/confetti"

export type LessonStep =
  | "prepare"
  | "send"
  | "receive"
  | "validate"
  | "respond"
  | "render"

export const STEPS: { id: LessonStep; label: string }[] = [
  { id: "prepare", label: "تجهيز البيانات" },
  { id: "send", label: "إرسال الطلب" },
  { id: "receive", label: "استقبال السيرفر" },
  { id: "validate", label: "التحقق Validation" },
  { id: "respond", label: "إعادة الأخطاء" },
  { id: "render", label: "تحديث الواجهة" },
]

export interface FormState {
  name: string
  email: string
  age: string
}

export interface ValidationErrors {
  name?: string
  email?: string
  age?: string
}

export function LessonExperience() {
  const [activeStep, setActiveStep] = useState<LessonStep>("prepare")
  const [form, setForm] = useState<FormState>({
    name: "لومي العتيبي",
    email: "loomi@lam.dev",
    age: "19",
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [xp, setXp] = useState(120)
  const [challengeSolved, setChallengeSolved] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showNextLesson, setShowNextLesson] = useState(false)
  const [mascotMessage, setMascotMessage] = useState(
    "قبل إطلاق الرحلة يجب التأكد من صحة بيانات رائد الفضاء. اضغط إرسال لتجربة المحاكاة.",
  )
  const submitTimeouts = useRef<number[]>([])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      submitTimeouts.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const validate = (data: FormState): ValidationErrors => {
    const errs: ValidationErrors = {}
    if (!data.name.trim()) errs.name = "حقل الاسم مطلوب"
    else if (data.name.length > 60) errs.name = "الاسم طويل جداً"

    if (!data.email.trim()) errs.email = "البريد مطلوب"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "صيغة البريد غير صحيحة"

    const ageNum = Number(data.age)
    if (!data.age) errs.age = "العمر مطلوب"
    else if (Number.isNaN(ageNum) || !Number.isInteger(ageNum))
      errs.age = "العمر يجب أن يكون رقماً صحيحاً"
    else if (ageNum < 21) errs.age = "يجب ألا يقل العمر عن 21 سنة"

    return errs
  }

  const handleSubmit = () => {
    if (isSubmitting) return
    submitTimeouts.current.forEach((t) => window.clearTimeout(t))
    submitTimeouts.current = []

    setIsSubmitting(true)
    setErrors({})

    const seq: { step: LessonStep; delay: number; msg: string }[] = [
      { step: "prepare", delay: 0, msg: "نُجهّز البيانات داخل React…" },
      { step: "send", delay: 600, msg: "ينطلق الطلب نحو سيرفر Laravel" },
      { step: "receive", delay: 1300, msg: "السيرفر استقبل الطلب" },
      {
        step: "validate",
        delay: 2000,
        msg: "محرّك التحقق يفحص كل حقل بدقة",
      },
    ]

    seq.forEach(({ step, delay, msg }) => {
      const t = window.setTimeout(() => {
        setActiveStep(step)
        setMascotMessage(msg)
      }, delay)
      submitTimeouts.current.push(t)
    })

    const t = window.setTimeout(async () => {
      try {
        const res = await fetch('/validation-demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '' },
          body: JSON.stringify({ name: form.name, email: form.email, age: form.age }),
        })

        if (res.ok) {
          setErrors({})
          setActiveStep("render")
          setMascotMessage("ممتاز! البيانات صحيحة، الإطلاق ناجح")
          const t2 = window.setTimeout(() => {
            setActiveStep("render")
            setXp((v) => v + 30)
            setShowConfetti(true)
            window.setTimeout(() => setShowConfetti(false), 2200)
            setIsSubmitting(false)
          }, 700)
          submitTimeouts.current.push(t2)
        } else {
          const data = await res.json()
          const serverErrors: ValidationErrors = {}
          if (data.errors) {
            if (data.errors.name) serverErrors.name = data.errors.name[0]
            if (data.errors.email) serverErrors.email = data.errors.email[0]
            if (data.errors.age) serverErrors.age = data.errors.age[0]
          }
          setErrors(serverErrors)
          setActiveStep("respond")
          setMascotMessage("وصلت الأخطاء من السيرفر. صحّح البيانات وحاول مجدداً!")
          const t2 = window.setTimeout(() => {
            setActiveStep("respond")
            setIsSubmitting(false)
          }, 700)
          submitTimeouts.current.push(t2)
        }
      } catch {
        const found = validate(form)
        setErrors(found)
        const hasError = Object.keys(found).length > 0
        setActiveStep(hasError ? "respond" : "render")
        setMascotMessage(
          hasError
            ? "وصلت الأخطاء إلى الواجهة. صحّح البيانات وحاول مجدداً!"
            : "ممتاز! البيانات صحيحة، الإطلاق ناجح",
        )
        const t2 = window.setTimeout(() => {
          setActiveStep(hasError ? "respond" : "render")
          if (!hasError) {
            setXp((v) => v + 30)
            setShowConfetti(true)
            window.setTimeout(() => setShowConfetti(false), 2200)
          }
          setIsSubmitting(false)
        }, 700)
        submitTimeouts.current.push(t2)
      }
    }, 2700)
    submitTimeouts.current.push(t)
  }

  const handleChallengeSolved = () => {
    if (challengeSolved) return
    setChallengeSolved(true)
    setLessonComplete(true)
    setXp((v) => v + 80)
    setShowConfetti(true)
    setMascotMessage(
      "أحسنت! أضفت قاعدة min:21 وأنقذت المهمة. تم فتح الخطوة التالية!",
    )
    window.setTimeout(() => setShowConfetti(false), 2400)
    window.setTimeout(() => setShowNextLesson(true), 3000)
    fetch('/lessons/validation/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '' },
    })
  }

  const stepIndex = STEPS.findIndex((s) => s.id === activeStep)
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / STEPS.length) * 100),
    [stepIndex],
  )

  return (
    <div className="relative min-h-svh overflow-hidden">
      <AmbientBackdrop variant="intense" />

      {/* Top header (lesson-specific) */}
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
                  Laravel · Validation
                </span>
                <span className="size-1 rounded-full bg-lam-text-muted/50" />
                <span className="text-[10px] font-medium text-lam-orange">
                  المهمة الفضائية
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-lam-text truncate leading-tight">
                التحقق من بيانات رواد الفضاء قبل الإطلاق
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
                  الخطوة{" "}
                  <span className="text-lam-text font-bold">
                    {stepIndex + 1}
                  </span>{" "}
                  / {STEPS.length}
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

          {/* Progress bar */}
          <div className="mt-2 h-1 rounded-full bg-secondary/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-lam-gold via-lam-orange to-lam-gold-bright"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative mx-auto max-w-[1400px] px-3 sm:px-4 py-5 sm:py-7 space-y-5 sm:space-y-6">
        <LessonHeader
          activeStep={activeStep}
          onStepClick={(s) => {
            if (!isSubmitting) setActiveStep(s)
          }}
        />

        <div className="grid xl:grid-cols-12 gap-4 sm:gap-5">
          {/* Mascot column */}
          <div className="xl:col-span-3 order-1">
            <MascotPanel
              message={mascotMessage}
              isThinking={isSubmitting}
              activeStep={activeStep}
              hasErrors={Object.keys(errors).length > 0}
            />
          </div>

          {/* Form column */}
          <div className="xl:col-span-4 order-2">
            <AstronautForm
              form={form}
              setForm={(f) => {
                setForm(f)
                setErrors({})
                if (activeStep !== "prepare") setActiveStep("prepare")
              }}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              activeStep={activeStep}
            />
          </div>

          {/* Code editor column */}
          <div className="xl:col-span-5 order-3">
            <CodeEditor
              activeStep={activeStep}
              errors={errors}
              challengeSolved={challengeSolved}
            />
          </div>
        </div>

        {/* Request radar */}
        <RequestRadar
          activeStep={activeStep}
          form={form}
          errors={errors}
          isSubmitting={isSubmitting}
        />

        {/* Challenge */}
        <ChallengeCard
          solved={challengeSolved}
          onSolve={handleChallengeSolved}
        />

        {/* Bottom navigation */}
        <div className="flex items-center justify-between gap-3 pt-2">
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
          <div className="text-xs text-lam-text-muted hidden sm:block">
            تذكّر: <span className="text-lam-text-soft">التحقق</span> هو خط الدفاع
            الأول لأي تطبيق Laravel.
          </div>
        </div>

        {showNextLesson && (
          <NextLessonSection />
        )}
      </main>

      {showConfetti && <Confetti />}

      <NextLessonModal />
    </div>
  )
}

function NextLessonSection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="text-center pt-4 pb-8">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-lam-green/10 border border-lam-green/30 px-6 py-3 mb-4">
          <span className="text-sm font-bold text-lam-green">
            🎉 أكملت درس التحقق من البيانات!
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-8 py-3.5 text-base font-bold text-lam-bg-0 lam-glow-gold hover:scale-105 transition-transform"
        >
          الانتقال إلى مرحلة Routing
        </button>
      </div>
      <NextLessonModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

function NextLessonModal({ open: _open, onClose: _onClose }: { open?: boolean; onClose?: () => void } = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = _open ?? internalOpen
  const onClose = _onClose ?? (() => setInternalOpen(false))

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative lam-glass-strong rounded-3xl border border-border/60 max-w-md w-full p-8 text-center">
        <div className="size-16 rounded-2xl bg-lam-orange/15 border border-lam-orange/30 grid place-items-center mx-auto mb-5">
          <Compass className="size-7 text-lam-orange" />
        </div>
        <h3 className="font-display text-2xl font-black text-lam-text mb-3">
          قريباً
        </h3>
        <p className="text-sm text-lam-text-soft/70 leading-relaxed mb-6">
          مرحلة Routing غير متوفرة حالياً وسيتم إضافتها قريباً
        </p>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-orange to-lam-gold px-6 py-3 text-sm font-bold text-lam-bg-0"
        >
          حسناً
        </button>
      </div>
    </div>
  )
}
