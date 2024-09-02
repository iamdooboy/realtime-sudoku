import React from "react"

import { cn } from "@/lib/utils"
import { useOthersMapped, useStorage } from "@liveblocks/react/suspense"
import { Notes } from "./notes"

type TableCellProps = {
  value: number | null | readonly number[]
  index: number | null
}

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
          "aspect-square size-full flex items-center justify-center relative bg-primary-foreground",
          {
            "bg-primary/15": value === tableCell.value || sameInstance
          }
        )}
      >
        <p className="text-2xl">{value}</p>
        {others.map(([connectionId, { focusIndex }]) => {
          if (focusIndex === sudokuIndex) {
            return (
              <div
                key={connectionId}
                className="absolute inset-0 bg-incorrect/20 text-center justify-center items-center flex z-0"
              />
            )
          }
        })}
      </div>
    )
  }

  const cellClassName = cn(
    "aspect-square size-full flex items-center justify-center relative",
    {
      "text-correct": valid && validateMode,
      "text-incorrect": !valid && validateMode,
      "bg-primary/15":
        (value === tableCell.value && typeof value === "number" && value > 0) ||
        sameInstance,
      "bg-correct/15": selectedCell
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
              className="absolute inset-0 bg-incorrect/15justify-center items-center flex z-0"
            />
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
