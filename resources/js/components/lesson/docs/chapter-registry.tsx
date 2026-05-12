
import { useMemo, useState } from "react"
import {
  BookOpen, Zap, Route, ListChecks, AlertCircle, Globe,
  FileText, Terminal, MessageSquare, Layers, File,
  KeyRound, Shield, ToggleLeft, Filter, FolderOpen,
  Gamepad2, Rocket, ChevronDown, ChevronUp, LucideIcon,
  CheckCircle2, XCircle, Eye, Code, Server, Database,
  ArrowRight, ArrowLeft, Cpu, Inbox, Save, Send,
  Brain, Lightbulb, Swords, Target, Workflow,
  Network, Bug, Lock, Unlock, ScrollText, Box,
  Split, Merge, Variable, Pointer, Square,
} from "lucide-react"
import type { ReactNode } from "react"
import { ValidationPlayground } from "./validation-playground"
import { Link } from "@inertiajs/react"
import { ArrowUpRight,Sparkles } from "lucide-react"
import { LessonExperience } from "@/components/lesson/lesson-experience"

/* ─── Types ─── */

export interface CodeBlock {
  lang: string
  code: string
  highlight?: number[]
  annotations?: Record<number, string>
}

export interface DocSection {
  id: string
  title: string
  content: ReactNode
  code?: CodeBlock
  visualization?: ReactNode
  notes?: string[]
  mistakes?: string[]
  bestPractices?: string[]
}

export interface Chapter {
  id: string
  number: number
  title: string
  subtitle: string
  icon: LucideIcon
  color: string
  sections: DocSection[]
}

/* ─── Shared Visualizations ─── */

function FlowArrow({ dir = "down" }: { dir?: "down" | "right" | "left" | "up" }) {
  return (
    <div className="flex justify-center py-1">
      <div>
        {dir === "down" && <ChevronDown className="size-4 text-lam-text-muted/60" />}
        {dir === "up" && <ChevronUp className="size-4 text-lam-text-muted/60" />}
        {(dir === "right") && <ArrowLeft className="size-4 text-lam-text-muted/60 ltr-flip" />}
        {(dir === "left") && <ArrowRight className="size-4 text-lam-text-muted/60 ltr-flip" />}
      </div>
    </div>
  )
}

function FlowNode({ icon: Icon, label, sub, tone = "neutral", active = false, pulse = false }: {
  icon: LucideIcon; label: string; sub?: string; tone?: string; active?: boolean; pulse?: boolean
}) {
  const t = {
    blue: "border-lam-blue/40 bg-lam-blue/10 text-lam-blue",
    gold: "border-lam-gold/40 bg-lam-gold/10 text-lam-gold",
    orange: "border-lam-orange/40 bg-lam-orange/10 text-lam-orange",
    green: "border-lam-green/40 bg-lam-green/10 text-lam-green",
    red: "border-lam-red/40 bg-lam-red/10 text-lam-red",
    neutral: "border-border/60 bg-lam-bg-2/60 text-lam-text-soft",
  }[tone] ?? "border-border/60 bg-lam-bg-2/60 text-lam-text-soft"

  return (
    <div
      className={`rounded-xl border p-3 ${t} ${active ? "lam-glow-orange" : ""}`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`size-9 rounded-lg grid place-items-center shrink-0 ${active ? "bg-lam-orange/20" : "bg-lam-bg-1/60 border border-border/50"}`}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-lam-text leading-tight">{label}</div>
          {sub && <div className="text-[11px] font-mono text-lam-text-muted truncate">{sub}</div>}
        </div>
      </div>
        {pulse && (
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 rounded-full bg-lam-gold"
          />
        )}
    </div>
  )
}

function ArchitectureCard({ children, tone = "gold" }: { children: ReactNode; tone?: string }) {
  const t = tone === "gold" ? "border-lam-gold/30 bg-lam-gold/5" :
    tone === "orange" ? "border-lam-orange/30 bg-lam-orange/5" :
    tone === "green" ? "border-lam-green/30 bg-lam-green/5" :
    tone === "blue" ? "border-lam-blue/30 bg-lam-blue/5" :
    tone === "red" ? "border-lam-red/30 bg-lam-red/5" :
    "border-border/60 bg-lam-bg-2/60"
  return (
    <div className={`rounded-xl border ${t} p-4`}>{children}</div>
  )
}

function Note({ type = "info", children }: { type?: "info" | "warning" | "tip" | "danger"; children: ReactNode }) {
  const m = {
    info: { icon: Eye, bg: "bg-lam-blue/5 border-lam-blue/30 text-lam-blue", text: "text-lam-blue" },
    warning: { icon: AlertCircle, bg: "bg-lam-orange/5 border-lam-orange/30 text-lam-orange", text: "text-lam-orange" },
    tip: { icon: Lightbulb, bg: "bg-lam-gold/5 border-lam-gold/30 text-lam-gold", text: "text-lam-gold" },
    danger: { icon: Bug, bg: "bg-lam-red/5 border-lam-red/30 text-lam-red", text: "text-lam-red" },
  }[type]
  const Icon = m.icon
  return (
    <div className={`rounded-lg border ${m.bg} p-3 flex items-start gap-2.5`}>
      <Icon className={`size-4 shrink-0 mt-0.5 ${m.text}`} />
      <p className="text-xs text-lam-text-soft leading-relaxed">{children}</p>
    </div>
  )
}

function CodeBlock({ lang, code, highlight = [], annotations = {} }: CodeBlock) {
  return (
    <div className="rounded-xl overflow-hidden border border-border/60 bg-lam-bg-2/80">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/60 bg-lam-bg-1/60">
        <span className="text-[10px] font-mono text-lam-text-muted">{lang}</span>
      </div>
      <pre dir="ltr" className="font-mono text-[11.5px] leading-[1.75] p-3 text-lam-text-soft/95 overflow-x-auto">
        {code.split("\n").map((line, i) => {
          const hl = highlight.includes(i + 1)
          const ann = annotations[i + 1]
          return (
            <div key={i} className={`flex items-start gap-3 px-2 -mx-2 rounded ${hl ? "bg-lam-orange/15 border-r-2 border-lam-orange" : ""}`}>
              <span className="select-none text-[10px] text-lam-text-muted/60 w-5 text-right pt-0.5">{i + 1}</span>
              <span className="flex-1 whitespace-pre" dangerouslySetInnerHTML={{
                __html: line
                  .replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="text-lam-blue">$1</span>')
                  .replace(/(\{|\}|\(|\)|;)/g, '<span class="text-lam-text-muted">$1</span>')
                  .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="text-lam-green">$1</span>')
                  .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-lam-green">$1</span>')
                  .replace(/\b(public|protected|private|function|return|use|namespace|class|new|static|const|if|else|foreach|throw|catch|extends|implements)\b/g, '<span class="text-lam-orange">$1</span>')
              }} />
              {ann && <span className="text-[10px] text-lam-gold shrink-0 max-w-[160px] truncate" title={ann}>{ann}</span>}
            </div>
          )
        })}
      </pre>
    </div>
  )
}

function ArchitectureFlow({ nodes, activeIdx = -1 }: { nodes: { icon: LucideIcon; label: string; sub: string; tone: string }[]; activeIdx?: number }) {
  return (
    <div className="space-y-2">
      {nodes.map((node, i) => (
        <div key={i}>
          <FlowNode {...node} active={i === activeIdx} pulse={i === activeIdx} />
          {i < nodes.length - 1 && <FlowArrow />}
        </div>
      ))}
    </div>
  )
}

function RuleCard({ name, desc, example, internal, mistake, useCase }: {
  name: string; desc: string; example: string; internal: string; mistake: string; useCase: string
}) {
  return (
    <div className="rounded-xl border border-lam-gold/30 bg-lam-gold/5 p-4 space-y-3 hover:border-lam-gold/60 transition-colors">
      <div className="font-mono text-lg font-black text-lam-gold">{name}</div>
      <CodeBlock lang="PHP" code={example} />
      <div className="grid gap-2 text-xs">
        <ArchitectureCard tone="blue"><span className="font-bold text-lam-blue">الغرض:</span> {desc}</ArchitectureCard>
        <ArchitectureCard tone="orange"><span className="font-bold text-lam-orange">السلوك الداخلي:</span> {internal}</ArchitectureCard>
        <ArchitectureCard tone="green"><span className="font-bold text-lam-green">الاستخدام:</span> {useCase}</ArchitectureCard>
        <ArchitectureCard tone="red"><span className="font-bold text-lam-red">خطأ شائع:</span> {mistake}</ArchitectureCard>
      </div>
    </div>
  )
}

function InteractiveCode({ code, lang = "PHP" }: { code: string; lang?: string }) {
  return (
    <div className="group rounded-xl overflow-hidden border border-border/60 bg-lam-bg-2/80 transition-all hover:border-lam-gold/40">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-lam-bg-1/60">
        <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-lam-red/80" /><span className="size-2.5 rounded-full bg-lam-gold/80" /><span className="size-2.5 rounded-full bg-lam-green/80" /></div>
        <span className="text-[11px] font-mono text-lam-text-muted mr-2">{lang}</span>
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-lam-text-muted/60 opacity-0 group-hover:opacity-100 transition-opacity">انقر على سطر للشرح</span>
      </div>
      <pre dir="ltr" className="font-mono text-[11.5px] leading-[1.75] p-4 text-lam-text-soft/95 overflow-x-auto cursor-default">
        {code.split("\n").map((line, i) => (
          <HoverableLine key={i} line={line} n={i + 1} />
        ))}
      </pre>
    </div>
  )
}

function HoverableLine({ line, n }: { line: string; n: number }) {
  const explanations: Record<string, string> = {
    required: "تضمن وجود القيمة — إذا كانت فارغة، يرفض الطلب فوراً",
    validate: "نقطة الدخول لمحرك التحقق — يحوّل القواعد النصية إلى Rule objects",
    email: "يستخدم EmailValidator مع خيار RFC للتأكد من صيغة البريد",
    integer: "يحوّل القيمة إلى int ويضمن أنها عدد صحيح، يرفض الكسور والنصوص",
    min: "يحدد الحد الأدنى للقيمة — يختلف معناه حسب النوع (نص/رقم/ملف)",
    max: "يحدد الحد الأعلى للقيمة — يحمي قاعدة البيانات من التضخم",
    unique: "ينفّذ استعلام SELECT COUNT(*) للتحقق من عدم التكرار في الجدول",
    exists: "يتحقق من وجود القيمة في جدول آخر — يُستخدم في الـ foreign keys",
    nullable: "يسمح بأن تكون القيمة null — مفيد للحقول الاختيارية",
    confirmed: "يبحث تلقائياً عن field_confirmation ويقارن القيمتين",
    array: "يضمن أن القيمة مصفوفة — يفحص is_array() داخلياً",
    image: "يتحقق من أن الملف صورة — يفحص mime type وابعاد الصورة",
    password: "يتحقق من تعقيد كلمة المرور — أحرف/أرقام/رموز",
  }

  const found = Object.entries(explanations).find(([key]) => line.includes(key))
  return (
    <div className="group/line flex items-start gap-3 px-2 -mx-2 rounded hover:bg-lam-gold/5 transition-colors relative">
      <span className="select-none text-[10px] text-lam-text-muted/40 w-5 text-right pt-0.5">{n}</span>
      <span className="flex-1 whitespace-pre" dangerouslySetInnerHTML={{
        __html: line
          .replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="text-lam-blue">$1</span>')
          .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="text-lam-green">$1</span>')
          .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-lam-green">$1</span>')
          .replace(/\b(public|protected|private|function|return|use|namespace|class|new|static|const|if|else|foreach|throw|catch|extends|implements|fn)\b/g, '<span class="text-lam-orange">$1</span>')
          .replace(/\b(required|email|integer|min|max|unique|exists|nullable|confirmed|array|image|password|string|boolean|numeric|date|url|ip|uuid|json)\b/g, '<span class="text-lam-gold">$1</span>')
      }} />
      {found && (
        <div className="absolute right-0 top-0 translate-x-[calc(100%+8px)] hidden group-hover/line:block z-50 w-56">
          <div className="bg-lam-bg-0 border border-lam-gold/40 rounded-xl p-2.5 text-[10px] text-lam-text-soft leading-relaxed shadow-2xl">
            <span className="text-lam-gold font-bold">{found[0]}</span>: {found[1]}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Chapter Sections ─── */

const sharedStyles = {
  section: "space-y-5",
  heading: "font-serif text-2xl sm:text-3xl font-black text-lam-text text-balance",
  subheading: "text-sm sm:text-base text-lam-text-soft leading-relaxed text-pretty",
  chip: "text-[10px] font-mono uppercase tracking-[0.18em] text-lam-text-muted mb-1",
}

/* ─── Chapter 1: Introduction ─── */
const introSections: DocSection[] = [
  {
    id: "why-validate",
    title: "لماذا التحقق من البيانات؟",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>في عالم الويب، كل طلب يصل لخادمك هو وعد قابل للكسر. المستخدمون قد يرسلون حقولاً فارغة، نصوصاً في حقول أرقام، أو حتى محاولات اختراق صريحة مثل SQL Injection و XSS. مهمتنا كمهندسي Laravel أن نضع طبقة دفاع صلبة بين التطبيق وأي مدخل خارجي.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: Shield, title: "بيانات غير موثوقة", desc: "كل طلب قادم من المتصفح يجب اعتباره مدخلاً معادياً حتى يُثبت العكس", color: "orange" },
            { icon: Database, title: "فساد قواعد البيانات", desc: "حفظ بيانات غير صالحة يُلوّث الجداول ويصعّب الاستعلام مستقبلاً", color: "red" },
            { icon: Lock, title: "ثغرات أمنية", desc: "غياب التحقق يفتح الباب لـ SQL Injection و XSS وتجاوز الصلاحيات", color: "red" },
            { icon: Bug, title: "انهيار التطبيق", desc: "بيانات مشوّهة قد تُسقط معالجات الخلفية وتُوقف الخدمة", color: "orange" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className={`rounded-xl border border-lam-${color}/30 bg-lam-${color}/5 p-4`}>
              <div className={`size-9 rounded-lg bg-lam-${color}/15 border border-lam-${color}/30 grid place-items-center mb-2`}>
                <Icon className={`size-4 text-lam-${color}`} />
              </div>
              <h4 className="text-sm font-bold text-lam-text mb-1">{title}</h4>
              <p className="text-xs text-lam-text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    notes: ["كل طلب HTTP يجب أن يمر عبر طبقة تحقق", "التحقق على الواجهة ليس بديلاً عن تحقق الخادم", "Laravel يوفر 90+ قاعدة تحقق جاهزة"],
    mistakes: ["الاعتماد على JavaScript فقط للتحقق", "تجاهل التحقق من الحقول الاختيارية", "عدم توحيد رسائل الأخطاء"],
    bestPractices: ["تحقق دائماً في الخادم — الواجهة مجرد تحسين", "استخدم Form Requests للتحقق المنظم", "خصص رسائل الأخطاء لتتناسب مع تطبيقك"],
  },
  {
    id: "laravel-philosophy",
    title: "فلسفة Laravel في التحقق",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>Laravel يتبنى فلسفة "التعبيرية والأناقة" — التحقق ليس استثناء. بدلاً من كتابة عشرات if-statements، تعلن قواعدك بشكل توصيفي. المحرّك يتولى الباقي.</p>
        <InteractiveCode code={`// Laravel Way — تصريحي
$validated = $request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
    'age' => 'required|integer|min:18',
]);

// PHP Classic — إجرائي (40+ سطر)
if (empty($_POST['name'])) { /* ... */ }
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) { /* ... */ }`} />
      </div>
    ),
    visualization: (
      <ArchitectureFlow nodes={[
        { icon: Globe, label: "المتصفح", sub: "يرسل البيانات", tone: "blue" },
        { icon: Server, label: "Laravel", sub: "يستقبل الطلب", tone: "gold" },
        { icon: ListChecks, label: "Validation Engine", sub: "يمرر القواعد", tone: "orange" },
        { icon: Database, label: "قاعدة البيانات", sub: "تستقبل بيانات نظيفة", tone: "green" },
      ]} />
    ),
  },
]

/* ─── Chapter 2: Validation Quickstart ─── */
const quickstartSections: DocSection[] = [
  {
    id: "basic-usage",
    title: "الاستخدام الأساسي",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>أبسط طريقة للتحقق هي استخدام التابع <code className="font-mono text-lam-gold text-sm">validate()</code> على كائن <code className="font-mono text-lam-gold text-sm">Request</code>. في حالة الفشل، يُولّد استثناء ويرد تلقائياً.</p>
        <InteractiveCode code={`<?php
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        // تلقائياً: إذا فشل التحقق، يُعاد المستخدم مع الأخطاء
        Post::create($validated);
        return redirect('/posts');
    }
}`} />
      </div>
    ),
    notes: ["validate() يرمي ValidationException تلقائياً", "في طرق Inertia، الأخطاء تُمرر كـ props", "البيانات القديمة (old input) تُحفظ تلقائياً"],
    mistakes: ["نسيان استيراد Request من Illuminate namespace", "وضع قواعد غير موجودة (typo في اسم القاعدة)", "عدم التعامل مع حالة JSON عندما يريد المستخدم JSON"],
    bestPractices: ["ابدأ بقاعدة required لكل حقل إلزامي", "استخدم قواعد النوع: string, integer, boolean, etc", "ضع الحدود: max:255 يحمي قاعدة البيانات"],
  },
  {
    id: "on-failure",
    title: "ماذا يحدث عند الفشل؟",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>عند فشل التحقق، Laravel ينفذ تسلسلاً دقيقاً:</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon: XCircle, title: "1. يرمي استثناء", desc: "ValidationException يُلتقط تلقائياً", color: "red" },
            { icon: Save, title: "2. يخزّن الأخطاء", desc: "MessageBag في الجلسة مع old input", color: "orange" },
            { icon: Send, title: "3. يعيد التوجيه", desc: "redirect → الصفحة السابقة أو JSON 422", color: "green" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className={`rounded-xl border border-lam-${color}/30 bg-lam-${color}/5 p-3`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`size-4 text-lam-${color}`} />
                <h4 className="text-xs font-bold text-lam-text">{title}</h4>
              </div>
              <p className="text-[11px] text-lam-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    visualization: (
      <ArchitectureFlow nodes={[
        { icon: ListChecks, label: "التحقق يفشل", sub: "قاعدة مكسورة", tone: "red" },
        { icon: AlertCircle, label: "ValidationException", sub: "يُرمى تلقائياً", tone: "orange" },
        { icon: Save, label: "Session", sub: "errors + old input", tone: "gold" },
        { icon: Send, label: "رد 422 / Redirect", sub: "مع رسائل الأخطاء", tone: "green" },
      ]} />
    ),
  },
]

/* ─── Chapter 3: Request Lifecycle ─── */
const lifecycleSections: DocSection[] = [
  {
    id: "full-flow",
    title: "الرحلة الكاملة للطلب",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>عندما يصل طلب POST إلى تطبيق Laravel، يمر عبر 5 محطات رئيسية قبل أن يصل إلى منطق عملك. كل محطة لها مسؤولية محددة.</p>
      </div>
    ),
    visualization: (
      <ArchitectureFlow nodes={[
        { icon: Globe, label: "المتصفح", sub: "يرسل POST /posts", tone: "blue" },
        { icon: Server, label: "HTTP Kernel", sub: "Boot + Middleware", tone: "gold" },
        { icon: Route, label: "Router", sub: "يطابق المسار", tone: "gold" },
        { icon: FileText, label: "Controller", sub: "PostController@store", tone: "orange" },
        { icon: ListChecks, label: "Validation Engine", sub: "$request->validate()", tone: "orange" },
      ]} />
    ),
  },
  {
    id: "lifecycle-details",
    title: "تفاصيل كل محطة",
    content: (
      <div className="space-y-4">
        {[
          { icon: Globe, title: "1. المتصفح", desc: "يرسل الطلب مع البيانات. سواء كان form HTML أو JSON من API.", details: "يُشفّر البيانات حسب Content-Type: multipart/form-data للملفات، application/json لـ API." },
          { icon: Server, title: "2. HTTP Kernel", desc: "Bootstraps التطبيق: تحميل config، تسجيل Service Providers، تشغيل middleware.", details: "Middleware العامة: TrimStrings, TrustProxies, EncryptCookies." },
          { icon: Route, title: "3. Router", desc: "يطابق URL مع مسار في web.php أو api.php.", details: "يستخرج معاملات المسار ويحقنها في الـ Controller." },
          { icon: FileText, title: "4. Controller", desc: "ينفذ logic الـ Controller. هنا نضع $request->validate().", details: "قبل تنفيذ أي logic عمل، نتحقق من صحة البيانات." },
          { icon: ListChecks, title: "5. Validation Engine", desc: "يمرر على كل قاعدة. إذا فشلت أي قاعدة، يرمي ValidationException.", details: "يوزع القواعد إلى Rule objects، ينفذها، يجمع الأخطاء في MessageBag." },
        ].map(({ icon: Icon, title, desc, details }) => (
          <ArchitectureCard key={title}>
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-lg bg-lam-gold/10 border border-lam-gold/30 grid place-items-center shrink-0"><Icon className="size-4 text-lam-gold" /></div>
              <div>
                <h4 className="text-sm font-bold text-lam-text">{title}</h4>
                <p className="text-xs text-lam-text-soft mt-1">{desc}</p>
                <p className="text-[11px] text-lam-text-muted mt-1">{details}</p>
              </div>
            </div>
          </ArchitectureCard>
        ))}
      </div>
    ),
  },
]

/* ─── Chapter 4: Validation Rules ─── */
const rulesSections: DocSection[] = [
  {
    id: "available-rules",
    title: "قواعد التحقق المتاحة",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>Laravel يوفر أكثر من 90 قاعدة تحقق جاهزة. هنا أهم القواعد الأساسية مع شرح كامل لكل منها.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "required", desc: "يضمن وجود القيمة وعدم كونها فارغة", example: "'field' => 'required'", internal: "يفحص empty() — يرفض '', null, [], false" },
            { name: "nullable", desc: "يسمح بأن تكون القيمة null", example: "'field' => 'nullable|string'", internal: "يتجاوز التحقق إذا كانت القيمة null" },
            { name: "string", desc: "يضمن أن القيمة نص", example: "'field' => 'required|string'", internal: "يفحص is_string()" },
            { name: "integer", desc: "يضمن أن القيمة عدد صحيح", example: "'age' => 'required|integer'", internal: "يفحص is_int() أو filter_var" },
            { name: "boolean", desc: "يقبل true/false/1/0/'1'/'0'", example: "'active' => 'boolean'", internal: "يُمرّر عبر filter_var($val, FILTER_VALIDATE_BOOLEAN)" },
            { name: "email", desc: "يتحقق من صيغة البريد الإلكتروني", example: "'email' => 'required|email'", internal: "يستخدم EmailValidator مع RFC" },
            { name: "min:N", desc: "الحد الأدنى للقيمة", example: "'age' => 'min:18'", internal: "يقيس الطول للنصوص، القيمة للأرقام" },
            { name: "max:N", desc: "الحد الأعلى للقيمة", example: "'bio' => 'max:500'", internal: "نفس آلية min بالعكس" },
            { name: "unique:table,col", desc: "يمنع التكرار في جدول DB", example: "'email' => 'unique:users,email'", internal: "SELECT COUNT(*) FROM users WHERE email = ?" },
            { name: "exists:table,col", desc: "يتحقق من وجود القيمة في جدول آخر", example: "'user_id' => 'exists:users,id'", internal: "SELECT COUNT(*) WHERE id = ?" },
            { name: "confirmed", desc: "يتطلب حقل تأكيد", example: "'password' => 'confirmed'", internal: "يبحث عن password_confirmation ويقارن" },
            { name: "array", desc: "يضمن أن القيمة مصفوفة", example: "'tags' => 'required|array'", internal: "يفحص is_array()" },
            { name: "image", desc: "يتحقق أن الملف صورة", example: "'photo' => 'image|max:2048'", internal: "يفحص mime type: jpeg, png, gif, webp" },
            { name: "date", desc: "يتحقق أن القيمة تاريخ صالح", example: "'published_at' => 'nullable|date'", internal: "يحاول strtotime() أو Carbon" },
            { name: "url", desc: "يتحقق من صيغة URL", example: "'website' => 'required|url'", internal: "يستخدم filter_var(FILTER_VALIDATE_URL)" },
          ].map(({ name, desc, example, internal }) => (
            <RuleCard key={name} name={name} desc={desc} example={example} internal={internal} mistake="" useCase="" />
          ))}
        </div>
      </div>
    ),
  },
]

/* ─── Chapter 5: Displaying Errors ─── */
const errorDisplaySections: DocSection[] = [
  {
    id: "error-messages",
    title: "عرض الأخطاء في الواجهة",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>بعد أن يكتشف المحرّك الأخطاء، تحتاج إلى عرضها للمستخدم. Laravel يمرّر الأخطاء تلقائياً عبر Inertia كـ prop باسم <code className="font-mono text-lam-gold">errors</code>.</p>
        <InteractiveCode code={`// في Blade (Traditional)
@error('email')
    <p class="text-red-500">{{ $message }}</p>
@enderror

// في React + Inertia
const { errors } = usePage().props
{errors.email && (
    <p className="text-red-500">{errors.email}</p>
)}

// عبر useForm
const { data, setData, post, errors } = useForm()
{errors.email && <span>{errors.email}</span>}`} />
      </div>
    ),
    notes: ["الأخطاء تُمرر ككائن errors في Inertia", "استخدم @error في Blade للشرطية", "errors مفتاحه هو اسم الحقل"],
    mistakes: ["نسيان استيراد useForm من @inertiajs/react", "الوصول إلى errors.field قبل التأكد من وجوده", "عدم تنظيف الأخطاء بعد التصحيح"],
    bestPractices: ["اعرض الأخطاء بجانب كل حقل", "استخدم ألوان واضحة (أحمر/برتقالي)", "أضف تلميحات للتصحيح"],
  },
  {
    id: "error-format",
    title: "تنسيق الأخطاء",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>كائن errors هو MessageBag — يمكنك تنسيقه بأشكال مختلفة:</p>
        <InteractiveCode code={`// الحصول على أول خطأ لحقل
$errors->first('email')

// كل الأخطاء لحقل معين
$errors->get('email')

// جميع الأخطاء
$errors->all()

// التحقق من وجود خطأ
$errors->has('email')

// تنسيق مخصص
@error('email', 'login')
    <span>{{ $message }}</span>
@enderror`} />
      </div>
    ),
  },
]

/* ─── Chapter 6: XHR Validation ─── */
const xhrSections: DocSection[] = [
  {
    id: "ajax-requests",
    title: "التعامل مع طلبات AJAX",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>عندما يكون الطلب AJAX/XHR (أو يتوقع JSON)، Laravel لا يعيد redirect — بل يرد باستجابة JSON 422 مع جميع الأخطاء.</p>
        <InteractiveCode code={`// Laravel يكتشف XHR تلقائياً
// ويعيد:
{
    "message": "The given data was invalid.",
    "errors": {
        "email": ["البريد الإلكتروني مطلوب"],
        "name": ["الاسم طويل جداً"]
    }
}

// في JavaScript (fetch)
const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})

if (!res.ok && res.status === 422) {
    const { errors } = await res.json()
    // errors هنا هو كائن الأخطاء
}`} />
      </div>
    ),
    notes: ["Laravel يفحص $request->expectsJson()", "XHR: استجابة 422 مع JSON errors", "Non-XHR: redirect إلى الخلف مع أخطاء الجلسة"],
    mistakes: ["نسيان إرسال CSRF token مع fetch", "عدم التحقق من status 422", "معاملة JSON errors كسلسلة نصية"],
    bestPractices: ["استخدم axios أو fetch مع اعتراض الأخطاء", "اعرض كل خطأ بجانب حقله", "سجّل الأخطاء للتصحيح أثناء التطوير"],
  },
]

/* ─── Chapter 7: Form Request Validation ─── */
const formRequestSections: DocSection[] = [
  {
    id: "form-request-intro",
    title: "لماذا Form Request؟",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>مع نمو التطبيق، يصبح وضع قواعد التحقق داخل الـ Controller فوضوياً. Form Requests تسمح لك باستخراج منطق التحقق إلى كلاس مخصص، مع فوائد إضافية: الترخيص (Authorization)، تخصيص الرسائل، وخطافات ما قبل/بعد التحقق.</p>
      </div>
    ),
    visualization: (
      <ArchitectureFlow nodes={[
        { icon: Globe, label: "Browser", sub: "HTTP Request", tone: "blue" },
        { icon: FileText, label: "StorePostRequest", sub: "extends FormRequest", tone: "gold" },
        { icon: Lock, label: "authorize()", sub: "التحقق من الصلاحية", tone: "orange" },
        { icon: ListChecks, label: "rules()", sub: "تعريف القواعد", tone: "orange" },
        { icon: Cpu, label: "Validation Engine", sub: "تنفيذ التحقق", tone: "orange" },
        { icon: Server, label: "Controller", sub: "تنفيذ المنطق", tone: "green" },
      ]} />
    ),
  },
  {
    id: "creating-form-request",
    title: "إنشاء Form Request",
    content: (
      <div className="space-y-4">
        <InteractiveCode code={`// Artisan command
php artisan make:request StorePostRequest

// الملف الناتج: app/Http/Requests/StorePostRequest.php
<?php
namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        // تحقق من صلاحية المستخدم
        return $this->user()->can('create', Post::class);
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'عنوان المقال مطلوب',
            'body.required' => 'محتوى المقال مطلوب',
            'category_id.exists' => 'التصنيف المحدد غير موجود',
        ];
    }
}`} />
      </div>
    ),
  },
  {
    id: "form-request-methods",
    title: "جميع دوال Form Request",
    content: (
      <div className="space-y-4">
        {[
          { icon: Lock, name: "authorize()", desc: "تتحقق من صلاحية المستخدم لتنفيذ هذا الطلب. إذا أعادت false، Laravel يرد بـ 403." },
          { icon: ListChecks, name: "rules()", desc: "تعريف قواعد التحقق. تُنفّذ بعد authorize(). المصفوفة تُمرّر مباشرة لمحرك التحقق." },
          { icon: MessageSquare, name: "messages()", desc: "رسائل أخطاء مخصصة لكل قاعدة. استخدم 'field.rule' كمفتاح." },
          { icon: Filter, name: "attributes()", desc: "أسماء مخصصة للحقول — تُستخدم في رسائل الأخطاء التلقائية: 'field' => 'حقل مخصص'." },
          { icon: Inbox, name: "prepareForValidation()", desc: "تُنفّذ قبل التحقق. استخدمها لتعديل البيانات أو إضافة حقول مشتقة." },
          { icon: Send, name: "passedValidation()", desc: "تُنفّذ بعد نجاح التحقق. استخدمها لأي منطق بعد التأكيد." },
        ].map(({ icon: Icon, name, desc }) => (
          <ArchitectureCard key={name}>
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-lg bg-lam-orange/10 border border-lam-orange/30 grid place-items-center shrink-0"><Icon className="size-4 text-lam-orange" /></div>
              <div>
                <h4 className="font-mono text-sm font-bold text-lam-text">{name}()</h4>
                <p className="text-xs text-lam-text-soft mt-1">{desc}</p>
              </div>
            </div>
          </ArchitectureCard>
        ))}
      </div>
    ),
    notes: ["authorize() يُستدعى قبل rules()", "messages() تدعم wildcard: '*.required'", "passedValidation() مفيدة لتسجيل الأحداث"],
    mistakes: ["نسيان تعريف authorize() — يعيد true افتراضياً", "وضع Logic أعمال في rules()", "عدم استخدام type hints للمعاملات"],
    bestPractices: ["استخدم Form Request لكل عملية create/update", "قسّم Form Requests حسب Use Case", "استخدم messages() لترجمة الأخطاء"],
  },
]

/* ─── Chapter 8: Manual Validators ─── */
const manualValidatorsSections: DocSection[] = [
  {
    id: "manual-validator",
    title: "إنشاء Validator يدوي",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>أحياناً تحتاج إلى تحكم كامل في عملية التحقق. يمكنك إنشاء Validator يدوياً باستخدام <code className="font-mono text-lam-gold">Validator::make()</code>.</p>
        <InteractiveCode code={`<?php
use Illuminate\\Support\\Facades\\Validator;

$validator = Validator::make($request->all(), [
    'title' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
]);

if ($validator->fails()) {
    // تحكم كامل في الرد
    return redirect()->back()
        ->withErrors($validator)
        ->withInput();
}

$validated = $validator->validated();
// أو: $validator->safe()->all()`} />
      </div>
    ),
    notes: ["Validator::make() لا يرمي استثناء تلقائياً", "fails() ترجع true إذا فشل التحقق", "validated() تعيد البيانات الصالحة فقط"],
    mistakes: ["نسيان استيراد Validator facade", "استخدام validated() قبل التحقق من الفشل", "عدم تمرير old input عند العودة"],
    bestPractices: ["استخدم Manual Validator للتحقق المعقّد", "withErrors() يمرر الأخطاء كـ MessageBag", "استخدم safe() للحصول على بيانات آمنة"],
  },
  {
    id: "manual-validator-visual",
    title: "التحكم في الرد",
    content: (
      <div className="grid sm:grid-cols-2 gap-3">
        <InteractiveCode code={`// نجاح
$validator->validated()
// ['title' => '...', 'email' => '...']`} />
        <InteractiveCode code={`// فشل
$validator->errors()
// ['email' => ['البريد موجود مسبقاً']]`} />
      </div>
    ),
  },
]

/* ─── Chapter 9: Custom Error Messages ─── */
const customMessagesSections: DocSection[] = [
  {
    id: "custom-errors",
    title: "تخصيص رسائل الأخطاء",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>رسائل الأخطاء الافتراضية بالإنگليزية. يمكنك تخصيصها بعدة طرق: لكل حقل، لكل قاعدة، أو حتى ترجمة كاملة.</p>
        <InteractiveCode code={`// الطريقة 1: في Form Request
public function messages(): array
{
    return [
        'title.required' => 'عنوان المقال مطلوب',
        'email.required' => 'البريد الإلكتروني مطلوب',
        'email.email' => 'صيغة البريد غير صحيحة',
        'age.min' => 'العمر يجب أن يكون 21 سنة على الأقل',
    ];
}

// الطريقة 2: في validate()
$validated = $request->validate([
    'email' => 'required|email',
], [
    'email.required' => 'نسيت كتابة البريد!',
    'email.email' => 'هذا ليس بريداً صحيحاً',
]);

// الطريقة 3: ملفات الترجمة resources/lang/ar/validation.php
return [
    'required' => 'حقل :attribute مطلوب',
    'email' => 'حقل :attribute يجب أن يكون بريداً صحيحاً',
    'attributes' => [
        'email' => 'البريد الإلكتروني',
    ],
];`} />
      </div>
    ),
    notes: ["استخدم 'field.rule' كمفتاح للرسالة", ":attribute يستبدل باسم الحقل", "ملفات الترجمة تؤثر على كل التطبيق"],
    mistakes: ["نسيان النقطة بين اسم الحقل والقاعدة", "وضع رسائل في validate() تجعل الكود مضخماً", "عدم توحيد لغة الرسائل"],
    bestPractices: ["استخدم Form Request للرسائل المخصصة", "ترجم كل الرسائل للعربية", "استخدم :attribute لرسائل ديناميكية"],
  },
]

/* ─── Chapter 10: Nested Array Validation ─── */
const nestedArraySections: DocSection[] = [
  {
    id: "nested-validation",
    title: "التحقق من المصفوفات المتداخلة",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>عندما ترسل مصفوفة من الحقول (مثل items[0][name])، استخدم النقطة . للوصول إلى الحقول المتداخلة، والعلامة * لتطبيق القاعدة على كل عنصر.</p>
        <InteractiveCode code={`// إرسال:
// items[0][name] = "Product 1"
// items[0][qty] = "2"
// items[1][name] = "Product 2"
// items[1][qty] = "three"

$validated = $request->validate([
    'items' => 'required|array',
    'items.*.name' => 'required|string|max:255',
    'items.*.qty' => 'required|integer|min:1',
]);

// الأخطاء:
// items.1.qty => "The items.1.qty must be an integer."

// رسالة مخصصة للحقول المتداخلة:
'messages' => [
    'items.*.name.required' => 'اسم المنتج مطلوب',
    'items.*.qty.integer' => 'الكمية يجب أن تكون رقماً',
],`} />
      </div>
    ),
    notes: ["* تعني لكل عنصر في المصفوفة", "النقطة . تفصل بين مستويات التداخل", "الأخطاء تُرقّم تلقائياً (items.1.qty)"],
    mistakes: ["نسيان التحقق من أن الحقل الأساسي هو array", "استخدام فهرس ثابت بدل *", "عدم التحقق من الحد الأقصى لعدد العناصر"],
    bestPractices: ["استخدم * لفحص كل العناصر", "استخدم min و max للتحكم بحجم المصفوفة", "خصص رسائل الأخطاء للحقول المتداخلة"],
  },
]

/* ─── Chapter 11: File Validation ─── */
const fileValidationSections: DocSection[] = [
  {
    id: "file-rules",
    title: "قواعد التحقق من الملفات",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>Laravel يوفر قواعد متخصصة للتحقق من الملفات: الحجم، النوع، الأبعاد. كل هذه القواعد تعمل مع ملفات صور، PDF، فيديو، إلخ.</p>
        <InteractiveCode code={`// الصور
'photo' => 'required|image|mimes:jpeg,png,gif,webp|max:2048|dimensions:min_width=100,min_height=100'

// الملفات العامة
'document' => 'required|file|mimes:pdf,doc,docx|max:10240'

// الفيديو
'video' => 'required|mimetypes:video/mp4,video/avi|max:51200'

// أبعاد الصورة
'avatar' => 'dimensions:ratio=1/1'

// التحميلات المتعددة
'photos' => 'required|array'
'photos.*' => 'image|max:2048'`} />
      </div>
    ),
    notes: ["max يقاس بالكيلوبايت (KB)", "image يفحص mime type تلقائياً", "dimensions يفحص العرض والارتفاع"],
    mistakes: ["وضع max بالميغابايت بدل الكيلوبايت", "نسيان mimes للسماح بأنواع محددة", "عدم التحقق من حجم الملف الإجمالي للمصفوفات"],
    bestPractices: ["حدد mimes بدقة لمنع الملفات الضارة", "استخدام image لفحص الصور الحقيقية", "تحقق دائماً من max للملفات"],
  },
]

/* ─── Chapter 12: Password Validation ─── */
const passwordValidationSections: DocSection[] = [
  {
    id: "password-rules",
    title: "تحقق متقدم لكلمات المرور",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>Laravel 9+ قدم قاعدة <code className="font-mono text-lam-gold">password</code> للتحقق من تعقيد كلمة المرور. يمكنك تخصيص مستوى التعقيد.</p>
        <InteractiveCode code={`// القاعدة الأساسية
'password' => 'required|confirmed|password:min:8'

// مع خيارات التعقيد
use Illuminate\\Validation\\Rules\\Password;

'password' => [
    'required',
    'confirmed',
    Password::min(8)
        ->letters()       // يجب أن تحتوي على أحرف
        ->mixedCase()     // أحرف كبيرة وصغيرة
        ->numbers()       // أرقام
        ->symbols(),      // رموز
],

// كلمة مرور افتراضية عبر AppServiceProvider
public function boot(): void
{
    Password::defaults(function () {
        return Password::min(12)->letters()->mixedCase()->numbers()->symbols();
    });
}

// الاستخدام بعد تعيين الافتراضي
'password' => ['required', 'confirmed', Password::defaults()],`} />
      </div>
    ),
    notes: ["confirmed يتطلب حقل password_confirmation", "Password::min() للحد الأدنى للطول", "الأفضل تعيين defaults في AppServiceProvider"],
    mistakes: ["نسيان إضافة حقل password_confirmation", "عدم استخدام خيارات التعقيد الكافية", "وضع حدود ضيقة جداً تزعج المستخدمين"],
    bestPractices: ["استخدم Password rule مع خيارات التعقيد", "اعرض شروط كلمة المرور للمستخدم", "استخدم defaults لتوحيد القواعد"],
  },
]

/* ─── Chapter 13: Custom Validation Rules ─── */
const customRulesSections: DocSection[] = [
  {
    id: "custom-closures",
    title: "قواعد مخصصة باستخدام Closures",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>عندما لا تكفي القواعد الجاهزة، أنشئ قواعدك المخصصة. هناك 3 طرق لإنشاء قاعدة مخصصة حسب تعقيدها.</p>
        <InteractiveCode code={`// الطريقة 1: Closure (للبسطة)
$request->validate([
    'promo_code' => [
        'required',
        'string',
        function (string $attribute, mixed $value, Closure $fail) {
            if (!in_array($value, ['LAUNCH2024', 'SPACE50'])) {
                $fail('كود الترويج غير صالح');
            }
        },
    ],
]);

// الطريقة 2: Artisan command
// php artisan make:rule Uppercase
// app/Rules/Uppercase.php
namespace App\\Rules;

use Closure;
use Illuminate\\Contracts\\Validation\\ValidationRule;

class Uppercase implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strtoupper($value) !== $value) {
            $fail('حقل :attribute يجب أن يكون بأحرف كبيرة');
        }
    }
}`} />
      </div>
    ),
    notes: ["Closure يُستدعى لكل قيمة", "ValidationRule interface يحتوي على validate()", "$fail يقبل Closure — استدعها مع رسالة الخطأ"],
    mistakes: ["نسيان استيراد Closure", "وضع منطق معقّد في Closure بدل Rule class", "عدم إرجاع رسالة خطأ واضحة"],
    bestPractices: ["استخدم Rule classes للقواعد المعقّدة", "closures تكفي للقواعد البسيطة", "اختبر القواعد المخصصة جيداً"],
  },
  {
    id: "custom-rule-classes",
    title: "فئات القواعد المخصصة",
    content: (
      <div className="space-y-4">
        <InteractiveCode code={`// الطريقة 3: Rule objects (الأكثر مرونة)
use Illuminate\\Validation\\Rules\\RequiredIf;

$request->validate([
    'coupon_code' => [
        'required_if:plan,yearly',
        new RequiredIf(fn () => $request->plan === 'yearly'),
    ],
]);

// قاعدة مخصصة مع معاملات
class ValidPlan implements ValidationRule
{
    public function __construct(
        protected array $plans = ['starter', 'pro', 'enterprise']
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!in_array($value, $this->plans)) {
            $fail('الخطة المحددة غير متوفرة');
        }
    }
}`} />
      </div>
    ),
  },
]

/* ─── Chapter 14: Conditional Validation ─── */
const conditionalSections: DocSection[] = [
  {
    id: "conditional-rules",
    title: "التحقق الشرطي",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>أحياناً تعتمد قواعد التحقق على قيمة حقل آخر. Laravel يوفر عدة طرق للتحقق الشرطي.</p>
        <InteractiveCode code={`// required_if: يطلب الحقل إذا كان حقل آخر بقيمة محددة
'coupon_code' => 'required_if:plan,yearly'

// required_unless: يطلب الحقل إلا إذا كان حقل آخر بقيمة محددة
'address' => 'required_unless:delivery,pickup'

// required_with: يطلب الحقل إذا وُجد حقل آخر
'password_confirmation' => 'required_with:password'

// required_without: يطلب الحقل إذا لم يوجد حقل آخر
'email' => 'required_without:phone'

// باستخدام Closures للتحقق الشرطي المعقّد
$request->validate([
    'role' => 'required|in:admin,editor,user',
    'permissions' => [
        Rule::requiredIf(function () use ($request) {
            return $request->role === 'admin';
        }),
        'array',
    ],
]);

// prohibit: يمنع وجود الحقل إذا كان حقل آخر بقيمة محددة
'admin_section' => 'prohibited_if:role,user'`} />
      </div>
    ),
    notes: ["required_if يقبل حقل وقيمة أو أكثر", "prohibited_if عكس required_if", "Closures في القواعد تُنفّذ أثناء التحقق"],
    mistakes: ["نسيان أن required_if يقارن بالقيمة حرفياً", "استخدام شرط معقّد بدون Closure", "عدم مراعاة أن null != '' في المقارنات"],
    bestPractices: ["استخدم required_if للتبعية البسيطة", "Closures للشروط المعقّدة", "اختبر كل الحالات الممكنة"],
  },
]

/* ─── Chapter 15: Validated Input ─── */
const validatedInputSections: DocSection[] = [
  {
    id: "validated-method",
    title: "الحصول على البيانات الصالحة فقط",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>بعد نجاح التحقق، يجب أن تستخدم البيانات الصالحة فقط — لا تستخدم <code className="font-mono text-lam-gold">{`$request->all()`}</code> لأنه قد يحتوي على حقول إضافية غير متوقعة (مثل mass assignment).</p>
        <InteractiveCode code={`// ✅ الطريقة الصحيحة: $validated
$validated = $request->validate([
    'name' => 'required|string',
    'email' => 'required|email',
]);

User::create($validated);
// فقط name و email — آمن

// ❌ الطريقة الخطرة: $request->all()
User::create($request->all());
// قد تحتوي على is_admin أو role من طلب معدّل

// مع Form Request
$validated = $storeUserRequest->validated();
// بعد authorize + rules
User::create($validated);

// safe() — عندما تريد الحقول الصالحة فقط
// (تزيل الحقول غير المعرّفة)
$safe = $validator->safe()->all();`} />
      </div>
    ),
    notes: ["validated() تعيد الحقول التي اجتازت التحقق فقط", "safe() أفضل مع Manual Validator", "mass assignment protection مع validated() مضمون"],
    mistakes: ["استخدام $request->all() بعد validate()", "الوصول إلى validated() إذا فشل التحقق", "نسيان أن بعض الحقول قد لا تمرر كل القواعد"],
    bestPractices: ["استخدم validated() دائماً", "Form Request مع validated() أفضل", "استخدم safe() للتحكم الدقيق"],
  },
]

/* ─── Chapter 16: Error Bags ─── */
const errorBagsSections: DocSection[] = [
  {
    id: "error-bags",
    title: "فصل الأخطاء في أكياس (Error Bags)",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>في الصفحات المعقّدة (مثل صفحة فيها عدة نماذج)، يمكنك فصل أخطاء كل نموذج في "كيس" مستقل باستخدام المعامل الثاني لـ withErrors.</p>
        <InteractiveCode code={`// في الـ Controller — استخدام Error Bag
return redirect()->back()
    ->withErrors($validator, 'login')
    ->withInput();

return redirect()->back()
    ->withErrors($registerValidator, 'register');

// في Blade — الوصول إلى كل Bag
@error('email', 'login')
    <span>{{ $message }}</span>
@enderror

@error('email', 'register')
    <span>{{ $message }}</span>
@enderror

// في React + Inertia
const { errors } = usePage().props
// errors هو default bag
// للأكياس المسماة، استخدم:
const loginErrors = usePage().props.errors?.login
const registerErrors = usePage().props.errors?.register`} />
      </div>
    ),
    notes: ["المعامل الثاني لـ withErrors هو اسم الـ Bag", "الـ Bag الافتراضي اسمه default", "كل Bag يحمل أخطاءه الخاصة"],
    mistakes: ["نسيان تسمية الـ Bag يؤدي لخلط الأخطاء", "استخدام نفس الاسم لـ Bag في نماذج مختلفة", "الوصول إلى Bag غير موجود"],
    bestPractices: ["سمِّ الـ Bags بأسماء النماذج (login, register)", "استخدم Bags منفصلة للنماذج المستقلة", "تحقق من وجود الـ Bag قبل الوصول"],
  },
]

/* ─── Chapter 17: Advanced Validation ─── */
const advancedSections: DocSection[] = [
  {
    id: "stop-on-first",
    title: "التوقف عند أول فشل",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>افتراضياً، Laravel يفحص كل القواعد حتى لو فشلت الأولى. مع <code className="font-mono text-lam-gold">stopOnFirstFailure</code>، يتوقف عند أول قاعدة مكسورة.</p>
        <InteractiveCode code={`// في validate()
$validated = $request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
    'password' => 'required|confirmed|min:8',
]);

// التوقف عند أول فشل
$validated = $request->validate([
    // ...
], [
    // messages
], [
    'stop_on_first_failure' => true, // سيتوقف عند أول خطأ
]);`} />
      </div>
    ),
  },
  {
    id: "after-validation",
    title: "خطافات ما بعد التحقق",
    content: (
      <div className="space-y-4">
        <InteractiveCode code={`// after() — منطق بعد التحقق وقبل الحكم
$validator = Validator::make($data, $rules);

$validator->after(function ($validator) use ($someService) {
    // تحقق إضافي — مثلاً استدعاء API خارجي
    if ($someService->isBlocked($validator->safe()->email)) {
        $validator->errors()->add(
            'email', 'هذا البريد محظور في نظامنا'
        );
    }
});

if ($validator->fails()) {
    // تعامل مع الأخطاء
}

// في Form Request
public function after(): array
{
    return [
        function ($validator) {
            if ($this->isBlacklisted()) {
                $validator->errors()->add('email', 'محظور');
            }
        },
    ];
}`} />
      </div>
    ),
    notes: ["after() يُستدعى بعد كل القواعد", "يمكن إضافة أخطاء يدوياً عبر errors()->add()", "after في Form Request يعيد مصفوفة من Closures"],
    mistakes: ["وضع منطق معقّد في after يبطئ التحقق", "عدم التحقق من وجود الحقل قبل إضافة خطأ", "نسيان أن after() يُستدعى حتى عند الفشل"],
    bestPractices: ["استخدم after للتحقق من الـ Business Logic", "أضف أخطاء واضحة", "اختبر after مع حالات النجاح والفشل"],
  },
  {
    id: "rule-objects-advanced",
    title: "Rule Objects المتقدمة",
    content: (
      <div className="grid sm:grid-cols-2 gap-3">
        <InteractiveCode code={`// Implicit Rule
// تُنفّذ حتى لو كان الحقل فارغاً
use Illuminate\\Contracts\\Validation\\ImplicitRule;

class CheckBannedEmails implements ValidationRule, ImplicitRule
{
    public function validate(...) { }
}`} />
        <InteractiveCode code={`// Rule مع معاملات
new Unique('users', 'email')->ignore($userId)
new Exists('categories', 'id')->where('active', true)
Password::min(8)->letters()->numbers()->symbols()`} />
      </div>
    ),
  },
]

/* ─── Chapter 18: Interactive Playground ─── */
const playgroundSections: DocSection[] = [
  {
    id: "playground-intro",
    title: "بيئة اختبار تفاعلية",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>جرب قواعد التحقق مباشرة. اكتب البيانات وقواعد التحقق وشاهد النتيجة فوراً. هذه محاكاة كاملة لمحرك Laravel Validation.</p>
        <Note type="tip">اختر من النماذج السريعة أو أنشئ حقولاً مخصصة. القواعد المدعومة: required, email, min:N, max:N, integer, string, boolean, in:a,b, exists:table, array</Note>
        <ValidationPlayground />
      </div>
    ),
  },
]

/* ─── Chapter 19: Final Mission ─── */
const finalMissionSections: DocSection[] = [
  {
    id: "final-mission",
    title: "المهمة النهائية: محاكاة إطلاق فضائي",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>حان وقت التطبيق العملي! المهمة النهائية هي محاكاة كاملة لدورة حياة طلب Laravel Validation. أرسل بيانات رائد الفضاء، شاهد رحلة الطلب خطوة بخطوة، وراقب محرك التحقق أثناء عمله.</p>
        <Note type="tip">استخدم هذه المحاكاة التفاعلية لتجربة كل ما تعلّمته. أرسل بيانات صالحة لترى مسار النجاح (200 OK)، وبيانات خاطئة لترى مسار الفشل (422 مع الأخطاء).</Note>
      </div>
    ),
    visualization: (
      <ArchitectureFlow nodes={[
        { icon: Globe, label: "1. إعداد النموذج", sub: "Form State in React", tone: "blue" },
        { icon: Server, label: "2. إرسال POST", sub: "fetch → /validation-demo", tone: "gold" },
        { icon: ListChecks, label: "3. محرك التحقق", sub: "FormRequest + Validation Engine", tone: "orange" },
        { icon: Send, label: "4. رد 200/422", sub: "JSON Response مع الأخطاء أو النجاح", tone: "green" },
      ]} />
    ),
  },
  {
    id: "launch-simulation",
    title: "إطلاق المحاكاة",
    content: (
      <div className="space-y-4">
        <p className={sharedStyles.subheading}>المحاكاة كاملة تحتوي على:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: FileText, title: "نموذج رائد فضاء", desc: "أدخل اسم، بريد، وعمر رائد الفضاء" },
            { icon: Code, title: "محرر كود حي", desc: "شاهد PHP و JSX أثناء التنفيذ" },
            { icon: Server, title: "رادار الطلبات", desc: "تتبّع رحلة الطلب من المتصفح للسيرفر" },
            { icon: Swords, title: "تحدي عملي", desc: "أضف قاعدة min:21 واحصل على +80 XP" },
            { icon: Brain, title: "المرشد لومي", desc: "يرشدك خطوة بخطوة خلال المحاكاة" },
            { icon: Sparkles, title: "مكافآت", desc: "+ XP و confetti عند النجاح" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-lam-bg-2/60 p-3 flex items-start gap-2.5">
              <div className="size-8 rounded-lg bg-lam-gold/10 border border-lam-gold/30 grid place-items-center shrink-0">
                <Icon className="size-3.5 text-lam-gold" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-lam-text">{title}</h4>
                <p className="text-[10px] text-lam-text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-lam-gold/30 bg-lam-gold/5 p-4 text-center">
          <p className="text-sm text-lam-text-soft leading-relaxed mb-3">
            المحاكاة التفاعلية متاحة الآن في الفصل التالي — انتقل إلى فصل "التطبيق العملي" لتجربتها مباشرة.
          </p>
        </div>
      </div>
    ),
  },
]

/* ─── Interactive Lesson Chapter Sections ─── */
function interactiveLessonSections(technology: string, isUnlocked: boolean): DocSection[] {
  return [
    {
      id: "interactive-lesson",
      title: "التطبيق العملي: التحقق من بيانات رواد الفضاء",
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-lam-text-soft leading-relaxed">
            حان وقت التطبيق العملي! جرّب محاكاة كاملة لدورة حياة طلب Laravel Validation.
            أرسل بيانات رائد الفضاء، شاهد رحلة الطلب خطوة بخطوة، وراقب محرك التحقق أثناء عمله.
          </p>
          <div className="rounded-xl border border-lam-gold/30 bg-lam-gold/5 p-4">
            <p className="text-xs text-lam-text-soft leading-relaxed">
              <span className="font-bold text-lam-gold">تنبيه:</span> هذه المحاكاة التفاعلية ترسل طلب POST حقيقي إلى الخادم.
              استخدم البيانات الصالحة لترى مسار النجاح (200 OK)، والبيانات الخاطئة لترى مسار الفشل (422 مع الأخطاء).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "lesson-experience",
      title: "المحاكاة التفاعلية",
      content: (
        <LessonExperience embedded technology={technology} />
      ),
    },
  ]
}

/* ─── Master Chapter Registry ─── */

export function getChapters(technology = 'laravel', isUnlocked = true): Chapter[] {
  return [
    {
      id: "introduction",
      number: 1,
      title: "Introduction",
      subtitle: "لمحة شاملة عن التحقق في Laravel",
      icon: BookOpen,
      color: "gold",
      sections: introSections,
    },
    {
      id: "quickstart",
      number: 2,
      title: "Validation Quickstart",
      subtitle: "البداية السريعة مع التحقق",
      icon: Zap,
      color: "orange",
      sections: quickstartSections,
    },
    {
      id: "request-lifecycle",
      number: 3,
      title: "Request Lifecycle",
      subtitle: "رحلة الطلب الكاملة من البداية للنهاية",
      icon: Route,
      color: "blue",
      sections: lifecycleSections,
    },
    {
      id: "validation-rules",
      number: 4,
      title: "Validation Rules",
      subtitle: "الدليل الكامل لقواعد التحقق",
      icon: ListChecks,
      color: "gold",
      sections: rulesSections,
    },
    {
      id: "displaying-errors",
      number: 5,
      title: "Displaying Errors",
      subtitle: "عرض الأخطاء في الواجهة",
      icon: AlertCircle,
      color: "red",
      sections: errorDisplaySections,
    },
    {
      id: "xhr-validation",
      number: 6,
      title: "XHR Validation",
      subtitle: "التحقق في طلبات AJAX",
      icon: Globe,
      color: "blue",
      sections: xhrSections,
    },
    {
      id: "form-request",
      number: 7,
      title: "Form Request Validation",
      subtitle: "استخراج التحقق إلى Form Request",
      icon: FileText,
      color: "orange",
      sections: formRequestSections,
    },
    {
      id: "manual-validators",
      number: 8,
      title: "Manual Validators",
      subtitle: "التحكم الكامل بـ Validator::make()",
      icon: Terminal,
      color: "gold",
      sections: manualValidatorsSections,
    },
    {
      id: "custom-messages",
      number: 9,
      title: "Custom Error Messages",
      subtitle: "تخصيص رسائل الأخطاء",
      icon: MessageSquare,
      color: "green",
      sections: customMessagesSections,
    },
    {
      id: "nested-arrays",
      number: 10,
      title: "Nested Array Validation",
      subtitle: "التحقق من المصفوفات المتداخلة",
      icon: Layers,
      color: "blue",
      sections: nestedArraySections,
    },
    {
      id: "file-validation",
      number: 11,
      title: "File Validation",
      subtitle: "التحقق من تحميلات الملفات",
      icon: File,
      color: "orange",
      sections: fileValidationSections,
    },
    {
      id: "password-validation",
      number: 12,
      title: "Password Validation",
      subtitle: "تحقق متقدم لكلمات المرور",
      icon: KeyRound,
      color: "green",
      sections: passwordValidationSections,
    },
    {
      id: "custom-rules",
      number: 13,
      title: "Custom Validation Rules",
      subtitle: "إنشاء قواعد تحقق مخصصة",
      icon: Shield,
      color: "gold",
      sections: customRulesSections,
    },
    {
      id: "conditional",
      number: 14,
      title: "Conditional Validation",
      subtitle: "التحقق الشرطي",
      icon: ToggleLeft,
      color: "orange",
      sections: conditionalSections,
    },
    {
      id: "validated-input",
      number: 15,
      title: "Validated Input",
      subtitle: "الحصول على البيانات الصالحة فقط",
      icon: Filter,
      color: "blue",
      sections: validatedInputSections,
    },
    {
      id: "error-bags",
      number: 16,
      title: "Error Bags",
      subtitle: "فصل الأخطاء في أكياس متعددة",
      icon: FolderOpen,
      color: "gold",
      sections: errorBagsSections,
    },
    {
      id: "advanced",
      number: 17,
      title: "Advanced Validation",
      subtitle: "تقنيات متقدمة: after, stopOnFirstFailure",
      icon: Code,
      color: "orange",
      sections: advancedSections,
    },
    {
      id: "playground",
      number: 18,
      title: "Interactive Playground",
      subtitle: "بيئة اختبار تفاعلية",
      icon: Gamepad2,
      color: "green",
      sections: playgroundSections,
    },
    {
      id: "final-mission",
      number: 19,
      title: "Final Mission",
      subtitle: "المهمة النهائية: محاكاة إطلاق فضائي",
      icon: Rocket,
      color: "gold",
      sections: finalMissionSections,
    },
    {
      id: "interactive-practice",
      number: 20,
      title: "التطبيق العملي",
      subtitle: "التحقق من بيانات رواد الفضاء",
      icon: Swords,
      color: "orange",
      sections: interactiveLessonSections(technology, isUnlocked),
    },
  ]
}

// Kept for backward compatibility
export const CHAPTERS = getChapters()

export function DocSectionRenderer({ section }: { section: DocSection }) {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-lg text-lam-text">{section.title}</h4>
      {section.content}
      {section.code && (
        <div className="mt-4">
          <CodeBlock {...section.code} />
        </div>
      )}
      {section.visualization && (
        <div className="mt-4 lam-glass rounded-2xl border border-border/60 p-5">
          {section.visualization}
        </div>
      )}
      {section.notes && section.notes.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-xs font-bold text-lam-blue uppercase tracking-wider">ملاحظات تقنية</p>
          <div className="space-y-1.5">
            {section.notes.map((n, i) => <Note key={i} type="info">{n}</Note>)}
          </div>
        </div>
      )}
      {section.mistakes && section.mistakes.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-xs font-bold text-lam-red uppercase tracking-wider">أخطاء شائعة</p>
          <div className="space-y-1.5">
            {section.mistakes.map((m, i) => <Note key={i} type="danger">{m}</Note>)}
          </div>
        </div>
      )}
      {section.bestPractices && section.bestPractices.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-xs font-bold text-lam-green uppercase tracking-wider">أفضل الممارسات</p>
          <div className="space-y-1.5">
            {section.bestPractices.map((b, i) => <Note key={i} type="tip">{b}</Note>)}
          </div>
        </div>
      )}
    </div>
  )
}
