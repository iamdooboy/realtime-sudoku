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
import SparklesText from "./sparkles-text"

export function Winner() {
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

  return (
    <div className="flex aspect-square size-full flex-col items-center justify-center gap-4 border bg-muted shadow">
      <motion.div
        variants={{
          hidden: { filter: "blur(10px)", opacity: 0 },
          visible: { filter: "blur(0px)", opacity: 1 }
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
      >
        <SparklesText text="g g" />
      </motion.div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>New Game</Button>
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
  )
}
