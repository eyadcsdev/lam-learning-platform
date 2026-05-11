import { useState } from "react"
import { Link, useForm } from "@inertiajs/react"
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('login'))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lam-text-soft">
          البريد الإلكتروني
        </Label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-lam-text-muted pointer-events-none" />
          <Input
            id="email"
            type="email"
            inputMode="email"
            dir="ltr"
            placeholder="you@lam.dev"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="h-11 pr-10 bg-lam-bg-1/60 border-border/60 text-right placeholder:text-right"
            required
          />
          {errors.email && <p className="mt-1 text-xs text-lam-orange">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-lam-text-soft">
            كلمة المرور
          </Label>
          <Link
            href="#"
            className="text-xs text-lam-gold-bright hover:underline"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-lam-text-muted pointer-events-none" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            dir="ltr"
            placeholder="••••••••"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="h-11 pr-10 pl-10 bg-lam-bg-1/60 border-border/60"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-lam-text-muted hover:text-lam-text transition-colors"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
          {errors.password && <p className="mt-1 text-xs text-lam-orange">{errors.password}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" checked={data.remember} onCheckedChange={(v) => setData('remember', Boolean(v))} />
        <Label htmlFor="remember" className="text-sm text-lam-text-muted cursor-pointer">
          تذكّرني على هذا الجهاز
        </Label>
      </div>

      <Button
        type="submit"
        disabled={processing}
        size="lg"
        className="w-full bg-gradient-to-l from-lam-gold via-lam-gold-bright to-lam-orange text-lam-bg-0 hover:opacity-95 font-bold h-12 lam-glow-gold"
      >
        {processing ? (
          <>
            <Loader2 className="size-4 ml-2 animate-spin" />
            جارٍ تسجيل الدخول...
          </>
        ) : (
          <>
            دخول إلى لام
            <ArrowLeft className="size-4 mr-2" />
          </>
        )}
      </Button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs text-lam-text-muted bg-lam-bg-1 rounded-full">
            أو تابع بـ
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialButton label="GitHub" provider="github" href="/auth/github/redirect" />
        <SocialButton label="Google" provider="google" href="/auth/google/redirect" />
      </div>
    </form>
  )
}

function SocialButton({
  label,
  provider,
  href,
}: {
  label: string
  provider: "github" | "google"
  href: string
}) {
  return (
    <button 
      onClick={() => window.location.href = href}
      type="button"
      className="flex items-center justify-center gap-2 h-11 rounded-lg lam-glass border border-border/60 text-sm text-lam-text-soft hover:border-lam-gold/40 transition-colors"
    >
      {provider === "github" ? <GithubMark /> : <GoogleMark />}
      <span>{label}</span>
    </button>
  )
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M12 .5C5.73.5.7 5.53.7 11.8c0 4.99 3.24 9.22 7.74 10.72.57.1.78-.25.78-.55 0-.27-.01-.99-.02-1.94-3.15.68-3.81-1.52-3.81-1.52-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.51-.29-5.16-1.26-5.16-5.6 0-1.24.45-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16.91-.25 1.89-.38 2.86-.38s1.95.13 2.86.38c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.21.66.79.55 4.49-1.5 7.73-5.73 7.73-10.72C23.3 5.53 18.27.5 12 .5z" />
    </svg>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-4">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.4 4 9.7 8.5 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 39.5 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.6l6.2 5.2C40.8 35.5 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}
