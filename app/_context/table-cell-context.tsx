"use client"

import { useUpdateMyPresence } from "@liveblocks/react/suspense"
import { PropsWithChildren, createContext, useState } from "react"

type TableCellProps = {
  value: number | null | readonly number[]
  index: number | null
}

type TableCellContextProps = {
  tableCell: TableCellProps
  onClickTableCell: ({ value, index }: TableCellProps) => void
}

export const TableCellContext = createContext<TableCellContextProps>({
  tableCell: {
    value: null,
    index: null
  },
  onClickTableCell: () => {}
})

export const TableCellProvider = ({ children }: PropsWithChildren) => {
  const updateMyPresence = useUpdateMyPresence()
  const [tableCell, setTableCell] = useState<TableCellProps>({
    value: null,
    index: null
  })

  const onClickTableCell = ({ value, index }: TableCellProps) => {
    updateMyPresence({ focusIndex: index })
    setTableCell({ value, index })
  }

  return (
    <TableCellContext.Provider value={{ onClickTableCell, tableCell }}>
      {children}
    </TableCellContext.Provider>
  )
}
