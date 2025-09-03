import "./globals.css";
import type { ReactNode } from "react";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "FixText Clone",
  description: "Text Tools App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
