import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/_components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/shadcn/sonner"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Sudoku with Friends",
  description: "Live multiplayer Sudoku with your friends!"
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-svh items-center justify-center",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
