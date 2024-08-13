"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn/tooltip"

import { Undo2, Redo2, Eraser, Edit3 } from "lucide-react"
import { Button } from "@/shadcn/button"
import { useGame } from "@/hooks/use-game"
import { TOOL_TYPES } from "@/utils/constants"
import { cn } from "@/lib/utils"
import { Badge } from "./shadcn/badge"

type ToolProps = {
  disabled: boolean
  type: string
  onClick: (index?: number) => void
  icon: React.ReactNode
  requiresInput: boolean
}

export const Toolbar = () => {
  const { toolbarContext, tableCellContext } = useGame()

  const { canUndo, canRedo, undo, redo, erase, notesMode, toggleNotesMode } =
    toolbarContext
  const { tableCell } = tableCellContext

  const Tools: ToolProps[] = [
    {
      disabled: !canUndo,
      type: TOOL_TYPES.UNDO,
      onClick: undo,
      icon: <Undo2 />,
      requiresInput: false
    },
    {
      disabled: !canRedo,
      type: TOOL_TYPES.REDO,
      onClick: redo,
      icon: <Redo2 />,
      requiresInput: false
    },
    {
      disabled: false,
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
    <div className="flex justify-between gap-2">
      <TooltipProvider>
        {Tools.map((tool) => (
          <Tooltip key={tool.type}>
            <TooltipTrigger asChild>
              <Button
                disabled={tool.disabled}
                className="w-14 h-14"
                variant="outline"
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
            <div className="relative">
              <Button
                variant="outline"
                className={cn("w-14 h-14", {
                  "bg-accent": notesMode
                })}
                onClick={() => toggleNotesMode()}
              >
                <div className="absolute -top-3 -right-4">
                  <Badge variant={notesMode ? "default" : "secondary"}>
                    {notesMode ? "On" : "Off"}
                  </Badge>
                </div>
                <Edit3 />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>Notes</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
