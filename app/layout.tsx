import "./globals.css"
import { Cairo } from "next/font/google"

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata = {
  title: "FixText Clone",
  description: "Text tools like uppercase, lowercase, trim, etc.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        {children}
      </body>
    </html>
  )
}
