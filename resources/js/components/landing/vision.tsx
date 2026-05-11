"use client"

import { Link } from "@inertiajs/react"
import { ArrowLeft, Heart, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Vision() {
  return (
    <section id="community" className="relative py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(250,189,47,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-0 right-1/4 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(254,128,25,0.14),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-lam-orange mb-5">
            <Heart className="size-4" />
            <span className="tracking-wider">الرؤية</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-balance">
            <span className="lam-text-gradient-soft">لسنا منصة</span>{" "}
            <span className="lam-text-gradient">كورسات تقليدية</span>
          </h2>

          <div className="relative mt-8 max-w-3xl mx-auto">
            <Quote className="absolute -top-4 -right-2 size-8 text-lam-gold/40" />
            <p className="text-lg sm:text-xl text-lam-text-soft leading-loose text-pretty">
              مهمتنا أن نُحدث ثورة في التعليم التقني العربي. نحن نؤمن أن المعرفة لا
              تُحفظ بل تُختبر، وأن الكود لا يُقرأ بل يُلمس. لذلك بنينا لام: حيث تتحوّل
              الفصول إلى مغامرات، والتوثيق إلى محاكاة، والامتحانات إلى تحديات
              تستحق الفوز.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { num: "100%", label: "محتوى عربي أصيل" },
              { num: "+250", label: "تحدي تفاعلي" },
              { num: "24/7", label: "مجتمع نشط" },
            ].map((s) => (
              <div
                key={s.label}
                className="lam-glass rounded-2xl p-5 text-center"
              >
                <div className="font-display text-3xl font-black lam-text-gradient">
                  {s.num}
                </div>
                <div className="text-sm text-lam-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 lam-glow-gold rounded-xl"
            >
              <Link href="/register">
                انضم إلى لام
                <ArrowLeft className="size-4 mr-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base font-semibold rounded-xl border-border bg-secondary/40 hover:bg-secondary text-lam-text-soft"
            >
              <Link href="/roadmap">شاهد المسارات</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
