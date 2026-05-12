import { Link } from "@inertiajs/react"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { LamLogo } from "@/components/lam-logo"
import { ArrowLeft, Construction, Code2 } from "lucide-react"

export default function ComingSoon({ technology, roadmaps }) {
  const roadmap = roadmaps?.find((r) => r.slug === technology)
  const title = roadmap?.title || technology

  return (
    <div className="relative min-h-svh overflow-hidden grid place-items-center">
      <AmbientBackdrop variant="intense" />
      <div className="relative z-10 max-w-lg mx-auto px-4 text-center">
        <div className="size-20 rounded-3xl bg-lam-bg-2/80 border border-border/60 grid place-items-center mx-auto mb-6">
          <Construction className="size-8 text-lam-gold" />
        </div>
        <h1 className="font-display text-3xl font-black text-lam-text mb-3">
          مسار {title}
        </h1>
        <p className="text-lam-text-soft/70 leading-relaxed mb-2">
          هذا المسار قيد الإعداد حالياً.
        </p>
        <p className="text-sm text-lam-text-muted leading-relaxed mb-8">
          فريق لام يعمل على إعداد محتوى تفاعلي ممتع لـ {title}. تابعنا لتصلك أول الإشعارات عند الإطلاق.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-lam-bg-2/80 border border-border/60 px-6 py-3 text-sm font-bold text-lam-text-soft hover:text-lam-text transition-colors"
          >
            <ArrowLeft className="size-4" />
            العودة للرئيسية
          </Link>
          <Link
            href="/roadmap/laravel"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-6 py-3 text-sm font-bold text-lam-bg-0"
          >
            <Code2 className="size-4" />
            ابدأ مع Laravel
          </Link>
        </div>
      </div>
    </div>
  )
}
