import { cn } from "@/lib/utils"

interface LamLogoProps {
  className?: string
  size?: number
  showWordmark?: boolean
}

/**
 * Lam (لام) brand mark — a stylized geometric rendering of the Arabic letter Lām (ل)
 * combined with a glowing terminal cursor, symbolizing language + code.
 */
export function LamLogo({ className, size = 36, showWordmark = true }: LamLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)} aria-label="لام">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          fill="none"
          aria-hidden="true"
          className="relative z-10"
        >
          <defs>
            <linearGradient id="lam-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fabd2f" />
              <stop offset="60%" stopColor="#fe8019" />
              <stop offset="100%" stopColor="#d79921" />
            </linearGradient>
            <linearGradient id="lam-grad-soft" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fabd2f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fe8019" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Outer rounded square */}
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="16"
            fill="url(#lam-grad-soft)"
            stroke="url(#lam-grad)"
            strokeWidth="1.5"
          />

          {/* Stylized Lām (ل): vertical stem + curved hook */}
          <path
            d="M40 14 V40 Q40 50 30 50 H22"
            stroke="url(#lam-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Diacritical dot */}
          <circle cx="40" cy="9" r="2.5" fill="#fabd2f" />

          {/* Terminal cursor block */}
          <rect x="14" y="46" width="6" height="6" rx="1" fill="#b8bb26" />
        </svg>

        {/* Soft glow */}
        <div
          aria-hidden
          className="absolute inset-0 -z-0 rounded-2xl blur-xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(250,189,47,0.4), transparent 70%)",
          }}
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-xl font-extrabold tracking-tight text-lam-text">
            لام
          </span>
          <span className="text-[10px] font-medium text-lam-text-muted tracking-[0.2em] mt-1">
            LAM.DEV
          </span>
        </div>
      )}
    </div>
  )
}
