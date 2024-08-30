import { DIFFICULTIES } from "@/utils/constants"
import { Button } from "@/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shadcn/dropdown-menu"
import SparklesText from "./sparkles-text"
import { useMutation } from "@liveblocks/react/suspense"
import { LiveList, LiveObject } from "@liveblocks/client"
import { generateSudoku } from "@/lib/utils"
import { motion } from "framer-motion"

export function Complete() {
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 w-full h-full justify-center bg-background border shadow aspect-square">
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
