"use client"

import { CheckCircle2, XCircle, ArrowLeft, ShieldCheck, ShieldOff } from "lucide-react"

const WITHOUT_ITEMS = [
  { label: "بريد إلكتروني فارغ", status: "fail" },
  { label: "عمر = 'twenty'", status: "fail" },
  { label: "اسم بطول 5000 حرف", status: "fail" },
  { label: "DB يحفظ NULL في حقل NOT NULL", status: "fail" },
]

const WITH_ITEMS = [
  { label: "كل الحقول مفحوصة", status: "ok" },
  { label: "أنواع البيانات مضمونة", status: "ok" },
  { label: "حدود مُلتزَمة (min/max)", status: "ok" },
  { label: "DB يستقبل بيانات نظيفة", status: "ok" },
]

export function WithWithoutComparison() {
  return (
    <section className="space-y-5">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted mb-2">
          مقارنة بصرية
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-lam-text text-balance">
          نفس الطلب… بنظامين مختلفين
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
        {/* WITHOUT validation */}
        <div
          className="relative rounded-2xl border-2 border-lam-red/30 bg-lam-red/5 p-5 overflow-hidden"
        >
          <div className="absolute -top-10 -left-10 size-32 rounded-full bg-lam-red/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-lam-red/20 border border-lam-red/40 grid place-items-center">
                <ShieldOff className="size-5 text-lam-red" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-lam-red/80">
                  Without Validation
                </p>
                <h4 className="font-bold text-lam-text text-base">بدون تحقق</h4>
              </div>
            </div>

            <RequestFlow status="fail" />

            <ul className="mt-4 space-y-2">
              {WITHOUT_ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-lg bg-lam-red/10 border border-lam-red/20 px-3 py-2"
                >
                  <XCircle className="size-4 text-lam-red shrink-0" />
                  <span className="text-xs text-lam-text-soft">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WITH validation */}
        <div
          className="relative rounded-2xl border-2 border-lam-green/30 bg-lam-green/5 p-5 overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 size-32 rounded-full bg-lam-green/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-lam-green/20 border border-lam-green/40 grid place-items-center">
                <ShieldCheck className="size-5 text-lam-green" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-lam-green/80">
                  With Validation
                </p>
                <h4 className="font-bold text-lam-text text-base">مع التحقق</h4>
              </div>
            </div>

            <RequestFlow status="ok" />

            <ul className="mt-4 space-y-2">
              {WITH_ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-lg bg-lam-green/10 border border-lam-green/20 px-3 py-2"
                >
                  <CheckCircle2 className="size-4 text-lam-green shrink-0" />
                  <span className="text-xs text-lam-text-soft">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function RequestFlow({ status }: { status: "ok" | "fail" }) {
  const isOk = status === "ok"
  return (
    <div className="rounded-xl bg-lam-bg-1/60 border border-border/60 p-3">
      <div className="flex items-center gap-2 text-[11px] font-mono">
        <span className="rounded-md bg-lam-bg-2/80 border border-border/60 px-2 py-1 text-lam-text-soft">
          Client
        </span>
        <span
          className={`flex-1 h-px ${
            isOk
              ? "bg-gradient-to-l from-lam-green via-lam-green to-lam-green/30"
              : "bg-gradient-to-l from-lam-red via-lam-red to-lam-red/30"
          }`}
        />
        <ArrowLeft
          className={`size-3.5 ${isOk ? "text-lam-green" : "text-lam-red"}`}
        />
        <span
          className={`flex-1 h-px ${
            isOk
              ? "bg-gradient-to-l from-lam-green/30 to-lam-green"
              : "bg-gradient-to-l from-lam-red/30 to-lam-red"
          }`}
        />
        <span
          className={`rounded-md px-2 py-1 border ${
            isOk
              ? "bg-lam-green/15 border-lam-green/40 text-lam-green"
              : "bg-lam-red/15 border-lam-red/40 text-lam-red"
          }`}
        >
          {isOk ? "Database" : "CRASH"}
        </span>
      </div>
    </div>
  )
}
