"use client"

import { Plane, ScanSearch, UserCheck, UserX, ShieldAlert } from "lucide-react"

export function AirportAnalogy() {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted mb-2">
          تشبيه واقعي
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-lam-text text-balance">
          التحقق من البيانات يشبه أمن المطار
        </h3>
        <p className="mt-3 text-sm sm:text-base text-lam-text-soft leading-relaxed text-pretty">
          لتفهم Validation بعمق، تخيّل أن خادمك مطار دولي. كل طلب يصل هو مسافر، وكل
          قاعدة تحقق هي محطة فحص أمنية. لا أحد يدخل الطائرة دون المرور بكل المحطات.
        </p>
      </div>

      <div className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-0">
          {/* Departure */}
          <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-l border-border/60">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="size-5 text-lam-blue" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-lam-blue">
                Departure
              </span>
            </div>
            <h4 className="font-bold text-lam-text text-lg mb-2">
              قاعة المغادرة
            </h4>
            <p className="text-sm text-lam-text-muted leading-relaxed mb-4">
              المسافرون = طلبات HTTP قادمة من المتصفح. كل واحد يحمل حقائبه (الحقول)
              ويتقدم نحو نقاط الفحص.
            </p>
            <Passengers />
          </div>

          {/* Security checkpoint */}
          <div className="relative p-6 sm:p-8 bg-lam-orange/5 border-y lg:border-y-0 lg:border-x border-lam-orange/20 min-w-[260px]">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-lam-orange/10 via-transparent to-lam-orange/10" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <ScanSearch className="size-5 text-lam-orange" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-lam-orange">
                  Security · validate()
                </span>
              </div>
              <h4 className="font-bold text-lam-text text-lg mb-2">
                نقطة التفتيش
              </h4>
              <p className="text-sm text-lam-text-muted leading-relaxed mb-4">
                هنا تعمل قواعد Laravel: required, email, min, max… كل قاعدة هي بوّابة
                فحص مستقلة بأشعتها الخاصة.
              </p>

              <div className="space-y-2">
                <Checkpoint label="required" status="pass" />
                <Checkpoint label="email" status="pass" />
                <Checkpoint label="min:21" status="fail" />
                <Checkpoint label="confirmed" status="pending" />
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="p-6 sm:p-8 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="size-5 text-lam-green" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-lam-green">
                  Boarded · 200 OK
                </span>
              </div>
              <h4 className="font-bold text-lam-text text-base mb-1">
                مسافرون مُصرّح لهم
              </h4>
              <p className="text-xs text-lam-text-muted leading-relaxed">
                اجتازوا كل القواعد، صعدوا للطائرة (وصلت بياناتهم لقاعدة البيانات).
              </p>
            </div>

            <div className="h-px bg-border/60" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <UserX className="size-5 text-lam-red" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-lam-red">
                  Rejected · 422
                </span>
              </div>
              <h4 className="font-bold text-lam-text text-base mb-1">
                مسافرون مرفوضون
              </h4>
              <p className="text-xs text-lam-text-muted leading-relaxed">
                أخفقوا في قاعدة واحدة على الأقل، رجعوا للقاعة مع قائمة بالأسباب.
              </p>
            </div>

            <div className="h-px bg-border/60" />

            <div className="rounded-lg bg-lam-red/5 border-r-2 border-lam-red p-3 flex items-start gap-2">
              <ShieldAlert className="size-4 text-lam-red shrink-0 mt-0.5" />
              <p className="text-xs text-lam-text-soft leading-relaxed">
                <span className="font-bold text-lam-text">بدون أمن مطار:</span>{" "}
                أي شخص يصعد للطائرة. هذا ما يحدث للتطبيقات بدون Validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Passengers() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="size-8 rounded-full bg-lam-blue/20 border border-lam-blue/40 grid place-items-center"
        >
          <div className="size-3 rounded-full bg-lam-blue/60" />
        </div>
      ))}
      <span className="text-[11px] font-mono text-lam-text-muted mr-2">
        + 1,243 طلب/ثانية
      </span>
    </div>
  )
}

function Checkpoint({
  label,
  status,
}: {
  label: string
  status: "pass" | "fail" | "pending"
}) {
  const map = {
    pass: {
      bg: "bg-lam-green/10 border-lam-green/30",
      text: "text-lam-green",
      icon: "PASS",
    },
    fail: {
      bg: "bg-lam-red/10 border-lam-red/30",
      text: "text-lam-red",
      icon: "FAIL",
    },
    pending: {
      bg: "bg-lam-bg-2/60 border-border/60",
      text: "text-lam-text-muted",
      icon: "...",
    },
  }
  const s = map[status]
  return (
    <div
      className={`flex items-center justify-between rounded-lg border ${s.bg} px-2.5 py-1.5`}
    >
      <span className="font-mono text-xs text-lam-text-soft">{label}</span>
      <span className={`font-mono text-[10px] font-bold ${s.text}`}>
        {s.icon}
      </span>
    </div>
  )
}
