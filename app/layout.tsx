import type { ReactNode } from "react";

export const metadata = {
  title: "FixText Clone",
  description: "Simple Next.js app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}