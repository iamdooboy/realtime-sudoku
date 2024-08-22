"use client"

import { ReactNode, useEffect, useState } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from "@liveblocks/react/suspense"
import { LiveList } from "@liveblocks/client"
import { NameDialog } from "./name-dialog"

type RoomProps = {
  roomId: string
  children: ReactNode
}

const initialStorage = {
  time: 0,
  isRunning: false,
  isSolved: false,
  sudoku: new LiveList([]),
  mistakeCount: 0,
  validateMode: false,
  undoHistory: new LiveList([]),
  redoHistory: new LiveList([]),
  messages: new LiveList([])
}

export function LiveblocksRoom({ children, roomId }: RoomProps) {
  const [name, setName] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedName = localStorage.getItem("name")
    if (storedName) {
      setName(storedName)
    } else {
      setShowDialog(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = () => {
    if (name.trim() === "") return
    localStorage.setItem("name", name)
    setName(name)
    setShowDialog(false)
  }

  if (isLoading) return null

  if (showDialog) {
    return (
      <NameDialog input={name} setInput={setName} handleSubmit={handleSubmit} />
    )
  }

  return (
    <LiveblocksProvider
      authEndpoint={async (room) => {
        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
          body: JSON.stringify({ room, name })
        })
        return await response.json()
      }}
    >
      <RoomProvider
        initialPresence={{ focusIndex: null, isTyping: false }}
        id={roomId}
        initialStorage={initialStorage}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
