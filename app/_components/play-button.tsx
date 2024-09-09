"use client"

import { useMutation } from "@liveblocks/react/suspense"
import { PlayCircle } from "lucide-react"

export function PlayButton() {
  const start = useMutation(({ storage }) => {
    storage.set("isRunning", true)
  }, [])
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
      <PlayCircle
        onClick={() => start()}
        size={100}
        className="cursor-pointer text-muted-foreground hover:text-muted-foreground/70"
      />
    </div>
  )
}
