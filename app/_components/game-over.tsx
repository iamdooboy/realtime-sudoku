"use client"

import { generateSudoku } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shadcn/dropdown-menu"
import { DIFFICULTIES } from "@/utils/constants"
import { LiveList, LiveObject } from "@liveblocks/client"
import { useMutation } from "@liveblocks/react/suspense"
import { motion } from "framer-motion"
import HyperText from "./hyper-text"
import PulsatingButton from "./pulsating-button"
import { Button } from "./shadcn/button"

export const GameOver = () => {
  const startNewGame = useMutation(({ storage }, difficulty: string) => {
    const sudoku = generateSudoku(difficulty)
    storage.update({
      time: 0,
      isRunning: true,
      isSolved: false,
      sudoku: sudoku,
      mistakeCount: 0,
      validateMode: storage.get("validateMode"),
      undoHistory: new LiveList([]),
      redoHistory: new LiveList([]),
      confettiOptions: new LiveObject({
        x: null,
        y: null
      })
    })
  }, [])

  const secondChance = useMutation(({ storage }) => {
    storage.update({
      mistakeCount: storage.get("mistakeCount") - 1,
      undoHistory: new LiveList([]),
      redoHistory: new LiveList([]),
      isRunning: true
    })
  }, [])

  return (
    <motion.div
      className="size-full border shadow flex flex-col justify-center items-center gap-1 bg-muted aspect-square"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2">
        <HyperText className="text-4xl font-bold" text="Game Over" />
        <PulsatingButton onClick={secondChance} className="border bg-primary">
          Second chance
        </PulsatingButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">New game</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {DIFFICULTIES.map((difficulty) => (
              <DropdownMenuItem
                key={difficulty}
                className="cursor-pointer"
                onClick={() => startNewGame(difficulty)}
              >
                {difficulty}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}
