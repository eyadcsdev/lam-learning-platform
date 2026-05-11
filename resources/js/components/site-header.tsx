import { Link, usePage, router } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { Menu, X, LogOut, User, Settings, Award, Trophy } from "lucide-react"
import { LamLogo } from "@/components/lam-logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/#technologies", label: "التقنيات" },
  { href: "/roadmap", label: "المسارات" },
  { href: "/#community", label: "المجتمع" },
]

export function SiteHeader() {
  const { auth } = usePage().props
  const user = auth?.user ?? null
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    router.post(route('logout'))
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 transition-all duration-300",
          scrolled ? "px-4" : "px-4",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-6 rounded-2xl border px-4 py-2.5 transition-all",
            scrolled
              ? "lam-glass-strong border-border/60 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
              : "border-transparent bg-transparent",
          )}
        >
          {/* Logo (right side in RTL) */}
          <Link href="/" className="shrink-0">
            <LamLogo size={32} />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-lam-text-soft/80 hover:text-lam-text rounded-lg hover:bg-secondary/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-secondary/50 transition-colors outline-none">
                    <Avatar className="size-8 ring-2 ring-lam-gold/30 ring-offset-1 ring-offset-background">
                      <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-lam-gold/20 to-lam-orange/20 text-lam-gold font-bold text-sm">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-lam-text">{user.name}</span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-lam-gold/30 bg-lam-gold/10 px-2 py-0.5 text-[11px] font-semibold text-lam-gold shadow-[0_0_8px_-2px_rgba(250,189,47,0.3)]">
                        {user.xp} XP
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 lam-glass-strong border-border/60 backdrop-blur-xl"
                >
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium text-lam-text">{user.name}</p>
                    <p className="text-xs text-lam-text-muted">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem asChild className="text-lam-text-soft focus:text-lam-text focus:bg-secondary/50 cursor-pointer">
                    <Link href="#" className="flex items-center gap-2.5">
                      <User className="size-4" />
                      الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-lam-text-soft focus:text-lam-text focus:bg-secondary/50 cursor-pointer">
                    <Link href="#" className="flex items-center gap-2.5">
                      <Trophy className="size-4 text-lam-gold" />
                      نقاطي XP
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-lam-text-soft focus:text-lam-text focus:bg-secondary/50 cursor-pointer">
                    <Link href="#" className="flex items-center gap-2.5">
                      <Award className="size-4" />
                      إنجازاتي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-lam-text-soft focus:text-lam-text focus:bg-secondary/50 cursor-pointer">
                    <Link href="#" className="flex items-center gap-2.5">
                      <Settings className="size-4" />
                      الإعدادات
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-lam-text-soft hover:text-lam-text hover:bg-secondary/60"
                >
                  <Link href="/login">تسجيل الدخول</Link>
                </Button>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold lam-glow-gold"
                >
                  <Link href="/register">ابدأ رحلتك</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-lam-text-soft hover:bg-secondary/60"
            aria-label="القائمة"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 lam-glass-strong rounded-2xl p-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-lam-text-soft hover:text-lam-text rounded-lg hover:bg-secondary/50"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-border my-1" />
            {user ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <Avatar className="size-9 ring-2 ring-lam-gold/30">
                    <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-lam-gold/20 to-lam-orange/20 text-lam-gold font-bold text-sm">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-lam-text">{user.name}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lam-gold">
                      {user.xp} XP
                    </span>
                  </div>
                </div>
                <Link href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-lam-text-soft hover:text-lam-text rounded-lg hover:bg-secondary/50">
                  <User className="size-4" />
                  الملف الشخصي
                </Link>
                <Link href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-lam-text-soft hover:text-lam-text rounded-lg hover:bg-secondary/50">
                  <Trophy className="size-4 text-lam-gold" />
                  نقاطي XP
                </Link>
                <Link href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-lam-text-soft hover:text-lam-text rounded-lg hover:bg-secondary/50">
                  <Award className="size-4" />
                  إنجازاتي
                </Link>
                <Link href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-lam-text-soft hover:text-lam-text rounded-lg hover:bg-secondary/50">
                  <Settings className="size-4" />
                  الإعدادات
                </Link>
                <div className="h-px bg-border my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="size-4" />
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" className="justify-start">
                  <Link href="/login">تسجيل الدخول</Link>
                </Button>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground font-semibold"
                >
                  <Link href="/register">ابدأ رحلتك</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
