"use client"

import { PlayCircle } from "lucide-react"
import { useContext } from "react"
import { TimeContext } from "../_context/time-context"

export function PlayButton() {
  const { elapsedTime, pauseTimer, isPaused } = useContext(TimeContext)
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
