"use client"

import { useState } from "react"
import { Code2, Info } from "lucide-react"

type Snippet = {
  id: string
  code: string
  title: string
  parse: string
  behavior: string
  example: string
}

const SNIPPETS: Snippet[] = [
  {
    id: "required",
    code: "'name' => 'required'",
    title: "قاعدة required",
    parse: "Laravel يقطع السلسلة بواسطة '|' ويُنشئ كائن Rule لكل جزء.",
    behavior:
      "تُفحص القيمة عبر empty() — أي '' أو null أو [] يُعتبر فشلاً.",
    example: "name = ''  →  ❌  'حقل الاسم مطلوب'",
  },
  {
    id: "email",
    code: "'email' => 'required|email'",
    title: "قاعدة email",
    parse: "تُحوَّل إلى [Required, Email] وتُنفَّذ بالترتيب.",
    behavior:
      "EmailValidator يستخدم نمط RFC للتحقق من البنية النحوية للبريد.",
    example: "email = 'abc@xyz'  →  ❌  'صيغة البريد غير صحيحة'",
  },
  {
    id: "min",
    code: "'age' => 'required|integer|min:21'",
    title: "قاعدة min",
    parse: "السلسلة تُقطَّع لثلاث قواعد: Required ثم Integer ثم Min(21).",
    behavior:
      "Min يقيس القيمة حسب النوع — للأعداد يقارن بـ >=، وللنصوص يستخدم Str::length.",
    example: "age = 19  →  ❌  'يجب ألا يقل العمر عن 21 سنة'",
  },
]

export function LineAnnotations() {
  const [active, setActive] = useState<string>(SNIPPETS[0].id)
  const current = SNIPPETS.find((s) => s.id === active) ?? SNIPPETS[0]

  return (
    <div className="lam-glass rounded-2xl border border-border/60 p-4 sm:p-5 space-y-4">
      <div className="flex items-center gap-2">
        <div className="size-9 rounded-xl bg-lam-blue/10 border border-lam-blue/30 grid place-items-center">
          <Code2 className="size-4 text-lam-blue" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-lam-text">
            تشريح أسطر التحقق
          </h4>
          <p className="text-[11px] text-lam-text-muted">
            انقر سطراً لرؤية ما يفعله Laravel داخلياً
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-2">
        {SNIPPETS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            onMouseEnter={() => setActive(s.id)}
            className={`text-right rounded-lg border px-2.5 py-2 transition-all ${
              s.id === active
                ? "bg-lam-orange/10 border-lam-orange/40"
                : "bg-lam-bg-2/40 border-border/60 hover:border-lam-orange/30"
            }`}
          >
            <code
              dir="ltr"
              className={`font-mono text-[10.5px] leading-tight block truncate ${
                s.id === active ? "text-lam-orange" : "text-lam-text-soft"
              }`}
            >
              {s.code}
            </code>
          </button>
        ))}
      </div>

        <div
          className="rounded-xl border border-border/60 bg-lam-bg-2/40 p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <Info className="size-4 text-lam-gold" />
            <h5 className="font-bold text-sm text-lam-text">{current.title}</h5>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Block label="التحليل (parsing)" text={current.parse} tone="gold" />
            <Block
              label="السلوك (behavior)"
              text={current.behavior}
              tone="blue"
            />
          </div>

          <pre
            dir="ltr"
            className="font-mono text-[11px] bg-lam-bg-1/80 border border-border/50 rounded-lg px-3 py-2 text-lam-text-soft overflow-x-auto"
          >
            {current.example}
          </pre>
        </div>
    </div>
  )
}

function Block({
  label,
  text,
  tone,
}: {
  label: string
  text: string
  tone: "gold" | "blue"
}) {
  const toneMap = {
    gold: "border-lam-gold/30 bg-lam-gold/5 text-lam-gold",
    blue: "border-lam-blue/30 bg-lam-blue/5 text-lam-blue",
  }
  return (
    <div className={`rounded-lg border ${toneMap[tone]} p-2.5`}>
      <div className="text-[10px] font-mono uppercase tracking-wider mb-1">
        {label}
      </div>
      <p className="text-xs text-lam-text-soft leading-relaxed">{text}</p>
    </div>
  )
}
