import MainLayout from "@/Layouts/MainLayout"
import { RoadmapHeader } from "@/components/roadmap/roadmap-header"
import { RoadmapMap } from "@/components/roadmap/roadmap-map"
import { RoadmapSidebar } from "@/components/roadmap/roadmap-sidebar"
import { RoadmapCta } from "@/components/roadmap/roadmap-cta"
import { TechnologySwitcher } from "@/components/roadmap/technology-switcher"
import { usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function Roadmap({ technology, roadmap, all_roadmaps, progression }) {
  const { flash } = usePage().props
  const [notice, setNotice] = useState(flash?.error || flash?.success || null)

  useEffect(() => {
    if (flash?.error || flash?.success) {
      setNotice(flash?.error || flash?.success)
      const t = setTimeout(() => setNotice(null), 5000)
      return () => clearTimeout(t)
    }
  }, [flash?.error, flash?.success])

  return (
    <MainLayout>
      <div className="relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          {notice && (
            <div className={`mb-4 lam-glass-strong rounded-2xl border px-5 py-3 flex items-center gap-3 ${
              flash?.error ? 'border-lam-red/40 bg-lam-red/5' : 'border-lam-green/40 bg-lam-green/5'
            }`}>
              <span className={`text-sm font-medium ${flash?.error ? 'text-lam-red' : 'text-lam-green'}`}>
                {notice}
              </span>
              <button onClick={() => setNotice(null)} className="mr-auto">
                <X className="size-4 text-lam-text-muted" />
              </button>
            </div>
          )}
          <div className="mb-6">
            <TechnologySwitcher
              roadmaps={all_roadmaps}
              current={technology}
            />
          </div>
          <RoadmapHeader roadmap={roadmap} />
          <div className="mt-10 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <RoadmapMap roadmap={roadmap} technology={technology} />
            </div>
            <aside className="lg:col-span-4 order-1 lg:order-2">
              <RoadmapSidebar roadmap={roadmap} technology={technology} progression={progression} />
            </aside>
          </div>
          <RoadmapCta technology={technology} firstLesson={roadmap.lessons[0]?.slug} />
        </div>
      </div>
    </MainLayout>
  )
}
