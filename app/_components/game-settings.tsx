"use client"

import { CardDescription, CardTitle } from "@/shadcn/card"
import { Label } from "@/shadcn/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/popover"
import { Switch } from "@/shadcn/switch"
import { useMutation, useStorage } from "@liveblocks/react/suspense"
import { Settings } from "lucide-react"

export function GameSettings() {
  const validateMode = useStorage((root) => root.validateMode)

  const toggleValidateMode = useMutation(({ storage }, checked: boolean) => {
    storage.set("validateMode", !checked)
  }, [])

  return (
    <Popover>
      <PopoverTrigger>
        <Settings className="h-6 w-6" />
      </PopoverTrigger>
      <PopoverContent>
        <CardTitle className="text-lg">Game Settings</CardTitle>
        <CardDescription>
          These settings affect all players in the game
        </CardDescription>
        <div className="mt-4 flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Check entries </span>
            <span className="font-normal text-muted-foreground leading-snug">
              Marks numbers in red (incorrect) or blue (correct).
            </span>
          </Label>
          <Switch
            checked={validateMode}
            onCheckedChange={() => toggleValidateMode(validateMode)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
