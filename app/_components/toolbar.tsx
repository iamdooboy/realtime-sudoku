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

type ToolProps = {
  disabled: boolean
  type: string
  onClick: () => void
  icon: React.JSX.Element
}

const NotesButton = ({ notesMode }: { notesMode: boolean }) => {
  return (
    <div>
      <div className="absolute -top-3 -right-4">
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

  const redo = useMutation(({ storage }) => {
    console.log("redo")
  }, [])

  const undo = useMutation(({ storage }) => {
    console.log("undo")
  }, [])

  const { notesMode, toggleNotesMode } = useContext(NotesContext)

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
            <div className="relative">
              <Button
                disabled={tool.disabled}
                className={cn("w-14 h-14 rounded-full", {
                  "bg-accent": notesMode  && tool.type === TOOL_TYPES.ERASE
                })}
                variant="outline"
                onClick={() => tool.onClick()}
              >
                {tool.icon}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>{tool.type}</TooltipContent>
        </Tooltip>
      ))}
      <Button
        className={cn("w-14 h-14 rounded-full sm:hidden block", {
          "bg-accent": notesMode
        })}
        variant="outline"
      >
        <Eraser />
      </Button>
    </TooltipProvider>
  )
}
