"use client"

import { PlayCircle } from "lucide-react"
import { useContext } from "react"
import { TimeContext } from "../_context/time-context"

export function PlayButton() {
  const { start, isRunning } = useContext(TimeContext)
  return (
    <>
      {!isRunning && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <PlayCircle
            onClick={() => start()}
            size={100}
            className="text-muted-foreground hover:text-muted-foreground/70 cursor-pointer"
          />
        </div>
      )}
    </>
  )
}
