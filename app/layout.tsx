import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/shadcn/sonner"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Sudoku with Friends",
  description: "Live multiplayer Sudoku with your friends!"
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
          "flex items-center justify-center h-screen",
          inter.className
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
