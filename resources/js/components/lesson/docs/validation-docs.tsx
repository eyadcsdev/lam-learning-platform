import { useState, useRef, useEffect } from "react"

import { Link } from "@inertiajs/react"
import {
  ChevronLeft, ChevronRight, Menu, X, Search,
  BookOpen, CheckCircle2, Trophy,
} from "lucide-react"
import { LamLogo } from "@/components/lam-logo"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { Button } from "@/components/ui/button"
import { getChapters, DocSectionRenderer, type Chapter } from "./chapter-registry"

export function ValidationDocs({ technology = 'laravel', isUnlocked = true }: { technology?: string; isUnlocked?: boolean }) {
  const [activeChapter, setActiveChapter] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [progress, setProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const chapters = getChapters(technology, isUnlocked)
  const chapter = chapters[activeChapter]
  const isLast = activeChapter === chapters.length - 1
  const isFirst = activeChapter === 0

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(Math.min((scrollTop / total) * 100, 100))
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredChapters = chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.includes(searchQuery)
  )

  return (
    <div className="relative min-h-svh bg-lam-bg-0">
      <AmbientBackdrop variant="intense" />

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1">
        <div
          className="h-full bg-gradient-to-l from-lam-gold via-lam-orange to-lam-gold-bright"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top header */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-[1600px] px-3 sm:px-4 pt-3">
          <div className="lam-glass-strong rounded-2xl px-3 sm:px-4 py-2.5 flex items-center gap-3 border border-border/60">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="shrink-0 p-1.5 rounded-lg hover:bg-lam-bg-2/60 transition-colors"
            >
              {sidebarOpen ? <X className="size-4 text-lam-text-muted" /> : <Menu className="size-4 text-lam-text-muted" />}
            </button>
            <Link href={`/roadmap/${technology}`} className="shrink-0">
              <LamLogo size={26} showWordmark={false} />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-border" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-lam-text-muted uppercase tracking-wider">
                  Laravel Validation · Documentation
                </span>
                <span className="size-1 rounded-full bg-lam-text-muted/50" />
                <span className="text-[10px] font-medium text-lam-gold">
                  {chapter.number}/{chapters.length}
                </span>
              </div>
              <h1 className="text-sm font-bold text-lam-text truncate leading-tight">
                {chapter.title} — {chapter.subtitle}
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="lam-glass rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                <Trophy className="size-3.5 text-lam-gold" />
                <span className="text-xs font-bold text-lam-gold">
                  {activeChapter + 1} / {chapters.length}
                </span>
              </div>
            </div>
            <Button asChild variant="ghost" size="icon" className="shrink-0 text-lam-text-muted hover:text-lam-text">
              <Link href={`/roadmap/${technology}`}><X className="size-5" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] flex" dir="rtl">
        {/* Sidebar */}
          {sidebarOpen && (
            <aside
              className="sticky top-20 h-[calc(100vh-6rem)] overflow-hidden shrink-0 z-30 hidden lg:block"
            >
              <div className="h-full lam-glass rounded-2xl border border-border/60 p-3 ml-3 overflow-hidden flex flex-col">
                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-lam-text-muted" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الفصول…"
                    className="w-full rounded-xl border border-border/60 bg-lam-bg-2/50 px-3 py-2 pr-9 text-xs text-lam-text-soft placeholder:text-lam-text-muted/50 focus:outline-none focus:ring-2 focus:ring-lam-gold/30"
                  />
                </div>

                {/* Chapter list */}
                <nav className="flex-1 overflow-y-auto space-y-1 scrollbar-thin">
                  {(searchQuery ? filteredChapters : chapters).map((ch, i) => {
                    const isActive = i === activeChapter
                    const Icon = ch.icon
                    const colorMap: Record<string, string> = {
                      gold: "text-lam-gold border-lam-gold/40 bg-lam-gold/10",
                      orange: "text-lam-orange border-lam-orange/40 bg-lam-orange/10",
                      blue: "text-lam-blue border-lam-blue/40 bg-lam-blue/10",
                      green: "text-lam-green border-lam-green/40 bg-lam-green/10",
                      red: "text-lam-red border-lam-red/40 bg-lam-red/10",
                    }
                    const activeColor = colorMap[ch.color] ?? colorMap.gold

                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setActiveChapter(i)
                          setSearchQuery("")
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className={`w-full text-right flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all ${
                          isActive
                            ? `${activeColor} lam-glow-orange`
                            : "border-border/60 hover:border-lam-gold/30 bg-lam-bg-2/30 hover:bg-lam-bg-2/60"
                        }`}
                      >
                        <div className={`size-8 rounded-lg grid place-items-center shrink-0 ${
                          isActive ? activeColor : "bg-lam-bg-1/60 border border-border/50"
                        }`}>
                          <Icon className={`size-3.5 ${isActive ? "" : "text-lam-text-muted"}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`text-xs font-bold ${isActive ? "" : "text-lam-text"}`}>
                            {ch.number}. {ch.title}
                          </div>
                          <div className="text-[10px] text-lam-text-muted truncate">
                            {ch.subtitle}
                          </div>
                        </div>
                        {isActive && (
                          <span
                            className="size-1.5 rounded-full bg-lam-gold lam-anim-pulse-gold shrink-0"
                          />
                        )}
                      </button>
                    )
                  })}
                </nav>

                {/* Sidebar footer */}
                <div className="mt-3 pt-3 border-t border-border/60">
                  <div className="flex items-center gap-2 text-[10px] text-lam-text-muted">
                    <BookOpen className="size-3" />
                    <span>{chapters.length} فصل · توثيق تفاعلي</span>
                  </div>
                </div>
              </div>
            </aside>
          )}

        {/* Main content */}
        <main ref={contentRef} className="flex-1 min-w-0 py-5 sm:py-7 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Chapter header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`size-12 rounded-2xl bg-lam-${chapter.color}/15 border border-lam-${chapter.color}/40 grid place-items-center`}>
                  <chapter.icon className={`size-6 text-lam-${chapter.color}`} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-lam-text-muted">
                    Chapter {String(chapter.number).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-lam-text">
                    {chapter.title}
                  </h2>
                  <p className="text-sm text-lam-text-muted">{chapter.subtitle}</p>
                </div>
              </div>
              <div className="h-px bg-gradient-to-l from-transparent via-lam-border to-transparent" />
            </div>

            {/* Chapter sections */}
              <div
                className="space-y-10"
              >
                {chapter.sections.map((section) => (
                  <DocSectionRenderer key={section.id} section={section} />
                ))}
              </div>

            {/* Chapter navigation */}
            <div className="flex items-center justify-between gap-3 pt-6 pb-10 border-t border-border/60">
              <div>
                {!isFirst && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setActiveChapter(activeChapter - 1)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="text-lam-text-muted hover:text-lam-text"
                  >
                    <ChevronRight className="size-4 ml-2" />
                    {chapters[activeChapter - 1].title}
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-lam-text-muted">
                <CheckCircle2 className="size-3.5 text-lam-green" />
                <span>{chapter.number}/{chapters.length}</span>
              </div>
              <div>
                {!isLast && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setActiveChapter(activeChapter + 1)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="text-lam-text-muted hover:text-lam-text"
                  >
                    {chapters[activeChapter + 1].title}
                    <ChevronLeft className="size-4 mr-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Quick navigation grid */}
            <div className="lam-glass-strong rounded-2xl border border-border/60 p-5">
              <h3 className="font-bold text-sm text-lam-text mb-3">فهرس الفصول</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {chapters.map((ch, i) => {
                  const Icon = ch.icon
                  const isActive = i === activeChapter
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setActiveChapter(i)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className={`text-right flex items-center gap-2 rounded-xl border p-2.5 transition-all ${
                        isActive
                          ? "border-lam-gold/40 bg-lam-gold/10"
                          : "border-border/60 bg-lam-bg-2/40 hover:border-lam-gold/30"
                      }`}
                    >
                      <Icon className={`size-3.5 shrink-0 ${isActive ? "text-lam-gold" : "text-lam-text-muted"}`} />
                      <span className={`text-[10px] font-medium truncate ${isActive ? "text-lam-gold" : "text-lam-text-soft"}`}>
                        {ch.number}. {ch.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
