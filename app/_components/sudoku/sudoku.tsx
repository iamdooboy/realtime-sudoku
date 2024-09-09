"use client"

import { TableCellContext } from "@/app/_context/table-cell-context"
import { cn } from "@/lib/utils"
import { GRID_SIZE } from "@/utils/constants"
import { useMutation, useStorage } from "@liveblocks/react/suspense"
import { motion } from "framer-motion"
import { useContext } from "react"
import { GameOver } from "../game-over"
import { PlayButton } from "../play-button"
import { Winner } from "../winner"
import { SudokuCell } from "./sudoku-cell"

export const Sudoku = () => {
  const { tableCell, onClickTableCell } = useContext(TableCellContext)
  const isRunning = useStorage((root) => root.isRunning)
  const isSolved = useStorage((root) => root.isSolved)
  const mistakeCount = useStorage((root) => root.mistakeCount)

  const pauseGame = useMutation(({ storage }) => {
    storage.set("isRunning", false)
  }, [])

  if (mistakeCount === 3) {
    pauseGame()
    return <GameOver />
  }

  if (isSolved) return <Winner />

  return (
    <motion.div
      className="relative grid h-full w-full grid-cols-9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {GRID_SIZE.map((row, rowIndex) =>
        GRID_SIZE.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "flex items-center justify-center border border-r-0 border-b-0",
              {
                "border-t-2 border-t-border-thick": rowIndex % 3 === 0,
                "border-l-2 border-l-border-thick": colIndex % 3 === 0,
                "border-r-2 border-r-border-thick": colIndex === 8,
                "border-b-2 border-b-border-thick": rowIndex === 8
              }
            )}
          >
            {!isRunning && !isSolved ? (
              <div className="aspect-square size-full"></div>
            ) : (
              <SudokuCell
                sudokuIndex={row * 9 + col}
                tableCell={tableCell}
                setTableCell={onClickTableCell}
              />
            )}
          </div>
        ))
      )}
      {!isRunning && !isSolved && <PlayButton />}
    </motion.div>
  )
}
