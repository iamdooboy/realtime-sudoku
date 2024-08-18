"use client"
import React, { useContext } from "react"
import { Button } from "./shadcn/button"
import { useMutation } from "@liveblocks/react/suspense"
import { TableCellContext } from "../_context/table-cell-context"
import { LiveList, LiveObject } from "@liveblocks/client"
import { NotesContext } from "../_context/notes-context"
import { cn } from "@/lib/utils"

type SelectNumProps = {
  numPad: number | null
  index: number | null
}

export const Numpad = () => {
  const { tableCell } = useContext(TableCellContext)
  const { notesMode } = useContext(NotesContext)

  const selectNum = useMutation(
    ({ storage }, { numPad, index }: SelectNumProps) => {
      if (index === null || numPad === null) return

      const root = storage?.get("root")

      const sudoku = root?.get("sudoku")
      let currentValue = sudoku?.get(index)?.get("value")

      if (currentValue === undefined || currentValue === null) return

      //Toggle number is already present
      if (currentValue === numPad) {
        sudoku.get(index)?.set("value", 0)
        return
      }

      const redoHistory = root.get("redoHistory")
      const undoHistory = root.get("undoHistory")

      if (redoHistory.length > 0) {
        redoHistory.clear()
      }

      const cell = root.get("sudoku").get(index!)
      const valid = cell?.get("key") === numPad

      if (!valid) {
        root.set("mistakeCount", root.get("mistakeCount") + 1)
      }

      cell?.update({ value: numPad, valid })

      // if (isGameSolved(sudoku)) {
      //   storage.get("root").update({
      //     isSolved: true
      //     //isPaused: true
      //   })
      // }

      if (typeof currentValue === "object") {
        currentValue = new LiveList([...currentValue.toImmutable()])
      }

      const history = new LiveObject<HistoryStack>({
        index,
        valueBefore: currentValue,
        valueAfter: numPad,
        mode: "default"
      })

      undoHistory.push(history)
    },
    []
  )

  const addNotes = useMutation(
    ({ storage }, { index, numPad }: { index: number; numPad: number }) => {
      if (index === null) return

      const root = storage.get("root")
      if (!root) return

      const sudoku = root.get("sudoku")
      const undoHistory = root.get("undoHistory")

      const cell = sudoku.get(index)

      if (cell?.get("valid") === true) {
        cell.set("valid", false)
      }

      const value = cell?.get("value")
      if (value === undefined) return
      let before, after

      if (typeof value === "object" && value !== null) {
        const currentValue = value?.get(numPad - 1)

        if (currentValue === undefined) return

        value.set(numPad - 1, currentValue > 0 ? 0 : numPad)

        const immutable = value?.toImmutable()
        before = [...immutable]
        after = [...immutable]
        after[numPad - 1] = currentValue > 0 ? 0 : numPad

        const history = new LiveObject<HistoryStack>({
          index,
          valueBefore: new LiveList(before),
          valueAfter: new LiveList(after),
          mode: "notes"
        })

        undoHistory.push(history)
        return
      }

      const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      arr[numPad - 1] = numPad
      cell?.set("value", new LiveList(arr))

      const history = new LiveObject<HistoryStack>({
        index,
        valueBefore: value,
        valueAfter: new LiveList(arr),
        mode: "notes"
      })

      undoHistory.push(history)
    },
    []
  )

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numPad) => (
        <Button
          className="w-full h-full rounded"
          variant="secondary"
          key={numPad}
          onClick={() => {
            if (notesMode) {
              addNotes({ numPad, index: tableCell.index! })
              return
            }
            selectNum({ numPad, index: tableCell.index })
          }}
        >
          <p
            className={cn("text-2xl transition-all duration-200 ease-in-out", {
              "text-sm": notesMode
            })}
          >
            {numPad}
          </p>
        </Button>
      ))}
    </>
  )
}
