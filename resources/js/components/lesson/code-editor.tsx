"use client"

import { useState } from "react"
import { FileCode2, Terminal } from "lucide-react"
import type {
  LessonStep,
  ValidationErrors,
} from "@/components/lesson/lesson-experience"

interface CodeEditorProps {
  activeStep: LessonStep
  errors: ValidationErrors
  challengeSolved: boolean
}

type Tab = "controller" | "routes" | "form"

const TABS: { id: Tab; label: string; lang: string }[] = [
  { id: "controller", label: "ValidationController.php", lang: "php" },
  { id: "routes", label: "web.php", lang: "php" },
  { id: "form", label: "MissionForm.tsx", lang: "tsx" },
]

export function CodeEditor({
  activeStep,
  errors,
  challengeSolved,
}: CodeEditorProps) {
  const [tab, setTab] = useState<Tab>("controller")

  return (
    <div
      className="rounded-2xl overflow-hidden border border-border/60 bg-lam-bg-2/70 lam-glass h-full flex flex-col"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-lam-bg-1/60">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-lam-red/80" />
          <span className="size-2.5 rounded-full bg-lam-gold/80" />
          <span className="size-2.5 rounded-full bg-lam-green/80" />
        </div>
        <div className="hidden sm:flex items-center gap-1 mr-2 text-[11px] text-lam-text-muted">
          <FileCode2 className="size-3.5" />
          <span>المحرر الحي</span>
        </div>
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-lam-text-muted hidden sm:inline">
          Laravel 11 · PHP 8.3
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-border/60 bg-lam-bg-1/40 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-3.5 py-2 text-[11px] font-mono whitespace-nowrap border-l border-border/60 transition-colors ${
              tab === t.id
                ? "text-lam-text bg-lam-bg-2/80"
                : "text-lam-text-muted hover:text-lam-text-soft"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <span
                className="absolute -top-px left-0 right-0 h-0.5 bg-lam-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {tab === "controller" && (
          <ControllerCode
            activeStep={activeStep}
            errors={errors}
            challengeSolved={challengeSolved}
          />
        )}
        {tab === "routes" && <RoutesCode />}
        {tab === "form" && <FormCode />}
      </div>

      {/* Footer */}
      <div className="border-t border-border/60 bg-lam-bg-1/60 px-3 py-2 flex items-center gap-2 text-[11px] text-lam-text-muted">
        <Terminal className="size-3.5 text-lam-green" />
        <span className="font-mono">
          {activeStep === "validate"
            ? "validating fields…"
            : activeStep === "respond"
            ? "422 unprocessable entity"
            : activeStep === "render"
            ? "200 ok · launched"
            : "ready"}
        </span>
        <div className="flex-1" />
        <span className="font-mono">UTF-8 · LF · ar-SA</span>
      </div>
    </div>
  )
}

/* ---------------- Code blocks ---------------- */

function CodeFrame({ children }: { children: React.ReactNode }) {
  return (
    <pre
      dir="ltr"
      className="font-mono text-[11.5px] leading-[1.75] p-4 text-lam-text-soft/95"
    >
      {children}
    </pre>
  )
}

function Line({
  n,
  highlight,
  children,
}: {
  n: number
  highlight?: "error" | "active" | "solved" | "none"
  children: React.ReactNode
}) {
  const cls =
    highlight === "error"
      ? "bg-lam-orange/15 border-r-2 border-lam-orange"
      : highlight === "active"
      ? "bg-lam-gold/10 border-r-2 border-lam-gold"
      : highlight === "solved"
      ? "bg-lam-green/15 border-r-2 border-lam-green"
      : ""
  return (
    <div className={`flex items-start gap-3 px-2 -mx-2 rounded ${cls}`}>
      <span className="select-none text-[10px] text-lam-text-muted/60 w-5 text-right pt-0.5">
        {n}
      </span>
      <span className="flex-1 whitespace-pre">{children}</span>
    </div>
  )
}

const k = "text-lam-orange"
const s = "text-lam-green"
const v = "text-lam-blue"
const c = "text-lam-text-muted/70"
const f = "text-lam-gold"

function ControllerCode({
  activeStep,
  errors,
  challengeSolved,
}: {
  activeStep: LessonStep
  errors: ValidationErrors
  challengeSolved: boolean
}) {
  const ageError = !!errors.age
  const isValidating = activeStep === "validate" || activeStep === "respond"

  return (
    <CodeFrame>
      <Line n={1}><span className={c}>{`<?php`}</span></Line>
      <Line n={2}>{` `}</Line>
      <Line n={3}><span className={k}>namespace</span> App\Http\Controllers;</Line>
      <Line n={4}>{` `}</Line>
      <Line n={5}><span className={k}>use</span> Illuminate\Http\Request;</Line>
      <Line n={6}>{` `}</Line>
      <Line n={7}><span className={k}>class</span> <span className={v}>ValidationController</span> <span className={k}>extends</span> Controller</Line>
      <Line n={8}>{`{`}</Line>
      <Line n={9}>{`  `}<span className={k}>public function</span> <span className={f}>launch</span>(Request $request)</Line>
      <Line n={10}>{`  {`}</Line>
      <Line n={11} highlight={isValidating ? "active" : "none"}>{`    `}$validated = $request-&gt;<span className={f}>validate</span>([</Line>
      <Line n={12}>{`      `}<span className={s}>{`'name'`}</span>{`  => `}<span className={s}>{`'required|string|max:60'`}</span>,</Line>
      <Line n={13}>{`      `}<span className={s}>{`'email'`}</span>{` => `}<span className={s}>{`'required|email'`}</span>,</Line>
      <Line
        n={14}
        highlight={
          ageError ? "error" : challengeSolved ? "solved" : "none"
        }
      >
        {`      `}<span className={s}>{`'age'`}</span>{`   => `}<span className={s}>
          {`'required|integer|`}
          <span className="bg-lam-orange/30 text-lam-orange px-1 rounded font-bold">
            min:21
          </span>
          {`'`}
        </span>,
      </Line>
      <Line n={15}>{`    ]);`}</Line>
      <Line n={16}>{` `}</Line>
      <Line n={17} highlight={activeStep === "render" ? "solved" : "none"}>
        {`    `}<span className={k}>return</span> Mission::<span className={f}>launch</span>($validated);
      </Line>
      <Line n={18}>{`  }`}</Line>
      <Line n={19}>{`}`}</Line>
    </CodeFrame>
  )
}

function RoutesCode() {
  return (
    <CodeFrame>
      <Line n={1}><span className={c}>{`<?php`}</span></Line>
      <Line n={2}>{` `}</Line>
      <Line n={3}><span className={k}>use</span> Illuminate\Support\Facades\Route;</Line>
      <Line n={4}><span className={k}>use</span> App\Http\Controllers\ValidationController;</Line>
      <Line n={5}>{` `}</Line>
      <Line n={6}>Route::<span className={f}>get</span>(<span className={s}>{`'/'`}</span>, <span className={k}>fn</span>() =&gt; inertia(<span className={s}>{`'Mission/Form'`}</span>));</Line>
      <Line n={7}>{` `}</Line>
      <Line n={8}>Route::<span className={f}>post</span>(<span className={s}>{`'/mission'`}</span>, [ValidationController::<span className={k}>class</span>, <span className={s}>{`'launch'`}</span>])</Line>
      <Line n={9}>{`     `}-&gt;<span className={f}>name</span>(<span className={s}>{`'mission.launch'`}</span>);</Line>
    </CodeFrame>
  )
}

function FormCode() {
  return (
    <CodeFrame>
      <Line n={1}><span className={k}>import</span> {`{ useForm }`} <span className={k}>from</span> <span className={s}>{`'@inertiajs/react'`}</span>;</Line>
      <Line n={2}>{` `}</Line>
      <Line n={3}><span className={k}>export default function</span> <span className={f}>MissionForm</span>() {`{`}</Line>
      <Line n={4}>{`  `}<span className={k}>const</span> {`{ data, setData, post, errors }`} = <span className={f}>useForm</span>({`{`}</Line>
      <Line n={5}>{`    `}name: <span className={s}>{`''`}</span>, email: <span className={s}>{`''`}</span>, age: <span className={s}>{`''`}</span>,</Line>
      <Line n={6}>{`  });`}</Line>
      <Line n={7}>{` `}</Line>
      <Line n={8}>{`  `}<span className={k}>const</span> <span className={f}>onSubmit</span> = (e) =&gt; {`{`}</Line>
      <Line n={9}>{`    `}e.<span className={f}>preventDefault</span>();</Line>
      <Line n={10}>{`    `}<span className={f}>post</span>(<span className={s}>{`'/mission'`}</span>);</Line>
      <Line n={11}>{`  };`}</Line>
      <Line n={12}>{`  `}<span className={c}>{`// errors are auto-bound from Laravel`}</span></Line>
      <Line n={13}>{`}`}</Line>
    </CodeFrame>
  )
}
