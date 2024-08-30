"use client"

import { TableCellContext } from "@/app/_context/table-cell-context"
import { cn } from "@/lib/utils"
import { GRID_SIZE } from "@/utils/constants"
import { useStorage } from "@liveblocks/react"
import { motion } from "framer-motion"
import { useContext } from "react"
import { Complete } from "../complete"
import { PlayButton } from "../play-button"
import { Td } from "./table-cell"

export const Table = () => {
  const { tableCell, onClickTableCell } = useContext(TableCellContext)
  const isRunning = useStorage((root) => root.isRunning)
  const isSolved = useStorage((root) => root.isSolved)

  return (
    <motion.div
      className="grid grid-cols-9 w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {GRID_SIZE.map((row, rowIndex) =>
        GRID_SIZE.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "flex items-center justify-center border border-b-0 border-r-0",
              {
                "border-t-2 border-t-border-thick": rowIndex % 3 === 0,
                "border-l-2 border-l-border-thick": colIndex % 3 === 0,
                "border-r-2 border-r-border-thick": colIndex === 8,
                "border-b-2 border-b-border-thick": rowIndex === 8
              }
            )}
          >
            {!isRunning && !isSolved ? (
              <div className="size-full aspect-square"></div>
            ) : (
              <Td
                sudokuIndex={row * 9 + col}
                tableCell={tableCell}
                setTableCell={onClickTableCell}
              />
            )}
          </div>
        ))
      )}
      {!isRunning && !isSolved && <PlayButton />}
      {isSolved && <Complete />}
    </motion.div>
  )
}
