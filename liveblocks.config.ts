// Define Liveblocks types for your application

import { LiveList, LiveObject } from "@liveblocks/client"

// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  type Notes = LiveList<number>

  type Square = LiveObject<{
    value: number
    immutable: boolean
    valid: boolean
    key: number
    notes: Notes
  }>

  type Sudoku = LiveList<Square>

  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      // cursor: { x: number; y: number };
    }

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      // startTime: number
      // isPaused: boolean
      // initialLoad: boolean
      // isSolved: boolean
      // mistakeCount: number
      // sudoku: Sudoku
    }

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string
      info: {
        // Example properties, for useSelf, useUser, useOthers, etc.
        name: string
        avatar: string
      }
    }

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {}
    // Example has two events, using a union
    // | { type: "PLAY" }
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    }

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    }
  }
}

export {}
