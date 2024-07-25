"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from "@liveblocks/react/suspense"

type RoomProps = {
  roomId: string
  children: ReactNode
}

export function LiveblocksRoom({ children, roomId }: RoomProps) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
