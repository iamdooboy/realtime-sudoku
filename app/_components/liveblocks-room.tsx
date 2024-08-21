"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from "@liveblocks/react/suspense"
import { LiveList } from "@liveblocks/client"
import useLocalStorage from "@/hooks/use-local-storage"

type RoomProps = {
  roomId: string
  children: ReactNode
}

const initialStorage = {
  time: 0,
  isRunning: false,
  isSolved: false,
  sudoku: null,
  mistakeCount: 0,
  validateMode: false,
  undoHistory: null,
  redoHistory: null,
  Messages: null
}

export function LiveblocksRoom({ children, roomId }: RoomProps) {
  const [name] = useLocalStorage("name", "")
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
        initialStorage={{
          time: 0,
          isRunning: false,
          isSolved: false,
          sudoku: new LiveList([]),
          mistakeCount: 0,
          validateMode: false,
          undoHistory: new LiveList([]),
          redoHistory: new LiveList([]),
          messages: new LiveList([])
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
