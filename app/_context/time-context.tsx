"use client"

import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { useMutation, useStorage } from "@liveblocks/react/suspense"

export const TimeContext = createContext({
  pause: () => {},
  start: () => {},
  update: () => {},
  time: 0,
  isRunning: false
})

export const TimeProvider = ({ children }: PropsWithChildren) => {
  const { isRunning, time } = useStorage((root) => root)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        update()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const start = useMutation(({ storage }) => {
    storage.set("isRunning", true)
  }, [])

  const pause = useMutation(({ storage }) => {
    storage.set("isRunning", false)
  }, [])

  const update = useMutation(({ storage }) => {
    storage.set("time", (storage.get("time") || 0) + 1)
  }, [])

  return (
    <TimeContext.Provider value={{ time, start, pause, update, isRunning }}>
      {children}
    </TimeContext.Provider>
  )
}
