"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = "#4c4c51",
  duration = "3s",
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-center text-primary-foreground transition-opacity duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-full animate-pulse rounded-lg bg-inherit" />
    </button>
  )
}
