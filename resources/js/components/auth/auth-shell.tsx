import { Link } from "@inertiajs/react"
import { LamLogo } from "@/components/lam-logo"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { Sparkles, Rocket, Code2, Trophy, GraduationCap } from "lucide-react"

interface AuthShellProps {
  title: string
  subtitle: string
  variant: "login" | "register"
  children: React.ReactNode
}

export function AuthShell({ title, subtitle, variant, children }: AuthShellProps) {
  const stats = [
    { icon: Rocket, label: "+12 مسار تقني", color: "text-lam-orange" },
    { icon: Code2, label: "محرر تفاعلي حقيقي", color: "text-lam-gold-bright" },
    { icon: Trophy, label: "نظام XP وشارات", color: "text-lam-gold" },
    { icon: GraduationCap, label: "شهادات معتمدة", color: "text-lam-blue" },
  ]

  return (
    <div className="relative min-h-svh flex flex-col">
      <AmbientBackdrop />

      {/* Top bar */}
      <header className="relative z-10 px-4 sm:px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <LamLogo size={36} />
          </Link>
          <Link
            href={variant === "login" ? "/register" : "/login"}
            className="text-sm text-lam-text-muted hover:text-lam-text transition-colors"
          >
            {variant === "login" ? "ليس لديك حساب؟ " : "لديك حساب؟ "}
            <span className="text-lam-gold-bright font-medium">
              {variant === "login" ? "أنشئ حساب" : "سجّل دخول"}
            </span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 grid lg:grid-cols-2 gap-8 px-4 sm:px-6 py-6 sm:py-10 mx-auto max-w-7xl w-full">
        {/* Left: Visual / pitch */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="lam-glass-strong rounded-3xl p-8 border border-border/50 relative overflow-hidden">
            <div className="absolute -top-20 -left-20 size-64 rounded-full bg-lam-gold/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-lam-orange/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-6">
                <Sparkles className="size-3.5 text-lam-gold-bright" />
                <span className="text-xs font-medium text-lam-text-soft">
                  منصّة لام · رحلة المطوّر العربي
                </span>
              </div>

              <h2 className="text-3xl xl:text-4xl font-display font-extrabold text-lam-text leading-tight mb-4">
                ابدأ رحلتك من{" "}
                <span className="lam-text-gradient">سطر كود</span> إلى{" "}
                <span className="lam-text-gradient">منتج كامل</span>
              </h2>
              <p className="text-lam-text-muted leading-relaxed mb-8">
                دروس تفاعلية بالعربية، تحديات حقيقية، ومشاريع نهائية تتدرّج من
                HTML إلى Laravel و React وما بعد. كل خطوة موثّقة، كل خطأ قابل
                للإصلاح.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="lam-glass rounded-xl p-3 flex items-center gap-2.5"
                  >
                    <s.icon className={`size-4 ${s.color}`} />
                    <span className="text-xs font-medium text-lam-text-soft">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Code snippet */}
              <div className="mt-8 rounded-xl bg-lam-bg-0/80 border border-border/40 overflow-hidden font-mono text-[12px]">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/40 bg-lam-bg-1">
                  <span className="size-2.5 rounded-full bg-lam-red/70" />
                  <span className="size-2.5 rounded-full bg-lam-gold/70" />
                  <span className="size-2.5 rounded-full bg-lam-green/70" />
                  <span className="ml-auto text-[10px] text-lam-text-muted">
                    welcome.php
                  </span>
                </div>
                <pre className="p-3 leading-6" dir="ltr">
                  <span className="text-lam-text-muted">{"// Welcome aboard"}</span>
                  {"\n"}
                  <span className="text-lam-orange">Route</span>
                  <span className="text-lam-text-muted">::</span>
                  <span className="text-lam-gold-bright">get</span>
                  {"("}
                  <span className="text-lam-green">{"'/"}</span>
                  {", "}
                  <span className="text-lam-orange">fn</span>
                  {"() => "}
                  <span className="text-lam-green">{"'لومي يرحّب بك'"}</span>
                  {");"}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form card */}
        <div className="flex items-center">
          <div className="w-full lam-glass-strong rounded-3xl p-6 sm:p-8 border border-border/60">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-lam-text mb-2">
                {title}
              </h1>
              <p className="text-sm text-lam-text-muted leading-relaxed">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
