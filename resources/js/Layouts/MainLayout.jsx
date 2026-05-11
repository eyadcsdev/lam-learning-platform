import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <AmbientBackdrop />
      <SiteHeader />
      <main className="relative">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
