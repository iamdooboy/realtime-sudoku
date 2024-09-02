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
        "relative text-center cursor-pointer flex justify-center items-center rounded-lg text-primary-foreground px-4 py-2 disabled:pointer-events-none disabled:opacity-50 transition-opacity duration-300 ease-in-out",
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
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  )
}
