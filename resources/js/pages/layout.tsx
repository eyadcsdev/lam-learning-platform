import type { Metadata, Viewport } from "next"
import { Cairo, Tajawal, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
  weight: ["300", "400", "500", "700", "800", "900"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "لام — منصة تعلم البرمجة بالعربية",
  description:
    "منصة لام: تجربة تفاعلية وسينمائية لتعلّم البرمجة بالعربية. دروس حية ومحاكاة سيرفر ومسارات لكل تقنية، تبدأ من Laravel.",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1d2021",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} ${jetbrains.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-svh bg-background text-foreground selection:bg-primary/30">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
