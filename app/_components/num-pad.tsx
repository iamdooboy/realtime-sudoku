"use client"

import { useContext } from "react"
import { Button } from "./shadcn/button"
import { useMutation, useStorage } from "@liveblocks/react/suspense"
import { TableCellContext } from "../_context/table-cell-context"
import { LiveList, LiveObject } from "@liveblocks/client"
import { NotesContext } from "../_context/notes-context"
import { cn } from "@/lib/utils"
import { Delete } from "lucide-react"
import confetti from "canvas-confetti"

type SelectNumProps = {
  numPad: number | null
  index: number | null
}

export const Numpad = () => {
  const { tableCell } = useContext(TableCellContext)
  const { notesMode } = useContext(NotesContext)

  const isRunning = useStorage((root) => root.isRunning)
  const isSolved = useStorage((root) => root.isSolved)

  const erase = useMutation(({ storage }, index: number) => {
    if (index === null) return

    const sudoku = storage.get("sudoku")
    const undoHistory = storage.get("undoHistory")

    if (sudoku.get(index)?.get("immutable") === true) return

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

  const selectNum = useMutation(
    ({ storage }, { numPad, index }: SelectNumProps) => {
      if (index === null || numPad === null) return

      const sudoku = storage?.get("sudoku")
      let currentValue = sudoku?.get(index)?.get("value")

      if (currentValue === undefined || currentValue === null) return

      //Toggle number if already present
      if (currentValue === numPad) {
        sudoku.get(index)?.set("value", 0)
        return
      }

      const redoHistory = storage.get("redoHistory")
      const undoHistory = storage.get("undoHistory")

      if (redoHistory.length > 0) {
        redoHistory.clear()
      }

      const cell = sudoku.get(index!)
      const valid = cell?.get("key") === numPad

      if (!valid) {
        storage.set("mistakeCount", storage.get("mistakeCount") + 1)
      }

      cell?.update({ value: numPad, valid })

      const isGameSolved = sudoku.every((cell) => cell.get("valid") === true)

      if (isGameSolved) {
        storage.update({ isSolved: true, isRunning: false })
        const end = Date.now() + 3 * 1000 // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

        const frame = () => {
          if (Date.now() > end) return

          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors
          })
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors
          })

          requestAnimationFrame(frame)
        }

        frame()
      }

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

      const sudoku = storage.get("sudoku")
      const undoHistory = storage.get("undoHistory")

      const cell = sudoku.get(index)

      if (cell?.get("valid") === true) {
        cell.set("valid", false)
      }

      const value = cell?.get("value")
      if (value === undefined) return

      if (typeof value === "object" && value !== null) {
        const after = [...value?.toImmutable()]

        const currentValue = value?.get(numPad - 1)
        if (currentValue === undefined) return

        after[numPad - 1] = currentValue > 0 ? 0 : numPad
        const history = new LiveObject<HistoryStack>({
          index,
          valueBefore: value?.clone(),
          valueAfter: new LiveList(after),
          mode: "notes"
        })
        undoHistory.push(history)
        value.set(numPad - 1, currentValue > 0 ? 0 : numPad)
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
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numPad, index) => (
        <Button
          disabled={!isRunning || isSolved}
          variant="secondary"
          key={index}
          className="p-2 rounded md:text-lg  sm:font-medium text-center aspect-square size-full"
          onClick={() => {
            if (notesMode) {
              addNotes({ numPad, index: tableCell.index! })
              return
            }
            selectNum({ numPad, index: tableCell.index })
          }}
        >
          <p
            className={cn("transition-all duration-200 ease-in-out", {
              "md:text-xs ": notesMode
            })}
          >
            {numPad}
          </p>
        </Button>
      ))}
      <Button
        disabled={!isRunning || isSolved}
        variant="secondary"
        className="rounded p-2 text-center aspect-square size-full hidden sm:flex"
      >
        <Delete onClick={() => erase(tableCell.index!)} />
      </Button>
    </>
  )
}
