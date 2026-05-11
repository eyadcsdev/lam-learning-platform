import { usePage, Link } from "@inertiajs/react"
import { ArrowLeft, Lock, Compass } from "lucide-react"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { LamLogo } from "@/components/lam-logo"
import { LessonExperience } from "@/components/lesson/lesson-experience"

export default function Validation() {
  const { auth } = usePage().props
  const unlocked = auth?.user?.unlocked_lessons ?? []
  const isUnlocked = unlocked.includes("validation")

  if (!isUnlocked) {
    return (
      <div className="relative min-h-svh overflow-hidden grid place-items-center">
        <AmbientBackdrop variant="intense" />
        <div className="relative z-10 max-w-md mx-auto px-4 text-center">
          <div className="size-20 rounded-3xl bg-lam-bg-2/80 border border-border/60 grid place-items-center mx-auto mb-6">
            <Lock className="size-8 text-lam-text-muted" />
          </div>
          <h1 className="font-display text-3xl font-black text-lam-text mb-3">
            الدرس مقفل
          </h1>
          <p className="text-lam-text-soft/70 leading-relaxed mb-8">
            يجب إكمال المرحلة السابقة أولاً
          </p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-green to-lam-blue px-6 py-3 text-sm font-bold text-lam-bg-0"
          >
            <ArrowLeft className="size-4" />
            العودة إلى المسار
          </Link>
        </div>
      </div>
    )
  }

  return <LessonExperience />
}
