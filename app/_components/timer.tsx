"use client"

import { useGame } from "@/hooks/use-game"
import { PauseCircle, PlayCircle } from "lucide-react"

interface Timer {
  initialLoad: boolean
  isPaused: boolean
  pauseTimer: (elapsedTime: number) => void
}

export function Timer() {
  const { timeContext } = useGame()

  const { elapsedTime, pauseTimer, initialLoad, isPaused } = timeContext

  const sec = Math.floor((elapsedTime / 1000) % 60)
  const min = Math.floor((elapsedTime / (1000 * 60)) % 60)
  const hr = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24)

  const formatTime = (value: number) =>
    value.toString().padStart(2, "0").split("")

  const hours = hr.toString().split('')
  const minutes = formatTime(min)
  const seconds = formatTime(sec)

  return (
    <div className="flex gap-2 justify-end">
      <span className="text-muted-foreground font-mono inline-block">
        {[...hours, ":", ...minutes, ":", ...seconds].map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </span>
      <button onClick={() => pauseTimer(elapsedTime)}>
        {initialLoad && !isPaused && (
          <PauseCircle className="text-slate-500 hover:text-slate-600" />
        )}
        {!initialLoad && isPaused && (
          <PlayCircle className="text-slate-500 hover:text-slate-600" />
        )}
        {!initialLoad && !isPaused && (
          <PauseCircle className="text-slate-500 hover:text-slate-600" />
        )}
      </button>
    </div>
  )
}
