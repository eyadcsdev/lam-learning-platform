import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import { LessonPreview } from "@/components/landing/lesson-preview"
import { Technologies } from "@/components/landing/technologies"
import { Vision } from "@/components/landing/vision"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <AmbientBackdrop />
      <SiteHeader />
      <main className="relative">
        <Hero />
        <Features />
        <Technologies />
        <LessonPreview />
        <Vision />
      </main>
      <SiteFooter />
    </div>
  )
}
