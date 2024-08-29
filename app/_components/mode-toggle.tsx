"use client"

import React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/shadcn/button"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [effect, setEffect] = React.useState(false)

  const toggleTheme = (theme: string) => {
    setEffect(true)
    setTheme(theme)
  }

  return (
    <Button
      variant="ghost"
      className={cn("rounded-md size-8 px-0 text-black dark:text-white", {
        "animate-jiggle": effect
      })}
      onAnimationEnd={() => setEffect(false)}
    >
      <div
        className="flex size-8 items-center justify-center dark:hidden"
        onClick={() => toggleTheme("dark")}
      >
        <Sun className="size-5" />
      </div>
      <div
        className="hidden size-8 items-center justify-center dark:inline-flex"
        onClick={() => toggleTheme("light")}
      >
        <Moon className="size-5" />
      </div>
    </Button>
  )
}
