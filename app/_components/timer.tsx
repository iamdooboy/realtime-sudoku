"use client"

import { PauseCircle, PlayCircle } from "lucide-react"
import { useContext } from "react"
import { TimeContext } from "../_context/time-context"

interface Timer {
  initialLoad: boolean
  isPaused: boolean
  pauseTimer: (elapsedTime: number) => void
}

export function Timer() {
  const { isRunning, start, pause, time } = useContext(TimeContext)

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
