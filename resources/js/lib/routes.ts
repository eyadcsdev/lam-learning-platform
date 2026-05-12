export function roadmapPath(tech = 'laravel') {
  return `/roadmap/${tech}`
}

export function lessonPath(tech: string, slug: string) {
  return `/roadmap/${tech}/lessons/${slug}`
}

export function docsPath(tech = 'laravel') {
  return `/roadmap/${tech}/lessons/validation-docs`
}

export function completeLessonPath(tech: string, slug: string) {
  return `/roadmap/${tech}/lessons/${slug}/complete`
}

export function validationDemoPath(tech = 'laravel') {
  return `/roadmap/${tech}/validation-demo`
}

export function progressionPath(tech = 'laravel') {
  return `/roadmap/${tech}/progression`
}
