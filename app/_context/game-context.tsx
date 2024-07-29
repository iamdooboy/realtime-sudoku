import { createContext, useEffect, useState } from "react"
import { useStorage, useUpdateMyPresence } from "@liveblocks/react/suspense"
import { PropsWithChildren } from "react"

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
  onClickTableCell: (value: number, index: number) => void
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

export const GameProvider = ({ children }: PropsWithChildren) => {
  const updateMyPresence = useUpdateMyPresence()

  const [notesMode, setNotesMode] = useState(false)
  const [tableCell, setTableCell] = useState<TableCellProps>({
    value: undefined,
    index: undefined
  })

  const onClickTableCell = (value: number, index: number) => {
    updateMyPresence({ focusIndex: index })
    setTableCell({ value: value > 0 ? value : undefined, index })
  }

  const notesToggle = () => setNotesMode(!notesMode)

  return (
    <NoteContext.Provider value={{ notesMode, notesToggle }}>
      <TableCellContext.Provider value={{ tableCell, onClickTableCell }}>
        {children}
      </TableCellContext.Provider>
    </NoteContext.Provider>
  )
}
