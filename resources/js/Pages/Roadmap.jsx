import MainLayout from "@/Layouts/MainLayout"
import { RoadmapHeader } from "@/components/roadmap/roadmap-header"
import { RoadmapMap } from "@/components/roadmap/roadmap-map"
import { RoadmapSidebar } from "@/components/roadmap/roadmap-sidebar"
import { RoadmapCta } from "@/components/roadmap/roadmap-cta"

export default function Roadmap() {
  return (
    <MainLayout>
      <div className="relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <RoadmapHeader />
          <div className="mt-10 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <RoadmapMap />
            </div>
            <aside className="lg:col-span-4 order-1 lg:order-2">
              <RoadmapSidebar />
            </aside>
          </div>
          <RoadmapCta />
        </div>
      </div>
    </MainLayout>
  )
}
