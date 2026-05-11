import { useMemo, useState } from "react"
import { Link, useForm } from "@inertiajs/react"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    agree: false,
  })

  const strength = useMemo(() => {
    let score = 0
    if (data.password.length >= 8) score++
    if (/[A-Z]/.test(data.password)) score++
    if (/[0-9]/.test(data.password)) score++
    if (/[^A-Za-z0-9]/.test(data.password)) score++
    return score
  }, [data.password])

  const strengthLabel = ["ضعيف جداً", "ضعيف", "متوسط", "جيد", "قوي"][strength]
  const strengthColor = [
    "bg-lam-red",
    "bg-lam-orange",
    "bg-lam-gold",
    "bg-lam-gold-bright",
    "bg-lam-green",
  ][strength]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.agree) return
    post(route('register'))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lam-text-soft">
          الاسم الكامل
        </Label>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-lam-text-muted pointer-events-none" />
          <Input
            id="name"
            type="text"
            placeholder="مثال: لومي العتيبي"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="h-11 pr-10 bg-lam-bg-1/60 border-border/60"
            required
          />
          {errors.name && <p className="mt-1 text-xs text-lam-orange">{errors.name}</p>}
        </div>
      </div>

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
        <Label htmlFor="password" className="text-lam-text-soft">
          كلمة المرور
        </Label>
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

        {/* Strength meter */}
        {data.password.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < strength ? strengthColor : "bg-secondary/60"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-lam-text-muted">
                قوة كلمة المرور:{" "}
                <span className="text-lam-text-soft font-medium">
                  {strengthLabel}
                </span>
              </span>
              <span className="font-mono text-lam-text-muted">
                {data.password.length} حرف
              </span>
            </div>
          </div>
        )}
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <Checkbox
          id="agree"
          checked={data.agree}
          onCheckedChange={(v) => setData('agree', Boolean(v))}
          className="mt-0.5"
        />
        <span className="text-xs text-lam-text-muted leading-relaxed">
          أوافق على{" "}
          <Link href="#" className="text-lam-gold-bright hover:underline">
            شروط الاستخدام
          </Link>{" "}
          و
          <Link href="#" className="text-lam-gold-bright hover:underline">
            {" "}
            سياسة الخصوصية
          </Link>{" "}
          الخاصة بمنصة لام.
        </span>
      </label>

      <Button
        type="submit"
        disabled={processing || !data.agree}
        size="lg"
        className="w-full bg-gradient-to-l from-lam-gold via-lam-gold-bright to-lam-orange text-lam-bg-0 hover:opacity-95 font-bold h-12 lam-glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <Loader2 className="size-4 ml-2 animate-spin" />
            جارٍ إنشاء الحساب...
          </>
        ) : (
          <>
            ابدأ رحلتك في لام
            <ArrowLeft className="size-4 mr-2" />
          </>
        )}
      </Button>

      <div className="rounded-xl bg-lam-bg-1/40 border border-border/40 p-3 flex items-start gap-2.5">
        <CheckCircle2 className="size-4 text-lam-green shrink-0 mt-0.5" />
        <p className="text-xs text-lam-text-muted leading-relaxed">
          ستحصل فوراً على{" "}
          <span className="text-lam-gold-bright font-medium">120 XP</span>{" "}
          ترحيبية، وأول درس مجاني في مسار الويب الأساسي بدون أي بطاقة دفع.
        </p>
      </div>
    </form>
  )
}
