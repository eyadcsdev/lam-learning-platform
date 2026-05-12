import { createInertiaApp, router } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import { LoadingScreen } from '@/components/loading-screen'
import { XpProvider } from '@/lib/xp-context'
import './../css/app.css'

function AppWithLoader({ App, props }) {
  const [isLoading, setIsLoading] = useState(true)
  const initialXp = props?.auth?.user?.xp ?? 0

  useEffect(() => {
    const show = () => setIsLoading(true)
    const hide = () => setIsLoading(false)

    hide()

    const removeStart = router.on('start', show)
    const removeFinish = router.on('finish', hide)

    return () => {
      removeStart()
      removeFinish()
    }
  }, [])

  return (
    <XpProvider initialXp={initialXp}>
      <LoadingScreen isLoading={isLoading} />
      <App {...props} />
    </XpProvider>
  )
}

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx')
    const page = pages[`./Pages/${name}.jsx`]
    return page().then((module) => module.default)
  },
  setup({ el, App, props }) {
    if (!window.__inertiaRoot) {
      window.__inertiaRoot = createRoot(el)
    }
    window.__inertiaRoot.render(<AppWithLoader App={App} props={props} />)
  },
})
