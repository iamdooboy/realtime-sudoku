"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/shadcn/badge"
import { Button } from "@/shadcn/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn/tooltip"
import { TOOL_TYPES } from "@/utils/constants"
import { LiveObject } from "@liveblocks/client"
import { useMutation, useStorage } from "@liveblocks/react/suspense"
import confetti from "canvas-confetti"
import { Edit3, Eraser, Redo2, Undo2 } from "lucide-react"
import { useContext } from "react"
import { NotesContext } from "../_context/notes-context"
import { ConfettiButton } from "./confetti"
import { DeleteButton } from "./delete-button"

type ToolProps = {
  disabled: boolean
  type: string
  onClick: () => void
  icon: React.JSX.Element
}

const NotesButton = ({ notesMode }: { notesMode: boolean }) => {
  return (
    <div>
      <div className="-translate-y-1/2 absolute top-0 right-0 translate-x-1/2">
        <Badge variant={notesMode ? "default" : "secondary"}>
          {notesMode ? "On" : "Off"}
        </Badge>
      </div>
      <Edit3 />
    </div>
  )
}

export const Toolbar = () => {
  const canUndo = useStorage((root) => root.undoHistory.length > 0)
  const canRedo = useStorage((root) => root.redoHistory.length > 0)
  const isRunning = useStorage((root) => root.isRunning)
  const isSolved = useStorage((root) => root.isSolved)
  const confettiOptions = useStorage((root) => root.confettiOptions)

  const redo = useMutation(({ storage }) => {
    const undoHistory = storage?.get("undoHistory")
    const redoHistory = storage?.get("redoHistory")
    const sudoku = storage?.get("sudoku")

    if (redoHistory.length === 0) return

    const lastMove = redoHistory?.get(redoHistory.length - 1)
    if (!lastMove) return

    const lastIndex = lastMove?.get("index")
    const sudokuItem = sudoku?.get(lastIndex!)

    let valueAfter = lastMove?.get("valueAfter")
    let valueBefore = lastMove?.get("valueBefore")

    const valid = sudokuItem?.get("key") === lastMove?.get("valueBefore")

    sudokuItem?.update({
      valid,
      value:
        typeof valueBefore === "object" ? valueBefore?.clone() : valueBefore
    })

    const undoItem = new LiveObject({
      index: lastIndex,
      valueBefore:
        typeof valueAfter === "object" ? valueAfter?.clone() : valueAfter,
      valueAfter:
        typeof valueBefore === "object" ? valueBefore?.clone() : valueBefore,
      mode: lastMove?.get("mode")
    })

    undoHistory.push(undoItem)
    redoHistory.delete(redoHistory.length - 1)
  }, [])

  const undo = useMutation(({ storage }) => {
    const undoHistory = storage?.get("undoHistory")
    const redoHistory = storage?.get("redoHistory")
    const sudoku = storage?.get("sudoku")

    if (undoHistory.length === 0) return

    const lastMove = undoHistory?.get(undoHistory.length - 1)
    if (!lastMove) return

    const lastIndex = lastMove?.get("index")
    const sudokuItem = sudoku?.get(lastIndex!)

    let valueAfter = lastMove?.get("valueAfter")
    let valueBefore = lastMove?.get("valueBefore")

    const valid = sudokuItem?.get("key") === lastMove?.get("valueBefore")

    sudokuItem?.update({
      valid,
      value:
        typeof valueBefore === "object" ? valueBefore?.clone() : valueBefore
    })

    const redoItem = new LiveObject({
      index: lastIndex,
      valueBefore:
        typeof valueAfter === "object" ? valueAfter?.clone() : valueAfter,
      valueAfter:
        typeof valueBefore === "object" ? valueBefore?.clone() : valueBefore,
      mode: lastMove?.get("mode")
    })

    redoHistory.push(redoItem)
    undoHistory.delete(undoHistory.length - 1)
  }, [])

  const setOrigin = useMutation(
    ({ storage }, e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      storage.set(
        "confettiOptions",
        new LiveObject({
          x,
          y
        })
      )
    },
    []
  )

  const { notesMode, toggleNotesMode } = useContext(NotesContext)

  if (isSolved) {
    if (confettiOptions.x && confettiOptions.y) {
      confetti({
        get angle() {
          return Math.random() * 360
        },
        origin: {
          x: confettiOptions.x / window.innerWidth,
          y: confettiOptions.y / window.innerHeight
        }
      })
    }

    return (
      <Button
        onClick={(e) => setOrigin(e)}
        variant="secondary"
        className="h-14 w-full"
      >
        🎉
      </Button>
    )
  }

  const Tools: ToolProps[] = [
    {
      disabled: !canUndo,
      type: TOOL_TYPES.UNDO,
      onClick: undo,
      icon: <Undo2 />
    },
    {
      disabled: !canRedo,
      type: TOOL_TYPES.REDO,
      onClick: redo,
      icon: <Redo2 />
    },
    {
      disabled: false,
      type: TOOL_TYPES.ERASE,
      onClick: toggleNotesMode,
      icon: <NotesButton notesMode={notesMode} />
    }
  ]

  return (
    <TooltipProvider>
      {Tools.map((tool) => (
        <Tooltip key={tool.type}>
          <TooltipTrigger asChild>
            <Button
              disabled={tool.disabled || !isRunning}
              className={cn("relative size-14 rounded-xl", {
                "bg-accent": notesMode && tool.type === TOOL_TYPES.ERASE
              })}
              variant="outline"
              onClick={() => tool.onClick()}
            >
              {tool.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tool.type}</TooltipContent>
        </Tooltip>
      ))}
      <DeleteButton
        disabled={!isRunning}
        className="block size-14 rounded-lg sm:hidden"
        variant="outline"
      >
        <Eraser />
      </DeleteButton>
    </TooltipProvider>
  )
}
