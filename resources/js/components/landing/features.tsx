"use client"

import {
  BookOpenCheck,
  Globe,
  Layers,
  Map,
  PlaySquare,
  Server,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Feature {
  title: string
  desc: string
  icon: LucideIcon
  tone: "gold" | "orange" | "blue" | "green"
}

const features: Feature[] = [
  {
    title: "شرح تفاعلي حي",
    desc: "اقرأ. شغّل. عدّل. كل فكرة تتحوّل إلى تجربة قابلة للتفاعل لحظياً.",
    icon: PlaySquare,
    tone: "gold",
  },
  {
    title: "محاكاة الطلبات والسيرفر",
    desc: "تابع رحلة الطلب من المتصفح إلى Laravel وحتى الردّ بصرياً.",
    icon: Server,
    tone: "orange",
  },
  {
    title: "تعلّم عبر المراحل",
    desc: "تقدّم على شكل خريطة مغامرات. كل مستوى يفتح الذي يليه.",
    icon: Map,
    tone: "blue",
  },
  {
    title: "تحديات واختبارات",
    desc: "اختبر فهمك بتحديات قصيرة، مع تلميحات ذكية ونتائج فورية.",
    icon: Trophy,
    tone: "gold",
  },
  {
    title: "شخصيات مرشدة",
    desc: "لومي والمرشدون يرافقونك بأسلوب قصصي محبب يجعل التعلم متعة.",
    icon: Sparkles,
    tone: "orange",
  },
  {
    title: "خريطة تقدم تفاعلية",
    desc: "تابع نقاط XP والإنجازات والشارات في خريطة مرئية واحدة.",
    icon: Layers,
    tone: "green",
  },
  {
    title: "شرح داخلي للتقنيات",
    desc: "كل تقنية تُشرح من الجذور: لماذا، وكيف، ومتى تستخدمها.",
    icon: BookOpenCheck,
    tone: "blue",
  },
  {
    title: "تعلّم بالمشاريع",
    desc: "ابنِ مشاريع حقيقية أثناء التعلّم لا بعده. كود يعمل من اليوم الأول.",
    icon: Globe,
    tone: "green",
  },
]

const toneMap: Record<Feature["tone"], { bg: string; text: string; ring: string }> = {
  gold: {
    bg: "bg-lam-gold/10",
    text: "text-lam-gold",
    ring: "group-hover:shadow-[0_0_40px_-8px_rgba(250,189,47,0.5)]",
  },
  orange: {
    bg: "bg-lam-orange/10",
    text: "text-lam-orange",
    ring: "group-hover:shadow-[0_0_40px_-8px_rgba(254,128,25,0.5)]",
  },
  blue: {
    bg: "bg-lam-blue/10",
    text: "text-lam-blue",
    ring: "group-hover:shadow-[0_0_40px_-8px_rgba(131,165,152,0.45)]",
  },
  green: {
    bg: "bg-lam-green/10",
    text: "text-lam-green",
    ring: "group-hover:shadow-[0_0_40px_-8px_rgba(184,187,38,0.45)]",
  },
}

export function Features() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-medium text-lam-gold mb-4">
            <Users className="size-4" />
            <span className="tracking-wider">المميزات</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-balance">
            <span className="lam-text-gradient-soft">كل ما تحتاجه</span>{" "}
            <span className="lam-text-gradient">لتتقن البرمجة</span>
          </h2>
          <p className="mt-4 text-lam-text-muted text-base sm:text-lg leading-relaxed text-pretty">
            أدوات وتجارب مصممة لتُحوّل الدروس النظرية إلى مهارات قابلة للتطبيق فعلاً.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            const t = toneMap[f.tone]
            return (
              <div
                key={f.title}
                className={`group relative lam-glass rounded-2xl p-5 lam-border-glow transition-all duration-500 hover:-translate-y-1 ${t.ring}`}
              >
                <div
                  className={`size-11 rounded-xl ${t.bg} grid place-items-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`size-5 ${t.text}`} />
                </div>
                <h3 className="font-display text-base font-bold text-lam-text mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-lam-text-muted leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
