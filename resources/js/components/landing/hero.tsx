import { Link } from "@inertiajs/react"
import { ArrowLeft, PlayCircle, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroVisual } from "@/components/landing/hero-visual"

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right side (textual) — first in RTL DOM order */}
          <div className="lg:col-span-6 order-1 lg:order-1">
            <div>
              <Badge
                variant="outline"
                className="rounded-full border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium gap-1.5"
              >
                <Sparkles className="size-3" />
                الجيل القادم لتعلّم البرمجة بالعربية
              </Badge>
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-balance">
              <span className="lam-text-gradient-soft">تعلّم البرمجة</span>
              <br />
              <span className="lam-text-gradient">بطريقة تفاعلية وممتعة</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-lam-text-muted leading-relaxed max-w-xl text-pretty">
              لام تحوّل التوثيق التقني الجاف إلى مغامرات تفاعلية ومحاكاة حية. تعلّم
              من خلال القصص والشخصيات والمحاكيات، وراقب طلباتك تنطلق إلى السيرفر،
              وفهم كل سطر برمجي بعمق وحماس.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 lam-glow-gold rounded-xl"
              >
                <Link href="/roadmap">
                  ابدأ الآن
                  <ArrowLeft className="size-4 mr-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base font-semibold rounded-xl border-border bg-secondary/40 hover:bg-secondary text-lam-text-soft hover:text-lam-text"
              >
                <Link href="/lessons/validation">
                  <PlayCircle className="size-4 ml-2" />
                  شاهد التجربة
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-lam-text-muted">
              {[
                "محاكاة حية للسيرفر",
                "تعلّم بالقصة والمشاريع",
                "مسارات مبنية على XP",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-lam-green" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Left side (visual) */}
          <div className="lg:col-span-6 order-2 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
