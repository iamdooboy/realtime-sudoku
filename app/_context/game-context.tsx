"use client"

import { createContext, useState } from "react"
import {
  useStorage,
  useUpdateMyPresence,
  useMutation
} from "@liveblocks/react/suspense"
import { PropsWithChildren } from "react"
import { LiveList } from "@liveblocks/client"
import { DEFAULT_NOTES } from "@/utils/constants"

type NoteContextProps = {
  notesMode: boolean
  notesToggle: () => void
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
  selectNum: ({ numPad, value, index }: SelectNumProps) => void
}

type SelectNumProps = {
  numPad: number | undefined
  value: number | undefined
  index: number | undefined
}

export const NoteContext = createContext<NoteContextProps>({
  notesMode: false,
  notesToggle: () => {}
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
    ({ storage }, { numPad, value, index }: SelectNumProps) => {
      const lson = storage.get("plainLson")
      const cell = lson.get("sudoku").get(index!)
      const valid = cell?.get("key") === numPad
      cell?.set("notes", new LiveList(DEFAULT_NOTES))
      cell?.update({ value: numPad, valid })
      //console.log({ numPad, value, index })
    },
    []
  )

  const notesToggle = () => setNotesMode(!notesMode)

  return (
    <NoteContext.Provider value={{ notesMode, notesToggle }}>
      <TableCellContext.Provider value={{ tableCell, onClickTableCell }}>
        <NumPadContext.Provider value={{ selectNum }}>
          {children}
        </NumPadContext.Provider>
      </TableCellContext.Provider>
    </NoteContext.Provider>
  )
}
