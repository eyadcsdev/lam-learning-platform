import { LamLogo } from "@/components/lam-logo"

interface LoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-lam-bg-0/95 backdrop-blur-sm"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-lam-gold/15 blur-[100px]" />
          </div>

          {/* Logo animation */}
          <div
            className="relative"
          >
            <div className="relative">
              <LamLogo size={64} showWordmark={false} />
              {/* Pulsing ring */}
              <span
                className="absolute inset-0 rounded-2xl border-2 border-lam-gold/40"
              />
              <span
                className="absolute inset-0 rounded-2xl border border-lam-gold/20"
              />
            </div>
          </div>

          {/* Wordmark */}
          <div
            className="mt-5 text-center"
          >
            <p className="font-display text-lg font-extrabold tracking-tight text-lam-text">
              لام
            </p>
            <p className="text-[10px] font-medium text-lam-text-muted tracking-[0.2em] mt-1">
              LAM.DEV
            </p>
          </div>

          {/* Loading dots */}
          <div
            className="mt-6 flex items-center gap-2"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-2 rounded-full bg-lam-gold"
              />
            ))}
          </div>

          <p
            className="mt-4 text-[11px] font-mono text-lam-text-muted/60"
          >
            جارٍ التحميل…
          </p>
        </div>
      )}
    </>
  )
}
