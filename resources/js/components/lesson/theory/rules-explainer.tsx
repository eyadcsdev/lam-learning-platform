"use client"

import { useState } from "react"
import {
  AsteriskSquare,
  Mail,
  Minimize2,
  Maximize2,
  KeyRound,
  Fingerprint,
  type LucideIcon,
} from "lucide-react"

type Rule = {
  id: string
  name: string
  icon: LucideIcon
  purpose: string
  internal: string
  useCase: string
  mistake: string
  example: string
}

const RULES: Rule[] = [
  {
    id: "required",
    name: "required",
    icon: AsteriskSquare,
    purpose: "يضمن وجود القيمة وعدم كونها فارغة أو null.",
    internal: "يفحص empty($value) ويرفض '' و null و [] و false.",
    useCase: "كل حقل لا يمكن أن يكون فارغاً (اسم، بريد، كلمة مرور).",
    mistake: "الاعتماد عليه فقط للتحقق من النوع — لا يفحص الصيغة.",
    example: "'name' => 'required'",
  },
  {
    id: "email",
    name: "email",
    icon: Mail,
    purpose: "يتحقق أن القيمة بريد إلكتروني صالح بنيوياً.",
    internal: "يستخدم EmailValidator مع فلتر RFC، يمكن إضافة dns أو spoof.",
    useCase: "حقول التسجيل والاشتراك في النشرة البريدية.",
    mistake: "اعتباره فحصاً نهائياً — البريد قد يكون صحيحاً نحوياً وغير موجود.",
    example: "'email' => 'required|email:rfc,dns'",
  },
  {
    id: "min",
    name: "min:value",
    icon: Minimize2,
    purpose: "حد أدنى للقيمة (طول النص أو الرقم أو حجم الملف).",
    internal: "يقيس Str::length للنصوص، intval للأرقام، size للملفات.",
    useCase: "كلمات المرور (min:8)، الأعمار (min:18)، الملفات (min:100).",
    mistake: "نسيان أن min يتغيّر معناه حسب نوع البيانات.",
    example: "'password' => 'min:8'",
  },
  {
    id: "max",
    name: "max:value",
    icon: Maximize2,
    purpose: "حد أعلى للقيمة — يمنع تضخم الحقول.",
    internal: "نفس آلية min لكن بالاتجاه المعاكس.",
    useCase: "حماية أعمدة DB ذات الحدود (varchar(255))، حجم الصور.",
    mistake: "وضع max كبير جداً يسمح بحقول كاريكاتورية.",
    example: "'bio' => 'max:500'",
  },
  {
    id: "confirmed",
    name: "confirmed",
    icon: KeyRound,
    purpose: "يطلب وجود حقل ثانٍ بنفس القيمة باسم field_confirmation.",
    internal: "يبحث تلقائياً عن password_confirmation ويقارنه.",
    useCase: "تأكيد كلمة المرور عند التسجيل أو تغييرها.",
    mistake: "نسيان إضافة الحقل المُكرّر في الـ Form.",
    example: "'password' => 'confirmed'",
  },
  {
    id: "unique",
    name: "unique:table",
    icon: Fingerprint,
    purpose: "يضمن عدم تكرار القيمة في عمود محدد في قاعدة البيانات.",
    internal: "يُنفّذ استعلام SELECT COUNT(*) على الجدول المحدد.",
    useCase: "البريد عند التسجيل، slug في المقالات.",
    mistake: "نسيان استثناء السجل الحالي عند التحديث: unique:users,email,$id.",
    example: "'email' => 'unique:users,email'",
  },
]

export function RulesExplainer() {
  const [active, setActive] = useState<string>("required")
  const current = RULES.find((r) => r.id === active) ?? RULES[0]

  return (
    <section className="space-y-5">
      <div className="max-w-2xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted mb-2">
          القواعد الأساسية
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-lam-text text-balance">
          أهم قواعد التحقق في Laravel
        </h3>
        <p className="mt-3 text-sm sm:text-base text-lam-text-soft leading-relaxed text-pretty">
          اختر قاعدة لاستكشاف غرضها، سلوكها الداخلي، حالات استخدامها، وأشهر
          الأخطاء التي يقع فيها المطوّرون.
        </p>
      </div>

      <div className="lam-glass rounded-3xl border border-border/60 p-4 sm:p-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-5">
          {/* Rules list */}
          <ul className="space-y-2 lg:max-h-[420px] lg:overflow-y-auto pr-1">
            {RULES.map((rule) => {
              const Icon = rule.icon
              const isActive = rule.id === active
              return (
                <li key={rule.id}>
                  <button
                    onMouseEnter={() => setActive(rule.id)}
                    onFocus={() => setActive(rule.id)}
                    onClick={() => setActive(rule.id)}
                    className={`w-full text-right flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all ${
                      isActive
                        ? "bg-lam-orange/10 border-lam-orange/40 lam-glow-orange"
                        : "bg-lam-bg-2/40 border-border/60 hover:border-lam-orange/30"
                    }`}
                  >
                    <div
                      className={`size-9 rounded-lg grid place-items-center shrink-0 ${
                        isActive
                          ? "bg-lam-orange/20 border border-lam-orange/40"
                          : "bg-lam-bg-1/60 border border-border/50"
                      }`}
                    >
                      <Icon
                        className={`size-4 ${
                          isActive ? "text-lam-orange" : "text-lam-text-muted"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`font-mono text-sm font-bold ${
                          isActive ? "text-lam-orange" : "text-lam-text"
                        }`}
                      >
                        {rule.name}
                      </div>
                      <div className="text-[11px] text-lam-text-muted truncate">
                        {rule.purpose}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Active rule detail */}
          <div
              key={current.id}
              className="rounded-2xl border border-border/60 bg-lam-bg-2/60 p-5 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-lam-orange/15 border border-lam-orange/40 grid place-items-center">
                  <current.icon className="size-5 text-lam-orange" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-lam-text-muted">
                    Validation Rule
                  </div>
                  <h4 className="font-mono text-xl font-black text-lam-orange">
                    {current.name}
                  </h4>
                </div>
              </div>

              <pre
                dir="ltr"
                className="font-mono text-xs bg-lam-bg-1/80 border border-border/50 rounded-lg px-3 py-2.5 text-lam-green overflow-x-auto"
              >
                {current.example}
              </pre>

              <div className="grid sm:grid-cols-2 gap-3">
                <DetailBlock label="الغرض" text={current.purpose} tone="gold" />
                <DetailBlock
                  label="السلوك الداخلي"
                  text={current.internal}
                  tone="blue"
                />
                <DetailBlock
                  label="حالة استخدام واقعية"
                  text={current.useCase}
                  tone="green"
                />
                <DetailBlock
                  label="خطأ شائع"
                  text={current.mistake}
                  tone="red"
                />
              </div>
            </div>
      </div>
    </section>
  )
}

function DetailBlock({
  label,
  text,
  tone,
}: {
  label: string
  text: string
  tone: "gold" | "blue" | "green" | "red"
}) {
  const toneMap = {
    gold: "border-lam-gold/30 bg-lam-gold/5",
    blue: "border-lam-blue/30 bg-lam-blue/5",
    green: "border-lam-green/30 bg-lam-green/5",
    red: "border-lam-red/30 bg-lam-red/5",
  }
  const textMap = {
    gold: "text-lam-gold",
    blue: "text-lam-blue",
    green: "text-lam-green",
    red: "text-lam-red",
  }
  return (
    <div className={`rounded-lg border ${toneMap[tone]} p-3`}>
      <div
        className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${textMap[tone]}`}
      >
        {label}
      </div>
      <p className="text-xs text-lam-text-soft leading-relaxed">{text}</p>
    </div>
  )
}
