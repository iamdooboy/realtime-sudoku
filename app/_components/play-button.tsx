"use client"

import { useGame } from "@/hooks/use-game"
import { PlayCircle } from "lucide-react"

export function PlayButton() {
  const { timeContext } = useGame()
  const { elapsedTime, pauseTimer, isPaused } = timeContext
  return (
    <>
      {isPaused && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <PlayCircle
            onClick={() => pauseTimer(elapsedTime)}
            size={100}
            className="text-slate-500 hover:text-slate-600 cursor-pointer"
          />
        </div>
      )}
    </>
  )
}
