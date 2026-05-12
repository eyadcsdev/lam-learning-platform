"use client"

import { Link } from "@inertiajs/react"
import { ArrowLeft, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RoadmapCta({ technology = 'laravel', firstLesson = 'setup' }: { technology?: string; firstLesson?: string }) {
  return (
    <div className="mt-12 lam-glass-strong rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 lam-glow-gold">
      <div className="flex items-center gap-4">
        <div className="size-14 rounded-2xl bg-gradient-to-br from-lam-gold to-lam-orange grid place-items-center text-lam-bg-0 lam-anim-pulse-gold">
          <Rocket className="size-6" />
        </div>
        <div>
          <div className="text-xs text-lam-text-muted mb-1">جاهز للإطلاق</div>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-lam-text leading-tight">
            ابدأ المستوى الأول الآن
          </h3>
        </div>
      </div>
      <Button
        asChild
        size="lg"
        className="h-12 px-7 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
      >
        <Link href={`/roadmap/${technology}/lessons/${firstLesson}`}>
          ابدأ رحلة {technology === 'laravel' ? 'Laravel' : technology === 'react' ? 'React' : technology === 'nextjs' ? 'Next.js' : technology}
          <ArrowLeft className="size-4 mr-2" />
        </Link>
      </Button>
    </div>
  )
}
