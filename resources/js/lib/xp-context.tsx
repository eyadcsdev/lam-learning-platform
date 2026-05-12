import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface XpContextValue {
  xp: number
  addXp: (amount: number) => Promise<void>
  isPending: boolean
}

const XpContext = createContext<XpContextValue>({
  xp: 0,
  addXp: async () => {},
  isPending: false,
})

export function XpProvider({ children, initialXp = 0 }: { children: ReactNode; initialXp?: number }) {
  const [xp, setXp] = useState(initialXp)
  const [isPending, setIsPending] = useState(false)

  const addXp = useCallback(async (amount: number) => {
    setIsPending(true)
    try {
      const res = await fetch('/xp/award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content ?? '',
        },
        body: JSON.stringify({ amount }),
      })
      const data = await res.json()
      if (data.total_xp !== undefined) {
        setXp(data.total_xp)
      }
    } catch {
      // Silently fail — XP was already awarded optimistically but server rejected
    } finally {
      setIsPending(false)
    }
  }, [])

  return (
    <XpContext.Provider value={{ xp, addXp, isPending }}>
      {children}
    </XpContext.Provider>
  )
}

export function useXp(): XpContextValue {
  return useContext(XpContext)
}
