"use client"

import { createContext, useState } from "react"
import {
  useStorage,
  useUpdateMyPresence,
  useMutation,
  useHistory
} from "@liveblocks/react/suspense"
import { PropsWithChildren } from "react"
import { LiveList } from "@liveblocks/client"

type ToolbarContextProps = {
  undo: () => void
  redo: () => void
  erase: (index: number) => void
  notesMode: boolean
  toggleNotesMode: () => void
  addNotes: (notesProps: NotesProps) => void
}

type NotesProps = {
  index: number
  numPad: number
}

type TableCellProps = {
  value: number | null | readonly number[]
  index: number | null
}

type TableCellContextProps = {
  tableCell: TableCellProps
  onClickTableCell: ({ value, index }: TableCellProps) => void
}

type NumPadContextProps = {
  selectNum: ({ numPad, index, value, notesMode }: SelectNumProps) => void
}

type SelectNumProps = {
  numPad: number | null
  index: number | null
  value: number | null | readonly number[]
  notesMode: boolean
}

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

export const ToolbarContext = createContext<ToolbarContextProps>({
  undo: () => {},
  redo: () => {},
  erase: () => {},
  notesMode: false,
  toggleNotesMode: () => {},
  addNotes: () => {}
})
export const TableCellContext = createContext<TableCellContextProps>({
  tableCell: {
    value: null,
    index: null
  },
  onClickTableCell: () => {}
})

export const NumPadContext = createContext<NumPadContextProps>({
  //number: null,
  selectNum: () => {}
})

export const GameProvider = ({ children }: PropsWithChildren) => {
  const updateMyPresence = useUpdateMyPresence()
  const [notesMode, setNotesMode] = useState(false)
  const [tableCell, setTableCell] = useState<TableCellProps>({
    value: null,
    index: null
  })

  const onClickTableCell = ({ value, index }: TableCellProps) => {
    updateMyPresence({ focusIndex: index })
    setTableCell({ value, index })
  }

  const selectNum = useMutation(
    ({ storage }, { numPad, index, value, notesMode }: SelectNumProps) => {
      const root = storage.get("root")
      const redoHistory = storage?.get("root")?.get("redoHistory")
      if(redoHistory.length > 0) {
        redoHistory.clear()
      }

      const cell = root.get("sudoku").get(index!)
      const valid = cell?.get("key") === numPad
      const mistakeCount = root.get("mistakeCount")
      // if (!valid) {
      //   root.set("mistakeCount", mistakeCount + 1)
      //   // return
      // }

      root.get("undoHistory").push({
        index,
        value,
        numPad,
        mode: notesMode ? "notes" : "default"
      })
      //root.get('undoHistory').clear()
      cell?.update({ value: numPad, valid })
      setTableCell({ value: numPad, index })
    },
    []
  )

  const redo = useMutation(({ storage }) => {
    const redoHistory = storage?.get("root")?.get("redoHistory")
    if (redoHistory.length === 0) return

    const last = redoHistory?.get(redoHistory.length - 1)
    if (last === undefined) return

    const sudoku = storage?.get("root")?.get("sudoku")?.get(last.index)
    sudoku?.set("value", last.numPad)
    const undoHistory = storage.get("root").get("undoHistory")

    undoHistory.push(last)
    redoHistory.delete(redoHistory.length - 1)
  }, [])

  const undo = useMutation(({ storage }) => {
    const undoHistory = storage?.get("root")?.get("undoHistory")
    if (undoHistory.length === 0) return

    const last = undoHistory?.get(undoHistory.length - 1)
    // undoHistory.clear()
    // return

    //const last = undoHistory?.get(undoHistory.length - 1)
    if (last === undefined) return

    const sudoku = storage?.get("root")?.get("sudoku")?.get(last.index)
    sudoku?.set("value", last.value)
    const redoHistory = storage.get("root").get("redoHistory")

    redoHistory.push(last)
    undoHistory.delete(undoHistory.length - 1)
  }, [])

  const erase = useMutation(({ storage }, index: number) => {
    if (index === null) return
    const sudoku = storage?.get("root")?.get("sudoku")
    const undoHistory = storage?.get("root")?.get("undoHistory")

    const prev = sudoku?.get(index)?.get("value")
    undoHistory.push({ index, value: prev, numPad: 0, mode: "erase" })

    sudoku.get(index)?.update({
      value: 0,
      immutable: false,
      valid: false
    })
    setTableCell({
      value: null,
      index
    })
  }, [])

  const addNotes = useMutation(
    ({ storage }, { index, numPad }: { index: number; numPad: number }) => {
      const lson = storage.get("root")
      const cell = lson.get("sudoku").get(index!)

      let value = cell?.get("value")

      if (
        typeof cell?.get("value") === "number" ||
        cell?.get("value") === null
      ) {
        value = new LiveList([0, 0, 0, 0, 0, 0, 0, 0, 0])
      } else {
        value = cell?.get("value")
      }

      if (typeof value === "object" && value?.get(numPad - 1)! > 0) {
        value?.set(numPad - 1, 0)
        return
      } else if (typeof value === "object" && value?.get(numPad - 1)! === 0) {
        value?.set(numPad - 1, numPad)
      } else {
        cell?.update({ value: value, valid: false })
      }

      // if (typeof cell?.get("value") === "number" || cell?.get("value") === null) {
      //   value = new LiveList([0, 0, 0, 0, 0, 0, 0, 0, 0])
      // }
      // if (value?.get(numPad - 1)! > 0) {
      //   value?.set(numPad - 1, 0)
      //   return
      // }
      // value.set(numPad - 1, numPad)

      // cell?.update({ value: value, valid: false })
    },
    []
  )

  const toggleNotesMode = () => setNotesMode(!notesMode)

  return (
    <ToolbarContext.Provider
      value={{ undo, redo, erase, notesMode, toggleNotesMode, addNotes }}
    >
      <TableCellContext.Provider value={{ tableCell, onClickTableCell }}>
        <NumPadContext.Provider value={{ selectNum }}>
          {children}
        </NumPadContext.Provider>
      </TableCellContext.Provider>
    </ToolbarContext.Provider>
  )
}
