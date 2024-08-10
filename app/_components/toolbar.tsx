"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn/tooltip"

import { Undo2, Redo2, Eraser, Edit3 } from "lucide-react"
import { Button } from "@/shadcn/button"
import { Toggle } from "./shadcn/toggle"
import { useGame } from "@/hooks/use-game"
import { TOOL_TYPES } from "@/utils/constants"
import { cn } from "@/lib/utils"
import { useMutation } from "@liveblocks/react"

type ToolProps = {
  type: string
  onClick: (index?: number) => void
  icon: React.ReactNode
  requiresInput: boolean
}

export const Toolbar = () => {
  const { toolbarContext, tableCellContext } = useGame()

  const { undo, redo, erase, notesMode, toggleNotesMode } = toolbarContext
  const { tableCell } = tableCellContext

  const Tools: ToolProps[] = [
    {
      type: TOOL_TYPES.UNDO,
      onClick: undo,
      icon: <Undo2 />,
      requiresInput: false
    },
    {
      type: TOOL_TYPES.REDO,
      onClick: redo,
      icon: <Redo2 />,
      requiresInput: false
    },
    {
      type: TOOL_TYPES.ERASE,
      onClick: (index?: number) => erase(index!),
      icon: <Eraser />,
      requiresInput: true
    }
  ]

  const handleClick = (tool: ToolProps, index: number) => {
    if (tool.requiresInput) {
      tool.onClick(index)
    } else {
      tool.onClick()
    }
  }

  return (
    <div className="flex justify-between">
      <TooltipProvider>
        {Tools.map((tool) => (
          <Tooltip key={tool.type}>
            <TooltipTrigger asChild>
              <Button
                //disabled={isSolved}
                size="sm"
                variant="ghost"
                onClick={() => handleClick(tool, tableCell.index!)}
              >
                {tool.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tool.type}</TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              className={cn({
                "ring-1 dark:ring-slate-400 ring-offset-1 dark:ring-offset-slate-400 ring-slate-700 ring-offset-slate-700":
                  notesMode
              })}
              onClick={() => toggleNotesMode()}
              size="sm"
              aria-label="Toggle notes"
              //disabled={isSolved}
            >
              <Edit3 />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Notes</TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  )
}
