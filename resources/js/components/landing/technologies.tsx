"use client"

import { Link } from "@inertiajs/react"
import { Box, Code2, Container, FileCode2, Layers3, Server, ArrowLeft } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Tech {
  name: string
  arabicTagline: string
  icon: LucideIcon
  status: "available" | "soon"
  href?: string
  accent: string
}

const techs: Tech[] = [
  {
    name: "Laravel",
    arabicTagline: "إطار عمل PHP الأقوى للويب",
    icon: Code2,
    status: "available",
    href: "/roadmap",
    accent: "from-lam-red/30 via-lam-orange/20 to-transparent",
  },
  {
    name: "React",
    arabicTagline: "بناء واجهات حديثة وتفاعلية",
    icon: Layers3,
    status: "soon",
    accent: "from-lam-blue/30 via-lam-blue/10 to-transparent",
  },
  {
    name: "Node.js",
    arabicTagline: "تشغيل JavaScript على السيرفر",
    icon: Server,
    status: "soon",
    accent: "from-lam-green/30 via-lam-green/10 to-transparent",
  },
  {
    name: "Next.js",
    arabicTagline: "إطار React للأبطال",
    icon: FileCode2,
    status: "soon",
    accent: "from-lam-text-muted/30 via-lam-text-muted/5 to-transparent",
  },
  {
    name: "TypeScript",
    arabicTagline: "JavaScript بأنواع آمنة",
    icon: Box,
    status: "soon",
    accent: "from-lam-blue/30 via-lam-blue/10 to-transparent",
  },
  {
    name: "Docker",
    arabicTagline: "حاويات لكل بيئة تشغيل",
    icon: Container,
    status: "soon",
    accent: "from-lam-blue/30 via-lam-blue/10 to-transparent",
  },
]

export function Technologies() {
  return (
    <section id="technologies" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-lam-orange mb-4">
              <Code2 className="size-4" />
              <span className="tracking-wider">التقنيات المتاحة</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-balance">
              <span className="lam-text-gradient">مسارات</span>{" "}
              <span className="lam-text-gradient-soft">تقنية متجددة</span>
            </h2>
            <p className="mt-4 text-lam-text-muted text-base sm:text-lg leading-relaxed text-pretty">
              نبدأ من Laravel، ونمضي مع المجتمع لبناء أعمق المسارات بالعربية.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techs.map((tech, i) => {
            const Icon = tech.icon
            const isAvailable = tech.status === "available"
            const Card = (
              <div
                className={`group relative overflow-hidden rounded-2xl border lam-glass p-6 transition-all duration-500 ${
                  isAvailable
                    ? "border-primary/30 hover:-translate-y-1 lam-glow-gold cursor-pointer"
                    : "border-border/60 opacity-90"
                }`}
              >
                {/* gradient accent */}
                <div
                  className={`pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-gradient-to-bl ${tech.accent} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
                />

                <div className="relative flex items-start justify-between gap-3 mb-6">
                  <div
                    className={`size-12 rounded-xl grid place-items-center border ${
                      isAvailable
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-secondary/60 border-border text-lam-text-muted"
                    }`}
                  >
                    <Icon className="size-6" />
                  </div>
                  {isAvailable ? (
                    <Badge className="bg-lam-green/15 text-lam-green border border-lam-green/30 hover:bg-lam-green/20 font-semibold gap-1.5">
                      <span className="size-1.5 rounded-full bg-lam-green lam-anim-pulse-gold" />
                      متوفر الآن
                    </Badge>
                  ) : (
                    <Badge className="bg-secondary text-lam-text-muted border border-border font-semibold">
                      قريباً
                    </Badge>
                  )}
                </div>

                <h3 className="relative font-display text-2xl font-extrabold text-lam-text mb-1">
                  {tech.name}
                </h3>
                <p className="relative text-sm text-lam-text-muted leading-relaxed">
                  {tech.arabicTagline}
                </p>

                {isAvailable && (
                  <div className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    استكشف المسار
                    <ArrowLeft className="size-4" />
                  </div>
                )}
              </div>
            )

            return tech.href ? (
              <Link key={tech.name} href={tech.href}>
                {Card}
              </Link>
            ) : (
              <div key={tech.name}>{Card}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
