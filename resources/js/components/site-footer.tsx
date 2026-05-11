import { Link } from "@inertiajs/react"
import { Globe } from "lucide-react"
import { LamLogo } from "@/components/lam-logo"

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/eyadcsdev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eyad-alhattami-93280b409/" },
  { label: "Facebook", href: "https://www.facebook.com/ayad.alhtamy.75529" },
  { label: "WhatsApp", href: "https://wa.me/+967776680640" },
  { label: "الموقع الشخصي", href: "https://eyadcs.dev/" },
]

const linkGroups = [
  {
    title: "روابط",
    links: [
      { label: "الرئيسية", href: "/" },
      { label: "المسارات", href: "/roadmap" },
      { label: "الدرس التفاعلي", href: "/lessons/validation" },
      { label: "تسجيل الدخول", href: "/login" },
    ],
  },
  {
    title: "تواصل",
    links: SOCIAL_LINKS,
  },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-lam-bg-1/40">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <LamLogo size={36} />
            <p className="mt-4 text-sm text-lam-text-muted leading-relaxed max-w-sm">
              منصة عربية لتعلّم البرمجة بطريقة تفاعلية، سينمائية، ومُحفّزة. نُحوّل
              التوثيق إلى مغامرات.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: GithubMark, href: "https://github.com/eyadcsdev", label: "GitHub" },
                { icon: LinkedinMark, href: "https://www.linkedin.com/in/eyad-alhattami-93280b409/", label: "LinkedIn" },
                { icon: FacebookMark, href: "https://www.facebook.com/ayad.alhtamy.75529", label: "Facebook" },
                { icon: WhatsappMark, href: "https://wa.me/+967776680640", label: "WhatsApp" },
                { icon: () => <Globe className="size-4" />, href: "https://eyadcs.dev/", label: "Website" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-9 rounded-lg border border-border/60 bg-secondary/40 grid place-items-center text-lam-text-muted hover:text-lam-gold hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((g) => (
            <div key={g.title} className="lg:col-span-2">
              <h4 className="font-display text-sm font-bold text-lam-text mb-4">
                {g.title}
              </h4>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="text-sm text-lam-text-muted hover:text-lam-text transition-colors"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-lam-text-muted hover:text-lam-text transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-bold text-lam-text mb-4">
              النشرة
            </h4>
            <p className="text-xs text-lam-text-muted mb-3 leading-relaxed">
              اشترك لتصلك أحدث المسارات والتحديثات.
            </p>
            <form className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder="بريدك"
                className="flex-1 min-w-0 rounded-lg bg-lam-bg-2/60 border border-border/60 px-3 py-2 text-sm text-lam-text-soft placeholder:text-lam-text-muted/60 focus:outline-none focus:border-primary/50"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold hover:bg-primary/90"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs text-lam-text-muted">
          <div>
            جميع الحقوق محفوظة لدى{" "}
            <a
              href="https://eyadcs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-lam-text hover:text-lam-gold transition-colors"
            >
              إياد الحطامي
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-lam-green lam-anim-pulse-gold" />
            <span>المنصة تعمل بسلاسة</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M12 .5C5.73.5.7 5.53.7 11.8c0 4.99 3.24 9.22 7.74 10.72.57.1.78-.25.78-.55 0-.27-.01-.99-.02-1.94-3.15.68-3.81-1.52-3.81-1.52-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.51-.29-5.16-1.26-5.16-5.6 0-1.24.45-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16.91-.25 1.89-.38 2.86-.38s1.95.13 2.86.38c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.21.66.79.55 4.49-1.5 7.73-5.73 7.73-10.72C23.3 5.53 18.27.5 12 .5z" />
    </svg>
  )
}

function LinkedinMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function WhatsappMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
