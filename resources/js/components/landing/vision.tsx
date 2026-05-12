"use client"

import { Link } from "@inertiajs/react"
import { ArrowLeft, Heart, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 .5C5.73.5.7 5.53.7 11.8c0 4.99 3.24 9.22 7.74 10.72.57.1.78-.25.78-.55 0-.27-.01-.99-.02-1.94-3.15.68-3.81-1.52-3.81-1.52-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.51-.29-5.16-1.26-5.16-5.6 0-1.24.45-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16.91-.25 1.89-.38 2.86-.38s1.95.13 2.86.38c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.21.66.79.55 4.49-1.5 7.73-5.73 7.73-10.72C23.3 5.53 18.27.5 12 .5z" />
    </svg>
  )
}

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
              <Link href="/roadmap/laravel">شاهد المسارات</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base font-semibold rounded-xl border-lam-gold/40 bg-secondary/40 hover:bg-lam-gold/10 text-lam-gold hover:border-lam-gold/60"
            >
              <a
                href="https://github.com/eyadcsdev/lam-learning-platform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-4 ml-2" />
                ساهم على GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
