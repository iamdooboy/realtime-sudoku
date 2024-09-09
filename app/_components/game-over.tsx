"use client"

import { generateSudoku } from "@/lib/utils"
import { Button } from "@/shadcn/button"
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
import { useEffect, useState } from "react"
import HyperText from "./hyper-text"
import PulsatingButton from "./pulsating-button"

export const GameOver = () => {
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

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
      isRunning: true,
      mistakeCount: storage.get("mistakeCount") - 1,
      undoHistory: new LiveList([]),
      redoHistory: new LiveList([])
    })
  }, [])

  return (
    <motion.div
      className="flex aspect-square size-full flex-col items-center justify-center gap-1 border bg-muted shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2">
        <HyperText className="font-bold text-4xl" text="Game Over" />
        <PulsatingButton
          disabled={isDisabled}
          onClick={secondChance}
          className="border bg-primary"
        >
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
