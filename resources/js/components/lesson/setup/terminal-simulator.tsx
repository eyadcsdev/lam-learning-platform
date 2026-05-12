import { useEffect, useState, useRef } from "react"
import { CheckCircle2, ChevronLeft, Terminal, Loader2 } from "lucide-react"

interface Command {
  cmd: string
  explanation: string
  output: string
  delay: number
}

const COMMANDS: Command[] = [
  {
    cmd: "composer create-project laravel/laravel lam",
    explanation: "يقوم Composer هنا بتحميل هيكل Laravel الكامل مع جميع الحزم المطلوبة لتشغيل التطبيق. هذه هي الخطوة الأولى في أي مشروع Laravel.",
    output: "  - Installing laravel/laravel (v11.x)\n  - Downloading: 100%\n  - Configuring application\n  - Generating app key\n  - ✔  Application ready! Your project 'lam' is ready.\n  - ✨ crafted with love by Laravel.",
    delay: 200,
  },
  {
    cmd: "cd lam",
    explanation: "ننتقل إلى مجلد المشروع الجديد. كل ملفات Laravel موجودة هنا، منظمة في هيكل MVC أنيق.",
    output: "~/projects/lam $",
    delay: 400,
  },
  {
    cmd: "npm install",
    explanation: "npm يقوم بتحميل حزم الواجهة الأمامية مثل Vite و Tailwind. Laravel يستخدم Vite لبناء وعرض الموارد.",
    output: "  - added 845 packages in 12s\n  - 142 packages are looking for funding\n  - run `npm fund` for details",
    delay: 600,
  },
  {
    cmd: "php artisan serve",
    explanation: "هذا الأمر يشغّل سيرفر التطوير المحلي. Artisan هو واجهة أوامر Laravel، وسنراه لاحقاً بالتفصيل.",
    output: "  INFO  Server running on [http://127.0.0.1:8000].\n\n  Press Ctrl+C to stop the server.",
    delay: 800,
  },
  {
    cmd: "npm run dev",
    explanation: "Vite يبدأ في مراقبة ملفات الواجهة ويُعيد بناؤها تلقائياً عند كل تغيير. هذا يُسرّع عملية التطوير.",
    output: "  VITE v6.x  ready in 320ms\n\n  ➜  Local:   http://localhost:5173\n  ➜  Network: http://192.168.1.5:5173\n  ➜  press h + enter to show help",
    delay: 1000,
  },
]

import { useXp } from "@/lib/xp-context"

export function TerminalSimulator({
  onNext,
  onMessageChange,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
}) {
  const [currentCmd, setCurrentCmd] = useState(0)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState<number[]>([])
  const [lastCompletedIdx, setLastCompletedIdx] = useState<number | null>(null)
  const [typedOutput, setTypedOutput] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanationIdx, setExplanationIdx] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { addXp } = useXp()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    onMessageChange("حان وقت التطبيق العملي! دعني أريك كيف تُنشئ مشروع Laravel خطوة بخطوة في الطرفية. اتبع الأوامر.")
  }, [])

  useEffect(() => {
    if (lastCompletedIdx !== null) {
      addXp(10)
    }
  }, [lastCompletedIdx])

  const runCommand = (idx: number) => {
    if (running || idx !== currentCmd) return
    const cmd = COMMANDS[idx]
    setRunning(true)
    setTypedOutput("")
    setShowExplanation(false)

    const interval = setInterval(() => {
      setTypedOutput((prev) => {
        const target = cmd.output
        if (prev.length < target.length) {
          return target.slice(0, prev.length + 20)
        }
        clearInterval(interval)
        setRunning(false)
        setLastCompletedIdx(idx)
        setCompleted((prev) => [...prev, idx])
        setCurrentCmd(idx + 1)
        setExplanationIdx(idx)
        setShowExplanation(true)
        return target
      })
    }, 30)
  }

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="p-5 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="size-10 rounded-xl bg-lam-green/15 border border-lam-green/30 grid place-items-center">
              <Terminal className="size-5 text-lam-green" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-lam-text">
                محاكاة الطرفية
              </h2>
              <p className="text-xs text-lam-text-muted">
                نفّذ الأوامر بالترتيب لتجهيز بيئة Laravel
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              {COMMANDS.map((cmd, i) => {
                const isActive = !completed.includes(i) && (i === 0 || completed.includes(i - 1))
                const isDone = completed.includes(i)
                return (
                  <button
                    key={cmd.cmd}
                    disabled={!isActive || running}
                    onClick={() => runCommand(i)}
                    className={`w-full text-right rounded-xl border px-4 py-3 text-sm font-mono transition-all ${
                      isDone
                        ? "bg-lam-green/10 border-lam-green/30 text-lam-green"
                        : isActive
                        ? "bg-lam-gold/10 border-lam-gold/40 text-lam-gold cursor-pointer hover:bg-lam-gold/15"
                        : "bg-lam-bg-2/40 border-border/40 text-lam-text-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isDone && <CheckCircle2 className="size-4 shrink-0" />}
                      {isActive && !running && <span className="size-2 rounded-full bg-lam-gold lam-anim-pulse-gold shrink-0" />}
                      <span className="truncate">{cmd.cmd}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div ref={containerRef} className="rounded-2xl border border-border/60 bg-black/60 overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-black/40">
                <span className="size-2.5 rounded-full bg-lam-red/70" />
                <span className="size-2.5 rounded-full bg-lam-gold/70" />
                <span className="size-2.5 rounded-full bg-lam-green/70" />
                <span className="mr-2 text-[10px] font-mono text-lam-text-muted">
                  terminal — lam@dev:~
                </span>
              </div>
              <div className="p-4 font-mono text-xs leading-relaxed min-h-[200px] max-h-[260px] overflow-y-auto">
                {completed.map((idx) => (
                  <div key={idx}>
                    <div className="text-lam-green">$ {COMMANDS[idx].cmd}</div>
                    <div className="text-lam-text-soft/70 whitespace-pre-wrap">
                      {idx === currentCmd ? typedOutput : COMMANDS[idx].output}
                    </div>
                  </div>
                ))}
                {completed.length < COMMANDS.length && (
                  <div className="text-lam-green lam-anim-blink">
                    $ {running ? COMMANDS[currentCmd].cmd : "انقر على أمر لتشغيله..."}
                  </div>
                )}
                {running && (
                  <div className="flex items-center gap-2 text-lam-gold mt-1">
                    <Loader2 className="size-3 animate-spin" />
                    جارٍ التنفيذ...
                  </div>
                )}
              </div>
            </div>
          </div>

          {showExplanation && explanationIdx !== null && (
            <div
              className="mt-4 flex items-start gap-3 rounded-2xl border-r-4 border-lam-green bg-lam-green/5 p-4"
            >
              <CheckCircle2 className="size-5 text-lam-green shrink-0 mt-0.5" />
              <p className="text-sm text-lam-text-soft leading-relaxed">
                <span className="font-bold text-lam-text">لومي:</span>{" "}
                {COMMANDS[explanationIdx].explanation}
              </p>
            </div>
          )}

          {completed.length >= COMMANDS.length && !revealed && (
            <div
              className="mt-6 text-center"
            >
              <p className="text-sm text-lam-green mb-3">+50 XP — أكملت جميع الأوامر!</p>
                <button
                    onClick={() => {
                      setRevealed(true)
                      addXp(50)
                      onMessageChange("ممتاز! أنشأنا مشروع Laravel وفهمنا كل أمر. الآن لنتفقد هيكل المشروع.")
                      setTimeout(onNext, 600)
                    }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-green to-lam-blue px-6 py-3 text-sm font-bold text-lam-bg-0"
              >
                هيا نستكشف المشروع
                <ChevronLeft className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
