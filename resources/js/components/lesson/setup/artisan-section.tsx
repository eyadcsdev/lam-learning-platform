import { useEffect, useState } from "react"
import {
  ChevronLeft,
  Terminal,
  Cpu,
  Database,
  FileCode,
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { useXp } from "@/lib/xp-context"

const COMMANDS = [
  {
    cmd: "php artisan make:model Post",
    icon: Database,
    desc: "إنشاء نموذج Eloquent جديد",
    detail: "هذا الأمر ينشئ ملف Model في app/Models. Eloquent هو ORM الذي يربط جداول قاعدة البيانات بكائنات PHP. يجعل التعامل مع البيانات سهلاً وأنيقاً.",
  },
  {
    cmd: "php artisan make:controller PostController",
    icon: FileCode,
    desc: "إنشاء Controller جديد",
    detail: "Controllers تعالج الطلبات وتنسق بين Models و Views. هذا الأمر ينشئ ملف Controller جاهز في app/Http/Controllers.",
  },
  {
    cmd: "php artisan migrate",
    icon: Database,
    desc: "تشغيل هجرات قاعدة البيانات",
    detail: "الهجرات هي نظام إدارة إصدارات قاعدة البيانات. تسمح لفريق التطوير بتعريف ومشاركة مخطط قاعدة البيانات بسهولة.",
  },
  {
    cmd: "php artisan serve",
    icon: Globe,
    desc: "تشغيل سيرفر التطوير المحلي",
    detail: "يُشغّل سيرفر PHP مدمج للتطوير. المنفذ الافتراضي 8000. لا تستخدمه في الإنتاج — استخدم Nginx أو Apache بدلاً منه.",
  },
]

export function ArtisanSection({
  onNext,
  onMessageChange,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
}) {
  const { addXp } = useXp()
  const [revealed, setRevealed] = useState<number[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    onMessageChange("Artisan هو صديقك المفضل في Laravel. كل ما تحتاجه يمكنك فعله عبر سطر الأوامر. اضغط على كل أمر لتتعلم عنه.")
  }, [])

  const handleReveal = (i: number) => {
    if (!revealed.includes(i)) {
      setRevealed((prev) => [...prev, i])
      addXp(5)
      onMessageChange(COMMANDS[i].detail.slice(0, 60) + "...")
    }
  }

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute bottom-0 right-0 size-[350px] rounded-full bg-lam-green/10 blur-[100px]" />
        </div>

        <div className="relative p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-5">
            <Sparkles className="size-3.5 text-lam-green" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted">
              أداة المطور
            </span>
          </div>

          <div className="max-w-3xl mb-8">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-lam-text mb-3">
              ما هو <span className="bg-gradient-to-l from-lam-green to-lam-blue bg-clip-text text-transparent">Artisan</span>؟
            </h2>
            <p className="text-sm text-lam-text-soft leading-relaxed">
              Artisan هي واجهة سطر الأوامر (CLI) المدمجة في Laravel. توفّر عشرات الأوامر الجاهزة
              لإنشاء الملفات، تشغيل الهجرات، إدارة الكاش، وأكثر. هي الأداة التي ستستخدمها يومياً.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {COMMANDS.map((cmd, i) => {
              const Icon = cmd.icon
              const isRevealed = revealed.includes(i)
              return (
                <div
                  key={cmd.cmd}
                  className={`rounded-2xl border p-5 transition-all ${
                    isRevealed
                      ? "bg-lam-green/5 border-lam-green/30"
                      : "bg-lam-bg-2/60 border-border/60 cursor-pointer hover:border-lam-green/30"
                  }`}
                  onClick={() => handleReveal(i)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`size-10 rounded-xl border grid place-items-center ${
                      isRevealed
                        ? "bg-lam-green/15 border-lam-green/30"
                        : "bg-secondary/60 border-border"
                    }`}>
                      <Icon className={`size-5 ${isRevealed ? "text-lam-green" : "text-lam-text-muted"}`} />
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-lam-gold-bright" dir="ltr">
                      {cmd.cmd}
                    </div>
                  </div>
                  <p className="text-xs text-lam-text-soft mb-2">{cmd.desc}</p>
                  {isRevealed && (
                    <div
                      className="overflow-hidden"
                    >
                      <div className="mt-2 rounded-xl bg-black/40 border border-border/40 p-3">
                        <p className="text-[11px] text-lam-text-soft/80 leading-relaxed">
                          {cmd.detail}
                        </p>
                      </div>
                    </div>
                  )}
                  {!isRevealed && (
                    <p className="text-[10px] text-lam-text-muted mt-2">
                      اضغط لمعرفة المزيد
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {revealed.length >= COMMANDS.length && !done && (
            <div
              className="mt-6 text-center"
            >
              <p className="text-sm text-lam-green mb-3">+20 XP — تعرفت على أهم أوامر Artisan!</p>
              <button
                onClick={() => {
                  setDone(true)
                  addXp(20)
                  onMessageChange("حان وقت التطبيق! لنقم ببعض المهام الصغيرة.")
                  setTimeout(onNext, 600)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-green to-lam-blue px-6 py-3 text-sm font-bold text-lam-bg-0"
              >
                إلى المهام!
                <ChevronLeft className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
