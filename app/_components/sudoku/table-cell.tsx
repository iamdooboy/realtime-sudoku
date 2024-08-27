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
          "bg-secondary text-center aspect-square align-middle w-full h-full flex items-center justify-center relative",
          {
            "bg-tertiary": value === tableCell.value || sameInstance
          }
        )}
      >
        {value}
      </div>
    )
  }

  const cellClassName = cn(
    "text-center aspect-square align-middle w-full h-full flex items-center justify-center relative",
    {
      "text-blue-500": valid && validateMode,
      "text-red-500": !valid && validateMode,
      "bg-tertiary":
        (value === tableCell.value && typeof value === "number" && value > 0) ||
        sameInstance,
      "bg-muted":
        value === tableCell.value &&
        validateMode &&
        typeof value === "number" &&
        value > 0,
      "bg-blue-100": selectedCell
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
                "absolute inset-0 bg-red-100 text-center justify-center items-center flex z-0",
                {
                  "mix-blend-multiply": focusIndex === tableCell.index
                }
              )}
            >
              {showNotes ? (
                <Notes notes={value} />
              ) : (
                value !== 0 && <p>{value}</p>
              )}
            </div>
          )
        }
      })}
      {showNotes ? <Notes notes={value} /> : value !== 0 && <p>{value}</p>}
    </div>
  )
}
