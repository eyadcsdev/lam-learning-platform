import { useEffect, useState } from "react"
import {
  ChevronLeft,
  Folder,
  FolderOpen,
  FileCode,
  Database,
  Globe,
  Settings,
  Terminal,
  CheckCircle2,
} from "lucide-react"

interface FolderData {
  name: string
  icon: typeof Folder
  color: string
  desc: string
  content: string
}

const FOLDERS: FolderData[] = [
  {
    name: "app",
    icon: FileCode,
    color: "text-lam-orange",
    desc: "قلب التطبيق — يحتوي على الـ Controllers و Models و Middleware.",
    content: "هذا هو أهم مجلد في Laravel. ستجد فيه:\n\n• Http/Controllers — ملفات التحكم التي تعالج الطلبات\n• Http/Middleware — طبقات الوسائط\n• Models — نماذج Eloquent التي تمثل جداول قاعدة البيانات\n• Providers — مزودو الخدمات\n\nكل منطق التطبيق مبني هنا ضمن هيكل MVC.",
  },
  {
    name: "bootstrap",
    icon: Settings,
    color: "text-lam-blue",
    desc: "ملفات بدء تشغيل الإطار (App Kernel).",
    content: "هذا المجلد يحتوي على:\n\n• app.php — بدء تشغيل Laravel\n• providers.php — تسجيل مزودي الخدمات\n\nلا تحتاج لتعديل أي شيء هنا في البداية. Laravel يدير كل شيء تلقائياً.",
  },
  {
    name: "config",
    icon: Settings,
    color: "text-lam-gold",
    desc: "إعدادات التطبيق — قاعدة البيانات، البريد، الكاش، إلخ.",
    content: "كل إعدادات Laravel موجودة هنا:\n\n• app.php — إعدادات التطبيق الأساسية\n• database.php — اتصالات قاعدة البيانات\n• mail.php — إعدادات البريد\n• filesystems.php — أنظمة التخزين\n\nيمكنك تعديل أي إعداد حسب حاجتك.",
  },
  {
    name: "database",
    icon: Database,
    color: "text-lam-green",
    desc: "قاعدة البيانات — الهجرات والمصانع والبذور.",
    content: "هنا تتعامل مع قاعدة البيانات:\n\n• migrations — هجرات لإنشاء وتعديل الجداول\n• factories — مصانع لإنشاء بيانات وهمية\n• seeders — بذور لملء قاعدة البيانات\n\nLaravel يوفّر نظام هجرات متقدماً لإدارة schema.",
  },
  {
    name: "public",
    icon: Globe,
    color: "text-lam-gold-bright",
    desc: "نقطة الدخول — index.php وأصول الواجهة.",
    content: "هذا المجلد هو واجهة التطبيق للعالم:\n\n• index.php — نقطة الدخول لكل الطلبات\n• assets — ملفات CSS و JS و صور\n\nكل طلب يمر عبر public/index.php أولاً.",
  },
  {
    name: "resources",
    icon: FileCode,
    color: "text-lam-blue",
    desc: "الموارد — القوالب وملفات CSS/JS وملفات الترجمة.",
    content: "الموارد مقسمة كالتالي:\n\n• views — قوالب Blade (أو صفحات Inertia/React)\n• css — ملفات التنسيق\n• js — كود JavaScript\n\nفي مشروعنا، نستخدم Inertia مع React هنا.",
  },
  {
    name: "routes",
    icon: Terminal,
    color: "text-lam-orange",
    desc: "ملفات التوجيه — web.php, api.php, console.php.",
    content: "قلب التوجيه في Laravel:\n\n• web.php — مسارات الويب (مع session, CSRF)\n• api.php — مسارات API (بدون حالة)\n• console.php — أوامر Artisan المخصصة\n\nهنا تُحدد كيف يستجيب التطبيق لكل URL.",
  },
  {
    name: "storage",
    icon: Database,
    color: "text-lam-gold",
    desc: "التخزين — السجلات، الكاش، الجلسات، الملفات المرفوعة.",
    content: "Laravel يخزّن هنا:\n\n• logs — سجلات الأخطاء\n• framework/cache — ملفات الكاش\n• framework/sessions — جلسات المستخدمين\n• app/public — الملفات المرفوعة\n\nنظام تخزين مرن وآمن.",
  },
]

export function ProjectExplorer({
  onNext,
  onMessageChange,
  onXpGain,
}: {
  onNext: () => void
  onMessageChange: (msg: string) => void
  onXpGain: (amount: number) => void
}) {
  const [selected, setSelected] = useState<FolderData | null>(null)
  const [explored, setExplored] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    onMessageChange("هذا هو هيكل مشروع Laravel. كل مجلد له وظيفة محددة. اضغط على أي مجلد لاستكشافه.")
  }, [])

  const handleFolderClick = (folder: FolderData) => {
    setSelected(folder)
    if (!explored.includes(folder.name)) {
      setExplored((prev) => [...prev, folder.name])
      onXpGain(5)
      onMessageChange(`ممتاز! مجلد ${folder.name}: ${folder.desc}`)
    }
  }

  return (
    <div
      className="space-y-5"
    >
      <section className="lam-glass-strong rounded-3xl border border-border/60 overflow-hidden">
        <div className="p-5 sm:p-8">
          <div className="inline-flex items-center gap-2 lam-glass rounded-full px-3 py-1.5 mb-5">
            <span className="size-1.5 rounded-full bg-lam-gold lam-anim-pulse-gold" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted">
              هيكل المشروع
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-lam-text mb-2">
            مستكشف مشروع Laravel
          </h2>
          <p className="text-sm text-lam-text-muted mb-6">
            اضغط على مجلد لترى شرحاً مفصلاً عن وظيفته
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-border/60 bg-lam-bg-2/60 p-4">
              <div className="text-[10px] font-mono text-lam-text-muted mb-3 tracking-wider uppercase">
                هيكل المجلدات
              </div>
              <div className="space-y-1">
                {FOLDERS.map((folder) => {
                  const isSelected = selected?.name === folder.name
                  const isExplored = explored.includes(folder.name)
                  const Icon = isSelected ? FolderOpen : Folder
                  return (
                    <button
                      key={folder.name}
                      onClick={() => handleFolderClick(folder)}
                      className={`w-full text-right flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all ${
                        isSelected
                          ? "bg-lam-gold/15 border border-lam-gold/30 text-lam-gold"
                          : isExplored
                          ? "text-lam-green hover:bg-lam-green/5"
                          : "text-lam-text-soft hover:bg-secondary/50"
                      }`}
                    >
                      <Icon className={`size-4 shrink-0 ${folder.color}`} />
                      <span className="font-mono">{folder.name}/</span>
                      {isExplored && <CheckCircle2 className="size-3.5 text-lam-green mr-auto" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-lam-bg-2/60 p-4 min-h-[300px]">
              {selected ? (
                <div
                  key={selected.name}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <selected.icon className={`size-5 ${selected.color}`} />
                    <span className={`text-sm font-bold font-mono ${selected.color}`}>
                      {selected.name}/
                    </span>
                  </div>
                  <p className="text-xs text-lam-text-soft leading-relaxed mb-3">
                    {selected.desc}
                  </p>
                  <div className="rounded-xl bg-black/40 border border-border/40 p-3">
                    <pre className="font-mono text-[11px] text-lam-text-soft/80 whitespace-pre-wrap leading-relaxed">
                      {selected.content}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Folder className="size-10 text-lam-text-muted/40 mb-3" />
                  <p className="text-xs text-lam-text-muted">
                    اختر مجلداً لاستكشاف محتواه
                  </p>
                </div>
              )}
            </div>
          </div>

          {explored.length >= FOLDERS.length && !done && (
            <div
              className="mt-6 text-center"
            >
              <p className="text-sm text-lam-green mb-3">+40 XP — استكشفت كل المجلدات!</p>
              <button
                onClick={() => {
                  setDone(true)
                  onXpGain(40)
                  onMessageChange("الآن فهمت هيكل Laravel! دعنا نرى كيف تتدفق الطلبات داخل هذا الهيكل.")
                  setTimeout(onNext, 600)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-lam-gold to-lam-orange px-6 py-3 text-sm font-bold text-lam-bg-0 lam-glow-gold"
              >
                فهم دورة حياة الطلب
                <ChevronLeft className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
