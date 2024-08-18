"use client"
import { useStorage } from "@liveblocks/react/suspense"
import useCellProps from "@/hooks/use-cell-props"
import { useGame } from "@/hooks/use-game"

import { Notes } from "./notes"
import { memo, useCallback, useContext, useState } from "react"
import clsx from "clsx"
import { Td } from "./table-cell"
import { GRID_SIZE } from "@/utils/constants"
import { TableCellContext } from "@/app/_context/table-cell-context"

export const Table = () => {
  const { tableCell, onClickTableCell } = useContext(TableCellContext)

  return (
    <table className="border-2 border-black w-full h-full ">
      <tbody>
        {GRID_SIZE.map((row, rIndex) => (
          <tr
            key={row}
            className={clsx({
              "border-b-2 border-b-black": rIndex === 2 || rIndex === 5
            })}
          >
            {GRID_SIZE.map((col, cIndex) => (
              <Td
                key={col}
                cIndex={cIndex}
                sudokuIndex={row * 9 + col}
                tableCell={tableCell}
                setTableCell={onClickTableCell}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
