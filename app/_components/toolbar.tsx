"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn/tooltip"
import { Undo2, Redo2, Edit3, Eraser } from "lucide-react"
import { Button } from "@/shadcn/button"
import { TOOL_TYPES } from "@/utils/constants"
import { cn } from "@/lib/utils"
import { Badge } from "./shadcn/badge"
import { useContext } from "react"
import { NotesContext } from "../_context/notes-context"
import { useMutation, useStorage } from "@liveblocks/react/suspense"
import { LiveObject } from "@liveblocks/client"
import { ConfettiButton } from "./confetti"

type ToolProps = {
  disabled: boolean
  type: string
  onClick: () => void
  icon: React.JSX.Element
}

const NotesButton = ({ notesMode }: { notesMode: boolean }) => {
  return (
    <div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
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

  const erase = useMutation(({ storage }, index: number) => {}, [])

  const { notesMode, toggleNotesMode } = useContext(NotesContext)

  if (isSolved) {
    const degrees = [-90, -45, 0]
    return (
      <>
        {degrees.map((degree) => (
          <ConfettiButton
            key={degree}
            className="size-14"
            variant="outline"
            options={{
              get angle() {
                return degree * -1 + 45
              }
            }}
          >
            <span
              style={{
                transform: `rotate(${degree}deg)`
              }}
            >
              🎉
            </span>
          </ConfettiButton>
        ))}
      </>
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
              className={cn("size-14 rounded-lg relative", {
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
      <Button
        disabled={!isRunning}
        className="size-14 rounded-lg sm:hidden block"
        variant="outline"
      >
        <Eraser />
      </Button>
    </TooltipProvider>
  )
}
