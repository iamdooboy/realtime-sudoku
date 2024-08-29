type TableCellProps = {
  value: number | null | readonly number[]
  index: number | null
}

import React from "react"

import { cn } from "@/lib/utils"
import { useOthersMapped, useStorage } from "@liveblocks/react/suspense"
import { Notes } from "./notes"

interface TdProps extends React.ComponentPropsWithoutRef<"td"> {
  sudokuIndex: number
  tableCell: TableCellProps
  setTableCell: ({ value, index }: TableCellProps) => void
  className?: string
}

export const Td: React.FC<TdProps> = ({
  sudokuIndex,
  tableCell,
  setTableCell,
  className
}) => {
  const others = useOthersMapped((other) => ({
    focusIndex: other.presence.focusIndex
  }))
  const sudoku = useStorage((root) => root.sudoku)
  const validateMode = useStorage((root) => root.validateMode)
  const { value, immutable, valid } = sudoku[sudokuIndex]

  const showNotes = typeof value === "object"

  const sameValue = value === tableCell.value
  const notZero = tableCell.value !== 0
  const selectedCell = tableCell.index === sudokuIndex

  const sameInstance = sameValue && notZero && !selectedCell

  if (immutable) {
    return (
      <div
        onClick={() =>
          setTableCell({
            value: value ?? null,
            index: sudokuIndex
          })
        }
        className={cn(
          "bg-accent dark:bg-accent/25 aspect-square align-middle w-full h-full flex items-center justify-center relative",
          {
            "bg-tertiary": value === tableCell.value || sameInstance
          }
        )}
      >
        <p className="text-2xl">{value}</p>
      </div>
    )
  }

  const cellClassName = cn(
    "aspect-square align-middle w-full h-full flex items-center justify-center relative",
    {
      "text-correct": valid && validateMode,
      "text-incorrect": !valid && validateMode,
      "bg-tertiary":
        (value === tableCell.value && typeof value === "number" && value > 0) ||
        sameInstance,
      "bg-muted":
        value === tableCell.value &&
        validateMode &&
        typeof value === "number" &&
        value > 0,
      "bg-correct/20": selectedCell
    },
    className
  )

  return (
    <div
      className={cellClassName}
      onClick={() =>
        setTableCell({
          value: value ?? null,
          index: sudokuIndex
        })
      }
    >
      {others.map(([connectionId, { focusIndex }]) => {
        if (focusIndex === sudokuIndex) {
          return (
            <div
              key={connectionId}
              className={cn(
                "absolute inset-0 bg-incorrect/20 text-center justify-center items-center flex z-0"
              )}
            >
              {showNotes ? (
                <Notes notes={value} />
              ) : (
                value !== 0 && <p className="text-2xl">{value}</p>
              )}
            </div>
          )
        }
      })}
      {showNotes ? (
        <Notes notes={value} />
      ) : (
        value !== 0 && <p className="text-2xl">{value}</p>
      )}
    </div>
  )
}
