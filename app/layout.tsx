import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import type { ReactNode } from "react"

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "FixText — Clone",
  description: "Smart tools to clean and transform your text",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        {children}
      </body>
    </html>
  )
}