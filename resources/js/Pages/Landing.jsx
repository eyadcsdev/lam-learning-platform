import MainLayout from "@/Layouts/MainLayout"
import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import { LessonPreview } from "@/components/landing/lesson-preview"
import { Technologies } from "@/components/landing/technologies"
import { Vision } from "@/components/landing/vision"

export default function Landing() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <Technologies />
      <LessonPreview />
      <Vision />
    </MainLayout>
  )
}
