'use client'

import { Delete } from "lucide-react"
import React, { useContext } from "react"
import { Button } from "./shadcn/button"
import { TableCellContext } from '../_context/table-cell-context'
import { useMutation } from "@liveblocks/react/suspense"
import { LiveList, LiveObject } from "@liveblocks/client"

export const EraseButton = () => {
  const { tableCell } = useContext(TableCellContext)

  const erase = useMutation(({ storage }, index: number) => {
    if (index === null) return
    const root = storage?.get("root")

    const sudoku = root.get("sudoku")
    const undoHistory = root.get("undoHistory")

    if(sudoku.get(index)?.get("immutable") === true) return

    let currentValue = sudoku?.get(index)?.get("value")
    if (currentValue === undefined) return

    if (typeof currentValue === "object" && currentValue !== null) {
      currentValue = new LiveList([...currentValue.toImmutable()])
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
    <Button className="w-full h-full rounded" variant="secondary">
      <Delete onClick={() => erase(tableCell.index!)} />
    </Button>
  )
}
