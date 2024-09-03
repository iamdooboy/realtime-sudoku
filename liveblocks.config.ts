import { LiveList, LiveObject } from "@liveblocks/client"

declare global {
  type Presence = {
    focusIndex: number | null
    isTyping: boolean
  }

  type Message = {
    user: string
    avatar: string
    text: string
  }

  type Cell = LiveObject<{
    value: number | undefined | LiveList<number>
    immutable: boolean
    valid: boolean
    key: number
  }>

  type Sudoku = LiveList<Cell>

  type HistoryStack = {
    index: number | null
    valueBefore: number | undefined | LiveList<number>
    valueAfter: number | undefined | LiveList<number>
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
      confettiOptions: LiveObject<{ x: number | null; y: number | null }>
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
