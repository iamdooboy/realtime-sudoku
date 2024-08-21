"use client"

import { PauseCircle, PlayCircle } from "lucide-react"
import { useEffect } from "react"
import { useMutation, useStorage } from "@liveblocks/react/suspense"

export function Timer() {
  const time = useStorage((root) => root.time)
  const isRunning = useStorage((root) => root.isRunning)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        update()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [time, isRunning])

  const start = useMutation(({ storage }) => {
    storage.set("isRunning", true)
  }, [])

  const pause = useMutation(({ storage }) => {
    storage.set("isRunning", false)
  }, [])

  const update = useMutation(({ storage }) => {
    storage.set("time", (storage.get("time") || 0) + 1)
  }, [])

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const buttonWrapper = (component: JSX.Element, func: () => void) => {
    return (
      <button
        className="text-muted-foreground hover:text-muted-foreground/70"
        onClick={func}
      >
        {component}
      </button>
    )
  }

  return (
    <div className="flex gap-2 justify-end">
      {isRunning
        ? buttonWrapper(<PauseCircle />, pause)
        : buttonWrapper(<PlayCircle />, start)}
      <span className="font-mono text-muted-foreground">
        {formatTime(time)}
      </span>
    </div>
  )
}
