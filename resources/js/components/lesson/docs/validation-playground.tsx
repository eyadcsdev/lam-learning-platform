"use client"

import { useState } from "react"

import {
  Play, RotateCcw, Code, CheckCircle2, XCircle,
  Server, Send, AlertCircle, Beaker,
} from "lucide-react"

interface RuleResult {
  field: string
  value: string
  rules: string
  passed: boolean
  message: string
}

const PRESETS = [
  {
    name: "تسجيل مستخدم",
    data: { name: "أحمد", email: "ahmed@test.com", password: "P@ss1234", age: "25" },
    rules: { name: "required|string|max:60", email: "required|email", password: "required|min:8", age: "required|integer|min:18" },
  },
  {
    name: "بيانات خاطئة",
    data: { name: "", email: "not-an-email", password: "123", age: "seventeen" },
    rules: { name: "required|string|max:60", email: "required|email", password: "required|min:8", age: "required|integer|min:18" },
  },
  {
    name: "مقال جديد",
    data: { title: "كيف تتعلم Laravel", body: "محتوى المقال…", category_id: "5", tags: "php,laravel" },
    rules: { title: "required|string|min:10|max:255", body: "required|string", category_id: "required|integer|exists:categories,id", tags: "required|string" },
  },
]

function simulateValidation(value: string, rules: string): { passed: boolean; message: string } {
  const ruleList = rules.split("|").map((r) => r.trim())
  for (const rule of ruleList) {
    if (rule === "required" && (value === "" || value === null || value === undefined)) {
      return { passed: false, message: "الحقل مطلوب" }
    }
    if (rule === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) return { passed: false, message: "صيغة البريد غير صحيحة" }
    }
    if (rule.startsWith("min:")) {
      const min = parseInt(rule.split(":")[1])
      if (isNaN(min)) continue
      const num = Number(value)
      if (!isNaN(num)) {
        if (num < min) return { passed: false, message: `يجب ألا تقل القيمة عن ${min}` }
      } else {
        if (value.length < min) return { passed: false, message: `يجب ألا يقل الطول عن ${min} حرف` }
      }
    }
    if (rule.startsWith("max:")) {
      const max = parseInt(rule.split(":")[1])
      if (isNaN(max)) continue
      const num = Number(value)
      if (!isNaN(num)) {
        if (num > max) return { passed: false, message: `يجب ألا تزيد القيمة عن ${max}` }
      } else {
        if (value.length > max) return { passed: false, message: `يجب ألا يزيد الطول عن ${max} حرف` }
      }
    }
    if (rule === "integer") {
      const num = Number(value)
      if (isNaN(num) || !Number.isInteger(num)) return { passed: false, message: "يجب أن يكون عدداً صحيحاً" }
    }
    if (rule === "string") {
      if (typeof value !== "string") return { passed: false, message: "يجب أن يكون نصاً" }
    }
    if (rule === "boolean") {
      if (!["true", "false", "1", "0", true, false].includes(value)) return { passed: false, message: "يجب أن يكون قيمة منطقية" }
    }
    if (rule.startsWith("in:")) {
      const options = rule.split(":")[1]?.split(",") ?? []
      if (!options.includes(value)) return { passed: false, message: `القيمة يجب أن تكون إحدى: ${options.join(", ")}` }
    }
    if (rule.startsWith("exists:")) {
      const parts = rule.split(",")
      if (parts.length >= 1 && value !== "" && value !== "0") {
        if (value === "999") return { passed: false, message: "القيمة المحددة غير موجودة" }
      }
    }
    if (rule === "array") {
      try {
        const parsed = JSON.parse(value)
        if (!Array.isArray(parsed)) return { passed: false, message: "يجب أن يكون مصفوفة" }
      } catch {
        return { passed: false, message: "يجب أن يكون مصفوفة (JSON)" }
      }
    }
  }
  return { passed: true, message: "✓ تم" }
}

export function ValidationPlayground() {
  const [fields, setFields] = useState<Record<string, string>>({
    name: "أحمد",
    email: "ahmed@test.com",
    password: "P@ss1234",
    age: "25",
  })
  const [ruleStrings, setRuleStrings] = useState<Record<string, string>>({
    name: "required|string|max:60",
    email: "required|email",
    password: "required|min:8",
    age: "required|integer|min:18",
  })
  const [results, setResults] = useState<RuleResult[]>([])
  const [hasRun, setHasRun] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [requestLog, setRequestLog] = useState<string[]>([])

  const applyPreset = (i: number) => {
    const preset = PRESETS[i]
    setSelectedPreset(i)
    setFields({ ...preset.data })
    setRuleStrings({ ...preset.rules })
    setResults([])
    setHasRun(false)
    setRequestLog([])
  }

  const addField = () => {
    const name = `field${Object.keys(fields).length + 1}`
    setFields((prev) => ({ ...prev, [name]: "" }))
    setRuleStrings((prev) => ({ ...prev, [name]: "required" }))
  }

  const removeField = (key: string) => {
    const newFields = { ...fields }
    const newRules = { ...ruleStrings }
    delete newFields[key]
    delete newRules[key]
    setFields(newFields)
    setRuleStrings(newRules)
    setResults([])
    setHasRun(false)
  }

  const runValidation = async () => {
    setIsSimulating(true)
    setHasRun(false)
    setRequestLog([])

    const log = (msg: string) => {
      setRequestLog((prev) => [...prev, msg])
    }

    log("🚀 بدء عملية التحقق…")
    await delay(300)
    log("📦 استخراج البيانات من الطلب…")
    await delay(300)
    log("🔍 تحليل القواعد إلى Rule objects…")
    await delay(400)

    const newResults: RuleResult[] = []
    let hasError = false

    for (const [field, value] of Object.entries(fields)) {
      const rules = ruleStrings[field] || ""
      log(`  ⏳ فحص ${field} بقاعدة: ${rules}`)
      await delay(200)
      const result = simulateValidation(value, rules)
      newResults.push({ field, value, rules, ...result })
      if (!result.passed) hasError = true
    }

    setResults(newResults)
    setHasRun(true)

    if (hasError) {
      log("❌ فشل التحقق — يتم إعادة 422 مع الأخطاء")
    } else {
      log("✅ نجح التحقق — يتم إعادة 200 مع البيانات الصالحة")
    }
    log(`📨 استجابة: HTTP ${hasError ? 422 : 200}`)
    setIsSimulating(false)
  }

  return (
    <div className="lam-glass-strong rounded-2xl border border-border/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border/60 bg-lam-bg-1/60">
        <div className="flex items-center gap-2">
          <Beaker className="size-4 text-lam-gold" />
          <span className="text-sm font-bold text-lam-text">Validation Playground</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-lam-green lam-anim-pulse-gold" />
          <span className="text-[10px] font-mono text-lam-text-muted">{isSimulating ? "running…" : "ready"}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left: Editor */}
        <div className="p-4 space-y-4 border-l border-border/60">
          {/* Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono text-lam-text-muted">نماذج سريعة:</span>
            {PRESETS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => applyPreset(i)}
                className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                  selectedPreset === i
                    ? "border-lam-gold/40 bg-lam-gold/10 text-lam-gold"
                    : "border-border/60 text-lam-text-muted hover:text-lam-text-soft"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-3" dir="ltr">
            {Object.entries(fields).map(([key, value]) => (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-lam-text-muted">{key}</span>
                  <button
                    onClick={() => removeField(key)}
                    className="text-[9px] text-lam-red/60 hover:text-lam-red"
                  >
                    إزالة
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={value}
                    onChange={(e) => {
                      setFields((prev) => ({ ...prev, [key]: e.target.value }))
                      setHasRun(false)
                    }}
                    placeholder="القيمة"
                    className="rounded-lg border border-border/60 bg-lam-bg-2/50 px-2.5 py-1.5 text-xs text-lam-text-soft placeholder:text-lam-text-muted/50 focus:outline-none focus:ring-2 focus:ring-lam-gold/30 font-mono"
                  />
                  <input
                    value={ruleStrings[key]}
                    onChange={(e) => {
                      setRuleStrings((prev) => ({ ...prev, [key]: e.target.value }))
                      setHasRun(false)
                    }}
                    placeholder="required|string|max:60"
                    className="rounded-lg border border-border/60 bg-lam-bg-2/50 px-2.5 py-1.5 text-xs text-lam-orange placeholder:text-lam-text-muted/50 focus:outline-none focus:ring-2 focus:ring-lam-gold/30 font-mono"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={addField}
              className="text-xs px-3 py-1.5 rounded-lg border border-dashed border-border/60 text-lam-text-muted hover:text-lam-text-soft hover:border-lam-gold/40 transition-colors"
            >
              + إضافة حقل
            </button>
            <div className="flex-1" />
            <button
              onClick={runValidation}
              disabled={isSimulating}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-l from-lam-gold to-lam-orange px-4 py-2 text-xs font-bold text-lam-bg-0 disabled:opacity-70"
            >
              {isSimulating ? (
                <>
                  <div className="size-3 rounded-full border-2 border-lam-bg-0 border-t-transparent animate-spin" />
                  جارٍ…
                </>
              ) : (
                <>
                  <Play className="size-3" />
                  تشغيل التحقق
                </>
              )}
            </button>
            <button
              onClick={() => { setResults([]); setHasRun(false); setRequestLog([]) }}
              className="text-xs px-2.5 py-2 rounded-lg border border-border/60 text-lam-text-muted hover:text-lam-text-soft"
            >
              <RotateCcw className="size-3" />
            </button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="p-4 space-y-4">
          {/* Results */}
          {hasRun && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-lam-text-muted">
                النتائج
              </div>
              {results.map((r) => (
                <div
                  key={r.field}
                  className={`rounded-lg border p-2.5 ${
                    r.passed
                      ? "border-lam-green/30 bg-lam-green/5"
                      : "border-lam-red/30 bg-lam-red/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {r.passed ? (
                        <CheckCircle2 className="size-3.5 text-lam-green shrink-0" />
                      ) : (
                        <XCircle className="size-3.5 text-lam-red shrink-0" />
                      )}
                      <code className="font-mono text-xs text-lam-text font-bold">{r.field}</code>
                      <span className="text-[10px] text-lam-text-muted truncate dir-ltr">{r.rules}</span>
                    </div>
                    <span className={`text-[10px] font-mono ${r.passed ? "text-lam-green" : "text-lam-red"}`}>
                      {r.passed ? "OK" : "FAIL"}
                    </span>
                  </div>
                  {!r.passed && (
                    <p className="text-[11px] text-lam-red/80 mt-1 mr-6">{r.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Request log */}
          {requestLog.length > 0 && (
            <div className="rounded-lg border border-border/60 bg-lam-bg-2/60 p-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-lam-text-muted mb-2">
                سجل الطلب
              </div>
              <div className="space-y-1">
                {requestLog.map((msg, i) => (
                  <div
                    key={i}
                    className="text-[10px] font-mono text-lam-text-soft"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasRun && requestLog.length === 0 && (
            <div className="rounded-xl border border-dashed border-border/60 p-6 text-center">
              <Code className="size-8 text-lam-text-muted/40 mx-auto mb-2" />
              <p className="text-xs text-lam-text-muted">أضف الحقول والقواعد، ثم اضغط "تشغيل التحقق"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
