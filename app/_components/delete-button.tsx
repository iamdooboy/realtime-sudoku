"use client"

import { Button, ButtonProps } from "@/shadcn/button"
import { LiveObject } from "@liveblocks/client"
import { useMutation } from "@liveblocks/react/suspense"
import { ReactNode, useContext } from "react"
import { TableCellContext } from "../_context/table-cell-context"

interface DeleteButtonProps extends ButtonProps {
  children: ReactNode
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  children,
  ...props
}) => {
  const { tableCell } = useContext(TableCellContext)

  const erase = useMutation(({ storage }, index: number) => {
    if (index === null) return
    const sudoku = storage.get("sudoku")
    const undoHistory = storage.get("undoHistory")
    if (sudoku.get(index)?.get("immutable") === true) return
    let currentValue = sudoku?.get(index)?.get("value")
    if (currentValue === undefined) return
    if (typeof currentValue === "object" && currentValue !== null) {
      currentValue = currentValue.clone()
    }
    const history = new LiveObject<HistoryStack>({
      index,
      valueBefore: currentValue,
      valueAfter: 0,
      mode: "erase"
    })
    undoHistory.push(history)
    sudoku.get(index)?.update({
      value: 0,
      valid: false
    })
  }, [])

  return (
    <Button {...props} onClick={() => erase(tableCell.index!)}>
      {children}
    </Button>
  )
}
