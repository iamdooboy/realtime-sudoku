import { LiveList, LiveObject } from "@liveblocks/client"

declare global {
  type Presence = {
    focusIndex: number | null
    isTyping: boolean
  }

  type Message = {
    user: string
    text: string
  }

  type Notes = LiveList<number>

  type Cell = LiveObject<{
    value: number | null | Notes
    immutable: boolean
    valid: boolean
    key: number
  }>

  type Sudoku = LiveList<Cell>

  type HistoryStack = {
    index: number | null
    valueBefore: number | null | Notes
    valueAfter: number | null | Notes
    mode: "default" | "notes" | "erase"
  }

  interface Liveblocks {
    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      time: number
      isRunning: boolean
      isSolved: boolean
      mistakeCount: number
      sudoku: Sudoku
      validateMode: boolean
      undoHistory: LiveList<LiveObject<HistoryStack>>
      redoHistory: LiveList<LiveObject<HistoryStack>>
      messages: LiveList<LiveObject<Message>>
    }

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string
      info: {
        name: string
        avatar: string
      }
    }
  }
}

export {}
