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
import { DEFAULT_NOTES } from "@/utils/constants"

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
  value: number | undefined
  index: number | undefined
}

type TableCellContextProps = {
  tableCell: TableCellProps
  onClickTableCell: ({ value, index }: { value: number; index: number }) => void
}

type NumPadContextProps = {
  //number: number | undefined
  selectNum: ({ numPad, index }: SelectNumProps) => void
}

type SelectNumProps = {
  numPad: number | undefined
  index: number | undefined
}

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
    value: undefined,
    index: undefined
  },
  onClickTableCell: () => {}
})

export const NumPadContext = createContext<NumPadContextProps>({
  //number: undefined,
  selectNum: () => {}
})

export const GameProvider = ({ children }: PropsWithChildren) => {
  const history = useHistory()

  const updateMyPresence = useUpdateMyPresence()

  const [notesMode, setNotesMode] = useState(false)
  const [tableCell, setTableCell] = useState<TableCellProps>({
    value: undefined,
    index: undefined
  })

  const onClickTableCell = ({
    value,
    index
  }: { value: number; index: number }) => {
    updateMyPresence({ focusIndex: index })
    setTableCell({ value: value > 0 ? value : undefined, index })
  }

  const selectNum = useMutation(
    ({ storage }, { numPad, index }: SelectNumProps) => {
      const lson = storage.get("plainLson")
      const cell = lson.get("sudoku").get(index!)
      const valid = cell?.get("key") === numPad
      cell?.set("notes", new LiveList(DEFAULT_NOTES))
      cell?.update({ value: numPad, valid })
      setTableCell({ value: numPad, index })
    },
    []
  )

  const undo = () => {
    if (!history.canUndo()) return
    history.undo()
  }

  const redo = () => {
    if (!history.canRedo()) return
    history.redo()
  }

  const erase = useMutation(({ storage }, index: number) => {
    if (!index) return
    const sudoku = storage?.get("plainLson")?.get("sudoku")
    sudoku.get(index)?.update({
      value: 0,
      immutable: false,
      valid: false,
      notes: new LiveList(DEFAULT_NOTES)
    })
    setTableCell({
      value: undefined,
      index
    })
  }, [])

  const addNotes = useMutation(
    ({ storage }, { index, numPad }: { index: number; numPad: number }) => {
      const lson = storage.get("plainLson")
      const cell = lson.get("sudoku").get(index!)
      cell?.update({ value: 0, valid: false })
      const notes = cell?.get("notes")

      if (notes?.get(numPad - 1)! > 0) {
        notes?.set(numPad - 1, 0)
        return
      }
      notes?.set(numPad - 1, numPad)
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
