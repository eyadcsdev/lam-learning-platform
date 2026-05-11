"use client"

import { TheoryIntro } from "@/components/lesson/theory/theory-intro"
import { WithWithoutComparison } from "@/components/lesson/theory/with-without-comparison"
import { BeforeFrameworks } from "@/components/lesson/theory/before-frameworks"
import { RequestLifecycle } from "@/components/lesson/theory/request-lifecycle"
import { ValidationEngine } from "@/components/lesson/theory/validation-engine"
import { RulesExplainer } from "@/components/lesson/theory/rules-explainer"
import { AirportAnalogy } from "@/components/lesson/theory/airport-analogy"
import { PracticalTransition } from "@/components/lesson/theory/practical-transition"
import { PhaseBanner } from "@/components/lesson/theory/phase-banner"

export function LessonTheory() {
  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Phase 1: Why & Theory */}
      <PhaseBanner
        phase="Phase 01"
        title="المفهوم والنظرية"
        subtitle="نفهم لماذا وُجد Validation وما المشكلة التي يحلّها"
        tone="gold"
      />
      <TheoryIntro />
      <WithWithoutComparison />
      <BeforeFrameworks />

      {/* Phase 2: Internal architecture */}
      <PhaseBanner
        phase="Phase 02"
        title="المعمارية الداخلية"
        subtitle="نفكّك كيف يعمل المحرّك داخل Laravel سطراً بسطر"
        tone="orange"
      />
      <RequestLifecycle />
      <ValidationEngine />
      <RulesExplainer />
      <AirportAnalogy />

      {/* Transition into practical example */}
      <PracticalTransition />
    </div>
  )
}
