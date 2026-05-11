"use client"

import { History, Wrench, AlertOctagon, RotateCcw, ArrowDown } from "lucide-react"

const PAIN_POINTS = [
  {
    icon: RotateCcw,
    title: "كود متكرر",
    desc: "نفس فحوصات empty و filter_var تتكرر في كل ملف.",
  },
  {
    icon: Wrench,
    title: "صعوبة الصيانة",
    desc: "تغيير قاعدة واحدة يعني تعديل عشرات الأماكن.",
  },
  {
    icon: AlertOctagon,
    title: "تنظيم سيّء",
    desc: "منطق التحقق مختلط مع منطق العرض ومنطق العمل.",
  },
  {
    icon: History,
    title: "عدم اتساق",
    desc: "كل مطوّر يكتب قواعد مختلفة، فلا توجد لغة موحّدة.",
  },
]

export function BeforeFrameworks() {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted mb-2">
          خلفية تاريخية
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-lam-text text-balance">
          قبل أن تظهر إطارات العمل
        </h3>
        <p className="mt-3 text-sm sm:text-base text-lam-text-soft leading-relaxed text-pretty">
          في عصر PHP الكلاسيكي، كان كل مطوّر يكتب طبقة التحقق يدوياً، سطراً بسطر،
          داخل ملفات صفحاته مباشرة. النتيجة؟ فوضى لا يمكن صيانتها.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Old code */}
        <div
          className="lg:col-span-3 rounded-2xl overflow-hidden border border-border/60 bg-lam-bg-2/70"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-lam-bg-1/60">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-lam-red/80" />
              <span className="size-2.5 rounded-full bg-lam-gold/80" />
              <span className="size-2.5 rounded-full bg-lam-green/80" />
            </div>
            <span className="text-[11px] font-mono text-lam-text-muted">
              register.php · classic PHP
            </span>
          </div>
          <pre
            dir="ltr"
            className="font-mono text-[11.5px] leading-[1.75] p-4 text-lam-text-soft/95 overflow-x-auto"
          >
{`<?php
if (empty($_POST['email'])) {
  echo "Invalid email";
  exit;
}
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  echo "Bad email format";
  exit;
}
if (empty($_POST['password']) || strlen($_POST['password']) < 8) {
  echo "Password too short";
  exit;
}
if (empty($_POST['age']) || !is_numeric($_POST['age'])) {
  echo "Age must be a number";
  exit;
}
if ((int)$_POST['age'] < 18) {
  echo "Must be 18 or older";
  exit;
}
// ... 40 more if-statements
`}
          </pre>
        </div>

        {/* Pain points */}
        <div className="lg:col-span-2 space-y-3">
          {PAIN_POINTS.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-lam-bg-2/40 p-3.5"
              >
                <div className="size-9 rounded-lg bg-lam-red/10 border border-lam-red/25 grid place-items-center shrink-0">
                  <Icon className="size-4 text-lam-red" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-lam-text">{p.title}</h4>
                  <p className="text-xs text-lam-text-muted mt-0.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div
        className="flex flex-col items-center gap-2 pt-2"
      >
        <ArrowDown className="size-5 text-lam-orange lam-anim-pulse-orange" />
        <p className="text-sm text-lam-text-muted">
          ثم جاء{" "}
          <span className="text-lam-gold font-bold">Laravel</span> ليحلّ كل ذلك
          بأناقة…
        </p>
      </div>
    </section>
  )
}
