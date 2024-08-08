'use client'

import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { useMutation, useStorage } from "@liveblocks/react/suspense"

type TimeContextProps = {
  pauseTimer: (elapsedTime: number) => void
  elapsedTime: number
  initialLoad: boolean
  isPaused: boolean
}

export const TimeContext = createContext<TimeContextProps>({
  pauseTimer: () => {},
  elapsedTime: 0,
  initialLoad: true,
  isPaused: false
})

export const TimeProvider = ({ children }: PropsWithChildren) => {
  const { startTime, isPaused, initialLoad } = useStorage((root) => root.root)

  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - new Date(startTime).getTime())
      }, 1000)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [startTime])

  const pauseTimer = useMutation(({ storage }, elapsedTime: number) => {
    const root = storage.get("root")
    const isPaused = root.get("isPaused")
    if (isPaused) {
      if (root.get("isSolved")) return
      root.update({
        startTime: Date.now() - elapsedTime,
        isPaused: false,
        initialLoad: false
      })
    } else {
      root.update({
        startTime: 0,
        isPaused: true,
        initialLoad: false
      })
    }
  }, [])

  return (
    <TimeContext.Provider
      value={{ elapsedTime, pauseTimer, initialLoad, isPaused }}
    >
      {children}
    </TimeContext.Provider>
  )
}
