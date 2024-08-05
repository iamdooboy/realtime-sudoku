import { LiveList, LiveObject } from "@liveblocks/client"

declare global {
  type Notes = LiveList<number>

  type Cell = LiveObject<{
    value: number | null | Notes
    immutable: boolean
    valid: boolean
    key: number
  }>

  type Sudoku = LiveList<Cell>

  type HistoryStack = LiveObject<{
    index: number | null
    value: number | null | Notes
    numPad: number | null
    mode: "default" | "notes" | "erase"
  }>

  interface Liveblocks {
    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      root: LiveObject<{
        startTime: number
        isPaused: boolean
        initialLoad: boolean
        isSolved: boolean
        mistakeCount: number
        sudoku: Sudoku
        undoHistory: LiveList<HistoryStack>
        redoHistory: LiveList<HistoryStack>
      }>
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
